// IMPORTACIONES
import PropTypes from "prop-types";
import { Formik, Form, Field, FieldArray } from "formik";
import { useRef } from "react";
import { useUser } from "../../../context/UserContext";
import AddIcon from "/src/assets/SalesDatailsIcons/AddIcon.svg";
import DeleteSell from "/src/assets/SalesDatailsIcons/DeleteSell.svg";

import SalirIcon from "/src/assets/SalirIcon.svg";

// Esquema de validación
import { VentaSchema } from "../../../modules/schemas/venta.schema";
// ------------------------------------------------------------------------

// Helpers: cálculo de totales
const calculateTotals = (values) => {
  const parseNumber = (n) => {
    const num = Number(n);
    return Number.isFinite(num) ? num : 0;
  };

  const items = values.detalleDeVenta || [];

  // Total de productos (precio * cantidad)
  const totalProductos = items.reduce((acc, item) => {
    const price = parseNumber(item.producto_asociado?.precioVenta);
    const cantidad = parseNumber(item.cantidad);

    return acc + price * cantidad;
  }, 0);

  const pagoDeliveryFijo = parseNumber(values.pagoDelivery);

  // Subtotal = solo valor de productos (SIN adicional delivery)
  const subtotal = totalProductos;

  // Pago tienda = subtotal - pagoDelivery normal
  // (el delivery normal se le paga al repartidor, no a la tienda)
  const pagoTienda = subtotal - pagoDeliveryFijo;

  return { subtotal, pagoTienda, totalProductos, pagoDeliveryFijo };
};

// COMPONENTES
const ModalEditSale = ({ onClose, venta, fechaCreated }) => {
  // HOOKS
  const formRef = useRef(null);

  const { user, allProducts } = useUser(); // usuario actual

  // DATA
  const currentUserData = {
    rolId: user?.user?.data?.role?.id,
    rolName: user?.user?.data?.role?.name,
  };

  // OJBETOS
  const estadosVenta = [
    "En tramite",
    "Por asignar",
    "Asignada",
    "En ruta",
    "Rechazada",
    "Entregada",
  ];

  // VARIABLES
  const estadoVenta = venta?.estadoVenta.estado; // estado de la venta actual

  // Filtrar estados según rol
  let estadosPermitidos = estadosVenta;

  if (currentUserData.rolName !== "Administrador") {
    estadosPermitidos = ["En tramite", "Por asignar"];
  }

  // FUNCIONES
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

  // LOGS
  console.log(allProducts);

  const formValues = {
    detalleCliente: {
      nombre: venta.detalleCliente?.nombre || "",
      telefono: venta.detalleCliente?.telefono || "",
      direccionGps: venta.detalleCliente?.direccionGps || "",
      direccion: venta.detalleCliente?.direccion || "",
    },
    detalleDeVenta: (venta.detalleDeVenta || []).map((item) => ({
      cantidad: item.cantidad || 0,
      isNew: false, // producto que viene desde la venta original
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
    estadoVenta: (venta.estadoVenta || {}).estado || "pendiente",
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <Formik
        innerRef={formRef}
        initialValues={formValues}
        enableReinitialize={true}
        validationSchema={VentaSchema}
        onSubmit={(values) => {
          const { subtotal, pagoTienda } = calculateTotals(values);

          const payload = {
            data: {
              vendedor_asociado: venta.vendedor_asociado?.id ?? 1,
              detalleCliente: values.detalleCliente,
              metodoPago: venta.metodoPago || "Efectivo",
              comprobante: venta.comprobante?.map((c) => c.id) || [],

              detalleDeVenta: values.detalleDeVenta.map((item) => ({
                cantidad: item.cantidad,
                producto_asociado: {
                  id: item.producto_asociado?.id ?? null,
                },
              })),

              codigoVenta: venta.codigoVenta || "",
              estadoVenta: {
                estado: values.estadoVenta,
              },
              ComentarioRechazo: venta.ComentarioRechazo || "",

              // calculados
              pagoDelivery: values.pagoDelivery,
              adicionalDelivery: values.adicionalDelivery,
              subtotal,
              pagoTienda,
              pago_vendedor: values.pago_vendedor,
              estado_pago_vendedor: venta.estado_pago_vendedor ?? false,
              horaEntrega: values.horaEntrega,
            },
          };

          console.log("Payload final para Strapi:", payload);
          // aquí llamarías a tu servicio de actualización
        }}
      >
        {({ values, setFieldValue, submitForm }) => {
          const { subtotal, pagoTienda } = calculateTotals(values);

          // productos ya seleccionados en cualquier fila
          const selectedIds = values.detalleDeVenta
            .map((item) => item.producto_asociado?.id)
            .filter((id) => id != null);

          return (
            <Form
              className="modal"
              onMouseDown={(e) => e.stopPropagation()} // permite submit correcto
            >
              <div className="heading-modal">
                <div className="tile-container">
                  {/* <img
                    src={CarritoIcon2}
                    alt="Icono de Carrito"
                    className="icon"
                  /> */}
                  <div className="tile">
                    <h3>Información de Venta</h3>
                    <div>
                      <span>
                        Codigo:{" "}
                        <strong> {venta.codigoVenta || "No disponible"}</strong>{" "}
                      </span>
                    </div>
                    <strong style={{ fontSize: 11 }}>
                      Creada el {fechaCreated}
                    </strong>
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
                      rows="4"
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
                    {({ push, remove }) => (
                      <>
                        {values.detalleDeVenta.map((producto, index) => {
                          const isNew = producto.isNew;
                          const currentId =
                            producto.producto_asociado?.id ?? null;

                          // productos disponibles = todos menos los ya elegidos,
                          //   pero dejando el que está seleccionado en esta fila
                          const availableProducts = (allProducts || []).filter(
                            (prod) =>
                              !selectedIds.includes(prod.id) ||
                              prod.id === currentId
                          );

                          return (
                            <div
                              key={`${
                                producto.producto_asociado?.id ?? "new"
                              }-${index}`}
                              style={{
                                background: "#dde5e6",
                                padding: "10px",
                                borderRadius: "8px",
                              }}
                            >
                              <h4>Producto {index + 1}</h4>

                              <div className="fila">
                                {/* NOMBRE PRODUCTO */}
                                <div className="group-el">
                                  <label className="label">
                                    Nombre producto
                                  </label>
                                  <select
                                    className="select-in"
                                    value={currentId ?? ""}
                                    disabled={isEditable()}
                                    onChange={(e) => {
                                      const idValue = e.target.value;
                                      const id = idValue
                                        ? Number(idValue)
                                        : null;

                                      const selected =
                                        allProducts?.find((p) => p.id === id) ||
                                        null;

                                      setFieldValue(
                                        `detalleDeVenta.${index}.producto_asociado.id`,
                                        selected?.id ?? null
                                      );
                                      setFieldValue(
                                        `detalleDeVenta.${index}.producto_asociado.nombreProducto`,
                                        selected?.nombreProducto ?? ""
                                      );
                                      setFieldValue(
                                        `detalleDeVenta.${index}.producto_asociado.precioVenta`,
                                        selected?.precioVenta ?? 0
                                      );
                                    }}
                                  >
                                    <option value="">
                                      Selecciona un producto
                                    </option>
                                    {availableProducts.map((prod) => (
                                      <option key={prod.id} value={prod.id}>
                                        {prod.nombreProducto}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* PRECIO */}
                                <div className="group-el cant">
                                  <label className="label">Precio</label>
                                  <Field
                                    type="number"
                                    name={`detalleDeVenta.${index}.producto_asociado.precioVenta`}
                                    className="value"
                                    disabled // siempre calculado desde producto
                                  />
                                </div>

                                {/* CANTIDAD */}
                                <div className="group-el cant">
                                  <label className="label">Cantidad</label>
                                  <Field
                                    type="number"
                                    name={`detalleDeVenta.${index}.cantidad`}
                                    className="value"
                                    disabled={isNew ? false : isEditable()}
                                  />
                                </div>

                                {/* ELIMINAR */}
                                {!isEditable() && (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    type="button"
                                    className="delete-product"
                                    onClick={() => {
                                      if (values.detalleDeVenta.length === 1) {
                                        alert(
                                          "No puedes eliminar todos los productos, debe existir al menos uno."
                                        );
                                        return;
                                      }
                                      remove(index);
                                    }}
                                  >
                                    <img
                                      src={DeleteSell}
                                      alt="Eliminar producto"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {/* Botón agregar producto nuevo */}
                        {!isEditable() && (
                          <div
                            type="button"
                            className="add-product"
                            onClick={() =>
                              push({
                                cantidad: 1,
                                isNew: true,
                                producto_asociado: {
                                  id: null,
                                  nombreProducto: "",
                                  precioVenta: 0,
                                },
                              })
                            }
                          >
                            <img src={AddIcon} alt="" /> Agregar producto
                          </div>
                        )}
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
                    <input
                      type="number"
                      className="value"
                      value={subtotal.toFixed(2)}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="group-el tienda">
                    <label className="label">Pago tienda</label>
                    <input
                      type="number"
                      className="value"
                      value={pagoTienda.toFixed(2)}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
                <div className="fila">
                  <div className="group-el">
                    {/* Estado de venta */}
                    <label className="label">Estado de venta</label>
                    <Field
                      as="select"
                      name="estadoVenta"
                      className="value"
                      disabled={isEditable()}
                    >
                      {estadosPermitidos.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="footer">
                <div className="actions-group">
                  <div className="btn-out" onClick={onClose}>
                    Cerrar
                  </div>

                  {/* Si la venta no fue entregada y no es el administrador se puede guardar */}
                  {estadoVenta !== "Entregada" &&
                    currentUserData.rolName !== "Administrador" && (
                      <button
                        type="button"
                        className="btn-pr"
                        onClick={() => {
                          console.log(
                            "VALORES POR formRef:",
                            formRef.current?.values
                          );
                          submitForm();
                        }}
                      >
                        Guardar
                      </button>
                    )}

                  {/* Si es el administrador se puede guardar y editar siempre */}
                  {currentUserData.rolName === "Administrador" && (
                    <button
                      type="button"
                      className="btn-pr"
                      onClick={() => {
                        console.log(
                          "VALORES POR formRef:",
                          formRef.current?.values
                        );
                        submitForm();
                      }}
                    >
                      Guardar
                    </button>
                  )}
                </div>
                <div className="actions-group">
                  {/* Imprime la factura */}
                  <div className="actions"></div>
                  {/* Manda en un mensaje los datos de la venta por whatsapp */}
                  <div className="actions-w actions"></div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ModalEditSale.propTypes = {
  onClose: PropTypes.func.isRequired,
  venta: PropTypes.object.isRequired,
  fechaCreated: PropTypes.string,
};

export default ModalEditSale;
