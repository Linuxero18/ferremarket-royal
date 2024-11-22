import { NavLink } from 'react-router-dom'; 
import { FaChartBar, FaShoppingCart, FaBoxes, FaUsers, FaFileAlt } from 'react-icons/fa';
import "../../styles/Sidebar.css"


function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img
          src="https://via.placeholder.com/80" 
          alt="Perfil"
          className="profile-icon"
        />
        <h3>Antony Carrasco</h3>
        <p >FERREMARKET ROYAL</p>
      </div>
      <nav className="">
        <NavLink to="/" className="navlink">
          <FaChartBar className="nav-icon me-2" /> Dashboard
        </NavLink>
        <NavLink to="/ventas" className="navlink">
          <FaShoppingCart className="nav-icon me-2" /> Ventas
        </NavLink>
        <NavLink to="/inventario" className="navlink">
          <FaBoxes className="nav-icon me-2" /> Inventario
        </NavLink>
        <NavLink to="/proveedores" className="navlink">
          <FaUsers className="nav-icon me-2" /> Proveedores
        </NavLink>
        <NavLink to="/reportes" className="navlink">
          <FaFileAlt className="nav-icon me-2" /> Reportes
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
