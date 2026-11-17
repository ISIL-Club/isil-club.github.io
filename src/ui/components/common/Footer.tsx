import { ArrowUpRight, Code, Github, Heart } from "lucide-react";
import { Link } from "react-router";
import { club } from "../../../config/club";
export const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-main">
        <div>
          <Link className="footer-brand" to="/#home">
            <Code size={25} aria-hidden="true" /> ISIL Developers Club
            <span>/</span>
          </Link>
          <p>Aprendemos juntos. Construimos en comunidad.</p>
        </div>
        <nav aria-label="Enlaces del pie de página">
          <Link to="/#credits">El equipo</Link>
          <Link to="/calculadora">Calculadora</Link>
          <a href={club.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} aria-hidden="true" /> GitHub{" "}
            <span className="sr-only">(pestaña nueva)</span>
          </a>
          <a href={club.discord} target="_blank" rel="noopener noreferrer">
            Discord <ArrowUpRight size={15} aria-hidden="true" />
            <span className="sr-only">(pestaña nueva)</span>
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ISIL Developers Club</span>
        <span>
          Hecho con <Heart size={13} aria-label="cariño" /> y muchas ganas de
          aprender.
        </span>
        <Link to="/#home">Volver al inicio ↑</Link>
      </div>
    </div>
  </footer>
);
