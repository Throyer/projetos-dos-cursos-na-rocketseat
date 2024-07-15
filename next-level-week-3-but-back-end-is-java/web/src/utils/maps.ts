import Leaflet from "leaflet";

import { assets } from "../assets";

export const markerIcon = () => {
  return Leaflet.icon({
    iconUrl: assets.IMG_MAP_MARKER,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });
}