import { useUser } from "../../context/UserContext";
import AdminIcon from "../../assets/AdminIconWhite.svg";
import StockerIcon from "../../assets/StockerIcon.svg";
import SellerIcon from "../../assets/SellerIcon.svg";
import DeliveryIcon from "../../assets/DeliveryIcon.svg";

const HeaderProductos = () => {
  const { user } = useUser();
  const myUser = user?.user?.data;

  const roles = [
    {
      id: 1,
      name: "Administrador",
      icon: AdminIcon,
    },
    {
      id: 4,
      name: "Delivery",
      icon: DeliveryIcon,
    },
    {
      id: 5,
      name: "Stocker",
      icon: StockerIcon,
    },
    {
      id: 6,
      name: "Vendedor",
      icon: SellerIcon,
    },
  ];

  return (
    <div className="header-products">
      <span className="title-header">Productos en Stock</span>
      {roles.map((role) => {
        if (role.id === myUser?.role?.id) {
          return (
            <img
              className="iconRole"
              src={role.icon}
              alt={role.name}
              key={role.id}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default HeaderProductos;
