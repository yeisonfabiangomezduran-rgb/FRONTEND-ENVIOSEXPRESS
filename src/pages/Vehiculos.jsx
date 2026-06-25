import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

export default function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    placa: "",
    tipo: "",
    capacidad: "",
    estado: "Disponible"
  });

  // 🔄 cargar
  const cargar = () => {
    apiFetch("/vehiculos")
      .then(res => res.json())
      .then(data => setVehiculos(Array.isArray(data) ? data : []));
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
  ? `/vehiculos/${editando}`
  : "/vehiculos";
    const method = editando ? "PUT" : "POST";

    apiFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => {
      setForm({
        placa: "",
        tipo: "",
        capacidad: "",
        estado: "Disponible"
      });
      setEditando(null);
      cargar();
    });
  };

  // ✏️ editar
  const editar = (v) => {
    setForm(v);
    setEditando(v.id);
  };

  const eliminar = (id) => {
  if (confirm("¿Eliminar vehículo?")) {
    apiFetch(`/vehiculos/${id}`, {
      method: "DELETE"
    }).then(cargar);
  }
  };

  return (
  
  <div className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-7xl px-8 py-8">

    <h1 className="mb-4 text-2xl font-bold">
      🚚 Gestión de Vehículos
    </h1>

    {/* FORMULARIO */}
    <div className="mb-6 rounded-2xl bg-white p-4 shadow sm:p-6">

      <h2 className="mb-4 text-lg font-bold">
        {editando ? "Editar Vehículo" : "Registrar Vehículo"}
      </h2>

      <form
        onSubmit={guardar}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >

        <input
          name="placa"
          value={form.placa}
          onChange={handleChange}
          placeholder="Placa"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          placeholder="Tipo (Camión, Moto...)"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="capacidad"
          value={form.capacidad}
          onChange={handleChange}
          placeholder="Capacidad"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option>Disponible</option>
          <option>En ruta</option>
          <option>Mantenimiento</option>
        </select>

        <button
          className="rounded-lg bg-blue-600 p-3 text-white transition hover:bg-blue-700 md:col-span-2"
        >
          {editando ? "Actualizar Vehículo" : "Guardar Vehículo"}
        </button>

      </form>

    </div>

    {/* LISTA DE VEHÍCULOS */}
    <div className="rounded-2xl bg-white p-4 shadow sm:p-5">

      <h2 className="mb-5 text-2xl font-bold text-gray-900">
        Vehículos registrados
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {vehiculos.map((v, index) => (
          <article
            key={v.id || index}
            className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            {/* CABECERA */}
            <div className="mb-5 flex items-start justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  VEH-{String(v.id || index + 1).padStart(4, "0")}
                </h2>

                <p className="text-sm font-semibold text-gray-500">
                  Vehículo
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-1 text-sm font-bold ${
                  v.estado === "Disponible"
                    ? "bg-green-100 text-green-700"
                    : v.estado === "En ruta"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {v.estado}
              </span>

            </div>

            {/* DATOS */}
            <div className="space-y-4">

              <div className="flex gap-4">
                <span className="text-2xl">🚚</span>

                <div>
                  <p className="font-semibold text-gray-500">
                    Placa
                  </p>

                  <p className="text-lg font-bold text-gray-900">
                    {v.placa}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">🚛</span>

                <div>
                  <p className="font-semibold text-gray-500">
                    Tipo
                  </p>

                  <p className="font-bold text-gray-900">
                    {v.tipo}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">📦</span>

                <div>
                  <p className="font-semibold text-gray-500">
                    Capacidad
                  </p>

                  <p className="font-bold text-gray-900">
                    {v.capacidad}
                  </p>
                </div>
              </div>

            </div>

            {/* BOTONES */}
            <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">

              <button
                onClick={() => editar(v)}
                className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-200"
              >
                Editar
              </button>

              <button
                onClick={() => eliminar(v.id)}
                className="rounded-lg bg-red-100 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-200"
              >
                Eliminar
              </button>

            </div>

          </article>
        ))}

        {vehiculos.length === 0 && (
          <div className="col-span-3 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-lg font-semibold text-gray-400">
            No hay vehículos registrados.
          </div>
        )}

      </div>

    </div>

  </div>
  </div>
);
}