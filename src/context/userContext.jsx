// IMPORTS
import { createContext, useState, useContext, useEffect } from "react";
import getAllProducts from "../services/fetchAllProducts";

const UserContext = createContext();

// Crear el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({});

  // 🆕 estado global para productos
  const [allProducts, setAllProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // ============================
  // 🔁 Cargar user desde localStorage al iniciar
  // ============================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      // Si hay usuario guardado => cargamos productos
      void loadProducts();
    }
  }, []);

  // ============================
  // 🔁 Función para cargar productos (usa el servicio externo)
  // ============================
  const loadProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);

      const productos = await getAllProducts();
      setAllProducts(productos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setProductsError("Error al cargar los productos. Intenta nuevamente.");
    } finally {
      setProductsLoading(false);
    }
  };

  // ============================
  // 👤 Manejo de usuario
  // ============================
  const setUserData = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));

    // 👉 Apenas se loguea el usuario, disparo la carga de productos
    void loadProducts();
  };

  const setCurrentProductData = (data) => {
    setCurrentProduct(data);
    localStorage.setItem("currentProduct", JSON.stringify(data));
  };

  const clearUser = () => {
    setUser(null);
    setCurrentProduct({});
    setAllProducts([]);
    setProductsError(null);

    localStorage.removeItem("user");
    localStorage.removeItem("currentProduct");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        currentProduct,
        allProducts, // 👈 aquí expones todos los productos
        productsLoading, // opcional: para mostrar spinners
        productsError, // opcional: para mostrar errores
        setCurrentProduct: setCurrentProductData,
        setUserData,
        clearUser,
        reloadProducts: loadProducts, // 👈 por si quieres recargar manualmente
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
