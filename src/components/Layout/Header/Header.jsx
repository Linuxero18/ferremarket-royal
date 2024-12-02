import { FaMoon, FaBell, FaCog } from 'react-icons/fa';
import IconButton from '../../Shared/Button/IconButton'
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-options">
      </div>
      <div className="header-left">
        <IconButton 
            icon={<FaMoon />} 
            onClick={() => alert('Modo oscuro activado')} 
            title="Activar modo oscuro"
        />
        <IconButton 
            icon={<FaBell />} 
            onClick={() => alert('Notificaciones abiertas')} 
            title="Ver notificaciones"
        />
        <IconButton 
            icon={<FaCog />} 
            onClick={() => alert('Configuración')} 
            title="Ir a configuración"
        />
      </div>
      <div className="header-logo">
        <img src="src/assets/ferremarketLogo.png" alt="Empresa Logo"/>
      </div>
    </header>
  );
}

export default Header;