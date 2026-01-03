import { useState, useEffect } from "react";
import { Formik, Field, useFormikContext } from "formik";
import PropTypes from "prop-types";
import LayoutVenta from "../LayoutVenta";
import NoResults from "../NoResults";

const EstadoWatcher = ({ onChange }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    onChange(values.filtro);
  }, [values.filtro, onChange]);

  return null;
};

EstadoWatcher.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const FiltroDeVentas = ({ salesGroup, setReAmount }) => {
  const [selectedOption, setSelectedOption] = useState("En tramite");

  // Función para obtener las ventas según el estado seleccionado
  const obtenerVentasPorEstado = (estado) => {
    const grupoEncontrado = salesGroup.find((grupo) => grupo.name === estado);
    return grupoEncontrado?.sales || [];
  };

  return (
    <Formik
      initialValues={{ filtro: "En tramite" }}
      onSubmit={() => {}} // ya no se usa, pero formik lo exige
    >
      {() => (
        <div className="filter-selector">
          {/* Sincroniza el select con Formik → y con estado local */}
          <EstadoWatcher onChange={setSelectedOption} />

          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div className="label" style={{ width: "200px" }}>
              Resultados por estado
            </div>
            <Field as="select" name="filtro">
              <option value="En tramite">En tramite</option>
              <option value="Por asignar">Por asignar</option>
              <option value="Asignadas">Asignadas</option>
              <option value="En ruta">En ruta</option>
              <option value="Rechazada">Rechazada</option>
              <option value="Entregada">Entregada</option>
            </Field>
          </div>

          <div className="content-result">
            {(() => {
              const ventasFiltradas = obtenerVentasPorEstado(selectedOption);

              if (ventasFiltradas.length === 0) {
                return (
                  <>
                    <span className="count-result">0 resultados</span>
                    <NoResults
                      message={`No se encontraron ventas en la sección "${selectedOption}"`}
                      submessage={
                        "Intenta cambiar los filtros o el termino de búsqueda"
                      }
                    />
                  </>
                );
              }

              return (
                <>
                  <span className="count-result">
                    {ventasFiltradas.length} resultado
                    {ventasFiltradas.length === 1 ? "" : "s"}
                  </span>

                  <div className="sales-list">
                    {ventasFiltradas.map((venta) => (
                      <LayoutVenta
                        key={venta.codigoVenta}
                        venta={venta}
                        setReAmount={setReAmount}
                      />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </Formik>
  );
};

FiltroDeVentas.propTypes = {
  salesGroup: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sales: PropTypes.arrayOf(
        PropTypes.shape({
          // ajusta esto según tu modelo de "venta"
          codigoVenta: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  setReAmount: PropTypes.func.isRequired,
};

export default FiltroDeVentas;
