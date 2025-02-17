import { Outlet, useLocation } from "react-router-dom";
import HeaderUsuarios from "../components/UsusariosComponents/HeaderUsuarios";
import TodosLosUsuarios from "../components/UsusariosComponents/TodosLosUsuarios";

const Usuarios = () => {
  const location = useLocation();

  const isRootPath = location.pathname === "/usuarios";

  return (
    <div className="section-general">
      <div className="body-global">
        {isRootPath && (
          <>
            <HeaderUsuarios />
            <TodosLosUsuarios />
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Usuarios;
