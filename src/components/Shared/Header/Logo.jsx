const Logo = ({ src, alt }) => {
    return (
      <div className="header-logo">
        <img src={src} alt={alt} />
      </div>
    );
  };
  
  export default Logo;