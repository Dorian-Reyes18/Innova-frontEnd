// importaciones
import { useState, useEffect } from "react";
import { getCurrentWeekDateRange, fetchSales } from "./SectionGeneral/utils";
import Spinner from "../Spiner";

// Componente
const SectionGeneral = () => {
  // Estados
  const [loadingSales, setLoadingSales] = useState(true);
  const [dateRange, setDateRange] = useState(getCurrentWeekDateRange());
  const [sales, setSales] = useState([]);
  const [salesGroup, setSalesGroup] = useState([
    { name: "En tramite", sales: [] },
    { name: "Por asignar", sales: [] },
    { name: "Asignadas", sales: [] },
    { name: "En ruta", sales: [] },
    { name: "Entregadas", sales: [] },
    { name: "Rechazada", sales: [] },
  ]);

  // Efectos
  useEffect(() => {
    const { startDate, endDate } = getCurrentWeekDateRange();
    setDateRange({ startDate, endDate });
    fetchSales(startDate, endDate, setLoadingSales, setSales);
  }, []);

  // Clasificar las ventas en los grupos correspondientes
  useEffect(() => {
    if (sales.length > 0) {
      const groupedSales = sales.reduce((acc, sale) => {
        const saleStatus = sale.estadoVenta.estado;
        const group = acc.find((group) => group.name === saleStatus);

        if (group) {
          group.sales.push(sale);
        } else {
          acc.push({ name: saleStatus, sales: [sale] });
        }

        return acc;
      }, []);

      const allGroupsWithSales = salesGroup.map((group) => {
        const matchedGroup = groupedSales.find((g) => g.name === group.name);
        return matchedGroup ? matchedGroup : group;
      });

      setSalesGroup(allGroupsWithSales);
    } else {
      setSalesGroup((prevGroup) => prevGroup);
    }
  }, [sales]);

  return (
    <div className="section-general">
      {loadingSales ? (
        <Spinner />
      ) : (
        <div>
          {sales.length === 0 ? (
            <span className="warning-message">
              Los vendedores no han realizado ventas esta semana
            </span>
          ) : null}

          {salesGroup.map((group) => (
            <div key={group.name}>
              <h3>{group.name}</h3>
              {group.sales.length > 0 ? (
                <span>
                  <p>Total de ventas: {group.sales.length}</p>
                </span>
              ) : (
                <p>No hay ventas en este estado</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionGeneral;
