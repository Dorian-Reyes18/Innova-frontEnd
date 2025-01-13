import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/userContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/app.main.scss";

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Ruta inicial */}
        <Route path="/" element={<Navigate to="/Login" />} />

        {/* Ruta de Login */}
        <Route path="/Login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div style={{ flex: 1, padding: "20px" }}>
                  <Home />
                </div>
              </div>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
