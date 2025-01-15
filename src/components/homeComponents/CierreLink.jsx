import { Link } from "react-router-dom";
import CierreIcon from "../../assets/CierreIcon.svg";
import CierreIconMorado from "../../assets/CierreIconBlanco.svg";
import { useUser } from "../../context/UserContext";

const CierreLink = () => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

  if (role === 1 || role === 5) {
    return (
      <Link to="/ventas" className="link-card">
        <img className="normal" src={CierreIcon} alt="Ventas" />
        <img className="blanca" src={CierreIconMorado} alt="Ventas" />
        <span>Cierre</span>
      </Link>
    );
  }

  return null;
};

export default CierreLink;
