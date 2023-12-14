import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash, Pencil } from "phosphor-react";
import { toast, ToastContainer } from "react-toastify";

import * as styles from "./css/TableStyles.css";

import EditModal from "../../components/EditModal";
import OverlayModal from "../../components/OverlayModal";
import { jwtDecode } from "jwt-decode";

const ViewAccounts = ({ matricula }) => {
  const [accountData, setAccountData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [decoded, setDecoded] = useState(null);

  const [viewEditModal, setViewEditModal] = useState(false);

  const getAccounts = async () => {
    setLoadingData(true);

    let decode = jwtDecode(localStorage.getItem("jwt_session"));

    setDecoded(decode);

    try {
      if (decode.role === 2 && decode.cargo === "gerente") {
        const response = await axios.get(
          `http://localhost:8800/getContasParaGerente/${matricula}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
            },
          }
        );
        setAccountData(response.data);
      } else if (decode.role === 2 && decode.cargo === "atendente") {
        const response = await axios.get(
          `http://localhost:8800/getContasParaAtendente/${matricula}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
            },
          }
        );
        setAccountData(response.data);
      } else {
        const response = await axios.get(`http://localhost:8800/getContas`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
          },
        });
        setAccountData(response.data);
      }
    } catch (error) {
      console.log(error);
    }

    setLoadingData(false);
  };

  const closeModal = () => {
    setViewEditModal(false);
  };

  const handleEdit = (numero) => {
    setViewEditModal(true);
  };

  const handleDelete = async (numero) => {
    setLoadingRequest(true);

    await axios
      .delete(`http://localhost:8800/deletarConta/${numero}`)
      .then(() => {
        toast("Conta deletada");

        setTimeout(() => {
          getAccounts();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast("Erro ao deletar");
      });

    setLoadingRequest(false);
  };

  useEffect(() => {
    getAccounts();
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
          <h2>Visualizar contas</h2>
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
            {accountData.length >= 1 && (
              <tbody>
                <tr>
                  <styles.TableHeader>Ações</styles.TableHeader>
                  {accountData.length > 0 &&
                    Object.keys(accountData[0]).map((key) => (
                      <styles.TableHeader key={key}>{key}</styles.TableHeader>
                    ))}
                </tr>

                {accountData.map((account, index) => (
                  <tr key={index}>
                    {(decoded.cargo !== "atendente" || !decoded.cargo) && (
                      <styles.TableCell>
                        <button
                          onClick={() => handleEdit(account.numero_conta)}
                        >
                          <Pencil size={24} />
                        </button>

                        <button
                          onClick={() => {
                            if (!loadingRequest) {
                              handleDelete(account.numero_conta);
                            }
                          }}
                        >
                          <Trash size={24} />
                        </button>
                      </styles.TableCell>
                    )}

                    {Object.values(account).map((value, index) => (
                      <styles.TableCell key={index}>{value}</styles.TableCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
            {accountData.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>Sem contas registradas</p>
              </div>
            )}
          </>
        )}
      </styles.Table>

      <ToastContainer />
    </styles.Container>
  );
};

export default ViewAccounts;
