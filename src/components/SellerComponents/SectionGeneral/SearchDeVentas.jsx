import { useState } from "react";
import PropTypes from "prop-types";

const SearchDeVentas = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    onSearch(searchTerm.toLowerCase().trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar barr">
        <div className="search-block">
          <input
            className="search-user"
            type="text"
            placeholder="Buscar por código de venta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>
    </div>
  );
};

SearchDeVentas.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchDeVentas;
