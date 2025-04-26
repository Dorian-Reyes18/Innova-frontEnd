import { useState, useEffect } from "react";
import SearchDeVentas from "./SearchDeVentas";
import LayoutVenta from "../LayoutVenta";
import FiltroDeVentas from "./FiltroDeVentas";

const SalesBaseFilter = ({ sales, salesGroup }) => {
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
  // Ahora realiza un filtrado parcial usando startsWith
  const handleSearch = (codigoVenta) => {
    const filtered = sales.filter((sale) =>
      sale.codigoVenta.toString().toLowerCase().startsWith(codigoVenta)
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
      {stateRendering ? (
        <div className="sales-list">
          {filteredSales.length === 0 ? (
            <div className="error-message" style={{ margin: "0 auto" }}>
              No hay resultados para la búsqueda
            </div>
          ) : (
            <LayoutVenta venta={filteredSales[0]} />
          )}
        </div>
      ) : (
        <>
          <SearchDeVentas
            onSearch={handleSearch}
            cleanFilter={handleCleanFilter}
          />
          <FiltroDeVentas salesGroup={salesGroup} />
        </>
      )}
    </div>
  );
};

export default SalesBaseFilter;
