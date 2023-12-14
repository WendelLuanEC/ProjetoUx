import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash, Pencil } from "phosphor-react";
import { toast, ToastContainer } from "react-toastify";

import * as styles from "./css/TableStyles.css";

const ViewDependents = () => {
  const [dependentsData, setDependentsData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [viewEditModal, setViewEditModal] = useState(false);

  const getDependents = async () => {
    setLoadingData(true);

    try {
      const response = await axios.get(`http://localhost:8800/getDependentes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
        },
      });
      setDependentsData(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getDependents();
  }, []);

  const closeModal = () => {
    setViewEditModal(false);
  };

  const handleEdit = (clientCpf) => {
    setViewEditModal(true);
  };

  const handleDelete = async (dependentId) => {
    setLoadingRequest(true);

    await axios
      .delete(`http://localhost:8800/deletarDependente/${dependentId}`)
      .then(() => {
        toast("Dependente deletado");

        setTimeout(() => {
          getDependents();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast("Erro ao deletar");
      });

    setLoadingRequest(false);
  };

  return (
    <styles.Container>
      {viewEditModal && (
        <>
          <EditModal />
          <OverlayModal closeModal={closeModal} />
        </>
      )}

      <styles.Table>
        <styles.TableTitle>
          <h2>Visualizar dependentes</h2>
        </styles.TableTitle>

        {!loadingData && (
          <>
            {dependentsData.length > 1 && (
              <tbody>
                <tr>
                  <styles.TableHeader>Ações</styles.TableHeader>
                  {dependentsData.length > 0 &&
                    Object.keys(dependentsData[0]).map((key) => (
                      <styles.TableHeader key={key}>{key}</styles.TableHeader>
                    ))}
                </tr>

                {dependentsData.map((dependent, index) => (
                  <tr key={index}>
                    <styles.TableCell>
                      <button onClick={() => handleEdit(dependent.id)}>
                        <Pencil size={24} />
                      </button>

                      <button
                        onClick={() => {
                          if (!loadingRequest) {
                            handleDelete(dependent.id);
                          }
                        }}
                      >
                        <Trash size={24} />
                      </button>
                    </styles.TableCell>

                    {Object.values(dependent).map((value, index) => (
                      <styles.TableCell key={index}>{value}</styles.TableCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}

            {dependentsData.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>Sem dependentes registrados</p>
              </div>
            )}
          </>
        )}
      </styles.Table>

      <ToastContainer />
    </styles.Container>
  );
};

export default ViewDependents;
