import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as styles from "./css/FormStyles.css";

const NewAgency = ({ backFuncion }) => {
  const [data, setData] = useState({
    nome: "",
    salario_montante_total: null,
    cidade: "",
  });
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValid = () => {
    if (Object.values(data).every((value) => value !== "")) {
      return setButtonEnabled(true);
    }

    setButtonEnabled(false);
  };

  const addAgency = async () => {
    setLoadingRequest(true);

    await axios
      .post(
        "http://localhost:8800/addAgencia",
        {
          nome: data.nome,
          salario_montante_total: data.salario_montante_total,
          cidade: data.cidade,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
          },
        }
      )
      .then(() => {
        toast("Agência adicionada!");

        setTimeout(() => {
          backFuncion();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast("Erro ao criar");
      });

    setLoadingRequest(false);
  };

  useEffect(() => {
    isValid();
  }, [data]);

  return (
    <styles.Container>
      <styles.Form>
        <styles.FormTitle>
          <h2>Adicionar agência</h2>
        </styles.FormTitle>

        <styles.Label>
          <span>Nome</span>
          <input
            type="text"
            name="nome"
            id="nome"
            value={data.nome}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Salário montante total</span>
          <input
            type="text"
            name="salario_montante_total"
            id="salario_montante_total"
            value={data.salario_montante_total}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Cidade</span>
          <input
            type="text"
            name="cidade"
            id="cidade"
            value={data.cidade}
            onChange={handleChange}
          />
        </styles.Label>

        <styles.ButtonSubmit
          style={
            !buttonEnabled ? { backgroundColor: "#aaa", color: "#fff" } : {}
          }
          onClick={() => {
            if (buttonEnabled) {
              if (!loadingRequest) {
                addAgency();
              }
            } else {
              toast("Preencha todos os campos");
            }
          }}
        >
          {loadingRequest ? "Adicionando..." : "Adicionar"}
        </styles.ButtonSubmit>
      </styles.Form>

      <ToastContainer />
    </styles.Container>
  );
};

export default NewAgency;
