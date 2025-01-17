import HeaderProductos from "../components/ProductosComponent/HeaderProductos";
import ProductoIndividual from "../components/ProductosComponent/ProductoIndividual";

const Productos = () => {
  return (
    <div className="section-general">
      <div className="body-global">
        <HeaderProductos />
        <ProductoIndividual />
      </div>
    </div>
  );
};

export default Productos;
