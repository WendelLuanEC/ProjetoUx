import React, { useEffect, useState } from "react";

import classes from "./Header.module.css";
import "react-toastify/dist/ReactToastify.css";
import HeaderCartButton from "./HeaderCartButton";
import { jwtDecode } from "jwt-decode";

export default function Header(props) {
  const [name, setName] = useState("");
  useEffect(() => {
    try {
      let decoded = jwtDecode(localStorage.getItem("jwt_session"));
      console.log(decoded);
      setName(decoded.cliente.nome_completo);
    } catch (error) {}
  }, []);
  return (
    <>
      <header className={classes.header}>
        <h1>Olá, {name}</h1>
        <HeaderCartButton onClick={props.onShowModal} />
      </header>
      <div className={classes["main-image"]}>
        <img src="/assets/meals.jpg" alt="Table with a lot of foods" />
      </div>
    </>
  );
}
