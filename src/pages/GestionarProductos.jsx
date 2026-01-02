import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useParams, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axiosInstance from "../axios";
import HeaderProductos from "../components/ProductosComponent/HeaderProductos";
import ProductPlaceholder from "../assets/ProductPlaceholder.svg";
import Spinner from "../components/Spiner";
import IconSuccess from "../assets/IconSuccess.svg";

const GestionarProductos = () => {
  const { id } = useParams();
  const { currentProduct, setCurrentProduct, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [putLoading, setPutLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const myUser = user?.user?.data;
  const [submitOptions, setSubmitOptions] = useState({
    put: false,
    delete: false,
  });

  // Función para verificar permisos por rol
  const hasRoleAccess = (roles) => roles.includes(myUser?.role?.name);
  // console.log("myUser", myUser?.role?.name);

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

  // Eliminar producto actual
  const deleteProduct = async (values) => {
    setDeleteLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/inventario-productos/${id}`,
        values
      );

      // console.log(response);
      if (response.status === 204) {
        setConfirmDelete(true);
      }
    } catch (error) {
      console.error("Error el eliminar el producto:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Manejar permisos para edición
  const touchHandler = () => {
    setTouched(hasRoleAccess(["Administrador", "Stocker"]));
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

  useEffect(() => {
    if (putLoading && showModal) {
      setShowModal(false);
    }
  }, [putLoading, showModal]);

  useEffect(() => {
    if (deleteLoading && showModalDelete) {
      setShowModalDelete(false);
    }
  }, [deleteLoading, showModalDelete]);

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
                if (submitOptions.put) {
                  putProduct(dataSend);
                } else if (submitOptions.delete) {
                  deleteProduct(dataSend);
                }
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
                          <div
                            className="btn-pr"
                            onClick={() => {
                              setSubmitOptions({ put: true, delete: false });
                              submitForm();
                            }}
                          >
                            {" "}
                            Si
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {showModalDelete && (
                    <div className="modal-conatiner">
                      <div className="modal-content">
                        <h5 className="title">Eliminar Producto</h5>
                        <span className="body">
                          ¿Está seguro que desea eliminar el producto actual?
                        </span>
                        <div className="foot">
                          <div
                            className="btn-out"
                            onClick={() => setShowModalDelete(false)}
                          >
                            No
                          </div>
                          <div
                            className="btn-pr"
                            onClick={() => {
                              setSubmitOptions({ put: false, delete: true });
                              submitForm();
                            }}
                          >
                            {" "}
                            Si
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {putLoading ? (
                    <div className="modal-conatiner">
                      <div className="modal-content">
                        <div className="spin">
                          <Spinner />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {deleteLoading ? (
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
                  {confirmDelete && (
                    <div className="modal-conatiner">
                      <div className="modal-content">
                        <h5 className="title">
                          <img src={IconSuccess} alt="" />
                          <span>Eliminación Exitosa</span>
                        </h5>
                        <span className="body">
                          Se eliminó el producto correctamente
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
                    {hasRoleAccess(["Administrador", "Stocker"]) && (
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
                    {hasRoleAccess([
                      "Administrador",
                      "Stocker",
                      "Vendedor",
                      "Delivery",
                    ]) && (
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
                    {hasRoleAccess(["Administrador"]) && (
                      <div
                        className="btn-pr"
                        onClick={() => setShowModal(true)}
                      >
                        Guardar
                      </div>
                    )}
                    {hasRoleAccess(["Administrador"]) && (
                      <div
                        className="btn-dl"
                        onClick={() => setShowModalDelete(true)}
                      >
                        Borrar
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
