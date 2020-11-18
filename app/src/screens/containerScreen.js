import React, { useEffect, useState } from "react";
import styles from "./styles/app.module.css";
import Homescreen from "./homescreen";
import UploadFileScreen from "./uploadFileScreen";
import NavigationBar from "./components/navigationBar";

const ContainerScreen = () => {
  const [screen, setScreen] = useState("Homescreen");
  useEffect(() => {
    const selectedScreen = localStorage.getItem("selectedScreen");
    if (selectedScreen) {
      setScreen(selectedScreen);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedScreen", screen);
  }, [screen]);

  return (
    <div className={styles.container}>
      <NavigationBar screen={screen} setScreen={(e) => setScreen(e)} />
      <ContentContainer screen={screen} setScreen={(e) => setScreen(e)}/>
    </div>
  );
};

const ContentContainer = (props) => {
    const screen = props.screen;
    switch (screen) {
      case "Homescreen":
        return <Homescreen />;
      case "UploadFileScreen":
        return <UploadFileScreen setScreen={props.setScreen}/>;
      default:
        return <Homescreen />;
    }
  };

export default ContainerScreen;
