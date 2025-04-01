import { useState } from "react";
import { Formik, Form, Field } from "formik";

const FiltroDeVentas = () => {
  // Definimos un estado para guardar la opción seleccionada
  const [selectedOption, setSelectedOption] = useState("En tramite");

  // Manejador de cambio para actualizar el estado con la opción seleccionada
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Formik
      initialValues={{ filtro: "En tramite" }}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form className="filter-selector">
          {/* Select usando Formik Field */}
          <Field
            as="select"
            name="filtro"
            onChange={(e) => {
              handleSelectChange(e);
            }}
          >
            <option value="En tramite">En tramite</option>
            <option value="Por asignar">Por asignar</option>
            <option value="Asignada">Asignada</option>
            <option value="En ruta">En ruta</option>
            <option value="Rechazada">Rechazada</option>
            <option value="Entregada">Entregada</option>
          </Field>

          {/* Renderizado condicional de los contenedores según la opción seleccionada */}
          {selectedOption === "En tramite" && (
            <div className="en-tramite">
              {/* Aquí se carga un componente especial para "En tramite" */}
              {/* <EnTramiteComponent /> */}
              <p>Contenido para En tramite</p>
            </div>
          )}
          {selectedOption === "Por asignar" && (
            <div className="por-asignar">
              <p>Contenido para Por asignar</p>
            </div>
          )}
          {selectedOption === "Asignada" && (
            <div className="asignada">
              <p>Contenido para Asignada</p>
            </div>
          )}
          {selectedOption === "En ruta" && (
            <div className="en-ruta">
              <p>Contenido para En ruta</p>
            </div>
          )}
          {selectedOption === "Rechazada" && (
            <div className="rechazada">
              <p>Contenido para Rechazada</p>
            </div>
          )}
          {selectedOption === "Entregada" && (
            <div className="entregada">
              <p>Contenido para Entregada</p>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FiltroDeVentas;
