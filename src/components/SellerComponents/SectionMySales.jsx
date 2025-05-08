import { Link } from "react-router-dom";
import TagIcon from "../../assets/MySalesIcons/TagIcon.svg";
import PendingIcon from "../../assets/MySalesIcons/PendingIcon.svg";
import CashIcon from "../../assets/MySalesIcons/CashIcon.svg";
import DeliverIcon from "../../assets/MySalesIcons/DeliveryIcon.svg";
import CheckIcon from "../../assets/MySalesIcons/CheckIcon.svg";
import FailIcon from "../../assets/MySalesIcons/FailIcon.svg";
import HistoryIcon from "../../assets/MySalesIcons/HistoryIcon.svg";

const SectionMySales = () => {
  return (
    <div className="my-sales-container">
      <Link to="#" className="link-option">
        <img className="icon" src={TagIcon} alt="" />
        <div className="info">
          <h6>Nueva venta</h6>
          <span>Crear un nuevo registro de venta.</span>
        </div>
      </Link>
      <Link to="ventas-pendientes" className="link-option">
        <img className="icon" src={PendingIcon} alt="" />
        <div className="info">
          <h6>Ventas en trámite</h6>
          <span>Vea las ventas pendientes por finalizar.</span>
        </div>
      </Link>
      <Link to="ventas-pagadas" className="link-option">
        <img className="icon" src={CashIcon} alt="" />
        <div className="info">
          <h6>Ventas pagadas</h6>
          <span>Vea las ventas que ya han sido pagadas.</span>
        </div>
      </Link>
      <Link to="ventas-en-ruta" className="link-option">
        <img className="icon" src={DeliverIcon} alt="" />
        <div className="info">
          <h6>Ventas en ruta</h6>
          <span>Vea las ventas que ya están en ruta de entrega.</span>
        </div>
      </Link>
      <Link to="ventas-entregadas" className="link-option">
        <img className="icon" src={CheckIcon} alt="" />
        <div className="info">
          <h6>Ventas entregadas </h6>
          <span>Vea todas las ventas entregadas esta semana.</span>
        </div>
      </Link>
      <Link to="ventas-rechazadas" className="link-option">
        <img className="icon" src={FailIcon} alt="" />
        <div className="info">
          <h6>Ventas rechazadas</h6>
          <span>Vea todas las ventas caídas en esta semana.</span>
        </div>
      </Link>
      <Link to="ventas-anteriores" className="link-option">
        <img className="icon" src={HistoryIcon} alt="" />
        <div className="info">
          <h6>Ventas anteriores </h6>
          <span>Ventas por semanas anteriores.</span>
        </div>
      </Link>
    </div>
  );
};
export default SectionMySales;
