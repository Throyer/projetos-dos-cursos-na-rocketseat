import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { assets } from "../../assets";

import './styles.css';

export const Sidebar = () => {
  var navigateTo = useNavigate();
  return (
    <aside className="sidebar">
      <img src={assets.IMG_MAP_MARKER} alt="Happy" />

      <footer>
        <button type="button" onClick={() => navigateTo(-1)}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  )
}