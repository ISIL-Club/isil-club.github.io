import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calculator, RotateCcw } from "lucide-react";
import { Link } from "react-router";
import { Header } from "../../ui/components/common/Header";
import { Footer } from "../../ui/components/common/Footer";
import { evaluateGrades, GRADE_FIELDS } from "./grade-calculator.mjs";

const emptyGrades = () =>
  Object.fromEntries(GRADE_FIELDS.map(({ name }) => [name, ""]));
export const CalculadoraPage = () => {
  const [grades, setGrades] = useState(emptyGrades);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [average, setAverage] = useState<number | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const calculate = (event: React.FormEvent) => {
    event.preventDefault();
    const result = evaluateGrades(grades);
    setErrors(result.errors);
    setAverage(result.average);
    const firstError = Object.keys(result.errors)[0];
    if (firstError)
      form.current
        ?.querySelector<HTMLInputElement>(`[name="${firstError}"]`)
        ?.focus();
  };
  const reset = () => {
    setGrades(emptyGrades());
    setErrors({});
    setAverage(null);
    form.current?.querySelector<HTMLInputElement>("input")?.focus();
  };
  return (
    <>
      <Header />
      <main id="main" className="calculator-page">
        <div className="container">
          <Link className="back-link" to="/#resources">
            <ArrowLeft size={17} aria-hidden="true" /> Volver a recursos
          </Link>
          <div className="calculator-layout">
            <div className="calculator-intro">
              <span className="eyebrow">UNA HERRAMIENTA DEL CLUB, PARA TI</span>
              <h1>
                Tu esfuerzo,
                <br />
                en números<span className="blue-text">.</span>
              </h1>
              <p>
                Ingresa las notas de tus cuatro prácticas y tu evaluación final.
                Nosotros hacemos las cuentas.
              </p>
              <div className="formula-card">
                <Calculator size={28} strokeWidth={1.5} aria-hidden="true" />
                <h2>Así se calcula tu promedio</h2>
                <div className="weight-row">
                  <span>4 prácticas</span>
                  <strong>15% cada una</strong>
                </div>
                <div className="weight-row">
                  <span>Evaluación final</span>
                  <strong>40%</strong>
                </div>
                <p>Escala de 0 a 20. El resultado se muestra con un decimal.</p>
              </div>
            </div>
            <form
              ref={form}
              className="calculator-form"
              noValidate
              onSubmit={calculate}
            >
              <div className="calculator-form-heading">
                <div>
                  <span className="eyebrow">VAMOS PASO A PASO</span>
                  <h2>Calculadora de promedios</h2>
                </div>
                <Calculator size={23} aria-hidden="true" />
              </div>
              <div className="grades-grid">
                {GRADE_FIELDS.map(({ name, label, weight }) => (
                  <div
                    className={`grade-field ${name === "examenFinal" ? "grade-final" : ""}`}
                    key={name}
                  >
                    <label htmlFor={name}>
                      {label}
                      <span>{weight * 100}%</span>
                    </label>
                    <input
                      id={name}
                      name={name}
                      type="number"
                      min="0"
                      max="20"
                      step="any"
                      inputMode="decimal"
                      placeholder="0 – 20"
                      value={grades[name]}
                      required
                      aria-invalid={Boolean(errors[name])}
                      aria-describedby={
                        errors[name] ? `${name}-error` : undefined
                      }
                      onChange={(event) => {
                        setGrades({ ...grades, [name]: event.target.value });
                        setAverage(null);
                        setErrors((previous) => {
                          const next = { ...previous };
                          delete next[name];
                          return next;
                        });
                      }}
                    />
                    {errors[name] && (
                      <span className="field-error" id={`${name}-error`}>
                        {errors[name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="calculator-form-actions">
                <button className="button button-primary" type="submit">
                  Calcular mi promedio{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <button className="reset-button" type="button" onClick={reset}>
                  <RotateCcw size={16} aria-hidden="true" /> Limpiar
                </button>
              </div>
              <div
                className={`average-result ${average !== null ? "has-result" : ""}`}
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <span>
                  {average === null
                    ? "Tu próximo resultado empieza aquí"
                    : "Tu promedio ponderado"}
                </span>
                <output aria-label="Promedio">
                  {average === null
                    ? "—"
                    : average.toLocaleString("es-PE", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}
                </output>
                <small>
                  {average === null
                    ? "Completa tus notas y presiona calcular."
                    : "sobre 20 · redondeado a un decimal"}
                </small>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
