import { useState } from "react";
import PropTypes from "prop-types";

const SearchDeVentas = ({ onSearch, cleanFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función que se ejecuta cuando el usuario realiza una búsqueda
  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();

    // Validar que el input no esté vacío
    if (term === "") {
      setErrorMessage("Por favor, ingresa un código de venta para buscar.");
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // Validar que se ingresen al menos 3 dígitos para la búsqueda parcial
    if (term.length < 3) {
      setErrorMessage("Por favor, ingresa al menos 3 dígitos para buscar.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // Ejecutamos la búsqueda con el término (se asume que onSearch implementa el filtro parcial,
    // por ejemplo usando `sale.codigoVenta.startsWith(term)`)
    onSearch(term);
  };

  // Detecta cuando el usuario presiona Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Detecta el cambio en el input y ejecuta la función cleanFilter si está vacío
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Ejecuta la función cleanFilter si el input se ha dejado en blanco
    if (value.trim() === "") {
      cleanFilter(true);
    } else {
      cleanFilter(false);
    }
  };

  // Función para resetear el valor del input y ejecutar cleanFilter
  const handleReset = () => {
    setSearchTerm("");
    cleanFilter(true);
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
        <div
          className="error-message"
          style={{ color: "red", marginTop: "10px" }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

SearchDeVentas.propTypes = {
  onSearch: PropTypes.func.isRequired,
  cleanFilter: PropTypes.func.isRequired,
};

export default SearchDeVentas;
