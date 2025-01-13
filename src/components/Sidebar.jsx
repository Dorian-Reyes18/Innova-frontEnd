import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Rutas y sus nombres
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Usuarios", path: "/usuarios" },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="toggle-btn">
          {collapsed ? ">" : "<"}
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
