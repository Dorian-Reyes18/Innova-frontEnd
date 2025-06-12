import PropTypes from "prop-types";
import SalirIcon from "/src/assets/SalirIcon.svg";
import CarritoIcon2 from "/src/assets/CarritoIcon2.svg";

const ModalEditSale = ({ onClose, venta }) => {
  console.log(venta);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="heading-modal">
          <div className="tile-container">
            <img src={CarritoIcon2} alt="Icono de Carrito" className="icon" />
            <div className="tile">
              <h3>Información de Venta</h3>
              <span>Código: {venta.codigoVenta || "No disponible"}</span>
            </div>
          </div>
          <div className="aviso">
            Está visualizando el detalle de venta, ninguno de los campos
            mostrados es editable
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>
          <img src={SalirIcon} alt="Icono de Salir" />
        </button>
        <div className="block">
          <h5 className="title">Información del cliente</h5>
          <div className="fila">
            <div className="group-el">
              <span className="label">Nombre del cliente</span>
              <span className="value">
                {venta.detalleCliente?.nombre || "No disponible"}
              </span>
            </div>
            <div className="group-el">
              <span className="label">Teléfono</span>
              <span className="value">
                {venta.detalleCliente?.telefono || "No disponible"}
              </span>
            </div>
          </div>
          <div className="fila">
            <div className="group-el">
              <span className="label">Ubicación</span>
              <a className="value">
                {venta.detalleCliente?.direccionGps || "No disponible"}
              </a>
            </div>
          </div>
          <div className="fila">
            <div className="group-el">
              <span className="label">Dirección</span>
              <span className="value">
                {venta.detalleCliente?.direccion || "No disponible"}
              </span>
            </div>
          </div>
        </div>
        <div className="block">
          <h5 className="title">Información de productos</h5>
          <div className="productos">
            {venta?.detalleDeVenta.map((producto, i) => {
              return (
                <>
                  <h6>Producto {i + 1}</h6>
                  <div className="fila">
                    <div className="group-el">
                      <span className="label">Nombre del producto</span>
                      <span className="value">
                        {producto?.producto_asociado?.nombreProducto ||
                          "No definido"}
                      </span>
                    </div>
                    <div className="group-el venta">
                      <span className="label">Precio</span>
                      <span className="value">
                        {producto?.producto_asociado?.precioVenta || "0.00"}
                      </span>
                    </div>
                    <div className="group-el desc">
                      <span className="label">Descuento</span>
                      <span className="value">
                        {producto?.descuento || "0.00"}
                      </span>
                    </div>
                    <div className="group-el cant">
                      <span className="label">Cantidad</span>
                      <span className="value ">
                        {producto?.cantidad || "0"}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
            <div className="total-productos">
              <strong>Total: </strong> C${" "}
              {venta.detalleDeVenta
                .reduce(
                  (total, producto) =>
                    total +
                    producto.producto_asociado.precioVenta * producto.cantidad,
                  0
                )
                .toFixed(2)}
            </div>
          </div>
        </div>
        <div className="block">
          <h5 className="title">Detalle de venta</h5>
          <div className="fila">
            <div className="group-el">
              <span className="label">Hora de entrega</span>
              <span className="value">{venta?.horaEntrega || "Sin hora"}</span>
            </div>
            <div className="group-el pago">
              <span className="label">Mi pago por la venta</span>
              <span className="value">
                C$ {venta.pago_vendedor || "No pagado"}
              </span>
            </div>
            <div className="group-el">
              <span className="label">Pago Delivery</span>
              <span className="value">
                C$ {venta?.pagoDelivery || "No pagado"}
              </span>
            </div>
          </div>
          <div className="fila">
            <div className="group-el">
              <span className="label">Adicional al delivery</span>
              <span className="value">
                C$ {venta?.adicionalDelivery || "0.00"}
              </span>
            </div>
            <div className="group-el">
              <span className="label">Subtotal de venta</span>
              <span className="value">C$ {venta?.subtotal || "0.00"}</span>
            </div>
            <div className="group-el tienda">
              <span className="label">Pago a entregar en tienda</span>
              <span className="value">C$ {venta?.pagoTienda || "0.00"}</span>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="factura">Consultar factura</div>
          <div className="cerrar" onClick={onClose}>
            Cerrar
          </div>
        </div>
      </div>
    </div>
  );
};

ModalEditSale.propTypes = {
  onClose: PropTypes.func.isRequired,
  venta: PropTypes.object.isRequired,
};
export default ModalEditSale;
