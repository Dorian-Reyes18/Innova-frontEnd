import { useUser } from "../context/UserContext"; 

const Home = () => {
  const { user } = useUser(); 
  console.log(user);

  return (
    <div>
      <h2>Datos del Usuario</h2>
      <p>Usuario: {user ? user.user.username : "No hay usuario"}</p>
      <p>Rol: {user ? user.user.username : "No hay usuario"}</p>
      
    </div>
  );
};

export default Home;
