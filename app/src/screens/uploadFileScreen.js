import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faFileAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/uploadFileScreen.module.css";
import { uploadTrack } from "../service/api";
import { useAuth } from "../contexts/AuthContext";

export default function UploadFileScreen(props) {
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { currentUser } = useAuth();

  const readFile = () => {
    const reader = new FileReader();
    reader.addEventListener("load", async (event) => {
      const result = event.target.result;
      const obj = {
        name: file.name,
        content: result,
      };
      const statusCode = await uploadTrack(obj, fileName, currentUser.uid);
      if (statusCode === "200") {
        setFile(null);
        props.setScreen("Homescreen");
      }
    });
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    let fileNameParts = file.name.split(".");

    if (
      file.type.toLowerCase() === "gpx" ||
      fileNameParts[fileNameParts.length - 1].toLowerCase() === "gpx"
    ) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const dropContainer = () => {
    if (file == null) {
      return (
        <>
          <div
            onDrop={handleDrop}
            className={styles.uploadDropContainer}
            style={
              drag ? { borderColor: "#37348e", background: "#37348e10" } : {}
            }
          >
            <FontAwesomeIcon icon={faUpload} color="#9B9B9B" />
            <p className={styles.dropLabel}>Drop your GPX-Files here</p>
          </div>
          <div className={styles.inactiveUploadBtn}>Upload</div>
        </>
      );
    }
    return (
      <>
        <div className={styles.uploadDropContainer}>
          <div className={styles.deleteBtn} onClick={() => setFile(null)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
          <FontAwesomeIcon icon={faFileAlt} color="#9B9B9B" />
          <input
            className={styles.changeFileNameInput}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        <div
          className={
            fileName.length !== 0 ? styles.uploadBtn : styles.inactiveUploadBtn
          }
          onClick={() => {
            fileName.length !== 0 && readFile();
          }}
        >
          Upload
        </div>
      </>
    );
  };

  return (
    <div
      className={styles.container}
      onDragOver={(event) => {
        setDrag(true);
        event.preventDefault();
      }}
      onDragLeave={(event) => {
        setDrag(false);
        event.preventDefault();
      }}
    >
      <div className={styles.uploadContainer}>
        <p className={styles.headline}>Upload your Runs</p>
        <p className={styles.caption}>Upload your Runs in GPX format:</p>
        {dropContainer()}
      </div>
    </div>
  );
}
