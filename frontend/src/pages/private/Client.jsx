import React, { useState } from "react";
import { Database, PlusCircle, CaretCircleLeft } from "phosphor-react";

import * as styles from "./css/Client.css";

import NewClient from "./NewClient";
import ViewClientes from "./ViewClients";

const Client = ({ role, infoClient }) => {
  const [currentScreen, setCurrentScreen] = useState({
    start: true,
    add: false,
    view: false,
  });

  const backFunction = () => {
    setCurrentScreen({
      ...currentScreen,
      start: true,
      add: false,
      view: false,
    });
  };

  return (
    <styles.Container>
      {currentScreen.start && (
        <styles.Boxes>
          {role === 1 && (
            <styles.BoxItem
              onClick={() =>
                setCurrentScreen({
                  ...currentScreen,
                  start: false,
                  add: true,
                  view: false,
                })
              }
            >
              <PlusCircle size={40} />
              <h2>Adicionar cliente</h2>
            </styles.BoxItem>
          )}

          <styles.BoxItem
            onClick={() =>
              setCurrentScreen({
                ...currentScreen,
                start: false,
                add: false,
                view: true,
              })
            }
          >
            <Database size={40} />
            <h2>{role == 2 ? "Ver clientes" : "Ver informações"}</h2>
          </styles.BoxItem>
        </styles.Boxes>
      )}

      {currentScreen.add && (
        <div style={{ flexDirection: "column" }}>
          <styles.BackButton>
            <CaretCircleLeft
              size={40}
              color="#333"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setCurrentScreen({
                  ...currentScreen,
                  start: true,
                  add: false,
                  view: false,
                })
              }
              className="icon__back"
            />
          </styles.BackButton>

          <NewClient backFuncion={backFunction} />
        </div>
      )}

      {currentScreen.view && (
        <div style={{ flexDirection: "column" }}>
          <styles.BackButton>
            <CaretCircleLeft
              size={40}
              color="#333"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setCurrentScreen({
                  ...currentScreen,
                  start: true,
                  add: false,
                  view: false,
                })
              }
              className="icon__back"
            />
          </styles.BackButton>

          <ViewClientes role={role} infoClient={infoClient} />
        </div>
      )}
    </styles.Container>
  );
};

export default Client;
