import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../services/api";
import { colombiaLocations, departamentos } from "../data/colombiaLocations";

const emptyLocation = {
  origenDepartamento: "",
  origenMunicipio: "",
  destinoDepartamento: "",
  destinoMunicipio: "",
};

const emptyForm = {
  cliente: "",
  origen: "",
  destino: "",
  descripcion: "",
  estado: "Pendiente",
  fecha: "",
};

const statusStyles = {
  Pendiente: "border-orange-200 bg-orange-100 text-orange-700",
  "En ruta": "border-blue-200 bg-blue-100 text-blue-700",
  Entregado: "border-emerald-200 bg-emerald-100 text-emerald-700",
};

const statusLabels = {
  Pendiente: "⏱️ Pendiente",
  "En ruta": "🚚 En tránsito",
  Entregado: "✅ Entregado",
};

const buildLocation = (departamento, municipio) => {
  if (!departamento || !municipio) return "";
  return `${municipio}, ${departamento}`;
};

const parseLocation = (value) => {
  const [municipio = "", departamento = ""] = String(value || "")
    .split(",")
    .map(part => part.trim());

  if (!departamento || !colombiaLocations[departamento]?.includes(municipio)) {
    return { departamento: "", municipio: "" };
  }

  return { departamento, municipio };
};

const formatDate = (value) => {
  if (!value) return "Sin fecha";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export default function Envios() {
  const [envios, setEnvios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [ubicacion, setUbicacion] = useState(emptyLocation);
  const [form, setForm] = useState(emptyForm);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargar = () => {
    apiFetch("/envios")
      .then(res => res.json())
      .then(data => setEnvios(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    cargar();
  }, []);

  const enviosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return envios.filter(envio => {
      const coincideEstado = !filtroEstado || envio.estado === filtroEstado;
      const coincideBusqueda = !texto || [
        envio.id,
        envio.codigo,
        envio.cliente,
        envio.origen,
        envio.destino,
      ].some(value => String(value || "").toLowerCase().includes(texto));

      return coincideEstado && coincideBusqueda;
    });
  }, [busqueda, envios, filtroEstado]);

  const limpiarFormulario = () => {
    setForm(emptyForm);
    setUbicacion(emptyLocation);
    setEditando(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    const resetMunicipio = name === "origenDepartamento"
      ? { origenMunicipio: "" }
      : name === "destinoDepartamento"
      ? { destinoMunicipio: "" }
      : {};

    setUbicacion({
      ...ubicacion,
      [name]: value,
      ...resetMunicipio,
    });
  };

  const guardar = (e) => {
    e.preventDefault();

    const url = editando ? `/envios/${editando}` : "/envios";
    const method = editando ? "PUT" : "POST";
    const payload = {
      ...form,
      origen: buildLocation(ubicacion.origenDepartamento, ubicacion.origenMunicipio),
      destino: buildLocation(ubicacion.destinoDepartamento, ubicacion.destinoMunicipio),
    };

    apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      limpiarFormulario();
      setMostrarFormulario(false);
      cargar();
    });
  };

  const nuevoEnvio = () => {
    limpiarFormulario();
    setMostrarFormulario(true);
  };

  const editar = (envio) => {
    setForm(envio);
    const origen = parseLocation(envio.origen);
    const destino = parseLocation(envio.destino);

    setUbicacion({
      origenDepartamento: origen.departamento,
      origenMunicipio: origen.municipio,
      destinoDepartamento: destino.departamento,
      destinoMunicipio: destino.municipio,
    });
    setEditando(envio.id);
    setMostrarFormulario(true);
  };

  const cancelar = () => {
    limpiarFormulario();
    setMostrarFormulario(false);
  };

  const eliminar = (id) => {
    if (confirm("¿Eliminar envío?")) {
      apiFetch(`/envios/${id}`, {
        method: "DELETE",
      }).then(cargar);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
  <div className="mx-auto max-w-7xl px-6 py-10">
      <section className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Gestión de Envíos
        </h1>
        <p className="mt-2 text-xl font-semibold text-gray-500">
          Administra todos los envíos de la transportadora
        </p>
      </section>

      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px_180px]">
          <div className="relative">
            <span className="absolute left-4 top-[80%] -translate-y-1/2 text-2xl text-lg-text-gray-400">
              🔍
            </span>

            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por ID, cliente o destino..."
              className="h-12 w-full rounded-lg border border-gray-300 pl-12 pr-4 text-base font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="h-12 rounded-lg border border-gray-300 px-4 text-base font-semibold text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En ruta">En tránsito</option>
            <option value="Entregado">Entregado</option>
          </select>

          <button
            onClick={nuevoEnvio}
            className="h-12 rounded-lg bg-blue-600 px-5 text-base font-bold text-white transition hover:bg-blue-700"
          >
            + Nuevo Envío
          </button>
        </div>
      </section>

      {mostrarFormulario && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Nuevo envío
      </h2>
      <p className="text-gray-500">
        Registrar información del envío.
      </p>
    </div>

    <button
      type="button"
      onClick={cancelar}
      className="font-semibold text-gray-500 transition hover:text-gray-700"
    >
      Cancelar
    </button>
  </div>

  <form onSubmit={guardar} className="grid grid-cols-2 gap-4">

    {/* Cliente */}
    <input
      name="cliente"
      value={form.cliente}
      onChange={handleChange}
      placeholder="Cliente"
      className="h-14 rounded-xl border border-gray-200 px-4 font-medium shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      required
    />

    {/* Descripción */}
    <input
      name="descripcion"
      value={form.descripcion}
      onChange={handleChange}
      placeholder="Descripción"
      className="h-14 rounded-xl border border-gray-200 px-4 font-medium shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    />

    {/* Estado */}
    <select
      name="estado"
      value={form.estado}
      onChange={handleChange}
      className="h-14 rounded-xl border border-gray-200 px-4 font-medium shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    >
      <option>Pendiente</option>
      <option>En ruta</option>
      <option>Entregado</option>
    </select>

    {/* Fecha */}
    <input
      type="date"
      name="fecha"
      value={form.fecha}
      onChange={handleChange}
      className="h-14 rounded-xl border border-gray-200 px-4 font-medium shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    />

    {/* Departamento origen */}
    <select
      name="origenDepartamento"
      value={ubicacion.origenDepartamento}
      onChange={handleLocationChange}
      className="h-14 rounded-xl border border-gray-200 px-4 font-medium shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      required
    >
      <option value="">Departamento origen</option>
      {departamentos.map((departamento) => (
        <option key={departamento} value={departamento}>
          {departamento}
        </option>
      ))}
    </select>

    {/* Municipio origen */}
    <select
      name="origenMunicipio"
      value={ubicacion.origenMunicipio}
      onChange={handleLocationChange}
      disabled={!ubicacion.origenDepartamento}
      className="h-14 rounded-xl border border-gray-200 px-4 font-medium shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
      required
    >
      <option value="">Municipio origen</option>
      {(colombiaLocations[ubicacion.origenDepartamento] || []).map(
        (municipio) => (
          <option key={municipio} value={municipio}>
            {municipio}
          </option>
        )
      )}
    </select>

    {/* Departamento destino */}
    <select
      name="destinoDepartamento"
      value={ubicacion.destinoDepartamento}
      onChange={handleLocationChange}
      className="h-14 rounded-xl border border-gray-200 px-4 font-medium shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      required
    >
      <option value="">Departamento destino</option>
      {departamentos.map((departamento) => (
        <option key={departamento} value={departamento}>
          {departamento}
        </option>
      ))}
    </select>

    {/* Municipio destino */}
    <select
      name="destinoMunicipio"
      value={ubicacion.destinoMunicipio}
      onChange={handleLocationChange}
      disabled={!ubicacion.destinoDepartamento}
      className="h-14 rounded-xl border border-gray-200 px-4 font-medium shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
      required
    >
      <option value="">Municipio destino</option>
      {(colombiaLocations[ubicacion.destinoDepartamento] || []).map(
        (municipio) => (
          <option key={municipio} value={municipio}>
            {municipio}
          </option>
        )
      )}
    </select>

    {/* Botón */}
    <button
      type="submit"
      className="col-span-2 h-14 rounded-xl bg-blue-600 text-lg font-bold text-white transition hover:bg-blue-700"
    >
      {editando ? "Actualizar Envío" : "Guardar Envío"}
    </button>

  </form>
</section>
      )}

      <p className="mb-5 text-lg font-semibold text-gray-500">
        Mostrando {enviosFiltrados.length} de {envios.length} envíos
      </p>

      <section className="grid grid-cols-3 gap-6">
        {enviosFiltrados.map((envio, index) => (
          <article
            key={envio.id || index}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {envio.codigo || `ENV-${String(envio.id || index + 1).padStart(4, "0")}`}
                </h2>
                <p className="mt-1 text-base font-semibold text-gray-500">
                  {envio.descripcion || "Sin descripción"}
                </p>
              </div>

              <span className={`rounded-full border px-4 py-1 text-sm font-bold ${statusStyles[envio.estado] || "border-gray-200 bg-gray-100 text-gray-600"}`}>
                {statusLabels[envio.estado] || envio.estado || "Sin estado"}
              </span>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="font-semibold text-gray-500">Cliente</p>
                  <p className="text-lg font-bold text-gray-900">{envio.cliente || "Sin cliente"}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-500">Ruta</p>
                  <p className="text-lg font-bold text-gray-900">
                    {envio.origen || "Sin origen"} → {envio.destino || "Sin destino"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-500">Fecha</p>
                  <p className="text-lg font-bold text-gray-900">{formatDate(envio.fecha)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-5">
              <button
                onClick={() => editar(envio)}
                className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-200"
              >
                Editar
              </button>

              <button
                onClick={() => eliminar(envio.id)}
                className="rounded-lg bg-red-100 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-200"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}

        {enviosFiltrados.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-lg font-semibold text-gray-400 xl:col-span-3">
            No hay envíos para mostrar.
          </div>
        )}
      </section>
    </div>
    </div>
  );
}
