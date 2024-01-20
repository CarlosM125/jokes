// src/components/Chistes.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chistes.css";

const Chistes: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("Any");
  const [chiste, setChiste] = useState<any>(null);

  const obtenerChiste = async () => {
    try {
      const response = await axios.get(
        `https://v2.jokeapi.dev/joke/${categoriaSeleccionada}?lang=es`
      );
      setChiste(response.data);
    } catch (error) {
      console.error("Error al obtener el chiste", error);
    }
  };
  const compartirEnRedesSociales = () => {
    const url = window.location.href;
    const textoChiste = `¡Diviértete con este chiste! "${chiste.setup} ${chiste.delivery}"`;

    // Compartir en WhatsApp
    window.open(
      `https://wa.me/?text=${encodeURIComponent(textoChiste)}`,
      "_blank"
    );
  };

  useEffect(() => {
    if (chiste) {
      const timeoutId = setTimeout(() => {
        setChiste(null);
      }, 10000); // Ocultar el chiste después de 5 segundos

      return () => clearTimeout(timeoutId);
    }
  }, [chiste]);

  return (
    <div className={`container fondo-gradiente-${categoriaSeleccionada}`}>
      <div className="content">
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="Any">Cualquiera</option>
          <option value="Programming">Programación</option>
          <option value="Miscellaneous">Misceláneo</option>
        </select>

        <button onClick={obtenerChiste}>Obtener Chiste</button>

        {chiste && (
          <div className="chiste-card">
            <h3>{chiste.category}</h3>
            <p>
              {chiste.type === "single"
                ? chiste.joke
                : `${chiste.setup} ${chiste.delivery}`}
            </p>
          </div>
        )}
        <div>
          <button onClick={compartirEnRedesSociales}>
            Compartir en Redes Sociales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chistes;
