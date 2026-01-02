// IMPORTACIONES
import PropTypes from "prop-types";
import { Formik, Form, Field, FieldArray } from "formik";
import { useRef } from "react";
import { useUser } from "../../../context/UserContext";
import AddIcon from "/src/assets/SalesDatailsIcons/AddIcon.svg";
import DeleteSell from "/src/assets/SalesDatailsIcons/DeleteSell.svg";
import SalirIcon from "/src/assets/SalirIcon.svg";

// Opcional: puedes mantener el schema si quieres validaciones
import { VentaSchema } from "../../../modules/schemas/venta.schema";

// Helpers: cálculo de totales
const calculateTotals = (values) => {
  const parseNumber = (n) => {
    const num = Number(n);
    return Number.isFinite(num) ? num : 0;
  };

  const prdAsociados = values.detalleDeVenta || [];

  const totalProductos = prdAsociados.reduce((acc, item) => {
    const price = parseNumber(item.producto_asociado?.precioVenta);
    const cantidad = parseNumber(item.cantidad);
    return acc + price * cantidad;
  }, 0);

  const pagoDeliveryFijo = parseNumber(values.pagoDelivery);

  const subtotal = totalProductos;
  const pagoTienda = subtotal - pagoDeliveryFijo;

  return { subtotal, pagoTienda, totalProductos, pagoDeliveryFijo };
};

// COMPONENTE PRINCIPAL
const ModalCreateSale = ({
  onClose,
  setFinalDataSend,
  setShowModalConfirm,
}) => {
  const formRef = useRef(null);
  const { user, allProducts } = useUser();

  const currentUserData = {
    rolId: user?.user?.data?.role?.id,
    rolName: user?.user?.data?.role?.name,
  };

  const estadosVenta = [
    "En tramite",
    "Por asignar",
    "Asignada",
    "En ruta",
    "Rechazada",
    "Entregada",
  ];

  // Solo administradores pueden elegir todos los estados
  const estadosPermitidos =
    currentUserData.rolName === "Administrador"
      ? estadosVenta
      : ["En tramite", "Por asignar"];

  // Valores iniciales desde cero
  const formValues = {
    detalleCliente: {
      nombre: "",
      telefono: "",
      direccionGps: "",
      direccion: "",
    },
    // <-- Aquí ahora empezamos con 0 productos
    detalleDeVenta: [],
    horaEntrega: "",
    pago_vendedor: 0,
    ComentarioRechazo: "",
    pagoDelivery: 70,
    adicionalDelivery: 0,
    subtotal: 0,
    pagoTienda: 0,
    estadoVenta: { estado: "En tramite" },
  };

  const handleSave = (payload) => {
    setFinalDataSend(payload);
    setShowModalConfirm(true);
  };

  const handleWspSend = (values) => {
    const mensaje = `*Cliente:* ${values.detalleCliente.nombre}
*Telefono:* ${values.detalleCliente.telefono}
*Direccion:* ${values.detalleCliente.direccion}

*Total productos:* C$ ${calculateTotals(values).totalProductos}
*Pago Delivery:* C$ ${values.pagoDelivery}
*Adicional Delivery:* C$ ${values.adicionalDelivery}
*Subtotal:* C$ ${calculateTotals(values).subtotal}
*Pago Tienda:* C$ ${calculateTotals(values).pagoTienda}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <Formik
        innerRef={formRef}
        initialValues={formValues}
        enableReinitialize={true}
        validationSchema={VentaSchema} // opcional, si quieres validar
        onSubmit={(values) => {
          const { subtotal, pagoTienda } = calculateTotals(values);

          const payload = {
            data: {
              vendedor_asociado: user?.user?.data?.id ?? 1,
              detalleCliente: values.detalleCliente,
              metodoPago: "Efectivo",
              comprobante: [],

              detalleDeVenta: values.detalleDeVenta.map((item) => ({
                cantidad: item.cantidad,
                producto_asociado: { id: item.producto_asociado?.id ?? null },
              })),

              estadoVenta: values.estadoVenta,
              ComentarioRechazo: values.ComentarioRechazo,
              pagoDelivery: values.pagoDelivery,
              adicionalDelivery: values.adicionalDelivery,
              subtotal,
              pagoTienda,
              pago_vendedor: values.pago_vendedor ?? 0,
              estado_pago_vendedor: false,
              horaEntrega: values.horaEntrega || "",
            },
          };

          console.log("Payload final para crear venta:", payload);
          handleSave(payload);
        }}
      >
        {({ values, setFieldValue, submitForm }) => {
          const { subtotal, pagoTienda } = calculateTotals(values);
          const selectedIds = values.detalleDeVenta
            .map((item) => item.producto_asociado?.id)
            .filter((id) => id != null);

          return (
            <Form className="modal" onMouseDown={(e) => e.stopPropagation()}>
              <div className="heading-modal">
                <div className="tile-container">
                  <div className="tile">
                    <h3>Nueva venta</h3>
                  </div>
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
                    <Field
                      name="detalleCliente.direccionGps"
                      className="value"
                    />
                  </div>
                </div>
                <div className="fila">
                  <div className="group-el">
                    <label className="label">Dirección</label>
                    <Field
                      name="detalleCliente.direccion"
                      as="textarea"
                      className="textarea"
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              {/* INFORMACIÓN DE PRODUCTOS */}
              <div className="block">
                <h5 className="title">Productos</h5>
                <FieldArray name="detalleDeVenta">
                  {({ push, remove }) => (
                    <>
                      {values.detalleDeVenta.map((producto, index) => {
                        const currentId =
                          producto.producto_asociado?.id ?? null;
                        const availableProducts = (allProducts || []).filter(
                          (prod) =>
                            !selectedIds.includes(prod.id) ||
                            prod.id === currentId
                        );

                        return (
                          <div
                            key={`${currentId ?? "new"}-${index}`}
                            style={{
                              background: "#dde5e6",
                              padding: "10px",
                              borderRadius: "8px",
                            }}
                          >
                            <h4>Producto {index + 1}</h4>
                            <div className="fila">
                              <div className="group-el">
                                <label className="label">Nombre producto</label>
                                <select
                                  className="select-in"
                                  value={currentId ?? ""}
                                  onChange={(e) => {
                                    const id = e.target.value
                                      ? Number(e.target.value)
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
                                  style={{ width: "100%", maxWidth: "500px" }}
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

                              <div className="group-el cant">
                                <label className="label">Precio</label>
                                <Field
                                  type="number"
                                  name={`detalleDeVenta.${index}.producto_asociado.precioVenta`}
                                  className="value"
                                  style={{ background: "white" }}
                                  disabled
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

                              <div
                                className="delete-product"
                                onClick={() => {
                                  if (values.detalleDeVenta.length === 1) {
                                    alert("Debe existir al menos un producto.");
                                    return;
                                  }
                                  remove(index);
                                }}
                              >
                                <img src={DeleteSell} alt="Eliminar producto" />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div
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
                    </>
                  )}
                </FieldArray>
              </div>

              {/* DETALLES DE VENTA */}
              <div className="block">
                <h5 className="title">Detalles de venta</h5>
                <div className="fila">
                  <div className="group-el">
                    <label className="label">Hora entrega</label>
                    <Field name="horaEntrega" className="value" />
                  </div>
                  <div className="group-el pago">
                    <label className="label">Pago vendedor</label>
                    <Field
                      name="pago_vendedor"
                      type="number"
                      className="value"
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
                    <label className="label">Estado de venta</label>
                    <Field
                      as="select"
                      name="estadoVenta.estado"
                      className="value"
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
                  <button
                    type="button"
                    className="btn-pr"
                    onClick={() => submitForm()}
                  >
                    Guardar
                  </button>
                </div>
                <div className="actions-group">
                  <div
                    className="actions-w actions"
                    onClick={() => handleWspSend(values)}
                  ></div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ModalCreateSale.propTypes = {
  onClose: PropTypes.func.isRequired,
  setFinalDataSend: PropTypes.func.isRequired,
  setShowModalConfirm: PropTypes.func.isRequired,
};

export default ModalCreateSale;
