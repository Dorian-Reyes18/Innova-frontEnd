import { useState, useEffect } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import LayoutVenta from "../LayoutVenta";

const EstadoWatcher = ({ onChange }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    onChange(values.filtro);
  }, [values.filtro, onChange]);

  return null;
};

const FiltroDeVentas = ({ salesGroup }) => {
  const [selectedOption, setSelectedOption] = useState("En tramite");

  // Función para obtener las ventas según el estado seleccionado
  const obtenerVentasPorEstado = (estado) => {
    const grupoEncontrado = salesGroup.find((grupo) => grupo.name === estado);
    return grupoEncontrado?.sales || [];
  };

  return (
    <Formik
      initialValues={{ filtro: "En tramite" }}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form className="filter-selector">
          {/* Sincronizamos el valor del select de Formik con el estado local */}
          <EstadoWatcher onChange={setSelectedOption} />

          <label htmlFor="filtro">Resultados por estado</label>
          <Field as="select" name="filtro">
            <option value="En tramite">En tramite</option>
            <option value="Por asignar">Por asignar</option>
            <option value="Asignadas">Asignadas</option>
            <option value="En ruta">En ruta</option>
            <option value="Rechazada">Rechazada</option>
            <option value="Entregada">Entregada</option>
          </Field>

          <div className="content-result">
            {(() => {
              const ventasFiltradas = obtenerVentasPorEstado(selectedOption);

              if (ventasFiltradas.length === 0) {
                return (
                  <p className="error-message" style={{ margin: "30px 0" }}>
                    No hay ventas que mostrar en esta sección
                  </p>
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
                      <LayoutVenta key={venta.codigoVenta} venta={venta} />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FiltroDeVentas;
