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
import VentasFallidasImg from "../assets/memes/VentasFallidas.png";

import UseResizeClass from "../hooks/UseResizeClass";

const VentasFallidas = () => {
  const { user } = useUser();
  const myUserId = user?.user?.data?.id;

  const { startDate, endDate } = getCurrentWeekDateRange();

  const [pendingSales, setPendingSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);

  const { ref: boxRef, sizeClass } = UseResizeClass();

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
        (sale) => sale?.estadoVenta?.estado === "Rechazada"
      );
      setPendingSales(filteredSales);
    }

    // Fin del proceso de carga (aunque sea 0 resultados, ya procesamos todo)
    setLoading(false);
  }, [sales]);

  return (
    <>
      <HeaderVentas />

      <div className="container-general-ventas" ref={boxRef}>
        {loading ? (
          <Spinner />
        ) : !loading && pendingSales.length > 0 ? (
          <>
            <Link to="/panel-de-ventas" className="btn-return">
              Volver al panel
            </Link>
            <div className="container-content">
              <div className="content-tab">
                <div className="resultados-filtrados">
                  <div>
                    <span className="count-result">
                      Tienes {pendingSales.length} venta
                      {pendingSales.length > 1 ? "s" : ""} rechazada
                      {pendingSales.length > 1 ? "s" : ""}
                      <br />
                      <span
                        style={{
                          fontFamily: "montserrat-regular",
                          marginTop: "10px",
                          fontSize: "14px",
                        }}
                      >
                        Revisa por que motivo tu venta fue rechazada en el panel
                        y vuelve moverla de estado
                      </span>
                    </span>
                  </div>
                  <div className={`results ${sizeClass}`}>
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
                <Link to="/panel-de-ventas" className="btn-return">
                  Volver al panel
                </Link>
                <div className="container-content">
                  <div className="content-tab" style={{ textAlign: "center" }}>
                    <span className="count-result error-message">
                      No hay ventas caídas o rechazadas
                    </span>
                    <img
                      src={VentasFallidasImg}
                      alt=""
                      style={{ width: "250px" }}
                    />
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

export default VentasFallidas;
