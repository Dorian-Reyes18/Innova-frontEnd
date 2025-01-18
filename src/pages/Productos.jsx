import HeaderProductos from "../components/ProductosComponent/HeaderProductos";
import ProductoIndividual from "../components/ProductosComponent/ProductoIndividual";
import TodosLosProductos from "../components/ProductosComponent/TodosLosProductos";

const Productos = () => {
  return (
    <div className="section-general">
      <div className="body-global">
        <HeaderProductos />
        <TodosLosProductos />
      </div>
    </div>
  );
};

export default Productos;
