import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/private/Home";
import { useContext } from "react";

const Router = () => {
  const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    let decoded;
    try {
      decoded = jwtDecode(localStorage.getItem("jwt_session"));
    } catch (e) {}
    if (isAuthenticated || decoded) {
      return children;
    }
    localStorage.clear();
    return <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
