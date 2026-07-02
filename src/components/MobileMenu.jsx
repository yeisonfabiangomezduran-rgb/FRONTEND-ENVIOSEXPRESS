import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "#/login";
  };

  const links = [
    { to: "/", label: "Dashboard", icon: "📊" },
    { to: "/envios", label: "Envíos", icon: "📦" },
    { to: "/rastreo", label: "Rastreo", icon: "📍" },
    { to: "/conductores", label: "Conductores", icon: "👥" },
    { to: "/vehiculos", label: "Vehículos", icon: "🚚" },
  ];

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
        aria-label="Abrir menú"
      >
        <Menu size={28} />
      </button>

      {/* Fondo oscuro */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Menú lateral */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-xl font-bold text-blue-600">
            EnviosExpress
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        {/* Opciones */}
        <nav className="flex-1 p-4">

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>

              <span>{link.label}</span>
            </NavLink>
          ))}

        </nav>

        {/* Usuario */}
        <div className="border-t p-4">

          <div className="mb-4 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              A
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Administrador
              </p>

              <p className="text-sm text-gray-500">
                Sesión activa
              </p>
            </div>

          </div>

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>

        </div>

      </aside>
    </>
  );
}