import PropTypes from "prop-types";
import { useUser } from "../../context/UserContext";

const UsuarioIndividual = ({ usuario }) => {
  const { user } = useUser();
  const role = user?.user?.data?.role?.id;

  return (
    <div className="user-container">
      <div className="block">
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
            <div className="btn-out">ver</div>
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
    role: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UsuarioIndividual;
