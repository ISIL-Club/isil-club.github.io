import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { CommunityLink } from "../../ui/components/common/CommunityLink";
import { PanelRegistro } from "./PanelRegistro";
import { parseEventDate, upcomingEvents } from "./event-utils.mjs";

type ClubEvent = {
  id: string | number;
  nombre: string;
  fecha: string;
  lugar?: string;
  hora?: string;
  modalidad?: string;
  descripcion?: string;
  ponente?: string;
  link?: string;
  organizador?: string;
};

export const Eventos = () => {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<ClubEvent | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    setStatus("loading");
    fetch("https://isildevs.cesarpreciado.com/api/events", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Agenda no disponible");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          setEvents(upcomingEvents(data));
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);
  return (
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">NOS VEMOS EN EL PRÓXIMO ENCUENTRO</span>
          <h2>
            Tu agenda, con
            <br />
            un poco más de código<span className="blue-text">.</span>
          </h2>
        </div>
        <p>
          Talleres, charlas y nuevas oportunidades para aprender juntos.
          Encuentra aquí los próximos encuentros del club.
        </p>
      </div>
      {status === "loading" ? (
        <div className="agenda-loading" role="status">
          <RefreshCw className="is-spinning" size={23} aria-hidden="true" />
          <p>Buscando los próximos encuentros…</p>
        </div>
      ) : status === "error" || events.length === 0 ? (
        <div className="agenda-empty">
          <div className="agenda-illustration" aria-hidden="true">
            <div className="calendar-illustration">
              <div className="calendar-rings">
                <i />
                <i />
              </div>
              <div className="calendar-grid">
                {Array.from({ length: 12 }, (_, index) => (
                  <span
                    key={index}
                    className={index === 6 ? "calendar-selected" : ""}
                  >
                    {index === 6 ? <CodeMark /> : ""}
                  </span>
                ))}
              </div>
            </div>
            <span className="calendar-spark">✦</span>
          </div>
          <div className="agenda-empty-copy">
            <span className="agenda-label">CONECTAR TAMBIÉN ES APRENDER</span>
            <h3>
              {status === "error"
                ? "La agenda no está disponible por ahora."
                : "El próximo encuentro se está preparando."}
            </h3>
            <p>
              {status === "error"
                ? "No pudimos cargar los eventos. Puedes volver a intentarlo o seguir las novedades del club en Discord."
                : "Cuando haya nuevos eventos, los encontrarás aquí. Mientras tanto, la conversación sigue en nuestra comunidad."}
            </p>
            <div className="agenda-actions">
              <CommunityLink className="button button-primary">
                Ir a la comunidad
              </CommunityLink>
              {status === "error" && (
                <button
                  className="button button-outline"
                  type="button"
                  onClick={() => setAttempt((value) => value + 1)}
                >
                  <RefreshCw size={15} aria-hidden="true" /> Volver a intentar
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="event-grid">
            {events
              .slice(0, showAll ? events.length : 3)
              .map((event, index) => {
                const date = parseEventDate(event.fecha);
                return (
                  <article
                    className={`event-item ${index === 0 ? "event-featured" : ""}`}
                    key={event.id}
                  >
                    <div className="event-item-top">
                      <span className="event-type">
                        <CalendarDays size={15} aria-hidden="true" />{" "}
                        {event.modalidad || "Encuentro del club"}
                      </span>
                      {index === 0 && (
                        <span className="next-badge">PRÓXIMO</span>
                      )}
                    </div>
                    <time dateTime={event.fecha} className="event-calendar">
                      <strong>{date?.getDate()}</strong>
                      <span>
                        {date?.toLocaleDateString("es-PE", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </time>
                    <h3>{event.nombre}</h3>
                    <div className="event-meta">
                      <span>
                        <MapPin size={16} aria-hidden="true" />{" "}
                        {event.lugar || "Lugar por confirmar"}
                      </span>
                      {event.hora && (
                        <span>
                          <Clock size={16} aria-hidden="true" /> {event.hora}
                        </span>
                      )}
                    </div>
                    <button
                      className="text-link"
                      type="button"
                      onClick={() => setSelected(event)}
                      aria-label={`Ver detalles de ${event.nombre}`}
                    >
                      Ver detalles e inscribirme{" "}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </article>
                );
              })}
          </div>
          {events.length > 3 && (
            <button
              className="button button-outline show-events"
              type="button"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
            >
              {showAll ? "Mostrar menos" : "Ver todos los eventos"}
            </button>
          )}
        </>
      )}
      {selected && (
        <PanelRegistro evento={selected} cerrar={() => setSelected(null)} />
      )}
    </div>
  );
};

const CodeMark = () => <span className="calendar-code">&lt;/&gt;</span>;
