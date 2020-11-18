import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faUpload, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/navigationBar.module.css";
import { useAuth } from "../../contexts/AuthContext";

function NavigationBar(props) {
  const menuElements = [
    { icon: faBolt, screen: "Homescreen" },
    { icon: faUpload, screen: "UploadFileScreen" },
  ];

  const {logout} = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>RUN</div>
      {menuElements.map((obj) => {
        const classes =
          obj.screen === props.screen
            ? `${styles.iconBox} ${styles.selectedBox}`
            : styles.iconBox;

        return (
          <div
            className={classes}
            key={obj.screen}
            onClick={() => props.setScreen(obj.screen)}
          >
            <FontAwesomeIcon icon={obj.icon} color="white" />
          </div>
        );
      })}
      <div
        className={styles.iconBox}
        onClick={logout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} color="white" />
      </div>
    </div>
  );
}

export default NavigationBar;
