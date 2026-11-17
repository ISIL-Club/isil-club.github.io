import { useState } from "react";

import styles from "./calculadora.module.css";
import { useNavigate } from "react-router";
import { evaluateGrades } from "./grade-calculator.mjs";

export const CalculadoraPage = () => {
  const navigate = useNavigate();
  const [notas, setNotas] = useState({
    pa1: "",
    pa2: "",
    pa3: "",
    pa4: "",
    examenFinal: "",
  });
  const { examenFinal, pa1, pa2, pa3, pa4 } = notas;
  const [promedio, setPromedio] = useState(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calcularPromedio = () => {
    const result = evaluateGrades(notas);
    setErrors(result.errors);
    setPromedio(result.average === null ? null : result.average.toFixed(1));
    const firstError = Object.keys(result.errors)[0];
    if (firstError) document.getElementById(firstError)?.focus();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNotas({ ...notas, [name]: value });
    setPromedio(null);
    setErrors({});
  };

  const onBackNavigate = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo" onClick={onBackNavigate} style={{ cursor: "pointer" }}>
              <img src="icon/logo-isil.jpg" alt="ISIL" />
            </div>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <h1>Calculadora de promedios/</h1>
        <section className={styles.section}>
          <div className={styles.content}>
            <p>
              Una herramienta sencilla para que cualquier estudiante de ISIL pueda <br />
              calcular su promedio del ciclo. Accesible desde cualquier dispositivo, <br />
              disponible para toda la comunidad ISIL.
            </p>
            <div>
              <img className="img-fluid" style={{ width: 280 }} src="img/calculadora.png" alt="" />
            </div>
            <button type="submit" form="grade-form">Calcular Promedio</button>
            {Object.keys(errors).length > 0 && <p role="alert" style={{ color: "#b42318" }}>Completa todas las notas con valores entre 0 y 20.</p>}
          </div>

          <form id="grade-form" className={styles.formCalc} noValidate onSubmit={(e) => { e.preventDefault(); calcularPromedio(); }}>
            <div>
              <label htmlFor="pa1">PA1</label>
              <input id="pa1" name="pa1" type="number" value={pa1} onChange={handleInput} aria-invalid={Boolean(errors.pa1)} required max={20} min={0} step="any" inputMode="decimal" />
            </div>
            <div>
              <label htmlFor="pa2">PA2</label>
              <input id="pa2" name="pa2" type="number" value={pa2} onChange={handleInput} aria-invalid={Boolean(errors.pa2)} required max={20} min={0} step="any" inputMode="decimal" />
            </div>
            <div>
              <label htmlFor="pa3">PA3</label>
              <input id="pa3" name="pa3" type="number" value={pa3} onChange={handleInput} aria-invalid={Boolean(errors.pa3)} required max={20} min={0} step="any" inputMode="decimal" />
            </div>
            <div>
              <label htmlFor="pa4">PA4</label>
              <input id="pa4" name="pa4" type="number" value={pa4} onChange={handleInput} aria-invalid={Boolean(errors.pa4)} required max={20} min={0} step="any" inputMode="decimal" />
            </div>
            <div>
              <label htmlFor="examenFinal">Evaluación Final</label>
              <input id="examenFinal" name="examenFinal" type="number" value={examenFinal} onChange={handleInput} aria-invalid={Boolean(errors.examenFinal)} required max={20} min={0} step="any" inputMode="decimal" />
            </div>
            <div>
              <label htmlFor="promedio">Promedio</label>
              <input id="promedio" name="promedio" type="text" value={promedio ?? ""} readOnly />
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
