import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/loginScreen.module.css";
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom";
import LoadingContainer from "./components/loadingContainer";

export default function LoginScreen() {


  const {currentUser, login, loading} = useAuth();
  const history = useHistory();

  if(currentUser != null){
    history.push("/home");
  }

  return (
    <>
    {loading && <LoadingContainer fullscreen={true}/>}
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <div className={styles.leftBoxIcon}>
          <FontAwesomeIcon icon={faRunning} />
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.logo}>RUN</div>
        <div className={styles.rightBoxContainer}>
          <p className={styles.headline}>Login</p>
          <button className={styles.loginBtn} onClick={login}>LOGIN WITH GOOGLE</button>
        </div>
      </div>
    </div>
    </>
  );
}
