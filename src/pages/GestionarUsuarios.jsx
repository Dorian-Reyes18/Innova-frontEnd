// importaciones
import { Formik, Form, Field } from "formik";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";

// Componentes
import HeaderUsuarios from "../components/UsusariosComponents/HeaderUsuarios";
import Spinner from "../components/Spiner";

// Imagenes
import IconSuccess from "../assets/IconSuccess.svg";

const GestionarUsuarios = () => {
  // Estados
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState();
  const [putLoading, setPutLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [submitOptions, setSubmitOptions] = useState({
    put: false,
    delete: false,
  });
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Configs
  const { id } = useParams();

  // Objetos
  const rolesData = {
    roles: [
      { id: 3, name: "Administrador" },
      { id: 4, name: "Delivery" },
      { id: 5, name: "Stocker" },
      { id: 6, name: "Vendedor" },
    ],
  };
  const blockedState = [
    { prop: "true", des: "Bloqueado" },
    { prop: "false", des: "Desbloqueado" },
  ];
  const confirmedState = [
    { prop: "true", des: "Contratado" },
    { prop: "false", des: "Desvinculado" },
  ];

  // Estilos bloqueados (puedes mantenerlos igual)
  const blockedStyles = [
    { color: "Red", backgroundColor: "#ffe4e4", fontWeight: "700" },
    { color: "#003b00", backgroundColor: "#d6ffd6", fontWeight: "700" },
  ];

  // servicios de fetching
  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const response = await axiosInstance.get(`/users/${id}?populate=*`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUser(false);
    }
  };

  const putUser = async (values) => {
    setPutLoading(true);
    try {
      // Convertir los valores booleanos desde string a boolean y rol a número
      const transformedValues = {
        ...values,
        blocked: values.blocked === "true",
        confirmed: values.confirmed === "true",
        role: parseInt(values.role, 10),
      };

      // Eliminar la contraseña si está vacía
      if (!transformedValues.password) {
        delete transformedValues.password;
      }

      const response = await axiosInstance.put(
        `/users/${id}`,
        transformedValues
      );
      if (response.status === 200) {
        setConfirmEdit(true);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    } finally {
      setPutLoading(false);
    }
  };

  const deleteUser = async () => {
    setDeleteLoading(true);
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      if (response.status === 200) {
        setConfirmDelete(true);
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Efectos
  useEffect(() => {
    fetchUser();
  }, []);

  // useEffect para cerrar modal Save cuando está cargando la petición PUT
  useEffect(() => {
    if (putLoading && showModalSave) {
      setShowModalSave(false);
    }
  }, [putLoading, showModalSave]);

  // useEffect para cerrar modal Delete cuando está cargando la petición DELETE
  useEffect(() => {
    if (deleteLoading && showModalDelete) {
      setShowModalDelete(false);
    }
  }, [deleteLoading, showModalDelete]);

  return (
    <div className="gestionar-usuarios">
      <HeaderUsuarios />

      {loadingUser || !userData ? (
        <div className="gestor-container">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="gestor-container">
            <div className="form-container">
              <div className="header">
                <h5>Detalles del usuario</h5>
                <span className="svg"></span>
              </div>

              <div className="body">
                <div className="form">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      username: userData?.username || "",
                      nombreApellido: userData?.nombreApellido || "",
                      telefono: userData?.telefono || "",
                      email: userData?.email || "",
                      role: userData?.role?.id ? String(userData.role.id) : "",
                      sexo: userData?.sexo || "",
                      blocked:
                        userData && userData.blocked !== undefined
                          ? String(userData.blocked)
                          : "false",
                      confirmed:
                        userData && userData.confirmed !== undefined
                          ? String(userData.confirmed)
                          : "false",
                      password: "",
                    }}
                    onSubmit={(values) => {
                      if (submitOptions.put) {
                        putUser(values);
                      } else if (submitOptions.delete) {
                        deleteUser();
                      }
                    }}
                  >
                    {({ handleSubmit, setFieldValue, submitForm, values }) => (
                      <Form onSubmit={handleSubmit}>
                        {/* Modal para guardar cambios */}
                        {showModalSave && (
                          <div className="modal-conatiner">
                            <div className="modal-content">
                              <h5 className="title">Guardar cambios</h5>
                              <span className="body">
                                ¿Está seguro que desea guardar los cambios
                                realizados en el usuario actual?
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
                                    setSubmitOptions({
                                      put: true,
                                      delete: false,
                                    });
                                    submitForm();
                                  }}
                                >
                                  Sí
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Modal para eliminar usuario */}
                        {showModalDelete && (
                          <div className="modal-conatiner">
                            <div className="modal-content">
                              <h5 className="title">Eliminar usuario</h5>
                              <span className="body">
                                ¿Está seguro que desea eliminar el usuario
                                actual?
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
                                    setSubmitOptions({
                                      put: false,
                                      delete: true,
                                    });
                                    submitForm();
                                  }}
                                >
                                  Sí
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Spinner durante PUT */}
                        {putLoading && (
                          <div className="modal-conatiner">
                            <div className="modal-content">
                              <div className="spin">
                                <Spinner />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Spinner durante DELETE */}
                        {deleteLoading && (
                          <div className="modal-conatiner">
                            <div className="modal-content">
                              <div className="spin">
                                <Spinner />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Confirmación exitosa edición */}
                        {confirmEdit && (
                          <div className="modal-conatiner">
                            <div className="modal-content">
                              <h5 className="title">
                                <img src={IconSuccess} alt="" />
                                <span>Operación Exitosa</span>
                              </h5>
                              <span className="body">
                                Los cambios se aplicaron correctamente
                              </span>
                              <div className="foot">
                                <Link to="/usuarios" className="btn-scc">
                                  Cerrar
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Confirmación exitosa eliminación */}
                        {confirmDelete && (
                          <div className="modal-conatiner">
                            <div className="modal-content">
                              <h5 className="title">
                                <img src={IconSuccess} alt="" />
                                <span>Eliminación Exitosa</span>
                              </h5>
                              <span className="body">
                                Se eliminó el usuario correctamente
                              </span>
                              <div className="foot">
                                <Link to="/usuarios" className="btn-scc">
                                  Cerrar
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Campos formulario */}
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
                            <Field as="select" id="role" name="role">
                              <option value="" disabled>
                                Selecciona...
                              </option>
                              {rolesData.roles.map((rol) => (
                                <option key={rol.id} value={String(rol.id)}>
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
                              style={
                                values.blocked === "true"
                                  ? blockedStyles[0]
                                  : blockedStyles[1]
                              }
                              as="select"
                              id="blocked"
                              name="blocked"
                            >
                              <option value="" disabled>
                                Selecciona...
                              </option>
                              {blockedState.map((opt, index) => (
                                <option key={index} value={opt.prop}>
                                  {opt.des}
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div className="group-form">
                            <label htmlFor="confirmed">Confirmar usuario</label>
                            <Field as="select" id="confirmed" name="confirmed">
                              <option value="" disabled>
                                Selecciona...
                              </option>
                              {confirmedState.map((opt, index) => (
                                <option key={index} value={opt.prop}>
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
                              autoComplete="new-password"
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
                          <div
                            className="btn-dl"
                            onClick={() => setShowModalDelete(true)}
                          >
                            Borrar
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

export default GestionarUsuarios;
