import HeaderVentas from "../components/SellerComponents/HeaderVentas";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useState, useEffect } from "react";
import Spinner from "../components/Spiner";
import LayoutVenta from "../components/SellerComponents/LayoutVenta";
import {
  getCurrentWeekDateRange,
  getSalesByUser,
} from "../components/SellerComponents/SectionGeneral/utils";

const VentasPendientes = () => {
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
      const filteredSales = sales.filter(
        (sale) => sale?.estadoVenta?.estado === "En tramite"
      );
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
            <Link to="/panel-de-ventas" className="btn-pr">
              Volver a mis ventas
            </Link>
            <div className="container-content">
              <div className="content-tab">
                <div className="resultados-filtrados">
                  <span className="count-result">
                    Tienes {pendingSales.length} venta
                    {pendingSales.length > 1 ? "s" : ""} en tramite
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
                  Volver a mis ventas
                </Link>
                <span className="count-result">
                  No tienes ventas en tramite
                </span>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default VentasPendientes;
