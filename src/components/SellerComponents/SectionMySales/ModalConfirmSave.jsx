import PropTypes from "prop-types";
import axiosInstance from "../../../axios";
import { useState } from "react";
import Spinner from "../../Spiner";
import { useNavigate } from "react-router-dom";
import IconSuccess from "../../../assets/IconSuccess.svg";
import IconErrorFetch from "../../../assets/IconErrorFetch.svg";

function ModalConfirmSave({
  setShowModal, // Propiedad para actualizar la visibilidad del modal principal
  setShowModalConfirm, // Propiedad para actualizar la visibilidad del modal de confirmación
  finalDataSend, // Datos a enviar en el modal de confirmación
  onClose,
  saleId,
  mode,
  setReAmount,
}) {
  // ?DESTRUCTURACION

  // ?HOOKS
  const [loading, setLoading] = useState(false);
  const [renderingState, setrenderingState] = useState(0);
  const [status, setStatus] = useState("");

  // ?DATA

  // ?VARIABLES
  const navigate = useNavigate();

  // ?FUNCIONES
  const postSale = async () => {
    setLoading(true);
    setrenderingState(1);
    try {
      const response = await axiosInstance.post("/ventas", finalDataSend);
      if (response.status === 200 || response.status === 201) {
        setStatus(response.status);
        setrenderingState(2);
      }
    } catch (error) {
      setrenderingState(2);
      console.error("Error al crear la venta:", error);
      setStatus(error.response?.status || 500);
    } finally {
      setLoading(false);
    }
  };

  const putSale = async (id) => {
    setLoading(true);
    setrenderingState(1);

    try {
      const response = await axiosInstance.put(`/ventas/${id}`, finalDataSend);

      if (response.status === 200) {
        setStatus(response.status);
        setrenderingState(2);
        setLoading(false);
      }
    } catch (error) {
      setrenderingState(2);
      console.error("Error al actualizar la venta:", error);
      setStatus(error.response.status || 500);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const clearState = () => {
    setrenderingState(0);
    setStatus("");
    setLoading(false);
    setShowModalConfirm(false);
    setShowModal(false);
    // Solo llamar si existe
    if (setReAmount && typeof setReAmount === "function") {
      setReAmount((prev) => prev + 1);
    }
  };

  // ?LOGS
  //   console.log("Modal de confirmación abierto");
  //   console.log("Id de venta:", saleId);

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal modal-confirm">
          {renderingState === 0 && !loading ? (
            <>
              {/* <button className="modal-close" type="button" onClick={onClose}>
            <img src={SalirIcon} alt="Icono de Salir" />
          </button> */}
              <h5 className="title-confirm">
                {/* 1 significa crear venta, 2 significa edicion de venta */}
                {mode == "create" ? "Crear venta" : "Guardar edición"}
              </h5>
              <span className="body-text" style={{ width: "100%" }}>
                {mode == "create"
                  ? "¿Está seguro que desea crear la venta?"
                  : "¿Está seguro que desea guardar los cambios realizados en la venta?"}
              </span>
              <div
                className="footer"
                style={{ width: "100%", justifyContent: "end" }}
              >
                <div className="actions-group">
                  <div className="btn-out" onClick={onClose}>
                    No
                  </div>
                  <button
                    type="button"
                    className="btn-pr"
                    onClick={() => {
                      mode == "create" ? postSale() : putSale(saleId);
                    }}
                  >
                    Si
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {loading && renderingState === 1 ? (
                <Spinner />
              ) : (
                <>
                  {renderingState === 2 && (
                    <>
                      <h5 className="title-confirm">
                        {status == 200 || status == 201 ? (
                          <img src={IconSuccess} alt="Icono de exito" />
                        ) : (
                          <img src={IconErrorFetch} alt="Icono de error" />
                        )}

                        {status === 200 || status === 201
                          ? "Operación exitosa"
                          : "Error en la operación"}
                      </h5>
                      <span className="body-text" style={{ width: "100%" }}>
                        {status != 200 && status != 201 ? (
                          "Error al realizar la operación. ocurrio un error inesperado, por favor intente nuevamente mas tarde"
                        ) : (
                          <>
                            {mode == "create"
                              ? "La venta se ha creado exitosamente"
                              : "Los cambios se aplicaron correctamente"}
                          </>
                        )}
                      </span>
                      <div
                        className="footer"
                        style={{ width: "100%", justifyContent: "end" }}
                      >
                        <div className="actions-group">
                          <button
                            type="button"
                            className="btn-scc"
                            onClick={() => {
                              clearState();
                              navigate("/panel-de-ventas");
                            }}
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

ModalConfirmSave.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showModalConfirm: PropTypes.bool.isRequired,
  setShowModalConfirm: PropTypes.func.isRequired,
  finalDataSend: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  saleId: PropTypes.number.isRequired,
  children: PropTypes.number.isRequired,
  setReAmount: PropTypes.func.isRequired,
  mode: PropTypes.string,
};

export default ModalConfirmSave;
