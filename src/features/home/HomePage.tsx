import "./HomePage.css";
import { club } from "../../config/club";
import { Title } from "../../ui/components/common/Title";

export const HomePage = () => {
  return (
    <>
      <div className="home-content">
        <div className="home-text">
          <Title as="h1" className="home-title" underlined={false}>{"Bienvenido a\nISIL Developers Club"}</Title>
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
