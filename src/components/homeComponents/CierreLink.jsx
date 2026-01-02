import { Link } from "react-router-dom";
import CierreIcon from "../../assets/CierreIcon.svg";
import CierreIconMorado from "../../assets/CierreIconBlanco.svg";
import { useUser } from "../../context/UserContext";

const CierreLink = () => {
  const { user } = useUser();
  const roleName = user?.user?.data?.role?.name?.toLowerCase();

  // Definimos los roles permitidos
  const rolesPermitidos = ["administrador", "stocker"];

  if (roleName && rolesPermitidos.includes(roleName)) {
    return (
      <Link to="/ventas" className="link-card">
        <img className="normal" src={CierreIcon} alt="Cierre" />
        <img className="blanca" src={CierreIconMorado} alt="Cierre" />
        <span>Cierre</span>
      </Link>
    );
  }

  return null;
};

export default CierreLink;
