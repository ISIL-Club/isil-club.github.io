import {
  ArrowDown,
  BrainCircuit,
  Code,
  GitBranch,
  Globe,
  Mic,
  Smartphone,
  Trophy,
} from "lucide-react";
import { club } from "../../config/club";

const activities = [
  {
    icon: Code,
    title: "Talleres prácticos",
    description: "Aprende haciendo, una línea de código a la vez.",
    detail:
      "Un espacio para practicar herramientas y resolver retos junto a otros estudiantes. Encuentra las próximas sesiones en nuestra agenda.",
    action: "Explora los talleres",
    link: "#events",
    linkText: "Ver la agenda",
    color: "blue",
  },
  {
    icon: GitBranch,
    title: "Proyectos en equipo",
    description: "De una buena idea a algo que puedas mostrar.",
    detail:
      "Comparte tus habilidades, aprende a colaborar y conoce el código de los proyectos del club. Puedes empezar explorando esta misma web.",
    action: "Encuentra tu proyecto",
    link: "#projects",
    linkText: "Conocer el proyecto",
    color: "purple",
  },
  {
    icon: Trophy,
    title: "Hackathons y retos",
    description: "Pon a prueba tu creatividad. Construye con otros.",
    detail:
      "Conecta con la comunidad para conocer los retos y las oportunidades de formar equipo. No necesitas tener todas las respuestas para comenzar.",
    action: "Acepta el reto",
    link: club.discord,
    linkText: "Conectar en Discord",
    color: "orange",
  },
  {
    icon: Mic,
    title: "Charlas tech",
    description: "Nuevas perspectivas para tu siguiente paso.",
    detail:
      "Conversaciones para descubrir tecnologías, compartir experiencias y hacer preguntas. Consulta los encuentros anunciados en la agenda del club.",
    action: "Descubre las charlas",
    link: "#events",
    linkText: "Ver los encuentros",
    color: "green",
  },
];

export const ActividadesPage = () => (
  <div className="container">
    <div className="section-heading">
      <div>
        <span className="eyebrow">FUERA DEL AULA. DENTRO DE LA COMUNIDAD.</span>
        <h2>
          Hay muchas formas
          <br />
          de empezar a crear<span className="blue-text">.</span>
        </h2>
      </div>
      <p>
        Encuentra tu espacio, prueba algo nuevo y lleva tus ideas un poco más
        lejos.
      </p>
    </div>
    <div className="activities-grid">
      {activities.map(
        ({
          icon: Icon,
          title,
          description,
          detail,
          action,
          link,
          linkText,
          color,
        }) => (
          <article className={`activity-card accent-${color}`} key={title}>
            <span className="activity-icon">
              <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
            <details>
              <summary>
                {action}
                <ArrowDown size={15} aria-hidden="true" />
              </summary>
              <div className="activity-detail">
                <p>{detail}</p>
                <a
                  href={link}
                  {...(link.startsWith("https:")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {linkText} →
                  {link.startsWith("https:") && (
                    <span className="sr-only"> (pestaña nueva)</span>
                  )}
                </a>
              </div>
            </details>
          </article>
        ),
      )}
    </div>
    <div className="interest-row">
      <span>¿QUÉ TE MUEVE?</span>
      <div>
        <span>
          <Globe size={17} aria-hidden="true" /> Desarrollo web
        </span>
        <span>
          <BrainCircuit size={17} aria-hidden="true" /> Inteligencia artificial
        </span>
        <span>
          <Smartphone size={17} aria-hidden="true" /> Apps móviles
        </span>
      </div>
    </div>
  </div>
);
