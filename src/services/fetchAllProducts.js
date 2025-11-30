// src/services/product.service.js
import axiosInstance from "../axios";

export const getAllProducts = async () => {
  const response = await axiosInstance.get("/inventario-productos?populate=*");

  // Ordenar por nombre, igual que ya hacías
  const productosOrdenados = response?.data?.data.sort((a, b) =>
    a.nombreProducto.localeCompare(b.nombreProducto)
  );

  return productosOrdenados;
};

export default getAllProducts;
