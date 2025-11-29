import * as Yup from "yup";

export const VentaSchema = Yup.object({
  detalleCliente: Yup.object({
    nombre: Yup.string().required("Nombre requerido"),
    telefono: Yup.string().required("Teléfono requerido"),
    direccionGps: Yup.string().required("URL requerida"),
    direccion: Yup.string().required("Dirección requerida"),
  }),

  detalleDeVenta: Yup.array()
    .of(
      Yup.object({
        cantidad: Yup.number()
          .typeError("Debe ser un número")
          .required("Cantidad requerida")
          .min(1, "Debe ser al menos 1"),

        descuento: Yup.number()
          .nullable()
          .transform((v) => (isNaN(v) ? 0 : v))
          .min(0, "No puede ser negativo"),

        producto_asociado: Yup.object({
          nombreProducto: Yup.string().required(
            "Nombre del producto requerido"
          ),
          precioVenta: Yup.number()
            .typeError("Debe ser un número")
            .required("Precio requerido")
            .min(0, "No puede ser negativo"),
        }).required(),
      })
    )
    .min(1, "Debe haber al menos un producto")
    .required(),

  horaEntrega: Yup.string().nullable(),

  pago_vendedor: Yup.number()
    .typeError("Debe ser un número")
    .nullable()
    .transform((v) => (isNaN(v) ? 0 : v)),

  pagoDelivery: Yup.number()
    .typeError("Debe ser un número")
    .nullable()
    .transform((v) => (isNaN(v) ? 0 : v)),

  adicionalDelivery: Yup.number()
    .typeError("Debe ser un número")
    .nullable()
    .transform((v) => (isNaN(v) ? 0 : v)),

  subtotal: Yup.number()
    .typeError("Debe ser un número")
    .nullable()
    .transform((v) => (isNaN(v) ? 0 : v)),

  pagoTienda: Yup.number()
    .typeError("Debe ser un número")
    .nullable()
    .transform((v) => (isNaN(v) ? 0 : v)),
});
