import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as styles from "./EditModal.css";

const EditModal = ({ chave, entity, dataEntity, closeModal, getClients }) => {
  const [data, setData] = useState({
    nome: dataEntity.nome_completo,
    cpf: dataEntity.cpf,
    rg: dataEntity.rg,
    orgao_emissor: dataEntity.orgao_emissor_rg,
    unidade_federativa: dataEntity.uf_rg,
    data_nascimento: dataEntity.data_nascimento,
    telefone: dataEntity.telefone,
    email: dataEntity.email,
    logradouro: dataEntity.nome_logradouro,
    tipo_logradouro: dataEntity.tipo_logradouro,
    numero: dataEntity.numero,
    bairro: dataEntity.bairro,
    estado: dataEntity.estado,
    cep: dataEntity.cep,
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

  const editData = async () => {
    setLoadingRequest(true);

    await axios
      .put(
        `http://localhost:8800/atualizarCliente/${chave}`,
        {
          cpf: data.cpf,
          nome_completo: data.nome,
          rg: data.rg,
          orgao_emissor_rg: data.orgao_emissor,
          uf_rg: data.unidade_federativa,
          data_nascimento: data.data_nascimento,
          telefone: data.telefone,
          email: data.email,
          tipo_de_logradouro: data.tipo_logradouro,
          nome_logradouro: data.logradouro,
          numero: data.numero,
          bairro: data.bairro,
          estado: data.estado,
          cep: data.cep,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
          },
        }
      )
      .then(() => {
        toast("Cliente atualizado!");

        setTimeout(() => {
          closeModal();
          getClients();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast("Erro ao editar");
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
          <h2>Editar {entity}</h2>
        </styles.FormTitle>

        {entity === "cliente" && (
          <>
            {" "}
            <styles.Label>
              <span>Nome completo</span>
              <input
                type="text"
                name="nome"
                id="nome"
                value={data.nome}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>CPF</span>
              <input
                type="text"
                name="cpf"
                id="cpf"
                maxLength={11}
                value={data.cpf}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>RG</span>
              <input
                type="text"
                name="rg"
                id="rg"
                maxLength={11}
                value={data.rg}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>Orgão Emissor</span>
              <input
                type="text"
                name="orgao_emissor"
                id="orgao_emissor"
                value={data.orgao_emissor}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>Unidade Federativa</span>
              <input
                type="text"
                name="unidade_federativa"
                id="unidade_federativa"
                value={data.unidade_federativa}
                onChange={handleChange}
              />
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
              <span>Telefone</span>
              <input
                type="text"
                name="telefone"
                id="telefone"
                value={data.telefone}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>Email</span>
              <input
                type="text"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>Logradoro</span>
              <input
                type="text"
                name="logradouro"
                id="logradouro"
                value={data.logradouro}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>Tipo de logradouro</span>
              <input
                type="text"
                name="tipo_logradouro"
                id="tipo_logradouro"
                value={data.tipo_logradouro}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>Numero</span>
              <input
                type="text"
                name="numero"
                id="numero"
                value={data.numero}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>Bairro</span>
              <input
                type="text"
                name="bairro"
                id="bairro"
                value={data.bairro}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>Estado</span>
              <input
                type="text"
                name="estado"
                id="estado"
                value={data.estado}
                onChange={handleChange}
              />
            </styles.Label>
            <styles.Label>
              <span>CEP</span>
              <input
                type="text"
                name="cep"
                id="cep"
                value={data.cep}
                onChange={handleChange}
              />
            </styles.Label>
          </>
        )}

        <styles.ButtonSubmit
          style={
            !buttonEnabled ? { backgroundColor: "#aaa", color: "#fff" } : {}
          }
          onClick={() => {
            if (buttonEnabled) {
              if (!loadingRequest) {
                editData();
              }
            } else {
              toast("Preencha todos os campos");
            }
          }}
        >
          {loadingRequest ? "Editando..." : "Editar"}
        </styles.ButtonSubmit>
      </styles.Form>

      <ToastContainer />
    </styles.Container>
  );
};

export default EditModal;
