import React from "react";
import styles from "./styles/loadingContainer.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function LoadingContainer(props) {

  if(props.fullscreen){
    return (
      <div className={styles.backgroundFullscreen}>
        <div className={styles.loadingContainer}>
          <Loader
            type="Bars"
            color="#37348e"
            height={150}
            width={150}
          />
          <p className={styles.loadingLabel}>Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.background}>
      <div className={styles.loadingContainer}>
        <Loader
          type="Bars"
          color="#37348e"
          height={150}
          width={150}
        />
        <p className={styles.loadingLabel}>Loading</p>
      </div>
    </div>
  );
}
