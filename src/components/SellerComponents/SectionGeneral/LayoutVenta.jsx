import CashIcon from "../../../assets/SalesDatailsIcons/CashIcon.svg";
import DeliveryIcon from "../../../assets/SalesDatailsIcons/DeliveryIcon.svg";
import DirectionIcon from "../../../assets/SalesDatailsIcons/DirectionIcon.svg";
import LocationIcon from "../../../assets/SalesDatailsIcons/LocationIcon.svg";
import ProductIcon from "../../../assets/SalesDatailsIcons/ProductIcon.svg";
import TimeIcon from "../../../assets/SalesDatailsIcons/TimeIcon.svg";

const LayoutVenta = ({ venta }) => {
  return (
    <div className="venta-container">
      <div className="venta">
        <div className="card-head">
          <div className="seller-data">
            <span className="role-name">Vendedor:</span>
            <span className="name">Dorian Reyes</span>
          </div>
          <span className="code">000145 </span>
        </div>
        <div className="card-body">
          <div className="content">
            <div className="group-item">
              <div className="item">
                <img src={ProductIcon} alt="" />
                <div className="desc">Perchero metálico dos pliegues</div>
              </div>
              <div className="item">
                <img src={DirectionIcon} alt="" />
                <div className="desc">
                  Antigua pepsi 3c al lago 1 y media abajo
                </div>
              </div>
            </div>
            <span className="line"></span>
            <div className="group-item">
              <div className="item">
                <img src={LocationIcon} alt="" />
                <a href="https://maps.app.goo.gl/Qh5KHjLCbkF88rXg8">
                  https://maps.app.goo.gl/Qh5KHjLCbkF88rXg8
                </a>
              </div>
              <div className="item">
                <img src={TimeIcon} alt="" />
                <div className="desc">Entrega 3:00PM</div>
              </div>
            </div>
            <span className="line"></span>
            <div className="group-item">
              <div className="item">
                <img src={DeliveryIcon} alt="" />
                <div className="desc">C$ 150</div>
              </div>
              <div className="item">
                <img src={CashIcon} alt="" />
                <div className="desc">C$ 150</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutVenta;
