import { useUser } from "../context/UserContext";

const Home = () => {
  const { user } = useUser();
  const myUser = user?.user?.data;

  return (
    <div>
      <h2>Datos del Usuario</h2>
      <p>Usuario: {myUser ? myUser?.username : "No hay usuario"}</p>
      <p>Rol: {myUser ? myUser.role.name : "No hay usuario"}</p>
    </div>
  );
};

export default Home;
