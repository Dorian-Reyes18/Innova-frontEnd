import { Link } from "react-router-dom";
import AsingIcon from "../../assets/asign-delivery.svg";
import { useUser } from "../../context/UserContext";

const DeliveryLink = () => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

  if (role === 1 || role === 6) {
    return (
      <Link to="/home" className="link-card">
        <img src={AsingIcon} alt="Asignar Delivery" />
        <span>Asignar Delivery</span>
      </Link>
    );
  }

  return null;
};

export default DeliveryLink;
