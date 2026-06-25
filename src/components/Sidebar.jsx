import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex flex-1 items-center justify-center gap-2 border-b-2 py-4 text-base font-bold transition ${
      isActive
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-900"
    }`;

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl">
        <nav className="flex w-full">

          <NavLink to="/" className={linkClass}>
            <span>📊</span>
            Dashboard
          </NavLink>

          <NavLink to="/envios" className={linkClass}>
            <span>📦</span>
            Envíos
          </NavLink>

          <NavLink to="/rastreo" className={linkClass}>
            <span>📍</span>
            Rastreo
          </NavLink>

          <NavLink to="/conductores" className={linkClass}>
            <span>👥</span>
            Conductores
          </NavLink>

          <NavLink to="/vehiculos" className={linkClass}>
            <span>🚚</span>
            Vehículos
          </NavLink>

        </nav>
      </div>
    </div>
  );
}