import { Link } from "react-router-dom";
import HistoryIcon from "../../assets/Historial.svg";
import HistoryIconBlanco from "../../assets/HistorialBlanco.svg";
import { useUser } from "../../context/UserContext";

const EntregasHistorialLink = () => {
  const { user } = useUser();
  const roleName = user?.user?.data?.role?.name?.toLowerCase(); 

  // Definimos los roles permitidos
  const rolesPermitidos = ["delivery"];

  if (roleName && rolesPermitidos.includes(roleName)) {
    return (
      <Link to="/delivery-historial" className="link-card">
        <img className="normal" src={HistoryIcon} alt="Historial" />
        <img className="blanca" src={HistoryIconBlanco} alt="Historial" />
        <span>Historial</span>
      </Link>
    );
  }

  return null;
};

export default EntregasHistorialLink;
