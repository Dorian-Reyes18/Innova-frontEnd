import { useEffect, useState } from "react";
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
import warning from "../assets/memes/warning.svg";

// Registrar idioma español para datepicker
registerLocale("es", es);

// Validación del formulario
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
  const [confirmedSubmit, setConfirmedSubmit] = useState(false);
  const [isoDates, setIsoDates] = useState({
    startDateISO: "",
    endDateISO: "",
  });

  // Función para obtener ventas
  const getSalesByDateRange = async (startDateISO, endDateISO) => {
    await getSalesByUser(
      myUserId,
      startDateISO,
      endDateISO,
      setLoading,
      setSales
    );
  };

  // Función de envío del formulario
  const handleSubmit = (values) => {
    const startDateISO = values.startDate.toISOString();
    const endDateISO = values.endDate.toISOString();

    setConfirmedSubmit(true);
    setIsoDates({ startDateISO, endDateISO });
    getSalesByDateRange(startDateISO, endDateISO);
  };

  // Función compacta para mostrar el rango de fechas
  const formatDateRange = (startISO, endISO) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const start = new Date(startISO).toLocaleDateString("es-ES", options);
    const end = new Date(endISO).toLocaleDateString("es-ES", options);
    return `Ventas del ${start} al ${end}`;
  };

  useEffect(() => {
    if (sales.length > 0) {
      console.log("Ventas recibidas:", sales);
    }
  }, [sales]);

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
                {({ setFieldValue, values }) => (
                  <Form>
                    {confirmedSubmit && loading === false && (
                      <>
                        {sales.length > 0 && (
                          <div className=" head-dinamic">
                            <p style={{ width: 210 }}>
                              Dinero obtenido :{" "}
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
                      </>
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

                    <button
                      type="submit"
                      className="btn-out"
                      disabled={loading}
                    >
                      Buscar
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="content-render">
              {!confirmedSubmit && (
                <div className="contenido-inicial">
                  <img src={Aviso} alt="aviso" className="img-aviso" />
                </div>
              )}

              {confirmedSubmit && loading && (
                <div className="cargando">
                  <Spinner />
                </div>
              )}

              {confirmedSubmit && !loading && (
                <>
                  {sales.length > 0 ? (
                    <>
                      <p className="rango-fecha">
                        {formatDateRange(
                          isoDates.startDateISO,
                          isoDates.endDateISO
                        )}
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
