import { Link } from "react-router-dom";
import DeliveryAsignadaIcon from "../../assets/MotoNormal.svg";
import DeliveryAsignadaBlanco from "../../assets/MotoBlanca.svg";
import { useUser } from "../../context/UserContext";

const DeliveryAsignadas = () => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

  if (role === 4) {
    return (
      <Link to="/asignadas" className="link-card">
        <img className="normal" src={DeliveryAsignadaIcon} alt="Ventas" />
        <img className="blanca" src={DeliveryAsignadaBlanco} alt="Ventas" />
        <span>Asignadas</span>
      </Link>
    );
  }

  return null;
};

export default DeliveryAsignadas;
