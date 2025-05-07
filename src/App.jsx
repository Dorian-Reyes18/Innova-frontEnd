// Dependencias
import { UserProvider } from "./context/userContext";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/app.main.scss";

// Componentes
import Sidebar from "./components/Sidebar";
import Header from "./components/homeComponents/Header";

// Paginas
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Asignadas from "./pages/Asignadas";
import Productos from "./pages/Productos";
import Usuarios from "./pages/Usuarios";
import GestionarProductos from "./pages/GestionarProductos";
import CrearProducto from "./pages/CrearProducto";
import GestionarUsuarios from "./pages/GestionarUsuarios";
import CrearUsuarios from "./pages/CrearUsuarios";
import PanelDeVentas from "./pages/PanelDeVentas";
import VentasPendientes from "./pages/VentasPendientes";
import VentasPagadas from "./pages/VentasPagadas";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div className="general-container">
                  <div className="block-container">
                    <Header />
                    <Home />
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/asignadas"
          element={
            <PrivateRoute>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div className="general-container">
                  <div className="block-container">
                    <Asignadas />
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        />

        {/* Ruta de Productos y su subpágina */}
        <Route
          path="/productos"
          element={
            <PrivateRoute>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div className="general-container">
                  <div className="block-container">
                    <Productos />
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        >
          <Route
            path="gestionar-productos/:id"
            element={<GestionarProductos />}
          />
          <Route path="crear-producto" element={<CrearProducto />} />
        </Route>

        {/* Ruta de Usuarios y su subpágina */}
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div className="general-container">
                  <div className="block-container">
                    <Usuarios />
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        >
          <Route
            path="gestionar-usuarios/:id"
            element={<GestionarUsuarios />}
          />
          <Route path="crear-usuario" element={<CrearUsuarios />} />
        </Route>

        {/* Ruta Panel de ventas y subpaginas */}
        <Route
          path="/panel-de-ventas"
          element={
            <PrivateRoute>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div className="general-container">
                  <div className="block-container">
                    <PanelDeVentas />
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        >
          <Route path="ventas-pendientes" element={<VentasPendientes />} />
          <Route path="ventas-pagadas" element={<VentasPagadas />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
