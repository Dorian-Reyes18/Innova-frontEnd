import { useState } from "react";

const SearchBarUsuarios = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    if (!filter) {
      setErrorMessage("Por favor, seleccione una opción de filtro.");
      return;
    }
    setErrorMessage("");
    onSearch(searchTerm, filter);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilter("");
    setErrorMessage("");
    onSearch("", "");
  };

  return (
    <div className="search-container">
      <div className="search-bar barr">
        <div className="search-block">
          <input
            className="search-user"
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onBlur={() => {
              if (!searchTerm) handleClear();
            }}
          />
          {searchTerm && (
            <span className="clear-user" onClick={handleClear}>
              X
            </span>
          )}
        </div>
        <div className="block">
          <select
            className="select-in"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="" disabled>
              Filtro:
            </option>
            <option value="nombreApellido">Nombre</option>
            <option value="username">Usuario</option>
            <option value="telefono">Teléfono</option>
          </select>
          <button onClick={handleSearch}>Buscar</button>
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SearchBarUsuarios;
