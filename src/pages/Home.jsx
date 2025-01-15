import HelloMessageGeneral from "../components/homeComponents/HelloMessageGeneral";
import DeliveryLink from "../components/homeComponents/DeliveryLink";

const Home = () => {
  return (
    <div className="section-general">
      <HelloMessageGeneral />
      <div className="body-section">
        <DeliveryLink />
      </div>
    </div>
  );
};

export default Home;
