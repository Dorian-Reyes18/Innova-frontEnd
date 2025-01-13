import { useNavigate } from "react-router-dom";
import LogoutIcon from "../assets/LogOut.svg";

const Logout = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { state: { message: "Sesión cerrada correctamente" } });
  };

  return (
    <div
      className={collapsed ? "logout-collapsed" : "logout-container"}
      onClick={handleLogout}
      style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
    >
      <img src={LogoutIcon} alt="Cerrar sesión" />
      {collapsed ? null : <span>Cerrar sesión</span>}
    </div>
  );
};

export default Logout;
