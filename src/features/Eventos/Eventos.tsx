import { useState, useEffect } from "react";
import "./eventos.css";
import { TodosEventos } from "./Eventostabla";
import { Title } from "../../ui/components/common/Title";

const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return "Fecha no disponible";
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
    });
  } catch (e) {
    return "Fecha no disponible";
  }
};

export const Eventos = () => {
  const [events, setEvents] = useState([]);
  const [verTodos, setVerTodos] = useState(false);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    setStatus("loading");
    fetch("https://isildevs.cesarpreciado.com/api/events", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo cargar la agenda");
        return response.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.events ?? data?.data;
        if (!Array.isArray(list)) throw new Error("Agenda inválida");
        if (!disposed) { setEvents(list); setStatus("ready"); }
      })
      .catch(() => { if (!disposed) setStatus("error"); })
      .finally(() => window.clearTimeout(timeout));
    return () => { disposed = true; window.clearTimeout(timeout); controller.abort(); };
  }, [attempt]);

  if (verTodos) {
    return <TodosEventos events={events} volver={() => setVerTodos(false)} />;
  }

  return (
    <div className="body">
      <section className="first">
        <Title>EVENTOS</Title>
        <p id="p-first">
          Aquí se anunciarán los próximos talleres, hackathons, charlas, webinars y actividades especiales. <br />
          Toda la información estará disponible en la sección de eventos y nuestro Discord.
        </p>
      </section>

      {/*
      <section className="second">
        <h2 id='reu'>Reuniones</h2>
        {events.map(eventos => (
          <div className="re-back" key={eventos.id}>
            <div className="re-date">
              <strong>{formatDate(eventos.fecha)}</strong>
            </div>
            <div className="re-info">
              <h3>{eventos.nombre}</h3>
              <p>{eventos.lugar}</p>
            </div>
          </div>
        ))}

        <button className='events-btn' onClick={() => setVerTodos(true)}>
          Ver todos los eventos
        </button>
      </section>
      */}

      <section className="second">
        <h2 id="reu">Reuniones</h2>

        {status === "loading" && <p className="events-status" role="status">Cargando eventos…</p>}
        {status === "error" && <p className="events-status" role="status">No se pudieron cargar los eventos. <button className="events-retry" type="button" onClick={() => setAttempt(value => value + 1)}>Reintentar</button></p>}
        {status === "ready" && events.length === 0 && <p className="events-status" role="status">Aún no hay eventos anunciados.</p>}

        <div className="events-container">
          {events.slice(0, 4).map((eventos) => (
            <div className="event-card" key={eventos.id}>
              <div className="event-date">
                <strong>{formatDate(eventos.fecha)}</strong>
              </div>
              <div className="event-info">
                <h3>{eventos.nombre}</h3>
                <p>{eventos.lugar}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="events-btn" disabled={status !== "ready" || events.length === 0} onClick={() => setVerTodos(true)}>
          Ver todos los eventos
        </button>
      </section>
    </div>
  );
};
