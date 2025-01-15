import HelloMessageGeneral from "../components/homeComponents/HelloMessageGeneral";
import DeliveryLink from "../components/homeComponents/DeliveryLink";
import VentasLink from "../components/homeComponents/VentasLink";
import ProductosLink from "../components/homeComponents/ProductosLink";
import CierreLink from "../components/homeComponents/CierreLink";
import UsuariosLink from "../components/homeComponents/UsuariosLink";
import EntregasHistorialLink from "../components/homeComponents/EntregasHistorialLink";
import DeliveryAsignadas from "../components/homeComponents/DeliveryAsignadas";

const Home = () => {
  return (
    <div className="section-general">
      <HelloMessageGeneral />
      <div className="body-section">
        <DeliveryLink />
        <DeliveryAsignadas />
        <VentasLink />
        <ProductosLink />
        <UsuariosLink />
        <CierreLink />
        <EntregasHistorialLink />
      </div>
    </div>
  );
};

export default Home;
