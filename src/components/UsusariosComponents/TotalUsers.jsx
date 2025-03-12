import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TotalUsers = ({ usuarios }) => {
  // Estados
  const [clasificacion, setClasificacion] = useState({
    total: 0,
    activos: 0,
    inactivos: 0,
    bloqueados: 0,
  });

  // Funciones
  const clasificarUsuarios = () => {
    const clasificacionUsuarios = {
      total: usuarios.length,
      activos: usuarios.filter((usuario) => usuario.confirmed).length,
      inactivos: usuarios.filter((usuario) => !usuario.confirmed).length,
      bloqueados: usuarios.filter((usuario) => usuario.blocked).length,
    };

    setClasificacion(clasificacionUsuarios);
  };

  useEffect(() => {
    clasificarUsuarios();
  }, [usuarios]);

  useEffect(() => {}, [clasificacion]);

  return (
    <div className="container-total-users">
      <div className="block">
        <span className="color" style={{ background: "#00AFFF" }}></span>
        <div className="total">
          <span>Totales:</span>
          <span style={{ fontWeight: 700 }}>{clasificacion.total}</span>
        </div>
      </div>
      <div className="block">
        <span className="color" style={{ background: "#36E43D" }}></span>
        <div className="total">
          <span>Activos:</span>
          <span style={{ fontWeight: 700 }}>{clasificacion.activos}</span>
        </div>
      </div>
      <div className="block">
        <span className="color" style={{ background: "#DD4EEA" }}></span>
        <div className="total">
          <span>Inactivos:</span>
          <span style={{ fontWeight: 700 }}>{clasificacion.inactivos}</span>
        </div>
      </div>
      <div className="block">
        <span className="color" style={{ background: "#FF5959" }}></span>
        <div className="total">
          <span>Bloqueados:</span>
          <span style={{ fontWeight: 700 }}>{clasificacion.bloqueados}</span>
        </div>
      </div>
    </div>
  );
};

TotalUsers.propTypes = {
  usuarios: PropTypes.arrayOf(
    PropTypes.shape({
      activo: PropTypes.bool.isRequired,
      bloqueado: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

TotalUsers.defaultProps = {
  usuarios: [],
};

export default TotalUsers;
