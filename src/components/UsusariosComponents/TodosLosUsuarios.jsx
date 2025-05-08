import UsuarioIndividual from "./UsuarioIndividual";
import axiosInstance from "../../axios";
import Spinner from "../Spiner";
import { useEffect, useState } from "react";
import SearchBarUsuarios from "./SearchBarUsuario";
import { useUser } from "../../context/UserContext";
import TotalUsers from "./TotalUsers";

const TodosLosUsuarios = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMade, setSearchMade] = useState(false);
  const { user } = useUser();
  const roleName = user?.user?.data?.role?.name?.toLowerCase(); // Convertimos a minúsculas

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("users?populate=*");

      const sortedUsers = response?.data.sort((a, b) =>
        a.nombreApellido.localeCompare(b.nombreApellido)
      );
      setAllUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term, filter) => {
    setSearchMade(true); // Marcar que se ha hecho una búsqueda

    if (!term) {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter((user) => {
        const value = user[filter] ? user[filter].toString().toLowerCase() : "";
        return value.includes(term.toLowerCase());
      });
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="all-users-container">
      <SearchBarUsuarios onSearch={handleSearch} />
      {searchMade && filteredUsers.length === 0 ? null : (
        <>
          {roleName === "administrador" && <TotalUsers usuarios={allUsers} />}
        </>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {searchMade && filteredUsers.length === 0 ? null : (
            <div className="user-container head-dis">
              <div className="block encabezado">
                {roleName === "administrador" ? (
                  <div className="color"></div>
                ) : null}
                <div className="head">
                  <div className="name">Nombre usuario</div>
                </div>
                <div className="body">
                  <div className="user">Usuario</div>
                  <div className="telf">Teléfono</div>
                  <div className="role">Rol</div>
                  <div className="sexo">Sexo</div>
                </div>

                {roleName === "administrador" ? (
                  <div className="acciones">Opciones</div>
                ) : null}
              </div>
            </div>
          )}

          {searchMade && filteredUsers.length === 0 ? (
            <div className="error-message" style={{ margin: "5px 0" }}>
              No existen resultados para ese término.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <UsuarioIndividual usuario={user} key={user.id} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default TodosLosUsuarios;
