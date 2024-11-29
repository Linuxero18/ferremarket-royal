import IconButton from './IconButton';
import Logo from './Logo';
import "../../../styles/Header.css";
import { FaMoon, FaBell, FaCog } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <div className="header-options">
        <button className="icon-button">
          <span className="options-text">Options</span>
        </button>
      </div>
      <div className="header-left">
        <IconButton icon={<FaMoon />} />
        <IconButton icon={<FaBell />} />
        <IconButton icon={<FaCog />} />
      </div>
      <Logo src="src/assets/ferremarketLogo.png" alt="Empresa Logo" />
    </header>
  );
}

export default Header;