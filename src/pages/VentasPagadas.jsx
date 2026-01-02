import HeaderVentas from "../components/SellerComponents/HeaderVentas";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import Spinner from "../components/Spiner";
import LayoutVenta from "../components/SellerComponents/LayoutVenta";
import {
  getCurrentWeekDateRange,
  getSalesByUser,
} from "../components/SellerComponents/SectionGeneral/utils";
import SeñorBurns from "../assets/memes/señor-burns.jpg";

const VentasPagadas = () => {
  const { user } = useUser();
  const myUserId = user?.user?.data?.id;

  const { startDate, endDate } = getCurrentWeekDateRange();

  const [pendingSales, setPendingSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!myUserId) return;
      await getSalesByUser(myUserId, startDate, endDate, setLoading, setSales);
    };

    fetchData();
  }, [myUserId, loading]);

  // Filtrado de ventas en trámite
  useEffect(() => {
    if (sales.length > 0) {
      const filteredSales = sales.filter((sale) => sale?.pago_vendedor > 0);
      setPendingSales(filteredSales);
    }

    // Fin del proceso de carga (aunque sea 0 resultados, ya procesamos todo)
    setLoading(false);
  }, [sales]);

  return (
    <>
      <HeaderVentas />

      <div className="container-general-ventas">
        {loading ? (
          <Spinner />
        ) : !loading && pendingSales.length > 0 ? (
          <>
            <div className="head-pagada">
              <span className="total">
                Total pagado:{" "}
                <strong className="dinero">
                  C$
                  {pendingSales.reduce(
                    (total, sale) => total + sale.pago_vendedor,
                    0
                  )}
                </strong>
              </span>
              <span className="total">
                Ventas pagadas: {""} <strong>{pendingSales.length}</strong>{" "}
              </span>
              <span className="volver">
                <Link to="/panel-de-ventas">Volver al panel</Link>
              </span>
            </div>
            <div className="container-content">
              <div className="content-tab">
                <div className="resultados-filtrados">
                  <span className="count-result">
                    {pendingSales.length} resultado
                    {pendingSales.length > 1 ? "s" : ""} encontrado{" "}
                    {pendingSales.length > 1 ? "s" : ""}
                  </span>
                  <div className="results">
                    {pendingSales.map((sale) => (
                      <LayoutVenta venta={sale} key={sale.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {!loading && pendingSales.length === 0 && (
              <>
                <Link to="/panel-de-ventas" className="btn-pr">
                  Volver al panel
                </Link>
                <div className="container-content">
                  <div className="content-tab" style={{ textAlign: "center" }}>
                    <span className="count-result error-message">
                      No le han pagado ninguna venta
                    </span>
                    <img src={SeñorBurns} alt="" style={{ width: "180px" }} />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VentasPagadas;
