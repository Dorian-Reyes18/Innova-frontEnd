import { Link } from "react-router-dom";
import DeliveryAsignadaIcon from "../../assets/MotoNormal.svg";
import DeliveryAsignadaBlanco from "../../assets/MotoBlanca.svg";
import { useUser } from "../../context/UserContext";

const DeliveryAsignadas = () => {
  const { user } = useUser();
  const roleName = user?.user?.data?.role?.name?.toLowerCase();

  // Definimos los roles permitidos
  const rolesPermitidos = ["delivery"];

  if (roleName && rolesPermitidos.includes(roleName)) {
    return (
      <Link to="/asignadas" className="link-card">
        <img className="normal" src={DeliveryAsignadaIcon} alt="Asignadas" />
        <img className="blanca" src={DeliveryAsignadaBlanco} alt="Asignadas" />
        <span>Asignadas</span>
      </Link>
    );
  }

  return null;
};

export default DeliveryAsignadas;
