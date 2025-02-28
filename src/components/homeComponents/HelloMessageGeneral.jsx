import { useUser } from "../../context/UserContext";

const HelloMessageGeneral = () => {
  const { user } = useUser();
  const myUser = user?.user?.data;

  return (
    <div className="hello-message">
      <p className="t1">
        {myUser?.sexo === "Masculino" ? "Bienvenido" : "Bienvenida"} {""}
        <strong>{myUser?.nombreApellido}</strong>
      </p>
      <p className="t2">¿Que desea hacer?</p>
    </div>
  );
};
export default HelloMessageGeneral;
