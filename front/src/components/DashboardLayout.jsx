import React from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = ({ menu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const section = location.pathname.split('/')[1];
  const profileBase = ['customer', 'biller', 'admin'].includes(section)
    ? section
    : localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth/login');
  };

  return (
    <div className="dash-grid">
      {}
      <header className="bar topbar">
        <h1 className="app-title">PGS Pay</h1>
        <button
          onClick={handleLogout}
          className="icon-btn logout-btn"
          title="Log out"
        >
          <LogOut size={20} />
        </button>
      </header>

      {}
      <aside className="bar sidebar">
        {menu.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <Icon size={20} className="icon" />
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}

        {}
        <NavLink
          to={`/${profileBase}/profile`}
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <User size={20} className="icon" />
          <span className="nav-label">Profile</span>
        </NavLink>
      </aside>

      {}
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;


