import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-2 border-b-2 px-5 py-4 text-sm font-semibold transition-all duration-200
    md:flex-1 md:justify-center md:text-base
    ${
      isActive
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
    }`;

  return (
    <div className="hidden border-b border-gray-200 bg-white shadow-sm md:block">
      <div className="mx-auto max-w-7xl">
        <nav
          className="
            flex
            overflow-x-auto
            whitespace-nowrap
            scrollbar-thin
            scrollbar-thumb-gray-300
            scrollbar-track-transparent
          "
        >
          <NavLink to="/" className={linkClass}>
            <span>📊</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/envios" className={linkClass}>
            <span>📦</span>
            <span>Envíos</span>
          </NavLink>

          <NavLink to="/rastreo" className={linkClass}>
            <span>📍</span>
            <span>Rastreo</span>
          </NavLink>

          <NavLink to="/conductores" className={linkClass}>
            <span>👥</span>
            <span>Conductores</span>
          </NavLink>

          <NavLink to="/vehiculos" className={linkClass}>
            <span>🚚</span>
            <span>Vehículos</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}