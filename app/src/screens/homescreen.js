import React, { useEffect, useState } from "react";
import gpx from "gpx-for-runners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRunning,
  faStopwatch,
  faRocket,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/homescreen.module.css";
import { getTracks } from "../service/api";
import { useAuth } from "../contexts/AuthContext";
import LoadingContainer from "./components/loadingContainer";
import MapContainer from "./components/mapContainer";

export default function Homescreen() {
  const [tracks, setTracks] = useState(null);
  const [activeFile, setActiceFile] = useState(null);
  const [gpxData, setGpxData] = useState(null);

  const { currentUser } = useAuth();

  const loadTracks = async () => {
    const tracks = await getTracks(currentUser.uid);
    setTracks(tracks.tracks);
    setActiceFile(0);
  };

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    if (tracks === null || activeFile === null) {
      return;
    }
    if (tracks.length === 0) {
      return;
    }
    try {
      const gpxRaw = new gpx(tracks[activeFile].fileContent);
      const gpxDataObject = {
        distance: Math.round(gpxRaw.distance() * 100) / 100,
        pace: gpxRaw.pace().minutes + ":" + gpxRaw.pace().seconds,
        elevation: gpxRaw.elevation(),
        duration: gpxRaw.duration().total,
      };
      setGpxData(gpxDataObject);
    } catch (err) {
      console.log(err);
      const gpxDataObject = {
        distance: "0",
        pace: "0",
        elevation: "0",
        duration: "0",
      };
      setGpxData(gpxDataObject);
    }
  }, [activeFile]);

  const nextFile = () => {
    if (activeFile < tracks.length - 1) {
      setActiceFile(activeFile + 1);
    }
  };
  const previousFile = () => {
    if (activeFile > 0) {
      setActiceFile(activeFile - 1);
    }
  };

  if (!tracks) {
    return <LoadingContainer />;
  }

  if (tracks.length === 0) {
    return (
      <div className={styles.noDataContainer}>
        <p className={styles.noDataHeadline}>No Data Yet</p>
        <p className={styles.noDataSubtitle}>
          Go to the Upload Screen to upload your first file!
        </p>
      </div>
    );
  }

  if (!gpxData) {
    return <LoadingContainer />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerFlexRow}>
        <div>
          <p className={styles.greeting}>
            Hello, {currentUser.displayName + " "}
            <span role="img" aria-label="Hand">
              👋
            </span>
          </p>
          <p className={styles.greetingSubtitle}>Here are your runs</p>
        </div>
        <div className={styles.fileNavigationContainer}>
          <NextFileBtn
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            onPress={() => previousFile()}
            inactive={() => {
              return activeFile <= 0;
            }}
          />
          <div className={styles.fileNameContainer}>
            {tracks[activeFile].fileName}
          </div>
          <NextFileBtn
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            onPress={() => nextFile()}
            inactive={() => {
              return activeFile >= tracks.length - 1;
            }}
          />
        </div>
      </div>
      <div className={styles.statisticRow}>
        <div className={styles.statisticContainer}>
          <div className={styles.statisticContainerLabelBox}>
            <p
              className={styles.statisticContainerLabel}
              style={{ color: "#85c863" }}
            >
              Distance
            </p>
            <FontAwesomeIcon icon={faRunning} color="#85c863" />
          </div>
          <p className={styles.statisticContainerValue}>
            {gpxData.distance}
            <span className={styles.unit}>km</span>
          </p>
        </div>
        <div className={styles.statisticContainer}>
          <div className={styles.statisticContainerLabelBox}>
            <p
              className={styles.statisticContainerLabel}
              style={{ color: "#f05e5d" }}
            >
              Duration
            </p>
            <FontAwesomeIcon icon={faStopwatch} color="#f05e5d" />
          </div>
          <p className={styles.statisticContainerValue}>{gpxData.duration}</p>
        </div>
        <div className={styles.statisticContainer}>
          <div className={styles.statisticContainerLabelBox}>
            <p
              className={styles.statisticContainerLabel}
              style={{ color: "#ffcd41" }}
            >
              Pace
            </p>
            <FontAwesomeIcon icon={faRocket} color="#ffcd41" />
          </div>
          <p className={styles.statisticContainerValue}>
            {gpxData.pace}
            <span className={styles.unit}>min/km</span>
          </p>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <MapContainer gpxFile={tracks[activeFile].fileContent} />
      </div>
    </div>
  );
}

const NextFileBtn = (props) => {
  if (props.inactive()) {
    return <div className={styles.nextFileBtnInactive}>{props.icon}</div>;
  }
  return (
    <div className={styles.nextFileBtn} onClick={props.onPress}>
      {props.icon}
    </div>
  );
};
