import { Link } from "react-router-dom";
import SellIcon from "../../assets/VentasIcon.svg";
import SellIconBlanco from "../../assets/VentasIconBlanco.svg";
import { useUser } from "../../context/UserContext";

const VentasLink = () => {
  const { user } = useUser();
  const roleName = user?.user?.data?.role?.name?.toLowerCase();

  // Definimos los roles permitidos
  const rolesPermitidos = ["administrador", "stocker", "vendedor"];

  if (roleName && rolesPermitidos.includes(roleName)) {
    return (
      <Link to="/ventas" className="link-card">
        <img className="normal" src={SellIcon} alt="Ventas" />
        <img className="blanca" src={SellIconBlanco} alt="Ventas" />
        <span>Ventas</span>
      </Link>
    );
  }

  return null;
};

export default VentasLink;
