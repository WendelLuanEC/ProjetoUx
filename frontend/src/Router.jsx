import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./pages/Login";
import Dashboard from "./pages/private/Dashboard";
import NotFound from "./pages/NotFound";
import axios from "axios";
import NewClient from "./pages/private/NewClient";
import NewWorker from "./pages/private/NewWorker";
import NewDependent from "./pages/private/NewDepedent";

const Router = () => {
  const PrivateRoute = ({ children }) => {
    try {
      jwtDecode(localStorage.getItem("jwt_session"));
    } catch (e) {
      localStorage.clear();
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard/:id?/:cpf?"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
