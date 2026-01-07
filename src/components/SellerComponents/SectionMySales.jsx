import { Link } from "react-router-dom";
import { useState } from "react";
import useResizeClass from "../../hooks/UseResizeClass";

import ModalCreateSale from "./SectionMySales/ModalCreateSale";
import ModalConfirmSave from "./SectionMySales/ModalConfirmSave";
import PropTypes from "prop-types";

import TagIcon from "../../assets/MySalesIcons/TagIcon.svg";
import PendingIcon from "../../assets/MySalesIcons/PendingIcon.svg";
import CashIcon from "../../assets/MySalesIcons/CashIcon.svg";
import DeliverIcon from "../../assets/MySalesIcons/DeliveryIcon.svg";
import CheckIcon from "../../assets/MySalesIcons/CheckIcon.svg";
import FailIcon from "../../assets/MySalesIcons/FailIcon.svg";
import HistoryIcon from "../../assets/MySalesIcons/HistoryIcon.svg";
import AsignarIcono from "../../assets/MySalesIcons/AssignIcon.svg";

const SALES_OPTIONS = [
  {
    title: "Nueva venta",
    description: "Crear un nuevo registro de venta.",
    icon: TagIcon,
    count: 12,
    action: "create",
  },
  {
    title: "Ventas en tramite",
    description: "Vea las ventas pendientes por finalizar",
    icon: PendingIcon,
    count: 12,
    to: "ventas-pendientes",
  },
  {
    title: "Ventas por asignar",
    description: "Vea las ventas listas para dar al delivery",
    icon: AsignarIcono,
    count: 12,
    to: "ventas-por-asignar",
  },
  {
    title: "Ventas pagadas",
    description: "Vea las ventas que ya han sido pagadas",
    icon: CashIcon,
    count: 12,
    to: "ventas-pagadas",
  },
  {
    title: "Ventas en ruta",
    description: "Vea las ventas que ya estan en ruta de entrega",
    icon: DeliverIcon,
    count: 12,
    to: "ventas-en-ruta",
  },
  {
    title: "Ventas entregadas",
    description: "Vea las ventas entregadas con exito al cliente",
    icon: CheckIcon,
    count: 12,
    to: "ventas-entregadas",
  },
  {
    title: "Ventas rechazadas",
    description: "Revise el motivo de las ventas rechazadas",
    icon: FailIcon,
    count: 12,
    to: "ventas-rechazadas",
  },
  {
    title: "Ventas anteriores",
    description: "Vea las ventas anteriores realizadas por usted",
    icon: HistoryIcon,
    count: 12,
    to: "ventas-anteriores",
  },
];

const SalesOption = ({ title, description, icon, count, to, onClick }) => {
  const Wrapper = to ? Link : "div";

  return (
    <Wrapper to={to} onClick={onClick} className="link-option">
      <div className="head">
        <div className="icon">
          <img src={icon} alt={`Icono de ${title}`} />
        </div>
        <div className="length">{count}</div>
      </div>

      <div className="body">
        <h6>{title}</h6>
        <span>{description}</span>
      </div>
    </Wrapper>
  );
};

SalesOption.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

const SectionMySales = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [finalDataSend, setFinalDataSend] = useState({});
  const { ref: boxRef, sizeClass } = useResizeClass();

  const handleOptionClick = (action) => {
    if (action === "create") {
      setShowModal(true);
    }
  };

  return (
    <div className={`my-sales-container ${sizeClass}`} ref={boxRef}>
      {SALES_OPTIONS.map((option, index) => (
        <SalesOption
          key={index}
          {...option}
          onClick={
            option.action ? () => handleOptionClick(option.action) : undefined
          }
        />
      ))}

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
