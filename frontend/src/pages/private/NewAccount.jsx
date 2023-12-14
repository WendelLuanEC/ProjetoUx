import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as styles from "./css/FormStyles.css";

const NewAccount = ({ backFuncion }) => {
  const [data, setData] = useState({
    saldo: 0,
    senha: "",
    tipo_conta: "",
    id_agencia: null,
    transacoes: "",
    cliente_CPF: "",
    data_aniversario_contrato: "",
    limite_credito: null,
    taxa_juros_percentual: null,
    id_gerente: null,
    cliente_id: "",
  });
  const [cpfCliente, setCpfCliente] = useState("");
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const [clients, setClients] = useState([]);
  const [agencys, setAgencys] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "cliente_id") {
      setCpfCliente(e.target.value);
    }

    if (name === "id_agencia") {
      getManager(value);
    }
  };

  const isValid = () => {
    if (Object.values(data).every((value) => value !== "")) {
      return setButtonEnabled(true);
    }

    setButtonEnabled(false);
  };

  const getClients = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/getClientes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.log(error);
    }
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

  const getManager = async (numero) => {
    await axios
      .get(`http://localhost:8800/getGerenteAgencia/${numero}`)
      .then((resp) => {
        console.log(resp);
      });
  };

  const addAccount = async () => {
    setLoadingRequest(true);

    await axios
      .post(
        "http://localhost:8800/addConta",
        {
          saldo: data.saldo,
          senha: data.senha,
          tipo_conta: data.tipo_conta,
          id_agencia: data.id_agencia,
          transacoes: data.transacoes,
          cliente_CPF: data.cliente_CPF,
          data_aniversario_contrato: data.data_aniversario_contrato,
          limite_credito: data.limite_credito,
          taxa_juros_percentual: data.taxa_juros_percentual,
          id_gerente: data.id_gerente,
          cliente_id: data.cliente_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
          },
        }
      )
      .then(() => {
        toast("Conta adicionada ao cliente!");

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

  useEffect(() => {
    getClients();
    getAgencys();
  }, []);

  return (
    <styles.Container>
      <styles.Form>
        <styles.FormTitle>
          <h2>Adicionar conta</h2>
        </styles.FormTitle>

        <styles.Label>
          <span>Cliente</span>
          <select
            name="cliente_id"
            id="cliente_id"
            value={data.cliente_id}
            onChange={handleChange}
          >
            <option value="" defaultChecked hidden>
              Selecione o cliente
            </option>
            {clients.length >= 1 &&
              clients.map((client) => {
                return (
                  <option value={client.cpf}>{client.nome_completo}</option>
                );
              })}
          </select>
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
          <span>Tipo da conta</span>
          <select
            name="tipo_conta"
            id="tipo_conta"
            value={data.tipo_conta}
            onChange={handleChange}
          >
            <option value="" defaultChecked hidden>
              Selecione o cargo
            </option>
            <option value="corrente">Corrente</option>
            <option value="poupanca">Poupança</option>
            <option value="especial">Especial</option>
            <option value="credito">Crédito</option>
          </select>
        </styles.Label>

        <styles.Label>
          <span>Agência</span>
          <select
            name="id_agencia"
            id="id_agencia"
            value={data.id_agencia}
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

        <styles.Label>
          <span>Transações</span>
          <input
            type="text"
            name="transacoes"
            id="transacoes"
            value={data.transacoes}
            onChange={handleChange}
          />
        </styles.Label>

        <styles.Label>
          <span>CPF</span>
          <input
            type="text"
            name="cliente_CPF"
            id="cliente_CPF"
            value={cpfCliente}
          />
        </styles.Label>

        {data.tipo_conta === "corrente" && (
          <styles.Label>
            <span>Data aniversário do contrato</span>
            <input
              type="text"
              name="data_aniversario_contrato"
              id="data_aniversario_contrato"
              value={data.data_aniversario_contrato}
              onChange={handleChange}
            />
          </styles.Label>
        )}

        {data.tipo_conta === "especial" && (
          <styles.Label>
            <span>Limite de crédito</span>
            <input
              type="text"
              name="limite_credito"
              id="limite_credito"
              value={data.limite_credito}
              onChange={handleChange}
            />
          </styles.Label>
        )}

        {data.tipo_conta === "poupanca" && (
          <styles.Label>
            <span>Taxa de juros (%)</span>
            <input
              type="text"
              name="taxa_juros_percentual"
              id="taxa_juros_percentual"
              value={data.taxa_juros_percentual}
              onChange={handleChange}
            />
          </styles.Label>
        )}

        <styles.Label>
          <span>Gerente</span>
          <input
            type="text"
            name="id_gerente"
            id="id_gerente"
            value={data.id_gerente}
            onChange={handleChange}
          />
        </styles.Label>

        <styles.ButtonSubmit
          onClick={() => {
            addAccount();
          }}
        >
          {loadingRequest ? "Adicionando..." : "Adicionar"}
        </styles.ButtonSubmit>
      </styles.Form>

      <ToastContainer />
    </styles.Container>
  );
};

export default NewAccount;
