import ProductPlaceholder from "../../assets/ProductPlaceholder.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProductoIndividual = ({ producto }) => {
  const { user } = useUser();
  const myUser = user.user.data;

  const info = {
    img:
      producto?.imagen == null
        ? ProductPlaceholder
        : producto?.imagen?.formats?.thumbnail?.url,
    compra: producto?.precioCompra,
    venta: producto?.precioVenta,
    promo: producto?.precioPromocion,
    cantidad: producto?.cantidad,
  };

  return (
    <div className="product">
      <div className="block">
        <div className="img-product">
          <img src={info.img} alt="imagen productos" />
        </div>
        <div className="block-info">
          <div className="nombre info">{producto?.nombreProducto}</div>
          {myUser.role.id === 1 || myUser.role.id === 5 ? (
            <div className="precio info">
              <strong>Compra: </strong>
              {info.compra}
            </div>
          ) : null}
          <div className="precio-venta info">
            <strong>Venta: </strong>
            {info.venta}
          </div>
          <div className="precio-promo info">
            <strong>Promocion:</strong>
            {info.promo === null ? 0 : info.promo}
          </div>
          <div className="cantidad info">
            {info.cantidad === 0 ? null : info.cantidad}{" "}
            {info.cantidad === 0 ? (
              <span className="agotado">Agotado</span>
            ) : info.cantidad === 1 ? (
              "disponible "
            ) : (
              "disponibles"
            )}
          </div>
        </div>
      </div>
      <Link
        to={`/productos/gestionar-productos/${producto?.documentId}`}
        className="ver-mas"
      >
        Ver
      </Link>
    </div>
  );
};

ProductoIndividual.propTypes = {
  producto: PropTypes.shape({
    documentId: PropTypes.number,
    nombreProducto: PropTypes.string,
    imagen: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    precioCompra: PropTypes.number,
    precioVenta: PropTypes.number,
    precioPromocion: PropTypes.number,
    cantidad: PropTypes.number,
  }),
};

export default ProductoIndividual;
