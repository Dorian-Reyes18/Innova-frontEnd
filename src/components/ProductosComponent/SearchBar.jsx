import { useState } from "react";
import InnovaStockIcon from "../../assets/InnovaStock.svg";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const role = user?.user?.data?.role?.name?.toLowerCase();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <img className="innova-stock" src={InnovaStockIcon} alt="Innova Stock" />
      <div className="search-bar">
        <input
          type="search"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={handleSearch}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {(role === "administrador" || role === "stocker") && (
        <Link to="crear-producto" className="btn-out">
          Crear Producto
        </Link>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
