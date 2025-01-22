import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import axiosInstance from "../axios";
import HeaderProductos from "../components/ProductosComponent/HeaderProductos";
import ProductPlaceholder from "../assets/ProductPlaceholder.svg";
import Spinner from "../components/Spiner";
import IconSuccess from "../assets/IconSuccess.svg";

const GestionarProductos = () => {
  const { id } = useParams();
  const { currentProduct, setCurrentProduct, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [putLoading, setPutLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const myUser = user?.user?.data;

  // Función para verificar permisos por rol
  const hasRoleAccess = (roles) => roles.includes(myUser?.role?.id);

  // Cargar datos del producto
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/inventario-productos/${id}?populate=*`
      );
      setCurrentProduct(response?.data?.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar datos del producto
  const putProduct = async (values) => {
    setPutLoading(true);
    try {
      const response = await axiosInstance.put(
        `/inventario-productos/${id}`,
        values
      );
      if (response.status === 200) {
        setConfirmEdit(true);
      }
    } catch (error) {
      console.error("Error al actualizar productos:", error);
    } finally {
      setPutLoading(false);
    }
  };

  // Manejar permisos para edición
  const touchHandler = () => {
    setTouched(hasRoleAccess([1, 5]));
  };

  // Valores iniciales para Formik
  const initialValues = {
    nombreProducto: currentProduct?.nombreProducto || "",
    descripcion: currentProduct?.descripcion || "",
    cantidad: currentProduct?.cantidad || 0,
    precioCompra: currentProduct?.precioCompra || 0,
    precioVenta: currentProduct?.precioVenta || 0,
    precioPromocion: currentProduct?.precioPromocion || 0,
  };
  const imagenProducto =
    currentProduct?.imagen?.formats?.thumbnail?.url || ProductPlaceholder;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (myUser) {
      touchHandler();
    }
  }, [myUser]);

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
                const dataSend = {
                  data: values,
                };
                putProduct(dataSend);
              }}
            >
              {({ submitForm }) => (
                <Form>
                  {showModal && (
                    <div className="modal-conatiner">
                      <div className="modal-content">
                        <h5 className="title">Guardar cambios</h5>
                        <span className="body">
                          ¿Está seguro que desea guardar los cambios realizados
                          en el producto?
                        </span>
                        <div className="foot">
                          <div
                            className="btn-out"
                            onClick={() => setShowModal(false)}
                          >
                            No
                          </div>
                          <div className="btn-pr" onClick={() => submitForm()}>
                            {" "}
                            Si
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {putLoading && showModal ? setShowModal(false) : null}
                  {putLoading ? (
                    <div className="modal-conatiner">
                      <div className="modal-content">
                        <div className="spin">
                          <Spinner />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {confirmEdit && (
                    <div className="modal-conatiner">
                      <div className="modal-content">
                        <h5 className="title">
                          <img src={IconSuccess} alt="" />
                          <span>Operación Exitosa</span>
                        </h5>
                        <span className="body">
                          Los cambios se aplicarón correctamente
                        </span>
                        <div className="foot">
                          <Link to="/productos" className="btn-scc">
                            Cerrar
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  <h4>Detalles del producto</h4>
                  <div className="group-1">
                    <div className="form-group">
                      <img
                        id="imagen"
                        className="imagen"
                        name="imagen"
                        src={imagenProducto}
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
                          disabled={!touched}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <Field
                          as="textarea"
                          id="descripcion"
                          name="descripcion"
                          rows="6"
                          disabled={!touched}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group-2">
                    <div className="form-group">
                      <label htmlFor="cantidad">Disponibles</label>
                      <Field
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        disabled={!touched}
                      />
                    </div>
                    {hasRoleAccess([1, 5]) && (
                      <div className="form-group">
                        <label htmlFor="precioCompra">Precio de compra</label>
                        <Field
                          type="number"
                          id="precioCompra"
                          name="precioCompra"
                          disabled={!touched}
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="precioVenta">Precio de venta</label>
                      <Field
                        type="number"
                        id="precioVenta"
                        name="precioVenta"
                        disabled={!touched}
                      />
                    </div>
                    {hasRoleAccess([1, 5, 6, 4]) && (
                      <div className="form-group">
                        <label htmlFor="precioPromocion">Precio en promo</label>
                        <Field
                          type="number"
                          id="precioPromocion"
                          name="precioPromocion"
                          disabled={!touched}
                        />
                      </div>
                    )}
                  </div>

                  <div className="actions">
                    <Link to="/productos" className="btn-out">
                      Volver
                    </Link>
                    {hasRoleAccess([1, 5]) && (
                      <div
                        className="btn-pr"
                        onClick={() => setShowModal(true)}
                      >
                        Guardar
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarProductos;
