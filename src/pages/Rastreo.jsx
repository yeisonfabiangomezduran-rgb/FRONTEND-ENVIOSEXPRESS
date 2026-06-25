import { useState } from "react";
import { apiFetch } from "../services/api";

export default function Rastreo() {

  const [codigo, setCodigo] = useState("");
  const [envio, setEnvio] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    try {
      setError("");
      setEnvio(null);

      if (!codigo) {
        setError("Ingrese un código");
        return;
      }

      setCargando(true);

      const res = await apiFetch(`/envios/buscar/${codigo}`);

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();
      setEnvio(data);

    } catch {
      setError("Envío no encontrado");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-3 sm:p-6">

      <h2 className="text-2xl font-bold mb-6 text-center">
        📦 Rastreo de Envíos
      </h2>

      {/* 🔍 BUSCADOR */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">

        <input
          placeholder="Ingrese ID del envío"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscar()}
          className="border p-3 rounded w-full"
        />

        <button
          onClick={buscar}
          className="min-w-[120px] rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Buscar
        </button>

      </div>

      {/* ⏳ CARGANDO */}
      {cargando && (
        <p className="text-center text-gray-500">Buscando...</p>
      )}

      {/* ❌ ERROR */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* ✅ RESULTADO */}
      {envio && (
        <div className="rounded-xl bg-white p-4 shadow sm:p-6">

          <h3 className="font-bold text-lg mb-4">
            📦 Detalle del Envío
          </h3>

          <div className="space-y-2">

            <p><strong>ID:</strong> {envio.id}</p>
            <p><strong>Cliente:</strong> {envio.cliente}</p>
            <p><strong>Origen:</strong> {envio.origen}</p>
            <p><strong>Destino:</strong> {envio.destino}</p>
            <p><strong>Descripción:</strong> {envio.descripcion}</p>

            <p className="mt-3">
              <strong>Estado:</strong>

              <span className={`ml-0 mt-2 inline-block rounded-full px-3 py-1 text-sm text-white sm:ml-2 sm:mt-0 ${
                envio.estado === "Pendiente"
                  ? "bg-yellow-500"
                  : envio.estado === "En ruta"
                  ? "bg-blue-500"
                  : "bg-green-600"
              }`}>
                {envio.estado}
              </span>
            </p>

          </div>

        </div>
      )}

    </div>
  );
}
