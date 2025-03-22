import { Link } from "react-router-dom";
import UsersIcon from "../../assets/Users.svg";
import UsersIconBlanco from "../../assets/UsersBlanco.svg";
import { useUser } from "../../context/UserContext";

const UsuariosLink = () => {
  const { user } = useUser();
  const roleName = user?.user?.data?.role?.name?.toLowerCase();

  const rolesPermitidos = ["administrador", "stocker"];

  if (roleName && rolesPermitidos.includes(roleName)) {
    return (
      <Link to="/usuarios" className="link-card">
        <img className="normal" src={UsersIcon} alt="Usuarios" />
        <img className="blanca" src={UsersIconBlanco} alt="Usuarios" />
        <span>Usuarios</span>
      </Link>
    );
  }

  return null;
};

export default UsuariosLink;
