import React from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css"; // Import of Mapbox CSS
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";

import mapboxgl from "mapbox-gl/dist/mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5uYS1kb3JzY2giLCJhIjoiY2pvenlweTBxMDEwcDN2cDZnODE1b3drbiJ9.90Qojat5txlmFGgTnbP9PA";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
