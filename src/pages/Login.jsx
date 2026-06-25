import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex">

      {/* 🔵 PANEL IZQUIERDO */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white flex-col justify-center p-12">

        <h1 className="text-4xl font-bold mb-4">
          🚚 Transportadora
        </h1>

        <p className="text-lg mb-6">
          Sistema de gestión logística para el control de envíos, conductores y vehículos.
        </p>

        <div className="space-y-2 text-sm">
          <p>📦 Gestión de envíos</p>
          <p>📍 Rastreo en tiempo real</p>
          <p>🚗 Control de flota</p>
          <p>📊 Dashboard operativo</p>
        </div>

      </div>

      {/* ⚪ PANEL DERECHO */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-80">

          <h2 className="text-xl font-bold text-center mb-6">
            🔐 Login Admin
          </h2>

          <input
            className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>

        </div>

      </div>

    </div>
  );
}