import { NavLink } from "react-router-dom"

const NavButton = ({to, icon, label}) => {
    return(
        <NavLink to={to} className="navlink">
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
        </NavLink>
    )
};

export default NavButton; 