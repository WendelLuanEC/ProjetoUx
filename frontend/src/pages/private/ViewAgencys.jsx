import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash, Pencil } from "phosphor-react";
import { toast, ToastContainer } from "react-toastify";

import * as styles from "./css/TableStyles.css";

import EditModal from "../../components/EditModal";
import OverlayModal from "../../components/OverlayModal";

const ViewAgencys = () => {
  const [agencyData, setAgencyData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [viewEditModal, setViewEditModal] = useState(false);

  const getAgencys = async () => {
    setLoadingData(true);

    try {
      const response = await axios.get(`http://localhost:8800/getAgencias`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
        },
      });
      setAgencyData(response.data);
    } catch (error) {
      console.log(error);
    }

    setLoadingData(false);
  };

  const closeModal = () => {
    setViewEditModal(false);
  };

  const handleEdit = (agencyNumero) => {
    setViewEditModal(true);
  };

  const handleDelete = async (agencyNumero) => {
    setLoadingRequest(true);

    await axios
      .delete(`http://localhost:8800/deletarAgencia/${agencyNumero}`)
      .then(() => {
        toast("Agencia deletada");

        setTimeout(() => {
          getAgencys();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast("Erro ao deletar");
      });

    setLoadingRequest(false);
  };

  useEffect(() => {
    getAgencys();
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
          <h2>Visualizar agências</h2>
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
            {agencyData.length > 1 && (
              <tbody>
                <tr>
                  <styles.TableHeader>Ações</styles.TableHeader>
                  {agencyData.length > 0 &&
                    Object.keys(agencyData[0]).map((key) => (
                      <styles.TableHeader key={key}>{key}</styles.TableHeader>
                    ))}
                </tr>

                {agencyData.map((agency, index) => (
                  <tr key={index}>
                    <styles.TableCell>
                      <button onClick={() => handleEdit(agency.numero)}>
                        <Pencil size={24} />
                      </button>

                      <button
                        onClick={() => {
                          if (!loadingRequest) {
                            handleDelete(agency.numero);
                          }
                        }}
                      >
                        <Trash size={24} />
                      </button>
                    </styles.TableCell>

                    {Object.values(agency).map((value, index) => (
                      <styles.TableCell key={index}>{value}</styles.TableCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}

            {agencyData.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>Sem agências registradas</p>
              </div>
            )}
          </>
        )}
      </styles.Table>

      <ToastContainer />
    </styles.Container>
  );
};

export default ViewAgencys;
