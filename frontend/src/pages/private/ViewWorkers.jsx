import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash, Pencil } from "phosphor-react";
import { toast, ToastContainer } from "react-toastify";

import * as styles from "./css/TableStyles.css";

const ViewWorkers = () => {
  const [workersData, setWorkersData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [viewEditModal, setViewEditModal] = useState(false);

  const getWorkers = async () => {
    setLoadingData(true);

    try {
      const response = await axios.get(
        `http://localhost:8800/getFuncionarios`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
          },
        }
      );
      setWorkersData(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingData(false);
  };

  const closeModal = () => {
    setViewEditModal(false);
  };

  const handleEdit = (matricula) => {
    setViewEditModal(true);
  };

  const handleDelete = async (matricula) => {
    setLoadingRequest(true);

    await axios
      .delete(`http://localhost:8800/deletarFuncionario/${matricula}`)
      .then(() => {
        toast("Funcionário deletado");

        setTimeout(() => {
          getWorkers();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast("Erro ao deletar");
      });

    setLoadingRequest(false);
  };

  useEffect(() => {
    getWorkers();
  }, []);

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
          <h2>Visualizar funcionários</h2>
        </styles.TableTitle>

        {loadingData && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p>Carregando...</p>
          </div>
        )}

        {!loadingData && (
          <>
            {" "}
            {workersData.length > 1 && (
              <tbody>
                <tr>
                  <styles.TableHeader>Ações</styles.TableHeader>
                  {workersData.length > 0 &&
                    Object.keys(workersData[0]).map((key) => (
                      <styles.TableHeader key={key}>{key}</styles.TableHeader>
                    ))}
                </tr>

                {workersData.map((worker, index) => (
                  <tr key={index}>
                    <styles.TableCell>
                      <button onClick={() => handleEdit(worker.matricula)}>
                        <Pencil size={24} />
                      </button>

                      <button
                        onClick={() => {
                          if (!loadingRequest) {
                            handleDelete(worker.matricula);
                          }
                        }}
                      >
                        <Trash size={24} />
                      </button>
                    </styles.TableCell>

                    {Object.values(worker).map((value, index) => (
                      <styles.TableCell key={index}>{value}</styles.TableCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
            {workersData.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>Sem funcionários registradoss</p>
              </div>
            )}
          </>
        )}
      </styles.Table>

      <ToastContainer />
    </styles.Container>
  );
};

export default ViewWorkers;
