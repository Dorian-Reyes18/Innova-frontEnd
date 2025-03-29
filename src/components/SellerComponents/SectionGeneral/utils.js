// Aca creamos las funciones que se van a usar en el componente SectionGeneral
// En este caso, la funcion getCurrentWeekDateRange() nos devuelve un objeto con la fecha de inicio y fin de la semana actual
// La funcion fetchSales() se encarga de hacer la peticion a la API para obtener las ventas de la semana actual
// Ambas funciones se exportan para poder ser usadas en el componente SectionGeneral
// La funcion fetchSales() recibe como parametros la fecha de inicio y fin de la semana actual, el estado de carga de las ventas, y la funcion para setear las ventas
// Dentro de la funcion se hace la peticion a la API con axiosInstance.get() y se le pasa la url con los filtros de fecha
// Luego se setean las ventas con setSales() y se maneja el estado de carga con setLoadingSales()
// Por ultimo, se exportan las funciones para poder ser usadas en el componente SectionGeneral

import axiosInstance from "../../../axios";

export const getCurrentWeekDateRange = () => {
  const hoy = new Date();
  const primerDiaSemana = new Date(hoy);
  primerDiaSemana.setDate(hoy.getDate() - hoy.getDay());

  const ultimoDiaSemana = new Date(primerDiaSemana);
  ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);

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
      `/ventas?filters[createdAt][$gte]=${startDate}&filters[createdAt][$lte]=${endDate}&populate=*`
    );
    setSales(response.data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingSales(false);
  }
};
