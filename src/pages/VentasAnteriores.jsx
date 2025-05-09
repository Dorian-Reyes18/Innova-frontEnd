import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import HeaderVentas from "../components/SellerComponents/HeaderVentas";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { getSalesByUser } from "../components/SellerComponents/SectionGeneral/utils";
import TableMySalesRange from "../components/SellerComponents/SectionMySales/TableMySalesRange";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Spinner from "../components/Spiner";
import Aviso from "../assets/memes/Aviso.svg";
import AvisoMobile from "../assets/memes/AvisoMobile.svg";
import warning from "../assets/memes/warning.svg";

registerLocale("es", es);

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
  const { user } = useUser();
  const myUserId = user?.user?.data?.id;
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleSubmit = async (values) => {
    const startISO = values.startDate.toISOString();
    const endISO = values.endDate.toISOString();

    setConfirmed(true);
    setDateRange({ start: values.startDate, end: values.endDate });
    await getSalesByUser(myUserId, startISO, endISO, setLoading, setSales);
  };

  const handleReset = (resetForm) => {
    resetForm();
    setSales([]);
    setConfirmed(false);
    setDateRange({ start: null, end: null });
    setLoading(false);
  };

  const formatDateRange = (start, end) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return `Ventas del ${start.toLocaleDateString(
      "es-ES",
      options
    )} al ${end.toLocaleDateString("es-ES", options)}`;
  };

  return (
    <>
      <HeaderVentas style={{ marginBottom: "0" }} />
      <div className="container-general-ventas" style={{ marginBottom: "0" }}>
        <div className="block-history">
          <div className="title-history">
            Mis ventas anteriores
            <Link to="/panel-de-ventas" className="volver">
              Volver
            </Link>
          </div>

          <div className="contens">
            <div className="date-picker-form">
              <Formik
                initialValues={{ startDate: null, endDate: null }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values, resetForm }) => (
                  <Form>
                    {confirmed && !loading && sales.length > 0 && (
                      <div className="head-dinamic">
                        <p>
                          Total:{" "}
                          <span className="dinero">
                            C$
                            {sales.reduce(
                              (acc, sale) => acc + sale?.pago_vendedor,
                              0
                            )}
                          </span>
                        </p>
                      </div>
                    )}

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
                          locale="es"
                          onFocus={(e) => e.target.blur()}
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
                          onFocus={(e) => e.target.blur()}
                        />
                        <ErrorMessage
                          name="endDate"
                          component="div"
                          className="error-message"
                        />
                      </div>
                    </div>

                    <div
                      className="buttons"
                      style={{ display: "flex", gap: "10px" }}
                    >
                      <button
                        type="button"
                        className="btn-out"
                        onClick={() => handleReset(resetForm)}
                        disabled={loading}
                      >
                        Limpiar
                      </button>
                      <button
                        type="submit"
                        className="btn-out"
                        disabled={loading}
                      >
                        Buscar
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="content-render">
              {!confirmed && (
                <div className="contenido-inicial">
                  <img src={Aviso} alt="aviso" className="img-aviso" />
                  <img
                    src={AvisoMobile}
                    alt="aviso"
                    className="img-aviso-mobile"
                  />
                </div>
              )}

              {confirmed && loading && (
                <div className="cargando">
                  <Spinner />
                </div>
              )}

              {confirmed && !loading && (
                <>
                  {sales.length > 0 ? (
                    <>
                      <p className="rango-fecha">
                        {formatDateRange(dateRange.start, dateRange.end)}
                      </p>
                      <TableMySalesRange sales={sales} />
                    </>
                  ) : (
                    <p className="cargando">
                      No se encontraron ventas en la fecha seleccionada.
                      <span style={{ margin: "25px" }}>
                        <img src={warning} alt="" style={{ width: "130px" }} />
                      </span>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VentasAnteriores;
