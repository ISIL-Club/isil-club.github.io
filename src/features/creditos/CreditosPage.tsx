import { Code, Heart } from "lucide-react";
import { asset } from "../../config/club";

const team = [
  { name: "Rafael Acalá", role: "Diseño UX/UI", image: "RafaelAcala" },
  { name: "Juan Yllanes", role: "Desarrollo", image: "JuanYllanes" },
  { name: "Jair Castañeda", role: "Desarrollo", image: "JairCastaneda" },
  { name: "Andy Chung", role: "Desarrollo", image: "AndyChung" },
  { name: "Ana Rivas", role: "Desarrollo", image: "AnaRivas" },
  {
    name: "Matt Castillo",
    role: "Gestión del proyecto",
    image: "MattCastillo",
  },
];
export const CreditosPage = () => (
  <div className="container">
    <div className="team-heading">
      <span className="eyebrow">PERSONAS DETRÁS DEL CÓDIGO</span>
      <h2>
        Una web hecha en equipo<span className="blue-text">.</span>
      </h2>
      <p>
        Este proyecto nace de estudiantes del ISIL Developers Club. Distintas
        habilidades, una misma idea: construir un lugar donde todos podamos
        crecer.
      </p>
    </div>
    <div className="team-grid">
      {team.map(({ name, role, image }) => (
        <article className="team-member" key={name}>
          <div className="team-photo">
            <img
              src={asset(`img/people/${image}.webp`)}
              alt={name}
              width="160"
              height="160"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3>{name}</h3>
          <p>{role}</p>
        </article>
      ))}
    </div>
    <div className="team-note">
      <Code size={17} aria-hidden="true" />
      <span>Código, diseño y muchas ganas de compartir.</span>
      <Heart size={15} aria-hidden="true" />
    </div>
  </div>
);
