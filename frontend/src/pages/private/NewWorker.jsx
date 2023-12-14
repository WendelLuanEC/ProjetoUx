import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as styles from "./css/FormStyles.css";

const NewClient = ({ backFuncion }) => {
  const [data, setData] = useState({
    nome_completo: "",
    senha: "",
    endereco: "",
    cidade: "",
    cargo: "",
    sexo: "",
    data_nascimento: "",
    salario: null,
    agencia_id: null,
  });
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const [agencys, setAgencys] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValid = () => {
    if (Object.values(data).every((value) => value !== "" && value !== null)) {
      return setButtonEnabled(true);
    }

    setButtonEnabled(false);
  };

  const getAgencys = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/getAgencias`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
        },
      });
      setAgencys(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addWorker = async () => {
    setLoadingRequest(true);

    try {
      await axios
        .post(
          "http://localhost:8800/addFuncionario",
          {
            nome_completo: data.nome_completo,
            senha: data.senha,
            senha_criptografada: data.senha,
            endereco: data.endereco,
            cidade: data.cidade,
            cargo: data.cargo,
            sexo: data.sexo,
            data_nascimento: data.data_nascimento,
            salario: data.salario,
            agencia_id: data.agencia_id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
            },
          }
        )
        .then(() => {
          toast("Funcionário adicionado!");

          setTimeout(() => {
            backFuncion();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 412) {
            toast("Salário inferior a R$2.286,00");
          } else {
            toast("Erro ao criar");
          }
        });
    } catch (err) {
      console.log(err);
    }

    setLoadingRequest(false);
  };

  useEffect(() => {
    isValid();
  }, [data]);

  useEffect(() => {
    getAgencys();
  }, []);

  return (
    <styles.Container>
      <styles.Form>
        <styles.FormTitle>
          <h2>Adicionar funcionário</h2>
        </styles.FormTitle>

        <styles.Label>
          <span>Nome completo</span>
          <input
            type="text"
            name="nome_completo"
            id="nome_completo"
            value={data.nome_completo}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Senha</span>
          <input
            type="text"
            name="senha"
            id="senha"
            value={data.senha}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Endereço</span>
          <input
            type="text"
            name="endereco"
            id="endereco"
            value={data.endereco}
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
        <styles.Label>
          <span>Cargo</span>
          <select
            name="cargo"
            id="cargo"
            value={data.cargo}
            onChange={handleChange}
          >
            <option value="" defaultChecked hidden>
              Selecione o cargo
            </option>
            <option value="atendente">Atendente</option>
            <option value="gerente">Gerente</option>
            <option value="caixa">Caixa</option>
          </select>
        </styles.Label>
        <styles.Label>
          <span>Sexo</span>
          <select
            name="sexo"
            id="sexo"
            value={data.sexo}
            onChange={handleChange}
          >
            <option value="" defaultChecked hidden>
              Selecione o sexo
            </option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </styles.Label>
        <styles.Label>
          <span>Data de nascimento</span>
          <input
            type="text"
            name="data_nascimento"
            id="data_nascimento"
            value={data.data_nascimento}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Salario (Superior a R$ 2.286,00)</span>
          <input
            type="text"
            name="salario"
            id="salario"
            value={data.salario}
            onChange={handleChange}
          />
        </styles.Label>
        <styles.Label>
          <span>Agência</span>
          <select
            name="agencia_id"
            id="agencia_id"
            value={data.agencia_id}
            onChange={handleChange}
          >
            <option value="" defaultChecked hidden>
              Selecione a agencia
            </option>
            {agencys.length >= 1 &&
              agencys.map((agency) => {
                return <option value={agency.numero}>{agency.nome}</option>;
              })}
          </select>
        </styles.Label>

        <styles.ButtonSubmit
          style={
            !buttonEnabled ? { backgroundColor: "#aaa", color: "#fff" } : {}
          }
          onClick={() => {
            if (buttonEnabled) {
              if (!loadingRequest) {
                addWorker();
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

export default NewClient;
