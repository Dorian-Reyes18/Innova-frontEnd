import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import AdminIcon from "../../assets/AdminIconWhite.svg";
import StockerIcon from "../../assets/StockerIcon.svg";
import SellerIcon from "../../assets/SellerIcon.svg";
import DeliveryIcon from "../../assets/DeliveryIcon.svg";

const Header = () => {
  const { user } = useUser();
  const [myUser, setMyUser] = useState(null);

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

  // console.log(myUser?.role);

  useEffect(() => {
    if (user !== null) {
      setMyUser(user?.user?.data);
    }
  }, [setMyUser, user]);

  return (
    <div className="header-container">
      <div className="role">
        <span>{myUser ? myUser?.role?.name : "Rol no identificado"}</span>
        {
          // buscar el icono
          roles.map((role) => {
            if (role?.name === myUser?.role?.name) {
              return <img src={role.icon} alt={role.name} key={role.id} />;
            }
            return null;
          })
        }
      </div>
    </div>
  );
};

export default Header;
