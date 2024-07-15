import {
  MapContainer,
  TileLayer as Layer,
  MapContainerProps as LeafLetMapProps,
  useMapEvents
} from 'react-leaflet';

import { PropsWithChildren } from "react";

interface MapProps extends PropsWithChildren<LeafLetMapProps> {
  interactive?: boolean;
  onClick?: (coordinates: [number, number]) => void;
}

const Gambiarra = ({ onClick }: { onClick?: (coordinates: [number, number]) => void }) => {
  useMapEvents({
      click: ({ latlng: { lat, lng } }) => onClick && onClick([lat, lng]),
  });
  return null;
};

export const Map = ({ children, interactive = true, onClick, ...props }: MapProps) => {
  return (
    <MapContainer
      center={[-23.2995497, -51.1814481]}
      zoom={13}
      style={{ width: '100%', height: '100%' }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      
      {...props}
    >
      <Layer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Gambiarra onClick={onClick} />
      {children}
    </MapContainer>
  )
}