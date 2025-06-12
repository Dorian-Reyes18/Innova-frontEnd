import { Formik, Form, Field, FieldArray } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";

import SalirIcon from "/src/assets/SalirIcon.svg";
import CarritoIcon2 from "/src/assets/CarritoIcon2.svg";

// Esquema de validación con Yup
const VentaSchema = Yup.object().shape({
  detalleCliente: Yup.object().shape({
    nombre: Yup.string().required("Nombre requerido"),
    telefono: Yup.string().required("Teléfono requerido"),
    direccionGps: Yup.string().url("Debe ser un link válido").required(),
    direccion: Yup.string().required("Dirección requerida"),
  }),
  detalleDeVenta: Yup.array().of(
    Yup.object().shape({
      producto_asociado: Yup.object().shape({
        nombreProducto: Yup.string().required("Requerido"),
        precioVenta: Yup.number().min(0, "Debe ser positivo").required(),
      }),
      descuento: Yup.number().min(0, "Debe ser positivo"),
      cantidad: Yup.number().min(1, "Debe ser al menos 1").required(),
    })
  ),
  horaEntrega: Yup.string().required("Requerido"),
  pago_vendedor: Yup.number().min(0).required(),
  pagoDelivery: Yup.number().min(0).required(),
  adicionalDelivery: Yup.number().min(0).required(),
  subtotal: Yup.number().min(0).required(),
  pagoTienda: Yup.number().min(0).required(),
});

const ModalEditSale = ({ onClose, venta }) => {
  console.log(venta);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <Formik
        initialValues={venta}
        validationSchema={VentaSchema}
        onSubmit={(values) => {
          console.log("Venta actualizada:", values);
          onClose(); // Aquí podrías hacer un fetch o update real
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="modal" onClick={(e) => e.stopPropagation()}>
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

            <button className="modal-close" onClick={onClose}>
              <img src={SalirIcon} alt="Icono de Salir" />
            </button>

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
                  <Field name="detalleCliente.direccion" className="value" />
                </div>
              </div>
            </div>

            <div className="block">
              <h5 className="title">Información de productos</h5>
              <div className="productos">
                <FieldArray name="detalleDeVenta">
                  {({ remove }) => (
                    <>
                      {values.detalleDeVenta.map((producto, index) => (
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
                            <div className="group-el venta">
                              <label className="label">Precio</label>
                              <Field
                                name={`detalleDeVenta.${index}.producto_asociado.precioVenta`}
                                type="number"
                                className="value"
                              />
                            </div>
                            <div className="group-el desc">
                              <label className="label">Descuento</label>
                              <Field
                                name={`detalleDeVenta.${index}.descuento`}
                                type="number"
                                className="value"
                              />
                            </div>
                            <div className="group-el cant">
                              <label className="label">Cantidad</label>
                              <Field
                                name={`detalleDeVenta.${index}.cantidad`}
                                type="number"
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

            <div className="block">
              <h5 className="title">Detalle de venta</h5>
              <div className="fila">
                <div className="group-el">
                  <label className="label">Hora entrega</label>
                  <Field
                    // hora entrega puede ser null tomar en cuenta
                    name={"horaEntrega"}
                    className="value"
                  />
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

            <div className="footer">
              <div className="factura">Consultar factura</div>
              <button type="submit" className="guardar">
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
