import PropTypes, { array } from "prop-types";
import CashIcon from "../../assets/SalesDatailsIcons/CashIcon.svg";
import DeliveryIcon from "../../assets/SalesDatailsIcons/DeliveryIcon.svg";
import DirectionIcon from "../../assets/SalesDatailsIcons/DirectionIcon.svg";
import LocationIcon from "../../assets/SalesDatailsIcons/LocationIcon.svg";
import ProductIcon from "../../assets/SalesDatailsIcons/ProductIcon.svg";
import TimeIcon from "../../assets/SalesDatailsIcons/TimeIcon.svg";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const LayoutVenta = ({ venta }) => {
  const objectSale = venta;

  return (
    <div className="venta-container">
      <div className="venta">
        <div className="card-head">
          <div className="seller-data">
            <span className="role-name">Vendedor</span>
            <span className="name">
              {objectSale?.vendedor_asociado?.nombreApellido}
            </span>
          </div>
          <span className="code">{objectSale?.codigoVenta}</span>
        </div>

        <div className="card-body">
          <div className="content">
            <div className="group-item">
              <div className="item">
                {objectSale?.detalleDeVenta.map((venta, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", width: "100%", gap: "15px" }}
                  >
                    <img
                      src={ProductIcon}
                      alt={venta?.producto_asociado?.nombreProducto}
                    />
                    <div className="desc">
                      {venta?.producto_asociado?.nombreProducto}
                    </div>
                  </div>
                ))}
              </div>
              <div className="item">
                <img src={DirectionIcon} alt="icono dirección" />
                <div className="desc">
                  {objectSale?.detalleCliente?.direccion}
                </div>
              </div>
            </div>

            <div className="group-item">
              {objectSale?.detalleCliente?.direccionGps !== "" && (
                <div className="item">
                  <img src={LocationIcon} alt="icono ubicación" />
                  <a
                    href={objectSale?.detalleCliente?.direccionGps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {objectSale?.detalleCliente?.direccionGps}
                  </a>
                </div>
              )}

              {objectSale?.horaEntrega === "" ? (
                <div className="item">
                  <img src={TimeIcon} alt="icono hora entrega" />
                  <div className="desc">No hay hora de entrega</div>
                </div>
              ) : (
                <div className="item">
                  <img src={TimeIcon} alt="icono hora entrega" />
                  <div className="desc">
                    Entrega a las {objectSale?.horaEntrega}
                  </div>
                </div>
              )}
            </div>

            <div className="group-item">
              <div className="item">
                <img src={DeliveryIcon} alt="icono de delivery" />
                <div className="desc">C$ {objectSale?.pagoDelivery}</div>
              </div>
              <div className="item">
                <img src={CashIcon} alt="icono efectivo" />
                <div className="desc">C$ {objectSale?.subtotal}</div>
              </div>
            </div>
          </div>

          {objectSale?.createdAt ? (
            <div className="create-at">
              Creada el{" "}
              {format(
                new Date(objectSale?.createdAt),
                "d 'de' MMMM 'a las' h:mm a",
                { locale: es }
              )}
            </div>
          ) : (
            <div className="create-at">Fecha no disponible</div>
          )}

          <Link
            style={{ margin: "0 auto", marginTop: "20px" }}
            className="btn-pr"
            to={`/ventas/${objectSale?.codigoVenta}`}
          >
            ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

LayoutVenta.propTypes = {
  venta: PropTypes.arrayOf(
    PropTypes.shape({
      codigoVenta: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      vendedor_asociado: PropTypes.shape({
        nombreApellido: PropTypes.string.isRequired,
      }).isRequired,
      detalleDeVenta: PropTypes.arrayOf(
        PropTypes.shape({
          producto_asociado: PropTypes.shape({
            nombreProducto: PropTypes.string.isRequired,
            descripcion: PropTypes.string.isRequired,
            precioVenta: PropTypes.number.isRequired,
            precioCompra: PropTypes.number.isRequired,
            precioPromocion: PropTypes.number,
            cantidad: PropTypes.number.isRequired,
          }).isRequired,
        })
      ).isRequired,
      detalleCliente: PropTypes.shape({
        direccion: PropTypes.string.isRequired,
        direccionGps: PropTypes.string,
      }).isRequired,
      horaEntrega: PropTypes.string,
      pagoDelivery: PropTypes.number.isRequired,
      subtotal: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LayoutVenta;
