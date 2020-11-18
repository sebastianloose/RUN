import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/toggleFullscreenBtn.module.css";

export default function ToggleFullscreenBtn(props) {
  return (
    <div
      className={styles.toggleBtn}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faExpand} color="#37348e" />
    </div>
  );
}
