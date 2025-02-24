import UsuarioIndividual from "./UsuarioIndividual";
import axiosInstance from "../../axios";
import Spinner from "../Spiner";
import { useEffect, useState } from "react";
import SearchBarUsuarios from "./SearchBarUsuario";
import { useUser } from "../../context/UserContext";

const TodosLosUsuarios = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMade, setSearchMade] = useState(false); // Estado para verificar si se ha hecho una búsqueda
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

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
      <SearchBarUsuarios onSearch={handleSearch} />{" "}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="user-container head-dis">
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

              {role === 1 ? <div className="acciones">Opciones</div> : null}
            </div>
          </div>

          {searchMade && filteredUsers.length === 0 ? (
            <div className="error-message" style={{ margin: "30px 0" }}>
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
