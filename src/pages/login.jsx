import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axios";
import { useUser } from "../context/UserContext";
import LogoInnova from "../assets/LogoInnova.svg";
import KeyIcon from "../assets/Llave.svg";
import UserIcon from "../assets/User.svg";
import BolHead from "../assets/bolas-head.svg";
import BolFoot from "../assets/bolas-foot.svg";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setErrorMessage("Por favor, ingrese su usuario y contraseña.");
      return;
    }

    localStorage.removeItem("authToken");

    try {
      console.log("Datos enviados:", { identifier: userName, password });

      const response = await axiosInstance.post(
        "/auth/local",
        { identifier: userName, password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("authToken", response.data.jwt);

      // Guardar los datos del usuario en el contexto
      setUserData({ jwt: response.data.jwt, user: response.data.user });

      navigate("/Home");
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.error.name === "ValidationError") {
          setErrorMessage("Usuario o contraseña incorrectos.");
        } else {
          setErrorMessage(
            "Ocurrió un error en el servidor. Inténtalo más tarde."
          );
        }
      } else {
        setErrorMessage(
          "Error al realizar la solicitud. Verifica tu conexión."
        );
      }
    }
  };

  return (
    <div className="login-container">
      <div className="head">
        <img src={BolHead} alt="" />
      </div>
      <div className="content">
        <div className="block">
          <img className="logo" src={LogoInnova} alt="" />
        </div>
        <div className="block">
          <h5>Sistema Gestor</h5>
          {errorMessage && (
            <p style={{ color: "red", fontWeight: "bold", fontSize: 14 }}>
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleLogin}>
            <div className="inp-group">
              <img src={UserIcon} alt="" />
              <input
                className="form-control"
                type="text"
                placeholder="Nombre de usuario"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="inp-group">
              <img src={KeyIcon} alt="" />

              <input
                className="form-control inputs"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn" type="submit">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <div className="foot">
        <img src={BolFoot} alt="" />
      </div>
    </div>
  );
};

export default Login;
