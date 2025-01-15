import HelloMessageGeneral from "../components/homeComponents/HelloMessageGeneral";
import DeliveryLink from "../components/homeComponents/DeliveryLink";
import VentasLink from "../components/homeComponents/VentasLink";

const Home = () => {
  return (
    <div className="section-general">
      <HelloMessageGeneral />
      <div className="body-section">
        <DeliveryLink />
        <VentasLink />
      </div>
    </div>
  );
};

export default Home;
