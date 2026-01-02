// importaciones
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axios";

// Componentes
import HeaderUsuarios from "../components/UsusariosComponents/HeaderUsuarios";
import Spinner from "../components/Spiner";

// Imagenes
import IconSuccess from "../assets/IconSuccess.svg";

const CrearUsuarios = () => {
  // Estados
  const [postLoading, setPostLoading] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [submitOptions, setSubmitOptions] = useState(false);
  const [confirmEdit, setConfirmCreate] = useState(false);

  // Configs

  // Objetos
  const rolesData = {
    roles: [
      { id: 1, name: "Administrador" },
      { id: 4, name: "Delivery" },
      { id: 5, name: "Stocker" },
      { id: 3, name: "Vendedor" },
    ],
  };
  const blockedState = [
    { prop: true, des: "Bloqueado" },
    { prop: false, des: "Desbloqueado" },
  ];
  const confirmedState = [
    { prop: true, des: "Contratado" },
    { prop: false, des: "Desvinculado" },
  ];

  // Objetos

  // Servicios de API
  const postUser = async (values) => {
    // Crear nuevo usuario
    setPostLoading(true);
    try {
      const response = await axiosInstance.post(`/users`, values);
      if (response.status === 201) {
        setShowModalSave(false);
        setConfirmCreate(true);
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="gestionar-usuarios">
      <HeaderUsuarios />
      {postLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="gestor-container">
            <div className="form-container">
              <div className="header">
                <h5>Detalles del nuevo usuario</h5>
                <span className="svg"></span>
              </div>

              <div className="body">
                <div className="form">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      username: "",
                      nombreApellido: "",
                      telefono: "",
                      email: "",
                      role: "",
                      sexo: "",
                      blocked: false,
                      confirmed: true,
                    }}
                    onSubmit={(values) => {
                      // console.log(values);
                      if (submitOptions) {
                        postUser(values);
                      }
                    }}
                  >
                    {({ handleSubmit, setFieldValue, submitForm }) => (
                      <Form onSubmit={handleSubmit}>
                        {/* Modal inicial que pregunta si se desea guardar los cambios */}
                        {showModalSave && (
                          <div className="modal-conatiner">
                            <div className="modal-content">
                              <h5 className="title">Crear usuario</h5>
                              <span className="body">
                                ¿Está seguro que desea un nuevo usuario?
                              </span>
                              <div className="foot">
                                <div
                                  className="btn-out"
                                  onClick={() => setShowModalSave(false)}
                                >
                                  No
                                </div>

                                <div
                                  className="btn-pr"
                                  onClick={() => {
                                    setSubmitOptions(true);
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

                        {/* Si hay una confirmación de creacion cerramos el modal inicial */}
                        {postLoading && showModalSave
                          ? setShowModalSave(false)
                          : null}

                        {postLoading ? (
                          <div className="modal-conatiner">
                            <div className="modal-content">
                              <div className="spin">
                                <Spinner />
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {/* Modal que confirma la Edición exitosa */}
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
                                <Link to="/usuarios" className="btn-scc">
                                  Cerrar
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Campos rellenables del formulario */}
                        <div className="group">
                          <div className="group-form">
                            <label htmlFor="username">Nombre de usuario</label>
                            <Field type="text" id="username" name="username" />
                          </div>
                          <div className="group-form">
                            <label htmlFor="nombreApellido">
                              Nombre y Apellido
                            </label>
                            <Field
                              type="text"
                              id="nombreApellido"
                              name="nombreApellido"
                            />
                          </div>
                        </div>

                        <div className="group">
                          <div className="group-form">
                            <label htmlFor="telefono">Teléfono</label>
                            <Field type="text" id="telefono" name="telefono" />
                          </div>

                          {/* Select de Rol */}
                          <div className="group-form">
                            <label htmlFor="role">rol de usuario</label>
                            <Field
                              as="select"
                              id="role"
                              name="role"
                              onChange={(e) => {
                                setFieldValue("role", Number(e.target.value));
                              }}
                            >
                              <option value="" disabled>
                                Selecciona...
                              </option>
                              {rolesData.roles.map((rol) => (
                                <option key={rol.id} value={rol.id}>
                                  {rol.name}
                                </option>
                              ))}
                            </Field>
                          </div>

                          {/* Select de Sexo */}
                          <div className="group-form">
                            <label htmlFor="sexo">Sexo</label>
                            <Field as="select" id="sexo" name="sexo">
                              <option value="" disabled>
                                Selecciona...
                              </option>
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                            </Field>
                          </div>
                        </div>

                        <div className="group">
                          <div className="group-form">
                            <label htmlFor="email">Correo electrónico</label>
                            <Field type="email" id="email" name="email" />
                          </div>
                        </div>

                        {/* Select de Bloqueo */}
                        <div className="group">
                          <div className="group-form">
                            <label htmlFor="blocked">Bloquear usuario</label>
                            <Field
                              as="select"
                              id="blocked"
                              name="blocked"
                              onChange={(e) => {
                                setFieldValue(
                                  "blocked",
                                  e.target.value === "true"
                                );
                              }}
                            >
                              <option value="" disabled>
                                Selecciona...
                              </option>
                              {blockedState.map((opt, index) => (
                                <option key={index} value={opt.prop.toString()}>
                                  {opt.des}
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div className="group-form">
                            <label htmlFor="confirmed">Confirmar usuario</label>
                            <Field
                              as="select"
                              id="confirmed"
                              name="confirmed"
                              onChange={(e) => {
                                setFieldValue(
                                  "confirmed",
                                  e.target.value === "true"
                                );
                              }}
                            >
                              <option value="" disabled>
                                Selecciona...
                              </option>
                              {confirmedState.map((opt, index) => (
                                <option key={index} value={opt.prop.toString()}>
                                  {opt.des}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>

                        <div className="group">
                          <div className="group-form">
                            <label htmlFor="password">Contraseña</label>
                            <Field
                              type="password"
                              id="password"
                              name="password"
                            />
                          </div>
                        </div>

                        <div className="group group-actions">
                          <Link to="/usuarios" className="btn-out">
                            Volver
                          </Link>
                          <div
                            className="btn-pr"
                            onClick={() => setShowModalSave(true)}
                          >
                            Guardar
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CrearUsuarios;
