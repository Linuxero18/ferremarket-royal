import SidebarHeader from './SidebarHeader';
import NavItem from './NavItem';
import { FaHome, FaShoppingCart, FaBoxes, FaUsers, FaFileAlt } from 'react-icons/fa';
import "../../../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <SidebarHeader 
        profileImage="https://via.placeholder.com/80" 
        name="Antony Carrasco"
      />
      <nav>
        <NavItem to="/" icon={<FaHome className="nav-icon me-3" />} label="INICIO" />
        <NavItem to="/ventas" icon={<FaShoppingCart className="nav-icon me-3" />} label="VENTAS" />
        <NavItem to="/inventario" icon={<FaBoxes className="nav-icon me-3" />} label="INVENTARIO" />
        <NavItem to="/proveedores" icon={<FaUsers className="nav-icon me-3" />} label="PROVEEDORES" />
        <NavItem to="/reportes" icon={<FaFileAlt className="nav-icon me-3" />} label="REPORTES" />
      </nav>
    </aside>
  );
}

export default Sidebar;