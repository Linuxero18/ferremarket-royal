import { FaUser, FaHome, FaShoppingCart, FaBoxes, FaUsers, FaFileAlt } from 'react-icons/fa';
import NavButton from '../../Shared/Button/NavButton'
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="src/assets/pluto.jpg" alt="Perfil" className="profile-icon" />
        <h3>Piter Muñoz</h3>
        <p>FERREMARKET <span>ROYAL</span></p>
      </div>
      <nav className='sidebar-nav'>
        <NavButton to="/inicio" icon={<FaHome />} label="INICIO" />
        <NavButton to="/ventas" icon={<FaShoppingCart />} label="VENTAS" />
        <NavButton to="/inventario" icon={<FaBoxes />} label="INVENTARIO" />
        <NavButton to="/proveedores" icon={<FaUsers />} label="PROVEEDORES" />
        <NavButton to="/reportes" icon={<FaFileAlt />} label="REPORTES" />
        <NavButton to="/usuarios" icon={<FaUser />} label="USUARIOS" />
      </nav>
    </aside>
  );
}

export default Sidebar;