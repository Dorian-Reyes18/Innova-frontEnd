import ProductPlaceholder from "../../assets/ProductPlaceholder.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProductoIndividual = ({ producto }) => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.name?.toLowerCase(); // Obtenemos el rol y lo convertimos a minúsculas

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

  // Verificamos si el rol es "administrador" o "stocker"
  const showCompraPrice = role === "administrador" || role === "stocker";

  return (
    <div className="product">
      <div className="block">
        <div className="img-product">
          <img src={info.img} alt="imagen productos" />
        </div>
        <div className="block-info">
          <div className="nombre info">{producto?.nombreProducto}</div>
          {showCompraPrice && (
            <div className="precio info">
              <strong>Compra: </strong>
              C$ {info.compra}
            </div>
          )}
          <div className="precio-venta info">
            <strong>Venta: </strong>
            C$ {info.venta}
          </div>
          <div className="precio-promo info">
            <strong>Promocion:</strong>
            C$ {info.promo === null ? 0 : info.promo}
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
