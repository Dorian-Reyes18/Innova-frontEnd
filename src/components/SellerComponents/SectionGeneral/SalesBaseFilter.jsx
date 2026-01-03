import { useState, useEffect } from "react";
import SearchDeVentas from "./SearchDeVentas";
import LayoutVenta from "../LayoutVenta";
import FiltroDeVentas from "./FiltroDeVentas";
import PropTypes from "prop-types";

const SalesBaseFilter = ({ sales, salesGroup, setReAmount }) => {
  const [filteredSales, setFilteredSales] = useState([]);
  const [stateRendering, setStateRendering] = useState(false);

  // Guardamos las ventas originales cuando cargamos el componente
  const [originalSales, setOriginalSales] = useState(sales);

  // Reiniciamos los estados al valor inicial cuando cambian las ventas
  useEffect(() => {
    setFilteredSales(sales);
    setOriginalSales(sales);
    setStateRendering(false);
  }, [sales]);

  // Función que se ejecuta al hacer click en el botón de búsqueda
  // Ahora realiza un filtrado buscando el término en cualquier parte del código
  const handleSearch = (codigoVenta) => {
    const filtered = sales.filter((sale) =>
      sale.codigoVenta.toString().toLowerCase().includes(codigoVenta)
    );
    setFilteredSales(filtered);
    setStateRendering(true);
  };

  const handleCleanFilter = (isCleaned) => {
    if (isCleaned) {
      setFilteredSales(originalSales);
      setStateRendering(false);
    }
  };

  return (
    <div className="sales-base-filter">
      <SearchDeVentas onSearch={handleSearch} cleanFilter={handleCleanFilter} />
      {stateRendering ? (
        <div className="sales-list">
          {filteredSales.length === 0 ? (
            <div className="error-message" style={{ margin: "0 auto" }}>
              No hay resultados para la búsqueda
            </div>
          ) : (
            <LayoutVenta venta={filteredSales[0]} setReAmount={setReAmount} />
          )}
        </div>
      ) : (
        <FiltroDeVentas salesGroup={salesGroup} setReAmount={setReAmount} />
      )}
    </div>
  );
};

SalesBaseFilter.propTypes = {
  sales: PropTypes.array.isRequired,
  salesGroup: PropTypes.array.isRequired,
  setReAmount: PropTypes.func.isRequired,
};

export default SalesBaseFilter;
