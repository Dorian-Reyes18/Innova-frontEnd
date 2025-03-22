import { Link } from "react-router-dom";
import ProductsIcon from "../../assets/ProductsIconMorado.svg";
import ProductsIconBlanco from "../../assets/ProductsIcon.svg";
import { useUser } from "../../context/UserContext";

const ProductosLink = () => {
  const { user } = useUser();
  const roleName = user?.user?.data?.role?.name?.toLowerCase();

  // Definimos los roles permitidos
  const rolesPermitidos = ["administrador", "stocker", "vendedor"];

  if (roleName && rolesPermitidos.includes(roleName)) {
    return (
      <Link to="/productos" className="link-card">
        <img className="normal" src={ProductsIcon} alt="Productos" />
        <img className="blanca" src={ProductsIconBlanco} alt="Productos" />
        <span>Stock</span>
      </Link>
    );
  }

  return null;
};

export default ProductosLink;
