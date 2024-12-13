const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;