// IMPORTACIONES
import PropTypes from "prop-types";
import { Formik, Form, Field, FieldArray } from "formik";
import { useRef, useState } from "react";
import { useUser } from "../../../context/UserContext";

import SalirIcon from "/src/assets/SalirIcon.svg";
import CarritoIcon2 from "/src/assets/CarritoIcon2.svg";

//Esquema de validación
import { VentaSchema } from "../../../modules/schemas/venta.schema";

// ------------------------------------------------------------------------

// COMPONENTES
const DeleteProduct = ({ id, onClick }) => {
  return (
    <div className="delete-product" onClick={onClick}>
      <img src={SalirIcon} alt="Eliminar producto" />
    </div>
  );
};

const ModalEditSale = ({ onClose, venta }) => {
  // Estados
  const [productAsociated, setproductAsociated] = useState(
    venta?.detalleDeVenta
  );

  console.log("Product:", productAsociated);

  // Hooks
  const formRef = useRef(null);

  // destructuración
  const { user } = useUser(); // usuario actual

  // data
  const currentUserData = {
    rolId: user?.user?.data?.role?.id, // id del rol del usuario
    rolName: user?.user?.data?.role?.name, // nombre del rol del usuario
  };

  const estadoVenta = venta?.estadoVenta.estado; // estado de la venta actual

  // Handers y funciones
  const handleFormSubmit = () => {
    const data = formRef.current?.values || {};

    console.log("Data lista para enviar:", { data: data });
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...productAsociated];

    if (updatedProducts.length === 1) {
      return alert(
        "No puedes eliminar todos los productos tiene que haber al menos un producto asociado"
      );
    }

    updatedProducts.splice(index, 1);
    setproductAsociated(updatedProducts);
  };

  const isEditable = () => {
    // Esta función determina si el formulario es editable basado en el rol del usuario y el estado de la venta
    if (currentUserData.rolName === "Administrador") {
      return false;
    } else if (
      currentUserData.rolName !== "Administrador" &&
      estadoVenta !== "Entregada"
    ) {
      return false;
    } else {
      return true;
    }
  };

  // console.log("Venta recibida para mostrar:", venta);

  const formValues = {
    detalleCliente: {
      nombre: venta.detalleCliente?.nombre || "",
      telefono: venta.detalleCliente?.telefono || "",
      direccionGps: venta.detalleCliente?.direccionGps || "",
      direccion: venta.detalleCliente?.direccion || "",
    },
    detalleDeVenta: (venta.detalleDeVenta || []).map((item) => ({
      cantidad: item.cantidad || 0,
      descuento: item.descuento || 0,
      producto_asociado: {
        id: item.producto_asociado?.id,
        nombreProducto: item.producto_asociado?.nombreProducto || "",
        precioVenta: item.producto_asociado?.precioVenta || 0,
      },
    })),
    horaEntrega: venta.horaEntrega || "",
    pago_vendedor: venta.pago_vendedor || 0,
    pagoDelivery: venta.pagoDelivery || 0,
    adicionalDelivery: venta.adicionalDelivery || 0,
    subtotal: venta.subtotal || 0,
    pagoTienda: venta.pagoTienda || 0,
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <Formik
        innerRef={formRef}
        initialValues={formValues}
        enableReinitialize={true}
        validationSchema={VentaSchema}
        onSubmit={(values) => {
          const payload = {
            data: {
              // Asegurando valores por defecto o comprobación
              vendedor_asociado: venta.vendedor_asociado?.id ?? 1,
              detalleCliente: values.detalleCliente,
              metodoPago: venta.metodoPago || "Efectivo",
              comprobante: venta.comprobante?.map((c) => c.id) || [],
              detalleDeVenta: values.detalleDeVenta.map((item) => ({
                cantidad: item.cantidad,
                descuento: item.descuento,
                // Usar el precioVenta del producto_asociado si es necesario,
                // o determinar el precioUnitario real de la venta.
                precioUnitario: item.producto_asociado?.precioVenta || 0,
              })),
              codigoVenta: venta.codigoVenta || "",
              estadoVenta: {
                estado: venta.estadoVenta?.estado || "pendiente",
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
          // Aquí se realizaría la lógica de API
          // setSubmitting(false); // Descomentar después de la llamada a la API
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

              {/* Aviso de que la venta ya fue entregada y no puede ser modificada */}
              {estadoVenta === "Entregada" &&
                currentUserData.rolName !== "Administrador" && (
                  <div className="aviso">
                    La venta ya fue entregada y no puede ser modificada por el
                    vendedor
                  </div>
                )}
            </div>

            <button className="modal-close" type="button" onClick={onClose}>
              <img src={SalirIcon} alt="Icono de Salir" />
            </button>

            {/*  INFORMACIÓN DEL CLIENTE */}
            <div className="block">
              <h5 className="title">Información del cliente</h5>
              <div className="fila">
                <div className="group-el">
                  <label className="label">Nombre</label>
                  <Field
                    name="detalleCliente.nombre"
                    className="value"
                    disabled={isEditable()}
                  />
                </div>

                <div className="group-el">
                  <label className="label">Teléfono</label>
                  <Field
                    name="detalleCliente.telefono"
                    className="value"
                    disabled={isEditable()}
                  />
                </div>
              </div>

              <div className="fila">
                <div className="group-el">
                  <label className="label">Ubicación (URL)</label>
                  <Field
                    name="detalleCliente.direccionGps"
                    className="value "
                    disabled={isEditable()}
                  />
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
                    disabled={isEditable()}
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
                      {productAsociated.map((producto, index) => (
                        <div key={index}>
                          <h6>Producto {index + 1}</h6>

                          <div className="fila">
                            <div className="group-el">
                              <label className="label">Nombre producto</label>
                              <Field
                                name={`detalleDeVenta.${index}.producto_asociado.nombreProducto`}
                                className="value"
                                disabled
                              />
                            </div>

                            <div className="group-el cant">
                              <label className="label">Precio</label>
                              <Field
                                type="number"
                                name={`detalleDeVenta.${index}.producto_asociado.precioVenta`}
                                className="value"
                                disabled
                              />
                            </div>

                            <div className="group-el cant">
                              <label className="label">Descuento</label>
                              <Field
                                type="number"
                                name={`detalleDeVenta.${index}.descuento`}
                                className="value"
                                disabled={isEditable()}
                              />
                            </div>

                            <div className="group-el cant">
                              <label className="label">Cantidad</label>
                              <Field
                                type="number"
                                name={`detalleDeVenta.${index}.cantidad`}
                                className="value"
                                disabled={isEditable()}
                              />
                            </div>

                            <DeleteProduct onClick={deleteProduct} id={index} />
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
                  <Field
                    name="horaEntrega"
                    className="value"
                    disabled={isEditable()}
                  />
                </div>

                <div className="group-el pago">
                  <label className="label">Pago vendedor</label>
                  <Field
                    name="pago_vendedor"
                    type="number"
                    className="value"
                    disabled
                  />
                </div>

                <div className="group-el">
                  <label className="label">Pago delivery</label>
                  <Field
                    name="pagoDelivery"
                    type="number"
                    className="value"
                    disabled
                  />
                </div>
              </div>

              <div className="fila">
                <div className="group-el">
                  <label className="label">Adicional delivery</label>
                  <Field
                    name="adicionalDelivery"
                    type="number"
                    className="value"
                    disabled={isEditable()}
                  />
                </div>

                <div className="group-el">
                  <label className="label">Subtotal</label>
                  <Field
                    name="subtotal"
                    type="number"
                    className="value"
                    disabled
                  />
                </div>

                <div className="group-el tienda">
                  <label className="label">Pago tienda</label>
                  <Field
                    name="pagoTienda"
                    type="number"
                    className="value"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="footer">
              <div className="factura">Consultar factura</div>

              {/* Si le venta ya fue entregada y no es el administrador no se puede guardar */}
              {estadoVenta === "Entregada" &&
                currentUserData.rolName !== "Administrador" &&
                null}

              {/* Si le venta no fue entregada y no es el administrador se puede guardar */}
              {estadoVenta !== "Entregada" &&
                currentUserData.rolName !== "Administrador" && (
                  <button
                    type="button"
                    className="btn-pr"
                    onClick={handleFormSubmit}
                  >
                    Guardar
                  </button>
                )}

              {/* Si es el administrador se puede guardar y editar siempre */}

              {currentUserData.rolName === "Administrador" && (
                <button
                  type="button"
                  className="btn-pr"
                  onClick={handleFormSubmit}
                >
                  Guardar
                </button>
              )}

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
