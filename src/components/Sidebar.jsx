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
  const { user } = useUser();
  const myUser = user?.user?.data;
  const location = useLocation();

  const role = myUser?.role?.name?.toLowerCase(); // Convertimos el rol a minúsculas

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  // Definir rutas y permisos
  const menuItems = [
    {
      icon: HomeIcon,
      name: "Inicio",
      path: "/Home",
      roles: ["administrador", "public", "delivery", "stocker", "vendedor"],
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
    {
      icon: TagIconSellerNav,
      name: "Panel Ventas",
      path: "/panel-de-ventas",
      roles: ["administrador", "stocker", "vendedor"],
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
          <img src={collapsed ? onCollapse : Collapse} alt="toggle sidebar" />
        </button>
      </div>

      {!collapsed && (
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
                  <Link to={item.path}>
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
