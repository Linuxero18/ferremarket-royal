import { FaMoon, FaBell, FaCog } from 'react-icons/fa';
import "../../styles/Header.css"

function Header() {
  return (
    <header className="header">
      <div className="header-options">
        <button className="icon-button">
          <span className="options-text">Options</span>
        </button>
      </div>
      <div className="header-left">
        <button className="icon-button">
          <FaMoon />
        </button>
        <button className="icon-button">
          <FaBell />
        </button>
        <button className="icon-button">
          <FaCog />
        </button>
      </div>
      <div className="header-logo">
        <img
          src="src/assets/ferremarketLogo.png" // Cambia esta URL por el logo de tu empresa
          alt="Company Logo"
        />
      </div>
    </header>
  );
}

export default Header;