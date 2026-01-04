// SectionGeneral.jsx
import { useState, useEffect } from "react";
import { getCurrentWeekDateRange, fetchSales } from "./SectionGeneral/utils";
import SalesBaseFilter from "./SectionGeneral/SalesBaseFilter";
import Spinner from "../Spiner";
import NoResults from "./NoResults";

const SectionGeneral = () => {
  // Estados
  const [loadingSales, setLoadingSales] = useState(true);
  const [sales, setSales] = useState([]);
  const [salesGroup, setSalesGroup] = useState([
    { name: "En tramite", sales: [] },
    { name: "Por asignar", sales: [] },
    { name: "Asignadas", sales: [] },
    { name: "En ruta", sales: [] },
    { name: "Entregada", sales: [] },
    { name: "Rechazada", sales: [] },
  ]);
  const [reAmount, setReAmount] = useState(0);

  // Efecto: fetch de ventas
  useEffect(() => {
    const { startDate, endDate } = getCurrentWeekDateRange();
    setLoadingSales(true);

    // fetchSales maneja setSales y setLoadingSales internamente
    fetchSales(startDate, endDate, setLoadingSales, setSales);
  }, [reAmount]); // si reAmount cambia, volvemos a fetch

  // Efecto: agrupar ventas por estado
  useEffect(() => {
    if (!sales || sales.length === 0) {
      // no hay ventas, mantener los grupos vacíos
      setSalesGroup((prevGroup) => prevGroup);
      return;
    }

    // Ordenar por fecha descendente
    const sortedSales = [...sales].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Agrupar ventas por estado
    const initialGroups = [
      { name: "En tramite", sales: [] },
      { name: "Por asignar", sales: [] },
      { name: "Asignadas", sales: [] },
      { name: "En ruta", sales: [] },
      { name: "Entregada", sales: [] },
      { name: "Rechazada", sales: [] },
    ];

    const groupedSales = sortedSales.reduce((acc, sale) => {
      const saleStatus = sale.estadoVenta.estado;
      const group = acc.find((g) => g.name === saleStatus);
      if (group) {
        group.sales.push(sale);
      } else {
        acc.push({ name: saleStatus, sales: [sale] });
      }
      return acc;
    }, initialGroups);

    setSalesGroup(groupedSales);
  }, [sales]);

  return (
    <div className="section-general">
      {loadingSales ? (
        <Spinner />
      ) : (
        <div>
          {sales.length === 0 ? (
            <NoResults
              message="No hay ventas registradas en esta semana"
              submessage="Pidele a los vendedores que hagan ventas"
            />
          ) : (
            <SalesBaseFilter
              sales={sales}
              salesGroup={salesGroup}
              setReAmount={setReAmount} // cuando cambie, refresca
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SectionGeneral;
