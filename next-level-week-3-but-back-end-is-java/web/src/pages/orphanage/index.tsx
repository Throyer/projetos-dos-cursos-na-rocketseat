import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';

import { Marker } from 'react-leaflet';

import { Sidebar } from "../../components/sidebar";

import './styles.css';

import { markerIcon } from "../../utils/maps";
import { Map } from "../../components/map";
import { OrphanageInfo, orphanageById } from "../../services/orphanage";
import { Button } from "../../components/button";
import { OrphanagesMap } from '../orphanages-map';

type OrphanageRouteParams = {
  orphanage_id?: string;
}

export const Orphanage = () => {
  const [orphanage, setOrphanage] = useState<OrphanageInfo>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { orphanage_id } = useParams<OrphanageRouteParams>()

  useEffect(() => {
    if (orphanage_id) {
      orphanageById(orphanage_id)
        .then((response) => setOrphanage(response))
    }
    
  }, [orphanage_id]);

  if (!orphanage) {
    return <p>Carregando orfanato ...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">

          {orphanage.images.length && (
            <img
              src={orphanage.images[selectedImageIndex].url}
              alt={orphanage.name}
            />
          )}

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.url}
                  className={selectedImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setSelectedImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                interactive={false}
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
              >
                <Marker
                  interactive={false}
                  icon={markerIcon()}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta
                <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos
                  <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos
                  <br />
                  fim de semana
                </div>
              )}
            </div>
            <a
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?phone=55${orphanage.whatsapp}&text=Olá, gostaria de informações adicionais sobre o orfanato`}
              target="_blank"
            >
              <Button type="button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}