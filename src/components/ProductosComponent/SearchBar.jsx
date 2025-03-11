import { useState } from "react";
import InnovaStockIcon from "../../assets/InnovaStock.svg";
import { Link } from "react-router-dom";
import { useUser } from "../../context/userContext";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const myUser = user?.user?.data;

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

      {myUser?.role?.id === 1 || myUser?.role?.id === 5 ? (
        <Link to="crear-producto" className="btn-out">
          {" "}
          Crear Producto
        </Link>
      ) : null}
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};
