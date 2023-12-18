import React, { useContext, useEffect, useState } from "react";
import { CaretCircleLeft, User, UserGear, UserList } from "phosphor-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import * as styles from "./css/Login.css.jsx";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const navigation = useNavigate();
  const { login } = useContext(AuthContext);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const handleLogin = async () => {
    setLoadingRequest(true);
    const result = await login(data.login, data.password);
    if (result === true) {
      navigation(`/home`);
    } else {
      toast("Login e/ou senha incorreto!", {
        autoClose: 3000,
        theme: "light",
      });
    }
    setLoadingRequest(false);
  };

  useEffect(() => {
    try {
      jwtDecode(localStorage.getItem("jwt_session"));
      navigation("/home");
    } catch (error) {}
  }, []);

  return (
    <styles.Container>
      {
        <>
          <styles.FormContainer>
            <styles.FormTitle>
              <h2>{"Entrar"}</h2>
            </styles.FormTitle>

            <styles.Label>
              <span>{"Email"}</span>
              <input
                type="text"
                name="login"
                id="login"
                value={data.login}
                onChange={(e) => setData({ ...data, login: e.target.value })}
              />
            </styles.Label>

            <styles.Label>
              <span>Senha</span>
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </styles.Label>
            <p>
              Não possui conta?
              <Link to="/register">Cadastre-se aqui</Link>
            </p>
            <styles.ButtonSubmit
              onClick={() => handleLogin()}
              style={
                !data.login || !data.password
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

export default Login;
