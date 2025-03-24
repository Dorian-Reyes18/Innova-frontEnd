import { useState } from "react";
import { useUser } from "../../context/userContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SearchBarUsuarios = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();
  const myUser = user?.user?.data;
  const roleName = myUser?.role?.name?.toLowerCase(); // Convertimos a minúsculas

  const handleSearch = () => {
    if (!filter) {
      setErrorMessage(
        "Por favor, escriba antes un término o seleccione una opción de filtro."
      );
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
          {roleName === "administrador" ? (
            <Link to="crear-usuario" className="btn-out">
              Nuevo
            </Link>
          ) : null}
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SearchBarUsuarios;

SearchBarUsuarios.propTypes = {
  onSearch: PropTypes.func,
};
