import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask"; // Importe a biblioteca
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import * as styles from "./css/Register.css.jsx";

const Register = () => {
  const navigation = useNavigate();

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [data, setData] = useState({
    cpf: "",
    nome_completo: "",
    email: "",
    telefone: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    endereco: "",
    numero: "",
    complemento: "",
    senha: "",
  });

  const handleCepChange = async (cep) => {
    if (cep.length === 9) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const addressData = response.data;
        setData({
          ...data,
          estado: addressData.uf,
          cidade: addressData.localidade,
          endereco: addressData.logradouro,
        });
      } catch (error) {
        console.error("Erro ao buscar o CEP", error);
      }
    }
  };

  const register = async () => {
    setLoadingRequest(true);

    try {
      await axios.post("http://localhost:8800/user", data);
      toast("Usuário cadastrado com sucesso!", {
        autoClose: 3000,
        theme: "light",
      });
      console.log("Registrado");
      navigation("/"); // Redireciona para a página de login após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
      toast("Erro ao cadastrar usuário. Tente novamente.", {
        autoClose: 3000,
        theme: "light",
      });
    }

    setLoadingRequest(false);
  };

  return (
    <styles.Container>
      {
        <>
          <styles.FormContainer>
            <styles.FormTitle>
              <h2>{"Crie sua conta já!"}</h2>
            </styles.FormTitle>

            <styles.Label>
              <span>{"CPF"}</span>
              <InputMask
                mask="999.999.999-99"
                maskChar="_"
                value={data.cpf}
                onChange={(e) => setData({ ...data, cpf: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Nome completo</span>
              <input
                type="text"
                name="nome_completo"
                id="nome_completo"
                value={data.nome_completo}
                onChange={(e) =>
                  setData({ ...data, nome_completo: e.target.value })
                }
              />
            </styles.Label>

            <styles.Label>
              <span>E-mail</span>
              <input
                type="text"
                name="email"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Telefone</span>
              <InputMask
                mask="(99) 99999-9999"
                maskChar="_"
                value={data.telefone}
                onChange={(e) => setData({ ...data, telefone: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>CEP</span>
              <InputMask
                mask="99999-9999"
                maskChar="_"
                value={data.cep}
                onChange={(e) => {
                  setData({ ...data, cep: e.target.value });
                  handleCepChange(e.target.value);
                }}
              />
            </styles.Label>

            <styles.Label>
              <span>Estado</span>
              <input
                type="text"
                name="estado"
                id="estado"
                value={data.estado}
                onChange={(e) => setData({ ...data, estado: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Cidade</span>
              <input
                type="text"
                name="cidade"
                id="cidade"
                value={data.cidade}
                onChange={(e) => setData({ ...data, cidade: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Bairro</span>
              <input
                type="text"
                name="bairro"
                id="bairro"
                value={data.bairro}
                onChange={(e) => setData({ ...data, bairro: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Endereço</span>
              <input
                type="text"
                name="endereco"
                id="endereco"
                value={data.endereco}
                onChange={(e) => setData({ ...data, endereco: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Numero</span>
              <input
                type="text"
                name="numero"
                id="numero"
                value={data.numero}
                onChange={(e) => setData({ ...data, numero: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Complemento</span>
              <input
                type="text"
                name="complemento"
                id="complemento"
                value={data.complemento}
                onChange={(e) =>
                  setData({ ...data, complemento: e.target.value })
                }
              />
            </styles.Label>

            <styles.Label>
              <span>Senha</span>
              <input
                type="password"
                name="senha"
                id="senha"
                value={data.senha}
                onChange={(e) => setData({ ...data, senha: e.target.value })}
              />
            </styles.Label>

            <styles.ButtonSubmit
              onClick={() => register()}
              style={
                !data.Register || !data.password
                  ? { backgroundColor: "#aaa" }
                  : { backgroundColor: "#222" }
              }
            >
              {loadingRequest ? "Entrando..." : "Entrar"}
            </styles.ButtonSubmit>
          </styles.FormContainer>
        </>
      }

      <ToastContainer />
    </styles.Container>
  );
};

export default Register;
