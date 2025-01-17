import ProductPlaceholder from "../../assets/ProductPlaceholder.svg";
const ProductoIndividual = () => {
  return (
    <div className="product">
      <div className="block">
        <div className="img-product">
          <img src={ProductPlaceholder} alt="imagen productos" />
        </div>
        <div className="block-info">
          <div className="nombre info">SmarthWatch</div>
          <div className="precio info">
            <strong>Compra: </strong>
            C$ 250
          </div>
          <div className="precio-venta info">
            <strong>Venta: </strong>
            C$ 250
          </div>
          <div className="precio-promo info">
            <strong>Promocion:</strong>
            C$ 250
          </div>
          <div className="cantidad info">25 disponibles</div>
        </div>
      </div>
    </div>
  );
};

export default ProductoIndividual;
