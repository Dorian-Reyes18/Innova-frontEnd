import { Link } from "react-router-dom";
import AsingIcon from "../../assets/asign-delivery.svg";
import AsingIconBlanco from "../../assets/AsignarBlanco.svg";
import { useUser } from "../../context/UserContext";

const DeliveryLink = () => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

  if (role === 1 || role === 5) {
    return (
      <Link to="/deliverys" className="link-card">
        <img className="normal" src={AsingIcon} alt="Asignar Delivery" />
        <img className="blanca" src={AsingIconBlanco} alt="Asignar Delivery" />
        <span>Deliverys</span>
      </Link>
    );
  }

  return null;
};

export default DeliveryLink;
