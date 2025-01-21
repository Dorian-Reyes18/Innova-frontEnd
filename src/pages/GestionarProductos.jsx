import HeaderProductos from "../components/ProductosComponent/HeaderProductos";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../context/userContext";
import { useState, useEffect } from "react";
import Spinner from "../components/Spiner";

const GestionarProductos = () => {
  const { id } = useParams();
  const { currentProduct, setCurrentProduct } = useUser();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/inventario-productos/${id}?populate=*`
      );
      const data = response?.data?.data;
      setCurrentProduct(data);
    } catch (error) {
      console.log("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(currentProduct);
  }, [currentProduct]);

  const initialValues = {
    nombreProducto: currentProduct?.nombreProducto || "",
    descripcion: currentProduct?.descripcion || "",
    cantidad: currentProduct?.cantidad || 0,
    precioCompra: currentProduct?.precioCompra || 0,
    precioVenta: currentProduct?.precioVenta || 0,
    precioPromocion: currentProduct?.precioPromocion || 0,

    imagen: currentProduct?.imagen,
  };

  return (
    <div className="gestion-productos">
      <HeaderProductos />
      {loading ? (
        <Spinner />
      ) : (
        <div className="body-form">
          <div className="form">
            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <h4>Detalles del producto</h4>
                <div className="group-1">
                  <div className="form-group">
                    <img
                      id="imagen"
                      className="imagen"
                      name="imagen"
                      src={initialValues?.imagen?.[0]?.url || ""}
                      alt="Producto"
                    />
                  </div>

                  <div className="group-1-1">
                    <div className="form-group">
                      <label htmlFor="nombreProducto">Nombre</label>
                      <Field
                        type="text"
                        id="nombreProducto"
                        name="nombreProducto"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="descripcion">Descripción</label>
                      <Field
                        as="textarea"
                        type="textarea"
                        id="descripcion"
                        name="descripcion"
                        rows="6"
                      />
                    </div>
                  </div>
                </div>

                <div className="group-2">
                  <div className="form-group">
                    <label htmlFor="cantidad">Cantidad</label>
                    <Field type="number" id="cantidad" name="cantidad" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="precioCompra">Precio de compra</label>
                    <Field
                      type="number"
                      id="precioCompra"
                      name="precioCompra"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="precioVenta">Precio de venta</label>
                    <Field type="number" id="precioVenta" name="precioVenta" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="precioPromocion">Precio de promoción</label>
                    <Field
                      type="number"
                      id="precioPromocion"
                      name="precioPromocion"
                    />
                  </div>
                </div>
                <button type="submit">Guardar</button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};
export default GestionarProductos;
