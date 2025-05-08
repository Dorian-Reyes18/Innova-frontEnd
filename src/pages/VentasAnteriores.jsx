import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import HeaderVentas from "../components/SellerComponents/HeaderVentas";
import { Link } from "react-router-dom";

// Importando el locale de español
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // Importamos el locale de español

// Registro del locale de español
registerLocale("es", es);

// Validación con Yup
const validationSchema = Yup.object().shape({
  startDate: Yup.date().required("Fecha inicial requerida"),
  endDate: Yup.date()
    .required("Fecha final requerida")
    .min(
      Yup.ref("startDate"),
      "La fecha final no puede ser menor a la inicial"
    ),
});

const VentasAnteriores = () => {
  const [isoDates, setIsoDates] = useState({
    startDateISO: "",
    endDateISO: "",
  });

  const handleSubmit = (values) => {
    const startDateISO = values.startDate.toISOString();
    const endDateISO = values.endDate.toISOString();

    // Guardamos en el estado local (opcional)
    setIsoDates({ startDateISO, endDateISO });

    // 🔥 Aquí iría tu fetch
    console.log("Listo para hacer el fetch con:", { startDateISO, endDateISO });
  };

  return (
    <>
      <HeaderVentas style={{ marginBottom: "0" }} />
      <div className="container-general-ventas" style={{ marginBottom: "0" }}>
        <div className="block-history">
          <div className="title-history">
            Historial de ventas
            <Link to="/panel-de-ventas" className="volver ">
              Volver
            </Link>
          </div>
          <div className="contens">
            <div className="date-picker-form">
              <Formik
                initialValues={{
                  startDate: null,
                  endDate: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values }) => (
                  <Form>
                    <div className="body">
                      <div className="form-group">
                        <label>Fecha inicial:</label>
                        <DatePicker
                          selected={values.startDate}
                          onChange={(date) => setFieldValue("startDate", date)}
                          selectsStart
                          startDate={values.startDate}
                          endDate={values.endDate}
                          dateFormat="dd-MM-yyyy"
                          placeholderText="Seleccione fecha inicial"
                          locale="es" // Usar español
                        />
                        <ErrorMessage
                          name="startDate"
                          component="div"
                          className="error-message"
                        />
                      </div>

                      <div className="form-group">
                        <label>Fecha final:</label>
                        <DatePicker
                          selected={values.endDate}
                          onChange={(date) => setFieldValue("endDate", date)}
                          selectsEnd
                          startDate={values.startDate}
                          endDate={values.endDate}
                          minDate={values.startDate}
                          dateFormat="dd-MM-yyyy"
                          placeholderText="Seleccione fecha final"
                          locale="es"
                        />
                        <ErrorMessage
                          name="endDate"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-pr">
                      Buscar ventas
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Mostramos el ISO si existe */}
              {isoDates.startDateISO && (
                <div className="result">
                  <p>
                    Fecha inicial ISO: <strong>{isoDates.startDateISO}</strong>
                  </p>
                  <p>
                    Fecha final ISO: <strong>{isoDates.endDateISO}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VentasAnteriores;
