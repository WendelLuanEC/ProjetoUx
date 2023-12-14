import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash, Pencil } from "phosphor-react";

import * as styles from "./css/TableStyles.css";

const ViewTransactions = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const getTransactions = async () => {
    setLoadingData(true);

    try {
      const response = await axios.get(`http://localhost:8800/getTransacoes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
        },
      });
      setTransactionData(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  // Funções para editar ou deletar um cliente
  const handleEdit = (clientId) => {
    // Lógica para editar o cliente com o ID 'clientId'
  };

  const handleDelete = (clientId) => {
    // Lógica para deletar o cliente com o ID 'clientId'
  };

  return (
    <styles.Container>
      <styles.Table>
        <styles.TableTitle>
          <h2>Visualizar transações</h2>
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
            {transactionData.length > 1 && (
              <tbody>
                <tr>
                  <styles.TableHeader>Ações</styles.TableHeader>
                  {transactionData.length > 0 &&
                    Object.keys(transactionData[0]).map((key) => (
                      <styles.TableHeader key={key}>{key}</styles.TableHeader>
                    ))}
                </tr>

                {transactionData.map((client, index) => (
                  <tr key={index}>
                    <styles.TableCell>
                      <button onClick={() => handleEdit(client.id)}>
                        <Pencil size={24} />
                      </button>

                      <button onClick={() => handleDelete(client.id)}>
                        <Trash size={24} />
                      </button>
                    </styles.TableCell>

                    {Object.values(client).map((value, index) => (
                      <styles.TableCell key={index}>{value}</styles.TableCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}

            {transactionData.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>Sem transações registradas</p>
              </div>
            )}
          </>
        )}
      </styles.Table>
    </styles.Container>
  );
};

export default ViewTransactions;
