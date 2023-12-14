import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as styles from "./css/FormStyles.css";

const NewDependent = ({ backFuncion }) => {
  const [data, setData] = useState({
    nome: "",
    data_nascimento: "",
    parentesco: "",
    idade: null,
    id_funcionario: null,
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

  const addDependent = async () => {
    setLoadingRequest(true);

    await axios
      .post(
        "http://localhost:8800/addDependente",
        {
          id_funcionario: data.id_funcionario,
          nome_completo: data.nome,
          parentesco: data.parentesco,
          data_nascimento: data.data_nascimento,
          idade: data.idade,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
          },
        }
      )
      .then(() => {
        toast("Dependente adicionado!");

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
          <h2>Adicionar dependente</h2>
        </styles.FormTitle>

        <styles.Label>
          <span>Nome completo:</span>
          <input
            type="text"
            name="nome"
            id="nome"
            value={data.nome}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Data de nascimento:</span>
          <input
            type="text"
            name="data_nascimento"
            id="data_nascimento"
            value={data.data_nascimento}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Parentesco:</span>
          <input
            type="text"
            name="parentesco"
            id="parentesco"
            value={data.parentesco}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Idade:</span>
          <input
            type="text"
            name="idade"
            id="idade"
            value={data.idade}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Id do funcionario:</span>
          <input
            type="text"
            name="id_funcionario"
            id="id_funcionario"
            value={data.id}
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
                addDependent();
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

export default NewDependent;
