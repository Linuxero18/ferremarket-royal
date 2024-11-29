import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink to={to} className="navlink">
      {icon} {label}
    </NavLink>
  );
};

export default NavItem;