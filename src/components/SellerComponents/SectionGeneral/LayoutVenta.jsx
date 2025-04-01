import PropTypes from "prop-types";
import CashIcon from "../../../assets/SalesDatailsIcons/CashIcon.svg";
import DeliveryIcon from "../../../assets/SalesDatailsIcons/DeliveryIcon.svg";
import DirectionIcon from "../../../assets/SalesDatailsIcons/DirectionIcon.svg";
import LocationIcon from "../../../assets/SalesDatailsIcons/LocationIcon.svg";
import ProductIcon from "../../../assets/SalesDatailsIcons/ProductIcon.svg";
import TimeIcon from "../../../assets/SalesDatailsIcons/TimeIcon.svg";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const LayoutVenta = ({ venta }) => {
  const objectSale = venta[0];
  return (
    <div className="venta-container">
      <div className="venta">
        <div className="card-head">
          <div className="seller-data">
            <span className="role-name">Vendedor:</span>
            <span className="name">
              {objectSale?.vendedor_asociado?.nombreApellido}
            </span>
          </div>
          <span className="code">000145 </span>
        </div>
        <div className="card-body">
          <div className="content">
            <div className="group-item">
              <div className="item">
                {objectSale.detalleDeVenta.map((venta) => (
                  <>
                    <img
                      src={ProductIcon}
                      alt={venta?.producto_asociado?.nombreProducto}
                    />
                    <div className="desc">
                      {venta?.producto_asociado?.nombreProducto}
                    </div>
                  </>
                ))}
              </div>
              <div className="item">
                <img src={DirectionIcon} alt="" />
                <div className="desc">
                  {objectSale?.detalleCliente?.direccion}
                </div>
              </div>
            </div>
            <span className="line"></span>
            <div className="group-item">
              <div className="item">
                <img src={LocationIcon} alt="icono ubicacion" />
                <a href={objectSale?.detalleCliente?.direccionGps}>
                  {objectSale?.detalleCliente?.direccionGps === ""
                    ? "No hay ubicación"
                    : objectSale?.detalleCliente?.direccionGps}
                </a>
              </div>
              <div className="item">
                <img src={TimeIcon} alt="icono hora entrega" />
                <div className="desc">{objectSale?.horaEntrega}</div>
              </div>
            </div>
            <span className="line"></span>
            <div className="group-item">
              <div className="item">
                <img src={DeliveryIcon} alt="icono de delivery" />
                <div className="desc">
                  C$ {""} {objectSale?.pagoDelivery}
                </div>
              </div>
              <div className="item">
                <img src={CashIcon} alt="" />
                <div className="desc">
                  C$ {""} {objectSale?.subtotal}
                </div>
              </div>
            </div>
          </div>
          <div className="create-at">
            Creada el{" "}
            {format(
              new Date(objectSale?.createdAt),
              "d 'de' MMMM 'a las' h:mm a",
              { locale: es }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

LayoutVenta.propTypes = {
  venta: PropTypes.arrayOf(
    PropTypes.shape({
      vendedor_asociado: PropTypes.shape({
        nombreApellido: PropTypes.string,
      }),
      detalleDeVenta: PropTypes.arrayOf(
        PropTypes.shape({
          producto_asociado: PropTypes.shape({
            nombreProducto: PropTypes.string,
            descripcion: PropTypes.string,
            precioVenta: PropTypes.number,
            precioCompra: PropTypes.number,
            precioPromocion: PropTypes.number,
            cantidad: PropTypes.number,
          }),
        })
      ),
      detalleCliente: PropTypes.shape({
        direccion: PropTypes.string,
        direccionGps: PropTypes.string,
      }),
      horaEntrega: PropTypes.string,
      pagoDelivery: PropTypes.number,
      subtotal: PropTypes.number,
    })
  ),
};

export default LayoutVenta;
