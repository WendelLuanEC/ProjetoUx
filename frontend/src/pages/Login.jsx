import React, { useEffect, useState } from "react";
import { CaretCircleLeft, User, UserGear, UserList } from "phosphor-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

import * as styles from "./css/Login.css.jsx";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigation = useNavigate();

  const [currentScreen, setCurrentScreen] = useState(1);
  const [loginSelected, setLoginSelected] = useState(null);

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [data, setData] = useState({
    login: "",
    password: "",
  });

  const handleScreen = (num) => {
    setCurrentScreen(num);

    setData({
      login: "",
      password: "",
    });
  };

  const login = async () => {
    setLoadingRequest(true);

    try {
      await axios
        .post("http://localhost:8800/login", {
          login: data.login,
          password: data.password,
        })
        .then((resp) => {
          localStorage.setItem("jwt_session", resp.data.token);

          navigation(`/dashboard`);
        });
      //${resp.data.matricula}
    } catch (e) {
      toast("Login e/ou senha incorreto!", {
        autoClose: 3000,
        theme: "light",
      });
      console.log(e);
    }

    setLoadingRequest(false);
  };

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

            <styles.ButtonSubmit
              onClick={() => login()}
              style={
                !data.login || !data.password
                  ? { backgroundColor: "#aaa" }
                  : { backgroundColor: "#222" }
              }
            >
              {loadingRequest ? "Entrando..." : "Entrar"}
            </styles.ButtonSubmit>
          </styles.FormContainer>

          <styles.ButtonSubmit
            onClick={() => navigation(`/register`)}
            style={
              !data.login || !data.password
                ? { backgroundColor: "#aaa" }
                : { backgroundColor: "#222" }
            }
          >
            {loadingRequest ? "Entrando..." : "Entrar"}
          </styles.ButtonSubmit>
        </>
      }

      <ToastContainer />
    </styles.Container>
  );
};

export default Login;
