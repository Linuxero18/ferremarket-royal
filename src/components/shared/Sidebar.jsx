import { NavLink } from 'react-router-dom'; // Para enlaces activos
import { FaChartBar, FaShoppingCart, FaBoxes, FaUsers, FaFileAlt } from 'react-icons/fa';
import "../../styles/Sidebar.css"

function Sidebar() {
  return (
    <aside className="sidebar d-flex flex-column p-3 shadow">
      <div className="sidebar-header text-center mb-4">
        <h4>Antony Carrasco</h4>
        <p className="text-muted">FERREMARKET ROYAL</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-link d-flex align-items-center py-2">
          <FaChartBar className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/ventas" className="nav-link d-flex align-items-center py-2">
          <FaShoppingCart className="me-2" /> Ventas
        </NavLink>
        <NavLink to="/inventario" className="nav-link d-flex align-items-center py-2">
          <FaBoxes className="me-4" /> Inventario 
        </NavLink>
        <NavLink to="/proveedores" className="nav-link d-flex align-items-center py-2">
          <FaUsers className="me-2" /> Proveedores
        </NavLink>
        <NavLink to="/reportes" className="nav-link d-flex align-items-center py-2">
          <FaFileAlt className="me-2" /> Reportes
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;