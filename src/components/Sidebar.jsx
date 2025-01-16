import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Corregí "react-route-dom" a "react-router-dom"
import { useUser } from "../context/UserContext";
import HomeIcon from "../assets/HomeIcon.svg";
import UsersIcon from "../assets/UsersIcon.svg";
import Collapse from "../assets/Collapse.svg";
import onCollapse from "../assets/onCollapse.svg";
import InnovaText from "../assets/InnovaStoreText.svg";
import Logout from "./LogOutButton";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user } = useUser();
  const myUser = user?.user?.data;
  const location = useLocation();

  // Actualiza el estado de la barra lateral según el breakpoint
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (windowWidth < 992) {
      setCollapsed(true);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Rutas y sus permisos
  const menuItems = [
    {
      icon: HomeIcon,
      name: "Inicio",
      path: "/Home",
      roles: [1, 2, 3, 4, 5, 6],
    },
    { icon: UsersIcon, name: "Usuarios", path: "/usuarios", roles: [1, 5] },
    { icon: UsersIcon, name: "Mis asignadas", path: "/asignadas", roles: [4] },
  ];

  // Filtrar los ítems del menú según el rol del usuario
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(myUser?.role?.id)
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
                    location.pathname === item.path ? "active" : "item-nav"
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
