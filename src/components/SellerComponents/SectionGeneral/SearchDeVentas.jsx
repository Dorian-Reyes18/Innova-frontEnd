import { useState } from "react";
import PropTypes from "prop-types";
import NoResults from "../NoResults";

const SearchDeVentas = ({ onSearch, cleanFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();

    if (isSearchTermValid(term)) {
      onSearch(term);
    } else {
      setErrorMessage(getErrorMessage(term));
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      cleanFilter(true);
    } else {
      cleanFilter(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    cleanFilter(true);
  };

  const isSearchTermValid = (term) => {
    return term.length >= 3;
  };

  const getErrorMessage = (term) => {
    if (term === "") {
      return "Por favor, ingresa un código de venta para buscar.";
    }

    if (term.length < 3) {
      return "Por favor, ingresa al menos 3 dígitos para buscar.";
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar barr">
        <div className="search-block">
          <input
            className="search-user"
            type="number"
            placeholder="Buscar por código de venta..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {searchTerm && (
            <span className="reset" onClick={handleReset}>
              X
            </span>
          )}
        </div>
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {errorMessage && (
        <>
          <div
            className="error-message"
            style={{ color: "red", marginTop: "10px" }}
          >
            {errorMessage}
          </div>
        </>
      )}
    </div>
  );
};

SearchDeVentas.propTypes = {
  onSearch: PropTypes.func.isRequired,
  cleanFilter: PropTypes.func.isRequired,
};

export default SearchDeVentas;
