import { Link } from "react-router-dom";
import ModalCreateSale from "./SectionMySales/ModalCreateSale";
import ModalConfirmSave from "./SectionMySales/ModalConfirmSave";
import TagIcon from "../../assets/MySalesIcons/TagIcon.svg";
import PendingIcon from "../../assets/MySalesIcons/PendingIcon.svg";
import CashIcon from "../../assets/MySalesIcons/CashIcon.svg";
import DeliverIcon from "../../assets/MySalesIcons/DeliveryIcon.svg";
import CheckIcon from "../../assets/MySalesIcons/CheckIcon.svg";
import FailIcon from "../../assets/MySalesIcons/FailIcon.svg";
import HistoryIcon from "../../assets/MySalesIcons/HistoryIcon.svg";
import AsignarIcono from "../../assets/MySalesIcons/AssignIcon.svg";
import { useState } from "react";
import useResizeClass from "../../hooks/UseResizeClass";

const SectionMySales = () => {
  // ?ESTADOS
  const [showModal, setShowModal] = useState(false);
  const [finalDataSend, setFinalDataSend] = useState({});
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const { ref: boxRef, sizeClass } = useResizeClass();

  return (
    <div className={`my-sales-container ${sizeClass}`} ref={boxRef}>
      <div className="link-option" onClick={() => setShowModal(true)}>
        <div className="head">
          <div className="icon">
            <img src={TagIcon} alt="Icono de nueva venta" />
          </div>
          <div className="length">12</div>
        </div>
        <div className="body">
          <h6>Nueva venta</h6>
          <span>Crear un nuevo registro de venta.</span>
        </div>
      </div>
      <Link to="ventas-pendientes" className="link-option">
        <div className="head">
          <div className="icon">
            <img src={PendingIcon} alt="icono de ventas en tramite" />
          </div>
          <div className="length">12</div>
        </div>
        <div className="body">
          <h6>Ventas en tramite</h6>
          <span>Vea las ventas pendientes por finalizar</span>
        </div>
      </Link>
      <Link to="ventas-por-asignar" className="link-option">
        <div className="head">
          <div className="icon">
            <img src={AsignarIcono} alt="Icono de ventas por asignar" />
          </div>
          <div className="length">12</div>
        </div>
        <div className="body">
          <h6>Ventas por asignar</h6>
          <span>Vea las ventas listas para dar al delivery</span>
        </div>
      </Link>
      <Link to="ventas-pagadas" className="link-option">
        <div className="head">
          <div className="icon">
            <img src={CashIcon} alt="Icono de ventas pagadas" />
          </div>
          <div className="length">12</div>
        </div>
        <div className="body">
          <h6>Ventas pagadas</h6>
          <span>Vea las ventas que ya han sido pagadas</span>
        </div>
      </Link>
      <Link to="ventas-en-ruta" className="link-option">
        <div className="head">
          <div className="icon">
            <img src={DeliverIcon} alt="Icono de ventas en ruta" />
          </div>
          <div className="length">12</div>
        </div>
        <div className="body">
          <h6>Ventas en ruta</h6>
          <span>Vea las ventas que ya estan en ruta de entrega</span>
        </div>
      </Link>
      <Link to="ventas-entregadas" className="link-option">
        <div className="head">
          <div className="icon">
            <img src={CheckIcon} alt="Icono de venta entregada" />
          </div>
          <div className="length">12</div>
        </div>
        <div className="body">
          <h6>Ventas entregadas</h6>
          <span>Vea las ventas entregadas con exito al cliente</span>
        </div>
      </Link>
      <Link to="ventas-rechazadas" className="link-option">
        <div className="head">
          <div className="icon">
            <img src={FailIcon} alt="Icono de venta rechazada" />
          </div>
          <div className="length">12</div>
        </div>
        <div className="body">
          <h6>Ventas rechazadas</h6>
          <span>Revise el motivo de las ventas rechazadas</span>
        </div>
      </Link>
      <Link to="ventas-anteriores" className="link-option">
        <div className="head">
          <div className="icon">
            <img src={HistoryIcon} alt="Icono de ventas anteriores" />
          </div>
          <div className="length">12</div>
        </div>
        <div className="body">
          <h6>Ventas anteriores</h6>
          <span>Vea las ventas anteriores realizadas por usted</span>
        </div>
      </Link>

      {showModal && (
        <ModalCreateSale
          setShowModal={setShowModal}
          setShowModalConfirm={setShowModalConfirm}
          setFinalDataSend={setFinalDataSend}
          onClose={() => setShowModal(false)}
        />
      )}
      {showModalConfirm && (
        <ModalConfirmSave
          setShowModal={setShowModal}
          setShowModalConfirm={setShowModalConfirm}
          finalDataSend={finalDataSend}
          setFinalDataSend={setFinalDataSend}
          onClose={() => setShowModal(false)}
          mode="create"
        />
      )}
    </div>
  );
};
export default SectionMySales;
