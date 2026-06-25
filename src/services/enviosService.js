import { apiFetch } from "./api";

// GET
export const getEnvios = async () => {
  const res = await apiFetch("/envios");
  if (!res.ok) throw new Error("Error al obtener envíos");
  return res.json();
};

// POST
export const crearEnvio = async (envio) => {
  const res = await apiFetch("/envios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(envio),
  });
  if (!res.ok) throw new Error("Error al crear envío");
  return res.json();
};

// PUT
export const actualizarEnvio = async (id, envio) => {
  const res = await apiFetch(`/envios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(envio),
  });
  if (!res.ok) throw new Error("Error al actualizar envío");
  return res.json();
};

// DELETE
export const eliminarEnvio = async (id) => {
  const res = await apiFetch(`/envios/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar envío");
};
