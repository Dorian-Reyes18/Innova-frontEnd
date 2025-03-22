import { useUser } from "../../context/UserContext";
import AdminIcon from "../../assets/AdminIconWhite.svg";
import StockerIcon from "../../assets/StockerIcon.svg";
import SellerIcon from "../../assets/SellerIcon.svg";
import DeliveryIcon from "../../assets/DeliveryIcon.svg";
import { useLocation, useParams } from "react-router-dom";

const HeaderUsuarios = () => {
  const { user } = useUser();
  const { id } = useParams();
  const myUser = user?.user?.data;
  const roleName = myUser?.role?.name?.toLowerCase(); // Convertimos a minúsculas

  const location = useLocation();
  const rutas = [
    { path: "/usuarios", name: "Usuarios del sistema" },
    {
      path: `/usuarios/gestionar-usuarios/${id}`,
      name: "Gestión de Usuarios",
    },
    {
      path: `/usuarios/crear-usuario`,
      name: "Nuevo Usuario",
    },
  ];

  const titleHeader = rutas.map((ruta) =>
    location.pathname === ruta.path ? ruta.name : null
  );

  const roles = [
    {
      name: "administrador",
      icon: AdminIcon,
    },
    {
      name: "delivery",
      icon: DeliveryIcon,
    },
    {
      name: "stocker",
      icon: StockerIcon,
    },
    {
      name: "vendedor",
      icon: SellerIcon,
    },
  ];

  return (
    <div className="header-products">
      <span className="title-header">{titleHeader}</span>
      {roles.map((role) => {
        if (role.name === roleName) {
          return (
            <img
              className="iconRole"
              src={role.icon}
              alt={role.name}
              key={role.name}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default HeaderUsuarios;
