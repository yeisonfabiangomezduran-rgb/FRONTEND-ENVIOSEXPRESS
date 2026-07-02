import logo from "../assets/logo.png";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "#/login";
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">

        {/* ================= MÓVIL ================= */}
        <div className="relative flex items-center justify-center py-1 md:hidden">

          {/* Menú hamburguesa */}
          <div className="absolute left-3">
            <MobileMenu />
          </div>

          {/* Logo + Texto */}
          <div className="flex items-center justify-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl shadow-sm">
              <img
                src={logo}
                alt="EnviosExpress"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                EnviosExpress
              </h1>

              <p className="text-sm text-gray-500">
                Sistema de Gestión
              </p>
            </div>

          </div>

        </div>

        {/* ================= ESCRITORIO ================= */}
        <div className="hidden items-center justify-between md:flex">

          {/* Logo */}
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl shadow-sm">
              <img
                src={logo}
                alt="EnviosExpress"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                EnviosExpress
              </h1>

              <p className="text-gray-500">
                Sistema de Gestión
              </p>
            </div>

          </div>

          {/* Usuario */}
          <button
            onClick={logout}
            title="Cerrar sesión"
            className="flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-gray-50"
          >
            <div className="text-right">
              <p className="font-bold text-gray-900">
                Admin
              </p>

              <p className="text-sm text-red-500">
                Cerrar sesión
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              A
            </div>

          </button>

        </div>

      </div>
    </header>
  );
}