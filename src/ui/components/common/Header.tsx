import { useState } from "react";
import "./header.css";
import { useHref, useNavigate } from "react-router";

const navLinks = [
  {
    id: "about",
    label: "¿Qué hacemos?",
    to: "#about",
  },
  {
    id: "activities",
    label: "Actividades",
    to: "#activities",
  },
  {
    id: "calculate-promedio",
    label: "Calculadora de promedios",
    to: "#calculate-promedio",
  },
  {
    id: "events",
    label: "Eventos",
    to: "#events",
  },
  {
    id: "resources",
    label: "Recursos para programadores",
    to: "#resources",
  },
  {
    id: "credits",
    label: "Créditos",
    to: "#credits",
  },
];

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const calculatorHref = useHref("/calculadora");
  const [open, setOpen] = useState(false);
  const navigateToSection = (sectionId: string) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "instant"
      : "smooth";
    setOpen(false);
    if (sectionId == "calculate-promedio") {
      navigate("/calculadora");
      return;
    }

    if (sectionId === "about") {
      window.scrollTo({ top: 0, behavior });
      setActiveSection("home");
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        setActiveSection(sectionId);
        element.scrollIntoView({ behavior });
      }
    }
  };

  const scrollToTop = () => {
    setOpen(false);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? "instant"
      : "smooth";
    window.scrollTo({ top: 0, behavior });
    setActiveSection("home");
  };

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          document.querySelector<HTMLButtonElement>(".navbar-toggle")?.focus();
        }
      }}
    >
      <nav className="navbar">
        <div className="navbar-container">
          <a
            href="#home"
            className="navbar-logo"
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
            }}
            aria-label="ISIL, volver al inicio"
            style={{ cursor: "pointer" }}
          >
            <img src="icon/logo-isil.jpg" alt="ISIL" />
          </a>

          <ul
            id="main-navigation"
            className={`navbar-links ${open ? "active" : ""}`}
          >
            {navLinks.map(({ label, id, to }) => (
              <li key={id}>
                <a
                  href={
                    id === "calculate-promedio"
                      ? calculatorHref
                      : id === "about"
                        ? "#home"
                        : to
                  }
                  onClick={(event) => {
                    if (
                      event.ctrlKey ||
                      event.metaKey ||
                      event.shiftKey ||
                      event.altKey
                    )
                      return;
                    event.preventDefault();
                    navigateToSection(id);
                  }}
                  className={activeSection === id ? "active-link" : ""}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="navbar-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </nav>
    </header>
  );
};
