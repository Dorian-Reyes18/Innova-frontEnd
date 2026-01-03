import IconNoResults from "../../assets/IconNoResults.svg";
import PropTypes from "prop-types";

function NoResults({ message, submessage }) {
  return (
    <div className="no-results-container">
      <img src={IconNoResults} alt="Icono sin resultados" />
      <div className="message">{message}</div>
      <div className="submessage">{submessage}</div>
    </div>
  );
}

NoResults.propTypes = {
  message: PropTypes.string,
  submessage: PropTypes.string,
};
export default NoResults;
