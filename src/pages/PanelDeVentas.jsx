// importaciones
import { useState } from "react";

// Componentes
import HeaderVentas from "../components/SellerComponents/HeaderVentas";
import SectionGeneral from "../components/SellerComponents/SectionGeneral";
import SectionMySales from "../components/SellerComponents/sectionMySales";

const PanelDeVentas = () => {
  // Estados
  const [activeTab, setActiveTab] = useState("tab1");

  return (
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
              <SectionMySales />
            </div>
          )}
          {activeTab === "tab3" && (
            <div className="content-tab">
              <h1>Mis ventas</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PanelDeVentas;
