import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import SalirIcon from "/src/assets/SalirIcon.svg";
import CarritoIcon2 from "/src/assets/CarritoIcon2.svg";

//Esquema de validación
import { VentaSchema } from "../../../modules/schemas/venta.schema";

const ModalEditSale = ({ onClose, venta }) => {
  console.log("Venta recibida para mostrar:", venta);

  const formValues = {
    detalleCliente: {
      nombre: venta.detalleCliente.nombre,
      telefono: venta.detalleCliente.telefono,
      direccionGps: venta.detalleCliente.direccionGps,
      direccion: venta.detalleCliente.direccion,
    },
    detalleDeVenta: venta.detalleDeVenta.map((item) => ({
      cantidad: item.cantidad,
      descuento: item.descuento,
      producto_asociado: {
        nombreProducto: item.producto_asociado.nombreProducto,
        precioVenta: item.producto_asociado.precioVenta,
      },
    })),
    horaEntrega: venta.horaEntrega,
    pago_vendedor: venta.pago_vendedor,
    pagoDelivery: venta.pagoDelivery,
    adicionalDelivery: venta.adicionalDelivery,
    subtotal: venta.subtotal,
    pagoTienda: venta.pagoTienda,
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        validationSchema={VentaSchema}
        onSubmit={(values) => {
          const payload = {
            data: {
              vendedor_asociado: venta.vendedor_asociado?.id ?? 1,

              detalleCliente: values.detalleCliente,

              metodoPago: venta.metodoPago || "Efectivo",

              comprobante: venta.comprobante?.map((c) => c.id) || [],

              detalleDeVenta: values.detalleDeVenta.map((item) => ({
                cantidad: item.cantidad,
                descuento: item.descuento,
                precioUnitario: item.producto_asociado.precioVenta,
              })),

              codigoVenta: venta.codigoVenta,

              estadoVenta: {
                estado: venta.estadoVenta?.estado,
              },

              ComentarioRechazo: venta.ComentarioRechazo || "",

              pagoDelivery: values.pagoDelivery,
              subtotal: values.subtotal,
              pagoTienda: values.pagoTienda,
              pago_vendedor: values.pago_vendedor,
              estado_pago_vendedor: venta.estado_pago_vendedor ?? false,
              horaEntrega: values.horaEntrega,
              adicionalDelivery: values.adicionalDelivery,
            },
          };

          console.log("Payload final para Strapi:", payload);
        }}
      >
        {({ values }) => (
          <Form
            className="modal"
            onMouseDown={(e) => e.stopPropagation()} // permite submit correcto
          >
            <div className="heading-modal">
              <div className="tile-container">
                <img
                  src={CarritoIcon2}
                  alt="Icono de Carrito"
                  className="icon"
                />
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

            <button className="modal-close" type="button" onClick={onClose}>
              <img src={SalirIcon} alt="Icono de Salir" />
            </button>

            {/* INFORMACIÓN DEL CLIENTE */}
            <div className="block">
              <h5 className="title">Información del cliente</h5>
              <div className="fila">
                <div className="group-el">
                  <label className="label">Nombre</label>
                  <Field name="detalleCliente.nombre" className="value" />
                </div>

                <div className="group-el">
                  <label className="label">Teléfono</label>
                  <Field name="detalleCliente.telefono" className="value" />
                </div>
              </div>

              <div className="fila">
                <div className="group-el">
                  <label className="label">Ubicación (URL)</label>
                  <Field name="detalleCliente.direccionGps" className="value" />
                </div>
              </div>

              <div className="fila">
                <div className="group-el">
                  <label className="label">Dirección</label>
                  <Field
                    name="detalleCliente.direccion"
                    className="textarea"
                    as="textarea"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* INFORMACIÓN DE PRODUCTOS */}
            <div className="block">
              <h5 className="title">Información de productos</h5>
              <div className="productos">
                <FieldArray name="detalleDeVenta">
                  {() => (
                    <>
                      {values.detalleDeVenta?.map((producto, index) => (
                        <div key={index}>
                          <h6>Producto {index + 1}</h6>

                          <div className="fila">
                            <div className="group-el">
                              <label className="label">Nombre producto</label>
                              <Field
                                name={`detalleDeVenta.${index}.producto_asociado.nombreProducto`}
                                className="value"
                              />
                            </div>

                            <div className="group-el cant">
                              <label className="label">Precio</label>
                              <Field
                                type="number"
                                name={`detalleDeVenta.${index}.producto_asociado.precioVenta`}
                                className="value"
                              />
                            </div>

                            <div className="group-el cant">
                              <label className="label">Descuento</label>
                              <Field
                                type="number"
                                name={`detalleDeVenta.${index}.descuento`}
                                className="value"
                              />
                            </div>

                            <div className="group-el cant">
                              <label className="label">Cantidad</label>
                              <Field
                                type="number"
                                name={`detalleDeVenta.${index}.cantidad`}
                                className="value"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </div>
            </div>

            {/* DETALLE DE VENTA */}
            <div className="block">
              <h5 className="title">Detalle de venta</h5>

              <div className="fila">
                <div className="group-el">
                  <label className="label">Hora entrega</label>
                  <Field name="horaEntrega" className="value" />
                </div>

                <div className="group-el pago">
                  <label className="label">Pago vendedor</label>
                  <Field name="pago_vendedor" type="number" className="value" />
                </div>

                <div className="group-el">
                  <label className="label">Pago delivery</label>
                  <Field name="pagoDelivery" type="number" className="value" />
                </div>
              </div>

              <div className="fila">
                <div className="group-el">
                  <label className="label">Adicional delivery</label>
                  <Field
                    name="adicionalDelivery"
                    type="number"
                    className="value"
                  />
                </div>

                <div className="group-el">
                  <label className="label">Subtotal</label>
                  <Field name="subtotal" type="number" className="value" />
                </div>

                <div className="group-el tienda">
                  <label className="label">Pago tienda</label>
                  <Field name="pagoTienda" type="number" className="value" />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="footer">
              <div className="factura">Consultar factura</div>

              <button type="submit" className="btn-pr">
                Guardar
              </button>

              <div className="cerrar" onClick={onClose}>
                Cerrar
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ModalEditSale.propTypes = {
  onClose: PropTypes.func.isRequired,
  venta: PropTypes.object.isRequired,
};

export default ModalEditSale;
