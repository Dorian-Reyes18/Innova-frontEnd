import PropTypes from "prop-types";

const UsuarioIndividual = ({ usuario }) => {
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
        <div className="acciones">
          <div className="btn-out">ver</div>
        </div>
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
