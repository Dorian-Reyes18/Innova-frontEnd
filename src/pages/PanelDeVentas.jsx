import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Componentes
import HeaderVentas from "../components/SellerComponents/HeaderVentas";
import SectionGeneral from "../components/SellerComponents/SectionGeneral";
import SectionPerSales from "../components/SellerComponents/SectionPerSales";
import SectionMySales from "../components/SellerComponents/sectionMySales";

const PanelDeVentas = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/panel-de-ventas";
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <>
      {isRootPath && (
        <>
          <HeaderVentas />
          <div className="container-general-ventas">
            {/* Tabs section */}
            <div className="container-tabs">
              <div
                className={`tab ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => setActiveTab("tab1")}
              >
                <span>General</span>
              </div>
              <div
                className={`tab ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => setActiveTab("tab2")}
              >
                Por vendedor
              </div>
              <div
                className={`tab ${activeTab === "tab3" ? "active" : ""}`}
                onClick={() => setActiveTab("tab3")}
              >
                Mis ventas
              </div>
            </div>

            {/* Content rendering */}
            <div className="container-content">
              {activeTab === "tab1" && (
                <div className="content-tab">
                  <SectionGeneral />
                </div>
              )}
              {activeTab === "tab2" && (
                <div className="content-tab">
                  <SectionPerSales />
                </div>
              )}
              {activeTab === "tab3" && (
                <div className="content-tab">
                  <SectionMySales />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Aquí se mostrarán las subrutas (ventas-pendientes, etc.) */}
      <Outlet />
    </>
  );
};

export default PanelDeVentas;
