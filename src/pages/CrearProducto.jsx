import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useUser } from "../context/userContext";
import axiosInstance from "../axios";
import HeaderProductos from "../components/ProductosComponent/HeaderProductos";
import ProductPlaceholder from "../assets/ProductPlaceholder.svg";
import Spinner from "../components/Spiner";
import IconSuccess from "../assets/IconSuccess.svg";

const CrearProducto = () => {
  const { user } = useUser();
  const [postLoading, setPostLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const myUser = user?.user?.data;

  const hasRoleAccess = (roles) =>
    myUser?.role?.id ? roles.includes(myUser.role.id) : false;

  const postProduct = async (values) => {
    setPostLoading(true);
    try {
      const response = await axiosInstance.post(
        `/inventario-productos`,
        values
      );
      if (response.status === 201) {
        setConfirmEdit(true);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(
        "Error al crear el producto. Por favor, verifica los datos."
      );
      console.error("Error al crear el producto:", error);
    } finally {
      setPostLoading(false);
    }
  };

  const touchHandler = () => {
    setTouched(hasRoleAccess([1, 5]));
  };

  useEffect(() => {
    if (myUser) {
      touchHandler();
    }
  }, [myUser]);

  useEffect(() => {
    if (postLoading && showModal) {
      setShowModal(false);
    }
  }, [postLoading, showModal]);

  const initialValues = {
    nombreProducto: "",
    descripcion: "",
    cantidad: 0,
    precioCompra: 0,
    precioVenta: 0,
    precioPromocion: 0,
  };

  return (
    <div className="gestion-productos">
      <HeaderProductos />

      <div className="body-form">
        <div className="form">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values) => {
              const dataSend = {
                data: values,
              };
              postProduct(dataSend);
            }}
          >
            {({ submitForm }) => (
              <Form>
                {showModal && (
                  <div className="modal-conatiner">
                    <div className="modal-content">
                      <h5 className="title">Crear Producto</h5>
                      <span className="body">
                        ¿Está seguro que desea crear el producto?
                      </span>
                      <div className="foot">
                        <div
                          className="btn-out"
                          onClick={() => setShowModal(false)}
                        >
                          No
                        </div>
                        <div className="btn-pr" onClick={() => submitForm()}>
                          Si
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {postLoading && (
                  <div className="modal-conatiner">
                    <div className="modal-content">
                      <div className="spin">
                        <Spinner />
                      </div>
                    </div>
                  </div>
                )}

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

                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}

                <h4>Detalles del nuevo producto</h4>
                <div className="group-1">
                  <div className="form-group">
                    <img
                      id="imagen"
                      className="imagen"
                      name="imagen"
                      src={ProductPlaceholder}
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
                      <label htmlFor="precioPromocion">
                        Precio de promoción
                      </label>
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
                  <div
                    className="btn-pr disabled-btn"
                    onClick={() => setShowModal(true)}
                  >
                    Crear
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CrearProducto;
