import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-white px-3 py-2 sm:px-6">

      {/* IZQUIERDA */}
      <h1 className="font-semibold text-gray-800">
        🚚 Panel Logístico
      </h1>

      {/* DERECHA */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">

        {/* ICONO ADMIN */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <span>👤</span>
          <span className="text-sm font-medium">Admin</span>
        </div>

        {/* BOTÓN LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Cerrar sesión
        </button>

      </div>

    </div>
  );
}
