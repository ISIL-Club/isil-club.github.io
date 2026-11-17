import "./HomePage.css";
import { club } from "../../config/club";

export const HomePage = () => {
  return (
    <>
      <div className="home-content">
        <div className="home-text">
          <h1>Bienvenido a <br />
            ISIL Developers Club/</h1>
          <p>La comunidad oficial de estudiantes de ISIL apasionados por la programación y la tecnología. Aquí
            aprenderás, crearás y crecerás junto a otros estudiantes como tú.</p>
          <div className="container-button">
            <button onClick={() => window.open(club.discord, "_blank", "noopener,noreferrer")}>únete ahora</button>
          </div>
        </div>
      </div>
    </>
  )
};
