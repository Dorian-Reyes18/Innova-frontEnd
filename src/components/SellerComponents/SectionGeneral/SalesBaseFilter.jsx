import { useState, useEffect } from "react";
import SearchDeVentas from "./SearchDeVentas";
import LayoutVenta from "./LayoutVenta";

const SalesBaseFilter = ({ sales, salesGroup }) => {
  // Iniciamos filteredSales en vacío para que no muestre resultados por defecto
  const [filteredSales, setFilteredSales] = useState([]);
  // Estado para manejar qué componente se renderiza
  const [stateRendering, setStateRendering] = useState({
    mostrarFiltradosSearch: false,
    mostrarFiltradosSelect: true,
  });

  // Efecto que se ejecuta al montar el componente o cuando 'sales' cambia
  useEffect(() => {
    // Reiniciamos los estados al valor inicial
    setFilteredSales([]);
    setStateRendering({
      mostrarFiltradosSearch: false,
      mostrarFiltradosSelect: true,
    });
  }, [sales]);

  // Función que se ejecuta al hacer click en el botón de búsqueda
  const handleSearch = (codigoVenta) => {
    const filtered = sales.filter(
      (sale) => sale.codigoVenta === String(codigoVenta)
    );
    setFilteredSales(filtered);
    setStateRendering({
      mostrarFiltradosSearch: true,
      mostrarFiltradosSelect: false,
    });
    console.log("Ventas filtradas", filtered);
  };

  return (
    <div className="sales-base-filter">
      <SearchDeVentas onSearch={handleSearch} />
      {stateRendering.mostrarFiltradosSearch ? (
        <div className="sales-list">
          <h1>Resultado encontrado</h1>
        </div>
      ) : (
      <LayoutVenta />
      )}
    </div>
  );
};

export default SalesBaseFilter;
