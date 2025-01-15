import { Link } from "react-router-dom";
import ProductsIcon from "../../assets/ProductsIconMorado.svg";
import ProductsIconBlanco from "../../assets/ProductsIcon.svg";

const ProductosLink = () => {
  return (
    <Link to="/productos" className="link-card">
      <img className="normal" src={ProductsIcon} alt="Productos" />
      <img className="blanca" src={ProductsIconBlanco} alt="Productos" />
      <span>Stock</span>
    </Link>
  );
};

export default ProductosLink;
