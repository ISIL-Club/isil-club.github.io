import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { asset } from "../../../config/club";
import { CommunityLink } from "./CommunityLink";
import "./header.css";

const links = [
  { id: "about", label: "Comunidad" },
  { id: "activities", label: "Actividades" },
  { id: "events", label: "Eventos" },
  { id: "resources", label: "Recursos" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    for (const { id } of links) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const closeOnResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <div className="container header-inner">
        <Link
          className="brand"
          to="/#home"
          aria-label="ISIL Developers Club, inicio"
          onClick={() => setOpen(false)}
        >
          <img
            src={asset("icon/logo-isil.webp")}
            width="44"
            height="44"
            alt=""
          />
          <span>
            ISIL
            <span className="brand-detail">
              Developers Club<span className="brand-slash">/</span>
            </span>
          </span>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="main-navigation"
          className={`main-navigation ${open ? "is-open" : ""}`}
          aria-label="Navegación principal"
        >
          {links.map(({ id, label }) => (
            <Link
              key={id}
              to={`/#${id}`}
              onClick={() => setOpen(false)}
              aria-current={
                location.pathname === "/" && active === id
                  ? "location"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
          <CommunityLink className="button button-primary header-join" />
        </nav>
      </div>
    </header>
  );
};
