import UsuarioIndividual from "./UsuarioIndividual";
import axiosInstance from "../../axios";
import Spinner from "../Spiner";
import { useEffect, useState } from "react";

const TodosLosUsuarios = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("users?populate=*");

      const sortedUsers = response?.data.sort((a, b) =>
        a.nombreApellido.localeCompare(b.nombreApellido)
      );
      setAllUsers(sortedUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="all-users-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="user-container ">
            <div className="block encabezado">
              <div className="head">
                <div className="name">Nombre usuario</div>
              </div>
              <div className="body">
                <div className="user">Usuario</div>
                <div className="telf">Teléfono</div>
                <div className="role">Rol</div>
                <div className="sexo">Sexo</div>
              </div>
              <div className="acciones">Opciones</div>
            </div>
          </div>
          {allUsers.map((user) => (
            <UsuarioIndividual usuario={user} key={user.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default TodosLosUsuarios;
