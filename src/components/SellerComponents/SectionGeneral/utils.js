// Aca creamos las funciones que se van a usar en el componente SectionGeneral
// En este caso, la funcion getCurrentWeekDateRange() nos devuelve un objeto con la fecha de inicio y fin de la semana actual
// La funcion fetchSales() se encarga de hacer la peticion a la API para obtener las ventas de la semana actual
// La funcion getSalesByUser() obtiene las ventas filtradas por un usuario específico, en un rango de fechas, a través de una ruta personalizada
// Ambas funciones se exportan para poder ser usadas en el componente SectionGeneral
// Dentro de las funciones se hace la peticion a la API con axiosInstance.get() y se le pasa la url con los filtros de fecha
// Luego se setean las ventas con setSales() y se maneja el estado de carga con setLoadingSales()
// Por ultimo, se exportan las funciones para poder ser usadas en el componente SectionGeneral

import axiosInstance from "../../../axios";

export const getCurrentWeekDateRange = () => {
  const hoy = new Date();

  // Día de la semana (0 = domingo)
  const day = hoy.getDay();

  // Crear fecha del domingo (primer día de la semana)
  const primerDiaSemana = new Date(hoy);
  primerDiaSemana.setDate(hoy.getDate() - day);
  primerDiaSemana.setHours(0, 0, 0, 0); // inicio del domingo en hora local

  // Último día (sábado)
  const ultimoDiaSemana = new Date(primerDiaSemana);
  ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);
  ultimoDiaSemana.setHours(23, 59, 59, 999); // fin del sábado en hora local

  return {
    startDate: primerDiaSemana.toISOString(),
    endDate: ultimoDiaSemana.toISOString(),
  };
};

export const fetchSales = async (
  startDate,
  endDate,
  setLoadingSales,
  setSales
) => {
  setLoadingSales(true);
  try {
    const response = await axiosInstance.get(
      `/ventas?filters[createdAt][$gte]=${startDate}&filters[createdAt][$lte]=${endDate}&populate[vendedor_asociado][populate]=role&populate[detalleCliente]=*&populate[estadoVenta]=*&populate[detalleDeVenta][populate]=producto_asociado`
    );
    setSales(response.data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingSales(false);
  }
};

// Nueva función: getSalesByUser
// Esta función obtiene las ventas asociadas a un usuario específico usando su ID como parámetro de la ruta
// También filtra por fechas usando query params y realiza un populate completo como en fetchSales
export const getSalesByUser = async (
  userId,
  startDate,
  endDate,
  setLoadingSales,
  setSales
) => {
  setLoadingSales(true);
  try {
    const response = await axiosInstance.get(
      `ventas?filters[vendedor_asociado]=${userId}&filters[createdAt][$gte]=${startDate}&filters[createdAt][$lte]=${endDate}&populate[vendedor_asociado][populate]=role&populate[detalleCliente]=*&populate[estadoVenta]=*&populate[detalleDeVenta][populate]=producto_asociado`
    );
    setSales(response?.data?.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingSales(false);
  }
};
