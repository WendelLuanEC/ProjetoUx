import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash, Pencil } from "phosphor-react";
import { toast, ToastContainer } from "react-toastify";

import * as styles from "./css/TableStyles.css";

import EditModal from "../../components/EditModal";
import OverlayModal from "../../components/OverlayModal";

const ViewClientes = ({ role, infoClient }) => {
  const [clientData, setClientData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [currentClientData, setCurrentClientData] = useState(null);

  const [viewEditModal, setViewEditModal] = useState(false);

  const getClients = async () => {
    setLoadingData(true);

    try {
      const response = await axios.get(`http://localhost:8800/getClientes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
        },
      });
      setClientData(response.data);
    } catch (error) {
      console.log(error);
    }

    setLoadingData(false);
  };

  const closeModal = () => {
    setViewEditModal(false);
  };

  const handleEdit = (clientCpf) => {
    setViewEditModal(true);
  };

  const handleDelete = async (clientCpf) => {
    setLoadingRequest(true);

    await axios
      .delete(`http://localhost:8800/deletarCliente/${clientCpf}`)
      .then(() => {
        toast("Cliente deletado");

        setTimeout(() => {
          getClients();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast("Erro ao deletar");
      });

    setLoadingRequest(false);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <styles.Container>
      {viewEditModal && (
        <>
          <EditModal
            chave={currentClient}
            entity="cliente"
            dataEntity={currentClientData}
            closeModal={closeModal}
            getClients={getClients}
          />
          <OverlayModal closeModal={closeModal} />
        </>
      )}

      <styles.Table>
        <styles.TableTitle>
          {role !== 3 ? (
            <h2>Visualizar clientes</h2>
          ) : (
            <h2>Minhas informações</h2>
          )}
        </styles.TableTitle>

        {role !== 3 && (
          <>
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
                {clientData.length > 1 && (
                  <tbody>
                    <tr>
                      <styles.TableHeader>Ações</styles.TableHeader>
                      {clientData.length > 0 &&
                        Object.keys(clientData[0]).map((key) => (
                          <styles.TableHeader key={key}>
                            {key}
                          </styles.TableHeader>
                        ))}
                    </tr>

                    {clientData.map((client, index) => (
                      <tr key={index}>
                        <styles.TableCell>
                          <button
                            onClick={() => {
                              handleEdit(client.cpf);
                              setCurrentClient(client.cpf);
                              setCurrentClientData(client);
                            }}
                          >
                            <Pencil size={24} />
                          </button>

                          <button
                            onClick={() => {
                              if (!loadingRequest) {
                                handleDelete(client.cpf);
                              }
                            }}
                          >
                            <Trash size={24} />
                          </button>
                        </styles.TableCell>

                        {Object.values(client).map((value, index) => (
                          <styles.TableCell key={index}>
                            {value}
                          </styles.TableCell>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                )}
                {clientData.length === 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <p>Sem clientes registrados</p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {role === 3 && (
          <div>
            <div className="info">
              <h3>Nome completo</h3>
              <p>{infoClient.nome_completo}</p>
            </div>

            <div className="info">
              <h3>CPF</h3>
              <p>{infoClient.cpf}</p>
            </div>

            <div className="info">
              <h3>RG</h3>
              <p>{infoClient.rg}</p>
            </div>

            <div className="info">
              <h3>Data de nascimento</h3>
              <p>{infoClient.data_nascimento}</p>
            </div>

            <div className="info">
              <h3>Email</h3>
              <p>{infoClient.email}</p>
            </div>

            <div className="info">
              <h3>Telefone</h3>
              <p>{infoClient.telefone}</p>
            </div>

            <div className="info">
              <h3>Nome do logradouro</h3>
              <p>{infoClient.nome_logradouro}</p>
            </div>

            <div className="info">
              <h3>Bairro</h3>
              <p>{infoClient.bairro}</p>
            </div>

            <div className="info">
              <h3>Estado</h3>
              <p>{infoClient.estado}</p>
            </div>
          </div>
        )}
      </styles.Table>

      <ToastContainer />
    </styles.Container>
  );
};

export default ViewClientes;
