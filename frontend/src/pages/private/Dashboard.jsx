import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { SignOut, UserCircle } from "phosphor-react";

import * as styles from "./css/Dashboard.css";

import Client from "./Client";

const Dashboard = () => {
  const { id, cpf } = useParams();

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [role, setRole] = useState(0);
  const [cliente] = useState([]);
  const [currentSidebarItem, setCurrentSidebarItem] = useState("client");

  const navigate = useNavigate();

  const getInfo = async () => {
    let decodedRole = 0;
    try {
      const decoded = jwtDecode(localStorage.getItem("jwt_session"));
      setRole(decoded.role);
      decodedRole = decoded.role;
    } catch (e) {
      localStorage.clear();
      navigate("/");
    }

    // if (decodedRole === 1) {
    //   await axios
    //     .get(`http://localhost:8800/user/${cpf}`, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
    //       },
    //     })
    //     .then((resp) => {
    //       setUserInfo(resp.data[0]);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    //   await axios
    //     .get(`http://localhost:8800/user/${setUserInfo.cpf}`, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("jwt_session")}`,
    //       },
    //     })
    //     .then((resp) => {
    //       setUserInfo(resp.data[0]);
    //       //console.log(userInfo);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    setLoading(false);
  };

  const api = axios.create({
    baseURL: "",
  });
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <styles.Container>
      {loading && (
        <styles.Loading>
          <h3>Carregando informações...</h3>
        </styles.Loading>
      )}

      {!loading && (
        <>
          <styles.Sidebar>
            <styles.HeaderSidebar>
              <div className="image">
                <UserCircle size={50} weight="thin" />
              </div>

              <h2>Olá, {userInfo.nome_completo}</h2>

              <p>{role === 2 && `Cargo: ${userInfo.cargo}`} </p>
            </styles.HeaderSidebar>

            <styles.SidebarMenu>
              {
                <ul>
                  {
                    <li
                      style={
                        currentSidebarItem === "client"
                          ? {
                              borderBottom: "2px solid #000",
                            }
                          : {}
                      }
                      onClick={() => setCurrentSidebarItem("client")}
                    >
                      Cliente
                    </li>
                  }
                  <li
                    style={
                      currentSidebarItem === "account"
                        ? {
                            borderBottom: "2px solid #000",
                          }
                        : {}
                    }
                    onClick={() => setCurrentSidebarItem("account")}
                  >
                    Conta
                  </li>
                  {
                    <li
                      style={
                        currentSidebarItem === "agency"
                          ? {
                              borderBottom: "2px solid #000",
                            }
                          : {}
                      }
                      onClick={() => setCurrentSidebarItem("agency")}
                    >
                      Agência
                    </li>
                  }
                  {
                    <li
                      style={
                        currentSidebarItem === "worker"
                          ? {
                              borderBottom: "2px solid #000",
                            }
                          : {}
                      }
                      onClick={() => setCurrentSidebarItem("worker")}
                    >
                      Funcionário
                    </li>
                  }
                  {
                    <li
                      style={
                        currentSidebarItem === "dependent"
                          ? {
                              borderBottom: "2px solid #000",
                            }
                          : {}
                      }
                      onClick={() => setCurrentSidebarItem("dependent")}
                    >
                      Dependente
                    </li>
                  }
                  {
                    <li
                      style={
                        currentSidebarItem === "transaction"
                          ? {
                              borderBottom: "2px solid #000",
                            }
                          : {}
                      }
                      onClick={() => setCurrentSidebarItem("transaction")}
                    >
                      Transação
                    </li>
                  }
                </ul>
              }
            </styles.SidebarMenu>

            <styles.FooterSidebar>
              <SignOut
                size={26}
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                style={{ cursor: "pointer" }}
              />
            </styles.FooterSidebar>
          </styles.Sidebar>

          <styles.Content>
            {currentSidebarItem === "client" && (
              <Client role={role} infoClient={userInfo} />
            )}
            {currentSidebarItem === "account" && (
              <Account role={role} matricula={id} />
            )}
            {currentSidebarItem === "agency" && <Agency role={role} />}
            {currentSidebarItem === "worker" && <Worker role={role} />}
            {currentSidebarItem === "dependent" && <Dependent role={role} />}
            {currentSidebarItem === "transaction" && (
              <Transaction role={role} />
            )}
          </styles.Content>
        </>
      )}
    </styles.Container>
  );
};

export default Dashboard;
