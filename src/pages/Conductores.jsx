import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

export default function Conductores() {
  const [conductores, setConductores] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    licencia: "",
    estado: "Activo"
  });

  // 🔄 cargar
  const cargar = () => {
    apiFetch("/conductores")
      .then(res => res.json())
      .then(data => setConductores(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    cargar();
  }, []);

  // 🧠 inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 💾 guardar
  const guardar = (e) => {
    e.preventDefault();

    const url = editando
  ? `/conductores/${editando}`
  : "/conductores";

    const method = editando ? "PUT" : "POST";

    apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => {
      setForm({
        nombre: "",
        telefono: "",
        licencia: "",
        estado: "Activo"
      });
      setEditando(null);
      cargar();
    });
  };

  // ✏️ editar
  const editar = (c) => {
    setForm(c);
    setEditando(c.id);
  };

const eliminar = (id) => {
  if (confirm("¿Eliminar conductor?")) {
    apiFetch(`/conductores/${id}`, {
      method: "DELETE"
    }).then(cargar);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-7xl px-8 py-8">

      <h1 className="text-xl font-bold mb-4">👤 Conductores</h1>

      {/* FORMULARIO */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow sm:p-6">

        <h2 className="text-lg font-bold mb-4">
          {editando ? "Editar Conductor" : "Registrar Conductor"}
        </h2>

        <form onSubmit={guardar} className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="border p-3 rounded-lg"
          />

          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="border p-3 rounded-lg"
          />

          <input
            name="licencia"
            value={form.licencia}
            onChange={handleChange}
            placeholder="Licencia"
            className="border p-3 rounded-lg"
          />

          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Activo</option>
            <option>Inactivo</option>
          </select>

          <button className="rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700 md:col-span-2">
            {editando ? "Actualizar Conductor" : "Guardar Conductor"}
          </button>

        </form>
      </div>

      {/* LISTA MEJORADA */}
     {/* LISTA DE CONDUCTORES */}
{/* LISTA DE CONDUCTORES */}
<div className="rounded-2xl bg-white p-4 shadow sm:p-5">

  <h2 className="mb-5 text-2xl font-bold text-gray-900">
    Conductores registrados
  </h2>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {conductores.map((c, index) => (
      <article
        key={c.id || index}
        className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        {/* CABECERA */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              CON-{String(c.id || index + 1).padStart(4, "0")}
            </h2>

            <p className="text-sm font-semibold text-gray-500">
              Conductor
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-1 text-sm font-bold ${
              c.estado === "Activo"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {c.estado}
          </span>
        </div>

        {/* DATOS */}
        <div className="space-y-4">

          <div className="flex gap-4">
            <span className="text-2xl">👤</span>

            <div>
              <p className="font-semibold text-gray-500">
                Nombre
              </p>

              <p className="text-lg font-bold text-gray-900">
                {c.nombre}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl">📱</span>

            <div>
              <p className="font-semibold text-gray-500">
                Teléfono
              </p>

              <p className="font-bold text-gray-900">
                {c.telefono}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="text-2xl">🪪</span>

            <div>
              <p className="font-semibold text-gray-500">
                Licencia
              </p>

              <p className="font-bold text-gray-900">
                {c.licencia}
              </p>
            </div>
          </div>

        </div>

        {/* BOTONES */}
        <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">

          <button
            onClick={() => editar(c)}
            className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-200"
          >
            Editar
          </button>

          <button
            onClick={() => eliminar(c.id)}
            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-200"
          >
            Eliminar
          </button>

        </div>

      </article>
    ))}

    {conductores.length === 0 && (
      <div className="col-span-1 md:col-span-3 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-lg font-semibold text-gray-400">
        No hay conductores registrados.
      </div>
    )}

  </div>

</div>

</div>
</div>

);
}
