const TableMySalesRange = ({ sales }) => {
  // ordenar las ventas por fecha de creación primero la mas reciente y luego la mas antigua
  sales = sales.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
  // Función para formatear la fecha en formato dd-mm-yyyy
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="tabla-de-resultados">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Creación</th>
            <th scope="col">Estado</th>
            <th scope="col">Pago</th>
            <th scope="col">Cliente</th>
            <th scope="col">Telf/Cliente</th>

            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{formatDate(sale.createdAt)}</td>
              <td>{sale?.estadoVenta?.estado}</td>
              <td>C$ {sale?.pago_vendedor > 0 ? sale?.pago_vendedor : 0} </td>
              <td>{sale?.detalleCliente?.nombre}</td>
              <td>{sale?.detalleCliente?.telefono}</td>
              <td>Editar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMySalesRange;
