import test from "node:test";
import assert from "node:assert/strict";
import {
  parseEventDate,
  safeEventLink,
  upcomingEvents,
} from "../src/features/Eventos/event-utils.mjs";

const now = new Date(2026, 10, 17, 12);
const event = (id, fecha) => ({ id, nombre: `Encuentro ${id}`, fecha });
test("ordena los próximos encuentros e incluye los de hoy", () => {
  const events = [
    event(3, "2026-11-25"),
    event(0, "2026-11-17"),
    event(1, "2025-01-01"),
    event(2, "2026-11-20"),
  ];
  assert.deepEqual(
    upcomingEvents(events, now).map((item) => item.id),
    [0, 2, 3],
  );
});
test("soporta las respuestas directas y envueltas de la agenda", () => {
  const events = [event(1, "2026-12-01")];
  assert.equal(upcomingEvents({ events }, now).length, 1);
  assert.equal(upcomingEvents({ data: events }, now).length, 1);
  assert.deepEqual(upcomingEvents([], now), []);
  assert.throws(() => upcomingEvents({ error: "fallo" }, now), TypeError);
});
test("descarta encuentros incompletos y fechas inválidas", () => {
  assert.deepEqual(
    upcomingEvents(
      [
        null,
        {},
        event(1, "sin fecha"),
        event(2, "2026-02-31"),
        { ...event(3, "2026-12-01"), nombre: "" },
      ],
      now,
    ),
    [],
  );
});
test("una fecha sin hora conserva el día del calendario", () => {
  const date = parseEventDate("2026-11-17");
  assert.equal(date.getDate(), 17);
  assert.equal(date.getMonth(), 10);
  assert.equal(parseEventDate("2026-02-30"), null);
  assert.equal(parseEventDate(null), null);
});
test("solo permite enlaces web en el contenido de eventos", () => {
  assert.equal(safeEventLink("javascript:alert(1)"), null);
  assert.equal(safeEventLink("data:text/html,<script>"), null);
  assert.equal(safeEventLink("sin enlace"), null);
  assert.equal(
    safeEventLink("https://example.org/evento"),
    "https://example.org/evento",
  );
});
