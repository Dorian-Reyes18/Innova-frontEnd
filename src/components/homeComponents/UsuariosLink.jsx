import { Link } from "react-router-dom";
import UsersIcon from "../../assets/Users.svg";
import UsersIconBlanco from "../../assets/UsersBlanco.svg";
import { useUser } from "../../context/UserContext";

const UsuariosLink = () => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

  if (role === 1 || role === 5 || role === 6) {
    return (
      <Link to="/usuarios" className="link-card">
        <img className="normal" src={UsersIcon} alt="Ventas" />
        <img className="blanca" src={UsersIconBlanco} alt="Ventas" />
        <span>Usuarios</span>
      </Link>
    );
  }

  return null;
};

export default UsuariosLink;
