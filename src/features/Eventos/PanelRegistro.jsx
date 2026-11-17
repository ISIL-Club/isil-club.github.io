import { useState, useEffect, useRef } from "react";
import "./panel.css";

export const PanelRegistro = ({ cerrar, evento }) => {
  const [nombres, setNombres] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cerrando, setCerrando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const panel = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const dialog = panel.current;
    dialog.showModal();
    document.body.classList.add("modal-abierto");
    return () => {
      dialog.close();
      document.body.classList.remove("modal-abierto");
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);

    const datos = {
      nombre: nombres,
      correo,
      telefono,
      subscription: {
        additionalProp1: {},
        additionalProp2: {},
        additionalProp3: {},
      },
    };

    try {
      const res = await fetch(
        `https://isildevs.cesarpreciado.com/api/events/${evento.id}/attend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        },
      );

      if (res.ok) {
        alert("¡Registro exitoso!");
        handleCerrar(); // ✅ Usa el cierre animado
      } else {
        alert("Error al registrar");
      }
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor");
    } finally {
      setEnviando(false);
    }
  };

  // ✅ Animación de cierre suave
  const handleCerrar = () => {
    if (cerrando) return;
    setCerrando(true);
    setTimeout(() => {
      cerrar();
    }, 300); // mismo tiempo que el fadeOut del CSS
  };

  return (
    <dialog
      ref={panel}
      className={`registro-panel ${cerrando ? "cerrar" : ""}`}
      aria-labelledby="registro-title"
      onCancel={(event) => {
        event.preventDefault();
        handleCerrar();
      }}
    >
      <h2 id="registro-title">Formulario de Registro</h2>
      <p>
        <strong>EVENTO: {evento.nombre}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre completo"
          aria-label="Nombre completo"
          autoComplete="name"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          aria-label="Correo electrónico"
          autoComplete="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono (opcional)"
          aria-label="Teléfono (opcional)"
          autoComplete="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <button
          type="submit"
          disabled={enviando || cerrando}
          aria-busy={enviando}
        >
          {enviando ? "Enviando…" : "Enviar Registro"}
        </button>
      </form>

      <button type="button" onClick={handleCerrar}>
        Cerrar
      </button>
    </dialog>
  );
};
