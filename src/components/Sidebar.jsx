import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../assets/HomeIcon.svg";
import UsersIcon from "../assets/UsersIcon.svg";
import Collapse from "../assets/Collapse.svg";
import onCollapse from "../assets/onCollapse.svg";
import InnovaText from "../assets/InnovaStoreText.svg";
import LogOut from "../assets/LogOut.svg";
import Logout from "./LogOutButton";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Rutas y sus nombres
  const menuItems = [
    { icon: HomeIcon, name: "Inicio", path: "/Home" },
    { icon: UsersIcon, name: "Usuarios", path: "/usuarios" },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div
        className={collapsed ? "sidebar-header-collapsed" : "sidebar-header"}
      >
        {collapsed ? null : (
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
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={
                location.pathname === item.path ? "active" : "item-nav"
              }
            >
              <Link to={item.path}>
                <img src={item.icon} alt="" />

                {collapsed ? null : item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="sidebar-end">
        <Logout collapsed={collapsed}/>
      </nav>
    </div>
  );
};

export default Sidebar;
