import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { FiPlus } from 'react-icons/fi';
import { Marker } from 'react-leaflet';

import './styles.css';

import { markerIcon } from "../../utils/maps";

import { Sidebar } from "../../components/sidebar";
import { Map } from "../../components/map";
import { Button } from "../../components/button";
import { createOrphanage } from "../../services/orphanage";

export const CreateOrphanage = () => {
  const navigateTo = useNavigate()

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekend, setOpenOnWeekend] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    console.log(event.target.files)

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', whatsapp);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekend));

    images.forEach(images => {
      data.append('images', images);
    });

    await createOrphanage(data);

    alert('Cadastro realizado com sucesso!');

    navigateTo('/app');
  };

  const handleMapClick = (coordinates: [number, number]) => {
    const [lat, lng] = coordinates;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <div id="page-create-orphanage">
    <Sidebar />

    <main>
      <form onSubmit={handleSubmit} className="create-orphanage-form">
        <fieldset>
          <legend>Dados</legend>

          <Map
            center={[-23.312621539317988, -51.152000427246094]}
            style={{ width: '100%', height: 280 }}
            zoom={10}
            onClick={handleMapClick}       
          >
            {position.latitude !== 0 && (
              <Marker
                interactive={false}
                icon={markerIcon()}
                position={[position.latitude, position.longitude]}
              />
            )}
          </Map>

          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="about">
              Sobre
              <span>Máximo de 300 caracteres</span>
            </label>
            <textarea
              id="name"
              maxLength={300}
              value={about}
              onChange={event => setAbout(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="whatsapp">Whatsapp</label>
            <input
              id="name"
              value={whatsapp}
              onChange={event => setWhatsapp(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="images">Fotos</label>
            <div className="images-container">

              {previewImages.map(image => (
                <img key={image} src={image} alt={name} />
              ))}

              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
            </div>
            <input
              multiple
              onChange={handleSelectImages}
              type="file"
              id="image[]"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Visitação</legend>

          <div className="input-block">
            <label htmlFor="instructions">Instruções</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={event => setInstructions(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="opening_hours">Horário de Funcionamento</label>
            <input
              id="opening_hours"
              value={opening_hours}
              onChange={event => setOpeningHours(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="open_on_weekends">Atende fim de semana</label>

            <div className="button-select">
              <button
                type="button"
                className={open_on_weekend ? 'active' : ''}
                onClick={() => setOpenOnWeekend(true)}
              >
                Sim
              </button>
              <button
                type="button"
                className={!open_on_weekend ? 'active' : ''}
                onClick={() => setOpenOnWeekend(false)}
              >
                Não
              </button>
            </div>
          </div>
        </fieldset>

        <Button type="submit">Confirmar</Button>
      </form>
    </main>
  </div>
  )
}