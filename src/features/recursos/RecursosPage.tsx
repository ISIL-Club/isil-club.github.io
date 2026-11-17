import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Code,
  GraduationCap,
  Gift,
} from "lucide-react";
import { Link } from "react-router";

const resources = [
  {
    icon: GraduationCap,
    category: "CURSOS Y CERTIFICACIONES",
    title: "Aprende a tu ritmo",
    description:
      "Practica programación con los cursos y proyectos de freeCodeCamp en español.",
    label: "Ir a freeCodeCamp",
    href: "https://www.freecodecamp.org/espanol/learn/",
  },
  {
    icon: BookOpen,
    category: "GUÍAS Y DOCUMENTACIÓN",
    title: "Resuelve esa duda",
    description:
      "Encuentra explicaciones y ejemplos de HTML, CSS y JavaScript en MDN Web Docs.",
    label: "Explorar MDN",
    href: "https://developer.mozilla.org/es/docs/Learn_web_development",
  },
  {
    icon: Gift,
    category: "PARA ESTUDIANTES",
    title: "Equipa tus ideas",
    description:
      "Descubre las herramientas y beneficios del GitHub Student Developer Pack.",
    label: "Ver GitHub Education",
    href: "https://education.github.com/pack",
  },
  {
    icon: Code,
    category: "HERRAMIENTAS",
    title: "Prepara tu espacio",
    description:
      "Conoce Visual Studio Code y configura tu entorno para empezar a construir.",
    label: "Conocer VS Code",
    href: "https://code.visualstudio.com/",
  },
];
export const RecursosPage = () => (
  <div className="container">
    <div className="section-heading">
      <div>
        <span className="eyebrow">GUÁRDALOS EN TUS FAVORITOS</span>
        <h2>
          Un empujón para
          <br />
          tu próximo proyecto<span className="blue-text">.</span>
        </h2>
      </div>
      <p>
        Recursos para seguir aprendiendo, resolver dudas y tener tus
        herramientas a mano.
      </p>
    </div>
    <div className="resources-grid">
      {resources.map(
        ({ icon: Icon, category, title, description, label, href }) => (
          <a
            className="resource-card"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            key={title}
          >
            <div className="resource-top">
              <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
            <span className="resource-category">{category}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="resource-action">
              {label} <ArrowRight size={15} aria-hidden="true" />
            </span>
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        ),
      )}
    </div>
    <div className="calculator-banner">
      <span className="calculator-banner-icon">
        <Calculator size={34} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div>
        <span className="eyebrow">HECHA PARA LA COMUNIDAD ISIL</span>
        <h3>Menos cuentas. Más claridad.</h3>
        <p>Calcula tu promedio con tus prácticas y tu evaluación final.</p>
      </div>
      <Link className="button button-primary" to="/calculadora">
        Calcular mi promedio <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  </div>
);
