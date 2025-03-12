import PropTypes from "prop-types";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

const UsuarioIndividual = ({ usuario }) => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;
  const blocked = usuario?.blocked;

  const determinarColor = () => {
    return usuario.confirmed ? "#36E43D" : "#DD4EEA";
  };

  return (
    <div className="user-container mobile">
      <div className="block" style={{ background: blocked ? "#ffefef" : null }}>
        {role === 1 && (
          <div
            className="color"
            style={{
              border: "none",
              background: determinarColor(),
            }}
          ></div>
        )}
        <div className="head">
          <div className="name">{usuario?.nombreApellido}</div>
        </div>
        <div className="body">
          <div className="user">
            <div className="label">Usuario:</div>
            {usuario?.username}
          </div>
          <div className="telf">
            <div className="label">Teléfono:</div>
            {usuario?.telefono}
          </div>
          <div className="role">
            <div className="label">Rol:</div>
            {usuario?.role?.name}
          </div>
          <div className="sexo">
            <div className="label">Sexo:</div>
            {usuario?.sexo}
          </div>
        </div>
        {role === 1 ? (
          <div className="acciones">
            <Link className="btn-out" to={`gestionar-usuarios/${usuario.id}`}>
              Editar
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

UsuarioIndividual.propTypes = {
  usuario: PropTypes.shape({
    nombreApellido: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    telefono: PropTypes.string,
    sexo: PropTypes.string,
    id: PropTypes.number,
    blocked: PropTypes.bool,
    confirmed: PropTypes.bool,
    role: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UsuarioIndividual;
