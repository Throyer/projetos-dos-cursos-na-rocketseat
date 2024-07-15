import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";

import { Marker, Popup } from 'react-leaflet';

import { assets } from "../../assets";
import { markerIcon } from "../../utils/maps";

import { Map } from "../../components/map";

import './styles.css';

import { allOrphanages, OrphanageInfo } from "../../services/orphanage";


export const OrphanagesMap = () => {
  const [orphanages, setOrphanages] = useState<OrphanageInfo[]>([]);

  useEffect(() => {
    allOrphanages()
      .then((response) => setOrphanages(response))
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={assets.IMG_MAP_MARKER} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Londrina</strong>
          <span>Paraná</span>
        </footer>
      </aside>

      <Map>
        {orphanages.map(({ id, name, latitude, longitude }) => (
          <Marker
            key={id}
            position={[latitude, longitude]}
            icon={markerIcon()}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {name}
              <Link to={`/orphanages/${id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}