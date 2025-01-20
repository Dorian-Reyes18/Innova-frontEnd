import { Outlet, useLocation } from "react-router-dom";
import HeaderProductos from "../components/ProductosComponent/HeaderProductos";
import TodosLosProductos from "../components/ProductosComponent/TodosLosProductos";

const Productos = () => {
  const location = useLocation();

  const isRootPath = location.pathname === "/productos";

  return (
    <div className="section-general">
      <div className="body-global">
        {isRootPath && (
          <>
            <HeaderProductos />
            <TodosLosProductos />
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Productos;
