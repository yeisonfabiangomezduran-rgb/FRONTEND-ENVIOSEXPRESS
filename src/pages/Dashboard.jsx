import { useEffect, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { apiFetch } from "../services/api";

const statusStyles = {
  Pendiente: "bg-orange-100 text-orange-700 border-orange-200",
  "En ruta": "bg-blue-100 text-blue-700 border-blue-200",
  Entregado: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const statusLabels = {
  Pendiente: "Pendiente",
  "En ruta": "En tránsito",
  Entregado: "Entregado",
};

function StatCard({ title, value, trend, trendColor, icon, iconClass }) {
  return (
    <div className="flex min-h-[130px] min-w-[220px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-500">{title}</p>
          <h2 className="mt-3 text-3xl font-bold leading-none text-gray-900">
            {value}
          </h2>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl ${iconClass}`}>
          {icon}
        </div>
      </div>

      <p className={`text-sm font-bold ${trendColor}`}>
        {trend}
      </p>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Sin fecha";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function Dashboard() {
  const [envios, setEnvios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarEnvios = async () => {
      try {
        setCargando(true);
        setError("");

        const res = await apiFetch("/envios");

        if (!res.ok) {
          throw new Error("No se pudo cargar el dashboard");
        }

        const data = await res.json();
        setEnvios(Array.isArray(data) ? data : []);
      } catch {
        setError("No se pudo conectar con el backend de Render.");
      } finally {
        setCargando(false);
      }
    };

    cargarEnvios();
  }, []);

  const resumen = useMemo(() => {
    const enTransito = envios.filter(e => e.estado === "En ruta").length;
    const entregados = envios.filter(e => e.estado === "Entregado").length;
    const pendientes = envios.filter(e => e.estado === "Pendiente").length;

    return {
      total: envios.length,
      enTransito,
      entregados,
      pendientes,
    };
  }, [envios]);

  const enviosRecientes = envios.slice(0, 5);

  return (
    
    <div className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-7xl px-8 py-8">
      <section className="mb-9">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Panel de Control
        </h1>
        <p className="mt-2 text-xl font-semibold text-gray-500">
          Resumen general de operaciones
        </p>
      </section>

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <section className="mb-6 grid grid-cols-4 gap-4 overflow-x-auto">
        <StatCard
          title="Envíos Totales"
          value={cargando ? "..." : resumen.total.toLocaleString("es-CO")}
          trend="↑ 12% vs mes anterior"
          trendColor="text-emerald-600"
          icon="📦"
          iconClass="bg-blue-100"
        />
        <StatCard
          title="En Tránsito"
          value={cargando ? "..." : resumen.enTransito}
          trend="↑ 8 nuevos hoy"
          trendColor="text-emerald-600"
          icon="🚚"
          iconClass="bg-orange-100"
        />
        <StatCard
          title="Entregados Hoy"
          value={cargando ? "..." : resumen.entregados}
          trend="↑ 15% vs ayer"
          trendColor="text-emerald-600"
          icon="✅"
          iconClass="bg-emerald-100"
        />
        <StatCard
          title="Pendientes"
          value={cargando ? "..." : resumen.pendientes}
          trend="↓ 5% vs ayer"
          trendColor="text-red-600"
          icon="⏱️"
          iconClass="bg-purple-100"
        />
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-50 text-sm font-bold uppercase tracking-wide text-gray-500">
                <th className="border-b border-r border-gray-200 px-8 py-5">ID Envío</th>
                <th className="border-b border-r border-gray-200 px-8 py-5">Cliente</th>
                <th className="border-b border-r border-gray-200 px-8 py-5">Destino</th>
                <th className="border-b border-r border-gray-200 px-8 py-5">Estado</th>
                <th className="border-b border-gray-200 px-8 py-5">Fecha</th>
              </tr>
            </thead>

            <tbody className="text-lg text-gray-900">
              {enviosRecientes.map((envio, index) => (
                <tr key={envio.id || index} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-8 py-6 font-bold">
                    {envio.codigo || `ENV-${String(envio.id || index + 1).padStart(4, "0")}`}
                  </td>
                  <td className="px-8 py-6 font-semibold">{envio.cliente || "Sin cliente"}</td>
                  <td className="px-8 py-6 font-semibold">{envio.destino || "Sin destino"}</td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex rounded-full border px-4 py-1 text-base font-bold ${statusStyles[envio.estado] || "border-gray-200 bg-gray-100 text-gray-600"}`}>
                      {statusLabels[envio.estado] || envio.estado || "Sin estado"}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-semibold">{formatDate(envio.fecha)}</td>
                </tr>
              ))}

              {!cargando && enviosRecientes.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center font-semibold text-gray-400">
                    No hay envíos registrados.
                  </td>
                </tr>
              )}

              {cargando && (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center font-semibold text-gray-400">
                    Cargando información...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      </div>
    </div>
  );
}
