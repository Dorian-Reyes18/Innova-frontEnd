import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

// Crear el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setUserData = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const setCurrentProductData = (data) => {
    setCurrentProduct(data);
    localStorage.setItem("currentProduct", JSON.stringify(data));
  };

  const clearUser = () => {
    setUser(null);
    setCurrentProduct({});
    localStorage.removeItem("user");
    localStorage.removeItem("currentProduct");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        currentProduct,
        setCurrentProduct: setCurrentProductData,
        setUserData,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
