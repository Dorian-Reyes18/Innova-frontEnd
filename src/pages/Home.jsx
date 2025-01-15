import HelloMessageGeneral from "../components/homeComponents/HelloMessageGeneral";
import DeliveryLink from "../components/homeComponents/DeliveryLink";
import VentasLink from "../components/homeComponents/VentasLink";
import ProductosLink from "../components/homeComponents/ProductosLink";
import CierreLink from "../components/homeComponents/CierreLink";
import UsuariosLink from "../components/homeComponents/UsuariosLink";

const Home = () => {
  return (
    <div className="section-general">
      <HelloMessageGeneral />
      <div className="body-section">
        <DeliveryLink />
        <VentasLink />
        <ProductosLink />
        <UsuariosLink />
        <CierreLink />
      </div>
    </div>
  );
};

export default Home;
