import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (login, password) => {
    try {
      await axios
        .post("http://localhost:8800/login", {
          login: login,
          password: password,
        })
        .then((resp) => {
          localStorage.setItem("jwt_session", resp.data.token);
        });
    } catch (e) {
      return false;
      console.log(e);
    }

    setIsAuthenticated(true);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("jwt_session");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
