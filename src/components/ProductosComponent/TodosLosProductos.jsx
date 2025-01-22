import axiosInstance from "../../axios";
import { useState, useEffect } from "react";
import ProductoIndividual from "./ProductoIndividual";
import Spinner from "../Spiner";
import SearchBar from "./SearchBar";

const TodosLosProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const fetchProducts = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axiosInstance.get(
        "/inventario-productos?populate=*"
      );

      const productosOrdenados = response?.data.data.sort((a, b) =>
        a.nombreProducto.localeCompare(b.nombreProducto)
      );

      setProductos(productosOrdenados);
      setProductosFiltrados(productosOrdenados);
    } catch (error) {
      setError("Error al cargar los productos. Intenta nuevamente.");
      console.log("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    if (!term) {
      setProductosFiltrados(productos);
    } else {
      const normalizarTexto = (texto) =>
        texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const productosFiltrados = productos.filter((producto) =>
        normalizarTexto(producto.nombreProducto)
          .toLowerCase()
          .includes(normalizarTexto(term).toLowerCase())
      );

      setProductosFiltrados(productosFiltrados);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      <SearchBar onSearch={handleSearch} />

      <ul className="product-list">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="error-message">{error}</p> 
        ) : productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <li key={producto.id}>
              <ProductoIndividual producto={producto} />
            </li>
          ))
        ) : (
          <p className="error-message">
            No se encontraron productos relacionados.
          </p>
        )}
      </ul>
    </div>
  );
};

export default TodosLosProductos;
