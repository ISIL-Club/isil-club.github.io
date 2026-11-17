import test from "node:test";
import assert from "node:assert/strict";
import { evaluateGrades } from "../src/features/calculadora/grade-calculator.mjs";

const grades = {
  pa1: "14",
  pa2: "16",
  pa3: "18",
  pa4: "12",
  examenFinal: "15",
};
test("aplica 15% a cada práctica y 40% al examen", () => {
  assert.deepEqual(evaluateGrades(grades), { errors: {}, average: 15 });
  assert.equal(
    evaluateGrades({
      ...grades,
      pa1: "0",
      pa2: "0",
      pa3: "0",
      pa4: "0",
      examenFinal: "20",
    }).average,
    8,
  );
});
test("distingue una nota cero de un campo vacío", () => {
  assert.equal(evaluateGrades({ ...grades, pa1: "0" }).errors.pa1, undefined);
  assert.equal(evaluateGrades({ ...grades, pa1: "" }).average, null);
  assert.equal(
    evaluateGrades({ ...grades, pa1: " " }).errors.pa1,
    "Ingresa tu nota.",
  );
});
test("rechaza negativos, valores mayores que 20 y números inválidos", () => {
  for (const value of ["-5", "20.1", "Infinity", "abc"]) {
    const result = evaluateGrades({ ...grades, pa1: value });
    assert.equal(result.average, null);
    assert.equal(result.errors.pa1, "Usa una nota entre 0 y 20.");
  }
});
test("acepta los límites 0 y 20 y redondea los decimales", () => {
  assert.equal(
    evaluateGrades(
      Object.fromEntries(Object.keys(grades).map((key) => [key, "20"])),
    ).average,
    20,
  );
  assert.equal(
    evaluateGrades(
      Object.fromEntries(Object.keys(grades).map((key) => [key, "0"])),
    ).average,
    0,
  );
  assert.equal(evaluateGrades({ ...grades, examenFinal: "15.12" }).average, 15);
  assert.equal(
    evaluateGrades({ ...grades, examenFinal: "15.2" }).average,
    15.1,
  );
});
test("no calcula cuando falta una nota", () => {
  assert.equal(evaluateGrades({}).average, null);
  assert.equal(Object.keys(evaluateGrades({}).errors).length, 5);
});
