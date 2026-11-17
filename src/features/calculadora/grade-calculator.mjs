export const GRADE_FIELDS = [
  { name: "pa1", label: "Práctica 1", weight: 0.15 },
  { name: "pa2", label: "Práctica 2", weight: 0.15 },
  { name: "pa3", label: "Práctica 3", weight: 0.15 },
  { name: "pa4", label: "Práctica 4", weight: 0.15 },
  { name: "examenFinal", label: "Evaluación final", weight: 0.4 },
];

export function evaluateGrades(grades) {
  const errors = {};
  let total = 0;
  for (const { name, weight } of GRADE_FIELDS) {
    const raw = grades[name];
    if (raw === undefined || raw === null || String(raw).trim() === "") {
      errors[name] = "Ingresa tu nota.";
      continue;
    }
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0 || value > 20)
      errors[name] = "Usa una nota entre 0 y 20.";
    else total += value * weight;
  }
  return {
    errors,
    average: Object.keys(errors).length
      ? null
      : Math.round((total + Number.EPSILON) * 10) / 10,
  };
}
