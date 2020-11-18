import React, { useEffect, useState } from "react";

import L from "leaflet";
import "leaflet-gpx";
import "leaflet.awesome-markers";
import styles from "./styles/mapContainer.module.css";
import FullscreenMapScreen from "./fullscreenMap";
import ToggleFullscreenBtn from "./toggleFullscreenBtn";

export default function MapContainer(props) {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if(fullscreen){
      return;
    }
    const container = L.DomUtil.get("map");
    
    if (container != null) {
      container._leaflet_id = null;
    }

    const accessToken = process.env.REACT_APP_LEAFLET_ACCESS_TOKEN;

    const position = [48.089, 11.83];
    const map = L.map("map").setView(position, 13);

    L.tileLayer(
      `https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=${accessToken}`,
      {
        attribution:
          '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    new L.GPX(props.gpxFile, {
      async: true,
      polyline_options: {
        color: "#37348e",
        opacity: 0.75,
        weight: 3,
        lineCap: "round",
        distanceMarkers: { iconSize: [10, 16] },
      },
      marker_options: {
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        shadowAnchor: [15, 40],
        startIconUrl: "./assets/mapMarker/startIcon.png",
        endIconUrl: "./assets/mapMarker/endIcon.png",
        shadowUrl: "./assets/mapMarker/markers-shadow.png",
      },
    })
      .on("loaded", function (e) {
        map.fitBounds(e.target.getBounds());
      })
      .addTo(map);
  }, [props.gpxFile, fullscreen]);

  if (fullscreen) {
    return <FullscreenMapScreen gpxFile={props.gpxFile} toggleFullscreen={setFullscreen}/>;
  }

  return (
    <>
      <div id="map" className={styles.mapContainer}>
      <ToggleFullscreenBtn onClick={() => setFullscreen(true)}/>
      </div>
    </>
  );
}
