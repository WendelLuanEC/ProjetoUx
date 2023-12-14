import React, { useState } from "react";

import * as styles from "./css/Client.css";
import { Database, PlusCircle, CaretCircleLeft } from "phosphor-react";

import ViewTransactions from "./ViewTransactions";

const Transaction = () => {
  const [currentScreen, setCurrentScreen] = useState({
    start: true,
    add: false,
    view: false,
  });

  return (
    <styles.Container>
      {currentScreen.start && (
        <styles.Boxes>
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
            <h2>Ver transações</h2>
          </styles.BoxItem>
        </styles.Boxes>
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

          <ViewTransactions />
        </div>
      )}
    </styles.Container>
  );
};

export default Transaction;
