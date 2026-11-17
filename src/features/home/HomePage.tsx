import {
  ArrowRight,
  ArrowUpRight,
  Code,
  GitBranch,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { asset } from "../../config/club";
import { CommunityLink } from "../../ui/components/common/CommunityLink";

export const HomePage = () => (
  <div className="hero">
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="hero-eyebrow">
          <span className="status-dot" /> EL PUNTO DE ENCUENTRO DE LOS DEVS DE
          ISIL
        </span>
        <h1>
          Aprende.
          <br />
          Crea. Conecta.
          <br />
          <span>En comunidad.</span>
        </h1>
        <p>
          El código es solo el comienzo. Comparte ideas, construye proyectos y
          crece junto a estudiantes que disfrutan la tecnología tanto como tú.
        </p>
        <div className="hero-actions">
          <CommunityLink />
          <a className="button button-ghost" href="#activities">
            Explora las actividades <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-people">
          <div className="avatar-stack" aria-hidden="true">
            {["AnaRivas", "AndyChung", "RafaelAcala", "JuanYllanes"].map(
              (name) => (
                <img
                  key={name}
                  src={asset(`img/people/${name}.webp`)}
                  width="36"
                  height="36"
                  alt=""
                />
              ),
            )}
          </div>
          <span>
            Por estudiantes.
            <br />
            <strong>Para futuros creadores.</strong>
          </span>
        </div>
      </div>
      <div
        className="hero-art"
        aria-label="Ilustración de un proyecto de programación construido en comunidad"
        role="img"
      >
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="floating-symbol symbol-code">
          <Code size={29} aria-hidden="true" />
        </div>
        <div className="floating-symbol symbol-branch">
          <GitBranch size={24} aria-hidden="true" />
        </div>
        <div className="editor-window">
          <div className="editor-toolbar">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>nuestro-proximo-proyecto.ts</span>
            <Terminal size={14} aria-hidden="true" />
          </div>
          <div className="editor-tab">
            <Code size={14} aria-hidden="true" /> comunidad.ts <span>×</span>
          </div>
          <div className="editor-code" aria-hidden="true">
            <div>
              <span className="line-number">01</span>
              <span className="code-purple">const</span> comunidad = {"{"}
            </div>
            <div>
              <span className="line-number">02</span> nombre:{" "}
              <span className="code-green">'ISIL Developers'</span>,
            </div>
            <div>
              <span className="line-number">03</span> ideas:{" "}
              <span className="code-orange">Infinity</span>,
            </div>
            <div>
              <span className="line-number">04</span> ganasDeCrear:{" "}
              <span className="code-orange">true</span>,
            </div>
            <div>
              <span className="line-number">05</span> tuLugar:{" "}
              <span className="code-green">'aquí'</span>
            </div>
            <div>
              <span className="line-number">06</span>
              {"}"};
            </div>
            <div className="code-blank">
              <span className="line-number">07</span>
            </div>
            <div>
              <span className="line-number">08</span>
              <span className="code-blue">construirJuntos</span>(comunidad);
              <span className="code-cursor" />
            </div>
          </div>
          <div className="editor-footer">
            <span>
              <GitBranch size={12} aria-hidden="true" /> nuestra-comunidad
            </span>
            <span>
              TypeScript <span className="status-dot" />
            </span>
          </div>
        </div>
        <div className="art-note">
          <span className="note-icon">
            <Users size={22} aria-hidden="true" />
          </span>
          <div>
            <strong>Las mejores ideas se comparten.</strong>
            <span>Tu próximo equipo empieza aquí.</span>
          </div>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
        <div className="art-caption">
          <Sparkles size={14} aria-hidden="true" /> Menos «algún día». Más «lo
          construimos».
        </div>
      </div>
    </div>
    <div className="container hero-bottom">
      <span>UN ESPACIO PARA APRENDER HACIENDO</span>
      <a href="#about">
        Descubre el club <span aria-hidden="true">↓</span>
      </a>
    </div>
  </div>
);
