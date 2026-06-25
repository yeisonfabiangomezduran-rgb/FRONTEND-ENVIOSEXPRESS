import logo from "../assets/logo.png";
export default function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "#/login";
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

  {/* LOGO Y TEXTO */}
  <div className="flex items-center gap-5">

    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl shadow-sm">
      <img
        src={logo}
        alt="EnviosExpress"
        className="h-full w-full object-cover"
      />
    </div>

    <div>
      <h1 className="text-2xl font-bold leading-tight text-gray-900">
        EnviosExpress
      </h1>

      <p className="text-sm font-medium text-gray-500">
        Sistema de Gestión
      </p>
    </div>

  </div>
        

        <button
          onClick={logout}
          className="flex items-center gap-4 rounded-lg px-2 py-1 text-right transition hover:bg-gray-50"
          title="Cerrar sesión"
        >
          <div>
            <p className="font-bold text-gray-900">
              Admin
            </p>

            <p className="text-sm font-semibold text-red-500">
              Cerrar sesión
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            A
          </div>
        </button>

      </div>
    </header>
  );
}