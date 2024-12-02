const IconButton = ({ icon, onClick, title, className }) => {
    return (
        <button onClick={onClick} title={title} className={`icon-button ${className}`}>
            {icon}
        </button>
    );
};

export default IconButton;