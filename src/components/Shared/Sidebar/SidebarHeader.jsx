const SidebarHeader = ({ profileImage, name }) => {
    return (
      <div className="sidebar-header">
        <img src={profileImage} alt="Perfil" className="profile-icon" />
        <h3>{name}</h3>
        <p>FERREMARKET <span>ROYAL</span></p>
      </div>
    );
  };
  
  export default SidebarHeader;