import "./activities.css";
import { club } from "../../config/club";
import { Title } from "../../ui/components/common/Title";

const actividadesIcons: { linkIcon: string; descripcion: string; linkRef: string }[] = [
  {
    descripcion: "Talleres prácticos",
    linkIcon: "talleres-icon.svg",
    linkRef: "#events",
  },
  {
    descripcion: "Proyectos colaborativos",
    linkIcon: "colaborativos-icon.svg",
    linkRef: club.repository,
  },
  {
    descripcion: "Hackatons",
    linkIcon: "hackatons-icon.svg",
    linkRef: "#events",
  },
  {
    descripcion: "Charlas con\nprofesionales tech",
    linkIcon: "charlas-icon.svg",
    linkRef: "#events",
  },
  {
    descripcion: "Desarrollo web",
    linkIcon: "web-icon.svg",
    linkRef: "https://developer.mozilla.org/es/docs/Learn_web_development",
  },
  {
    descripcion: "Inteligencia artificial",
    linkIcon: "ia-icon.svg",
    linkRef: club.discord,
  },
  {
    descripcion: "Comunidad en Discord",
    linkIcon: "discord.png",
    linkRef: club.discord,
  },
  {
    linkIcon: "app-text.png",
    descripcion: "Desarrollo de apps\n móviles",
    linkRef: club.discord,
  },
];

export const ActividadesPage = () => {
  return (
    <div className="activities-body">
      <Title className="activities-title">Actividades</Title>
      <div className="activities-list">
        {actividadesIcons.map(({ descripcion, linkIcon, linkRef }, i) => (
          <div key={i} className="activities-item">
            <img src={`img/${linkIcon}`} alt={descripcion} />
            <h4>{descripcion}</h4>
            <button aria-label={`Ver más: ${descripcion.replace(/\n/g, " ")}`} onClick={() => {
              if (linkRef.startsWith("#")) document.querySelector(linkRef)?.scrollIntoView({ behavior: "smooth" });
              else window.open(linkRef, "_blank", "noopener,noreferrer");
            }}>Ver más</button>
          </div>
        ))}
      </div>
    </div>
  );
};
