import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axios";
import LogoInnova from "../assets/LogoInnova.svg";
import KeyIcon from "../assets/Llave.svg";
import UserIcon from "../assets/User.svg";
import BolHead from "../assets/bolas-head.svg";
import BolFoot from "../assets/bolas-foot.svg";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/Login", {
        userName,
        password,
      });
      localStorage.setItem("authToken", response.data.jwt);
      navigate("/Home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
          <h4>Sistema Gestor</h4>
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
