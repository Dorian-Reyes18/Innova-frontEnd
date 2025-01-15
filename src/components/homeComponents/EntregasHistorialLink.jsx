import { Link } from "react-router-dom";
import HistoryIcon from "../../assets/Historial.svg";
import HistoryIconBlanco from "../../assets/HistorialBlanco.svg";
import { useUser } from "../../context/UserContext";

const EntregasHistorialLink = () => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

  if (role === 4) {
    return (
      <Link to="/delivery-historial" className="link-card">
        <img className="normal" src={HistoryIcon} alt="Ventas" />
        <img className="blanca" src={HistoryIconBlanco} alt="Ventas" />
        <span>Historial</span>
      </Link>
    );
  }

  return null;
};

export default EntregasHistorialLink;
