import { Link } from "react-router-dom";
import SellIcon from "../../assets/VentasIcon.svg";
import SellIconBlanco from "../../assets/VentasIconBlanco.svg";
import { useUser } from "../../context/UserContext";

const VentasLink = () => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

  if (role === 1 || role === 5) {
    return (
      <Link to="/home" className="link-card">
        <img className="normal" src={SellIcon} alt="Asignar Delivery" />
        <img className="blanca" src={SellIconBlanco} alt="Asignar Delivery" />
        <span>Ventas</span>
      </Link>
    );
  }

  return null;
};

export default VentasLink;
