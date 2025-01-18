import axiosInstance from "../../axios";
import { useState, useEffect } from "react";
import ProductoIndividual from "./ProductoIndividual";

const TodosLosProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/inventario-productos?populate=*"
      );
      setProductos(response?.data.data);
    } catch (error) {
      console.log("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      console.log("Productos actualizados:", productos);
    }
  }, [productos]);

  return (
    <div className="product-container">
      <ul className="product-list">
        {loading ? (
          <li>Cargando productos...</li>
        ) : (
          productos.map((producto) => (
            <li key={producto.id}>
              <ProductoIndividual producto={producto} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodosLosProductos;
