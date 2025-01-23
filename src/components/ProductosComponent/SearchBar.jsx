import { useState } from "react";
import InnovaStockIcon from "../../assets/InnovaStock.svg";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <img className="innova-stock" src={InnovaStockIcon} alt="" />
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
      <Link to="crear-producto" className="btn-out">
        {" "}
        Crear Producto
      </Link>
    </div>
  );
};

export default SearchBar;
