import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import HomeIcon from "../assets/HomeIcon.svg";
import UsersIcon from "../assets/UsersIcon.svg";
import Collapse from "../assets/Collapse.svg";
import onCollapse from "../assets/onCollapse.svg";
import InnovaText from "../assets/InnovaStoreText.svg";
import AsignadaSidebarIcon from "../assets/AsignadaSidebarIcon.svg";
import StockMenuIcon from "../assets/StcokMenuIcon.svg";
import TagIconSellerNav from "../assets/TagIconSellerNav.svg";
import Logout from "./LogOutButton";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 992);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user } = useUser();
  const myUser = user?.user?.data;
  const location = useLocation();
  const role = myUser?.role?.name?.toLowerCase(); // Convertimos el rol a minúsculas

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 992) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Función para manejar el clic en un ítem del menú
  const handleItemClick = () => {
    if (window.innerWidth < 992) {
      setCollapsed(true);
    }
  };

  // Definir rutas y permisos
  const menuItems = [
    {
      icon: HomeIcon,
      name: "Inicio",
      path: "/Home",
      roles: ["administrador", "public", "delivery", "stocker", "vendedor"],
    },
    {
      icon: TagIconSellerNav,
      name: "Ventas",
      path: "/panel-de-ventas",
      roles: ["administrador", "stocker", "vendedor"],
    },
    {
      icon: StockMenuIcon,
      name: "Stock",
      path: "/productos",
      roles: ["administrador", "public", "delivery", "stocker", "vendedor"],
    },
    {
      icon: UsersIcon,
      name: "Usuarios",
      path: "/usuarios",
      roles: ["administrador", "stocker"],
    },
    {
      icon: AsignadaSidebarIcon,
      name: "Mis asignadas",
      path: "/asignadas",
      roles: ["delivery"],
    },
  ];

  // Filtrar los ítems del menú según el rol del usuario
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div
        className={collapsed ? "sidebar-header-collapsed" : "sidebar-header"}
      >
        {!collapsed && (
          <img src={InnovaText} alt="InnovaText" className="innovaText" />
        )}
        <button onClick={toggleSidebar} className="toggle-btn">
          {collapsed ? (
            <img src={onCollapse} alt="onCollapse" />
          ) : (
            <img src={Collapse} alt="collapse" />
          )}
        </button>
      </div>
      {windowWidth < 992 && collapsed ? null : (
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul>
              {filteredMenuItems.map((item) => (
                <li
                  key={item.path}
                  className={
                    location.pathname.startsWith(item.path)
                      ? "active"
                      : "item-nav"
                  }
                >
                  <Link to={item.path} onClick={handleItemClick}>
                    <img src={item.icon} alt="" />
                    {!collapsed && item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="sidebar-end">
            <Logout collapsed={collapsed} />
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
