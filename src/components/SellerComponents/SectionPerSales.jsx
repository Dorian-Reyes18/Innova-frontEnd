// * Importaciones
import { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { getCurrentWeekDateRange, fetchSales } from "./SectionGeneral/utils";
import LayoutVenta from "./LayoutVenta";
import Spinner from "../Spiner";
import NoResults from "./NoResults";

const SectionPerSales = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingSales, setLoadingSales] = useState(true);
  const [sales, setSales] = useState([]);
  const [salesFiltered, setSalesFiltered] = useState([]);

  // * Funciones
  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const filtrarPorVendedor = (sales, selectedUser) => {
    const filtradosArray = sales.filter((sale) => {
      return sale?.vendedor_asociado?.nombreApellido === selectedUser;
    });

    setSalesFiltered(filtradosArray);
  };

  // * Funciones de fetch
  // TODO: Obtenemos los usuarios
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("users?populate=*");
      const filteredUsers = response.data.filter(
        (user) => user.role.name !== "Delivery"
      ); // Filtramos aquellos usuarios que no tengan el rol de delivery
      setUsuarios(filteredUsers);

      if (filteredUsers.length > 0 && filteredUsers[0]?.nombreApellido) {
        setSelectedUser(filteredUsers[0].nombreApellido);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // * Efectos
  // TODO: Obtenemos todas las ventas de la semana actual
  useEffect(() => {
    const { startDate, endDate } = getCurrentWeekDateRange();
    fetchUsers();
    fetchSales(startDate, endDate, setLoadingSales, setSales); // Obtenemos las ventas de la semana actual
  }, []);

  useEffect(() => {
    if (sales.length > 0 && selectedUser !== null) {
      filtrarPorVendedor(sales, selectedUser);
    }
  }, [selectedUser, sales]);

  return (
    <>
      {loadingSales ? (
        <Spinner />
      ) : (
        <>
          <div className="selector-vendedor">
            <label htmlFor="users">Seleccione vendedor</label>
            <select
              className="select"
              id="users"
              name="users"
              value={selectedUser || ""}
              onChange={(e) => handleChange(e)}
            >
              {usuarios.map((user) => (
                <option key={user.id} value={user?.nombreApellido}>
                  {user.nombreApellido}
                </option>
              ))}
            </select>
          </div>

          <div className="resultados-filtrados">
            {salesFiltered.length > 0 ? (
              <>
                <span className="count-result">
                  {salesFiltered.length}{" "}
                  {salesFiltered.length === 1 ? "resultado" : "resultados"} para{" "}
                  {selectedUser}
                </span>

                <div className="results">
                  {salesFiltered.map((sale) => (
                    <LayoutVenta key={sale.id} venta={sale}></LayoutVenta>
                  ))}
                </div>
              </>
            ) : (
              <>
                <span className="count-result">0 resultados</span>

                <NoResults
                  message={`No hay ventas registradas para ${selectedUser}.`}
                  submessage={`Pide a ${selectedUser} que registre una venta.`}
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SectionPerSales;
