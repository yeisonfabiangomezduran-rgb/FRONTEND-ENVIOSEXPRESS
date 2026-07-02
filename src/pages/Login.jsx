import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

import logo from "../assets/logo.png";
import camion from "../assets/camion-login.png";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrar, setMostrar] = useState(false);

  const navigate = useNavigate();

  const login = () => {
    if (usuario === "admin" && password === "1234") {
      localStorage.setItem("token", "ok");
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">

      {/* PANEL IZQUIERDO */}
      <div
        className="hidden md:block relative md:w-1/2 overflow-hidden"
        style={{
          backgroundImage: `url(${camion})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* CAPA OSCURA */}
        <div className="absolute inset-0 bg-blue-900/75"></div>

        {/* CONTENIDO */}
        <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-16 text-white">

          <div>

            {/* LOGO */}
            <div className="mb-10 flex items-center gap-5">

              <img
                src={logo}
                alt="EnviosExpress"
                className="h-20 w-20 rounded-2xl bg-white p-2 shadow-xl"
              />

              <div>
                <h1 className="text-4xl font-bold">
                  EnviosExpress
                </h1>

                <p className="text-lg text-blue-100">
                  Sistema de Gestión Logística
                </p>
              </div>

            </div>

            {/* DESCRIPCIÓN */}
            <p className="mb-10 max-w-md text-lg leading-relaxed text-blue-100">
              Controla envíos, conductores, vehículos y operaciones
              desde un solo lugar.
            </p>

            {/* FUNCIONALIDADES */}
            <div className="space-y-5 text-lg">

              <div className="flex items-center gap-3">
                📦 Gestión de envíos
              </div>

              <div className="flex items-center gap-3">
                📍 Rastreo en tiempo real
              </div>

              <div className="flex items-center gap-3">
                👥 Administración de conductores
              </div>

              <div className="flex items-center gap-3">
                🚚 Control de flota
              </div>

              <div className="flex items-center gap-3">
                📊 Dashboard operativo
              </div>

            </div>

          </div>

          <div className="text-sm text-blue-100">
            Seguridad, eficiencia y control para cada envío.
          </div>

        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6 md:p-8">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 md:p-10 shadow-2xl">

          {/* ENCABEZADO */}
          <div className="mb-8 text-center">

            <div className="mb-4 text-5xl">
              🔐
            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              Bienvenido
            </h2>

            <p className="mt-2 text-gray-500">
              Inicia sesión para continuar
            </p>

          </div>

          {/* USUARIO */}
          <div className="relative mb-5">

            <User
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="h-14 w-full rounded-xl border border-gray-300 pl-12 pr-4 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* CONTRASEÑA */}
          <div className="relative mb-6">

            <Lock
              size={20}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type={mostrar ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 w-full rounded-xl border border-gray-300 pl-12 pr-12 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setMostrar(!mostrar)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              {mostrar ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* BOTÓN */}
          <button
            onClick={login}
            className="h-14 w-full rounded-xl bg-blue-600 text-lg font-bold text-white transition hover:bg-blue-700 hover:shadow-lg"
          >
            Iniciar Sesión
          </button>

          {/* PIE */}
          <div className="mt-8 border-t border-gray-100 pt-6 text-center text-sm text-gray-400">
            Sistema seguro de gestión logística
          </div>

        </div>

      </div>

    </div>
  );
}