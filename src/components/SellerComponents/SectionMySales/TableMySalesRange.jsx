import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ModalEditSales from "./ModalEditSale";

const TableMySalesRange = ({ sales }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ordenar las ventas por fecha de creación primero la mas reciente y luego la mas antigua
  sales = sales.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
  // Función para formatear la fecha en formato dd-mm-yyyy
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const openModal = (sale) => {
    setSelectedSale(sale);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSale(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="tabla-de-resultados">
        <table className="table">
          <>
            {windowWidth < 767 ? null : (
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Creación</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Pago</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Telf/Cliente</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
            )}
          </>

          <>
            {windowWidth > 767 ? (
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{formatDate(sale.createdAt)}</td>
                    <td>{sale?.estadoVenta?.estado}</td>
                    <td>
                      C$ {sale?.pago_vendedor > 0 ? sale?.pago_vendedor : 0}{" "}
                    </td>
                    <td>{sale?.detalleCliente?.nombre}</td>
                    <td>{sale?.detalleCliente?.telefono}</td>
                    <td>
                      <span className="btn-out" onClick={() => openModal(sale)}>
                        Ver
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <>
                {sales.map((sale, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "tr-odd"}>
                    <span className="thead">
                      <th scope="row">Creación</th>
                      <th scope="row">Estado</th>
                      <th scope="row">Pago</th>
                      <th scope="row">Cliente</th>
                      <th scope="row">Telf/Cliente</th>
                      <th scope="row">Opciones</th>
                    </span>

                    <span className="body">
                      <td>{formatDate(sale.createdAt)}</td>
                      <td>{sale?.estadoVenta?.estado}</td>
                      <td>
                        C$ {sale?.pago_vendedor > 0 ? sale?.pago_vendedor : 0}
                      </td>
                      <td>{sale?.detalleCliente?.nombre}</td>
                      <td>{sale?.detalleCliente?.telefono}</td>
                      <td>
                        <span
                          className="btn-out"
                          onClick={() => openModal(sale)}
                        >
                          Ver
                        </span>
                      </td>
                    </span>
                  </tr>
                ))}
              </>
            )}
          </>
        </table>
      </div>
      {/* Modal visible si hay una venta seleccionada */}
      {showModal && selectedSale && (
        <ModalEditSales venta={selectedSale} onClose={closeModal} />
      )}
      <div className="total-ventas-abajo">
        {sales.length === 0 ? null : (
          <span>Total de ventas: {sales.length}</span>
        )}
      </div>
    </>
  );
};

TableMySalesRange.propTypes = {
  sales: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      estadoVenta: PropTypes.shape({
        estado: PropTypes.string,
      }),
      pago_vendedor: PropTypes.number,
      detalleCliente: PropTypes.shape({
        nombre: PropTypes.string,
        telefono: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default TableMySalesRange;
