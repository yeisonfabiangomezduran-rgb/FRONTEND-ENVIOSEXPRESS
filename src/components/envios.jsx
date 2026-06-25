import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function Envios() {
  const [envios, setEnvios] = useState([]);

  useEffect(() => {
    apiFetch("/envios")
      .then(res => res.json())
      .then(data => setEnvios(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Envíos</h2>
      <ul>
        {envios.map(envio => (
          <li key={envio.id}>
            {envio.cliente} - {envio.origen} a {envio.destino}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Envios;
