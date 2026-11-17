import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  X,
} from "lucide-react";
import { parseEventDate, safeEventLink } from "./event-utils.mjs";

export const PanelRegistro = ({ cerrar, evento }) => {
  const dialog = useRef(null);
  const request = useRef(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const link = safeEventLink(evento.link);
  const date = parseEventDate(evento.fecha);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const activeDialog = dialog.current;
    activeDialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      request.current?.abort();
      activeDialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nombre = String(form.get("nombre")).trim();
    if (!nombre) {
      setError("Ingresa tu nombre para continuar.");
      return;
    }
    setError("");
    setStatus("sending");
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(
        `https://isildevs.cesarpreciado.com/api/events/${encodeURIComponent(evento.id)}/attend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            nombre,
            correo: String(form.get("correo")).trim(),
            telefono: String(form.get("telefono")).trim(),
            subscription: {
              additionalProp1: {},
              additionalProp2: {},
              additionalProp3: {},
            },
          }),
        },
      );
      if (!response.ok) throw new Error("Registro no disponible");
      setStatus("success");
    } catch {
      setStatus("idle");
      setError(
        "No pudimos completar tu registro. Vuelve a intentarlo en un momento.",
      );
    } finally {
      window.clearTimeout(timeout);
    }
  };
  return (
    <dialog
      ref={dialog}
      className="event-dialog"
      aria-labelledby="event-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        cerrar();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) cerrar();
      }}
    >
      <div className="dialog-inner">
        <button
          className="dialog-close"
          type="button"
          onClick={cerrar}
          aria-label="Cerrar detalles del evento"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <span className="eyebrow">ENCUENTROS DE LA COMUNIDAD</span>
        <h2 id="event-dialog-title">{evento.nombre}</h2>
        <div className="dialog-meta">
          <span>
            <CalendarDays size={17} aria-hidden="true" />
            {date?.toLocaleDateString("es-PE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }) || "Fecha por confirmar"}
          </span>
          <span>
            <MapPin size={17} aria-hidden="true" />
            {evento.lugar || "Lugar por confirmar"}
          </span>
        </div>
        {evento.ponente && (
          <p>
            <strong>Ponente:</strong> {evento.ponente}
          </p>
        )}
        {evento.descripcion && <p>{evento.descripcion}</p>}
        {link && (
          <a
            className="text-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enlace del evento <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (pestaña nueva)</span>
          </a>
        )}
        {status === "success" ? (
          <div className="registration-success" role="status">
            <CheckCircle2 size={36} aria-hidden="true" />
            <h3>¡Tu registro está listo!</h3>
            <p>Nos vemos en el encuentro.</p>
            <button
              className="button button-primary"
              onClick={cerrar}
              type="button"
            >
              Listo
            </button>
          </div>
        ) : (
          <form className="registration-form" onSubmit={handleSubmit}>
            <h3>Reserva tu lugar</h3>
            <fieldset disabled={status === "sending"}>
              <label htmlFor="attendee-name">Nombre completo</label>
              <input
                id="attendee-name"
                name="nombre"
                autoComplete="name"
                required
                maxLength={120}
              />
              <label htmlFor="attendee-email">Correo electrónico</label>
              <input
                id="attendee-email"
                name="correo"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
              />
              <label htmlFor="attendee-phone">
                Teléfono <span>(opcional)</span>
              </label>
              <input
                id="attendee-phone"
                name="telefono"
                type="tel"
                autoComplete="tel"
                maxLength={30}
              />
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="button button-primary" type="submit">
                {status === "sending"
                  ? "Registrando…"
                  : "Confirmar mi registro"}
              </button>
            </fieldset>
          </form>
        )}
      </div>
    </dialog>
  );
};
