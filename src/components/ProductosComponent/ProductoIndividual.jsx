import ProductPlaceholder from "../../assets/ProductPlaceholder.svg";
import PropTypes from "prop-types";
import { useUser } from "../../context/userContext";

const ProductoIndividual = ({ producto }) => {
  const { user } = useUser();
  const myUser = user.user.data;

  const info = {
    img: producto?.imagen == null ? ProductPlaceholder : producto.imagen[0].url,
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
            {info.promo}
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
    </div>
  );
};

ProductoIndividual.propTypes = {
  producto: PropTypes.shape({
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
