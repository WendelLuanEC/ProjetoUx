import React from "react";

import * as styles from "./OverlayModal.css";

const OverlayModal = ({ closeModal }) => {
  return <styles.Container onClick={closeModal}></styles.Container>;
};

export default OverlayModal;
