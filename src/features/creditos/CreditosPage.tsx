import styles from "./creditos.module.css";
import { Title } from "../../ui/components/common/Title";

type Colaborador = {
  nombre: string;
  ocupacion: string;
  imagen: string;
  fondo?: string;
};

const fundadores: Colaborador[] = [
  {
    nombre: "Caesar Preciado",
    ocupacion: "Fundador",
    imagen: "img/portraits/CaesarPreciado.png",
    fondo: styles.FondoCaesar,
  },
  {
    nombre: "Jair Castañeda",
    ocupacion: "Cofundador y organizador",
    imagen: "img/JairCastaneda.jpg",
  },
];

const colaboradores: Colaborador[] = [
  {
    nombre: "Matt Castillo",
    ocupacion: "Gestión del proyecto",
    imagen: "img/matt.png",
  },
  {
    nombre: "Rafael Acalá",
    ocupacion: "Diseño UX/UI",
    imagen: "img/portraits/RafaelAcala.png",
    fondo: styles.FondoRafael,
  },
  {
    nombre: "Juan Yllanes",
    ocupacion: "Desarrollo",
    imagen: "img/portraits/JuanYllanes.png",
    fondo: styles.FondoJuan,
  },
  {
    nombre: "Andy Chung",
    ocupacion: "Desarrollo",
    imagen: "img/portraits/AndyChung.png",
    fondo: styles.FondoAndy,
  },
  {
    nombre: "Ana Rivas",
    ocupacion: "Desarrollo",
    imagen: "img/portraits/AnaRivas.png",
    fondo: styles.FondoAna,
  },
];

const ColaboradorCard = ({
  persona,
  destacado = false,
}: {
  persona: Colaborador;
  destacado?: boolean;
}) => (
  <li className={[styles.CardColaborador, destacado && styles.Fundador].filter(Boolean).join(" ")}>
    <div className={styles.FotoWrapper}>
      <img
        className={[styles.Fotos, persona.fondo].filter(Boolean).join(" ")}
        src={persona.imagen}
        alt={persona.nombre}
      />
    </div>
    <h4 className={styles.Nombre}>{persona.nombre}</h4>
    <p className={styles.Ocupacion}>{persona.ocupacion}</p>
  </li>
);

export const CreditosPage = () => {
  return (
    <div className={styles.CreditosPage}>
      <Title className={styles.titulo}>CRÉDITOS</Title>
      <p className={styles.mensaje}>
        Este proyecto es desarrollado por estudiantes del ISIL Developers Club. Todo el contenido, herramientas y diseño web son realizados por y para{" "}
        <br />
        estudiantes. Nuestro objetivo es construir una comunidad donde todos puedan aprender, compartir y avanzar en su camino como desarrolladores.
      </p>

      <section className={styles.Grupo} aria-labelledby="fundadores-titulo">
        <h3 className={styles.Subtitulo} id="fundadores-titulo">Fundadores</h3>
        <ul className={styles.FundadoresGrid}>
          {fundadores.map((persona) => (
            <ColaboradorCard key={persona.nombre} persona={persona} destacado />
          ))}
        </ul>
      </section>

      <section className={`${styles.Grupo} ${styles.Equipo}`} aria-labelledby="equipo-titulo">
        <h3 className={styles.Subtitulo} id="equipo-titulo">Equipo del proyecto</h3>
        <ul className={styles.ColaboradoresGrid}>
          {colaboradores.map((persona) => (
            <ColaboradorCard key={persona.nombre} persona={persona} />
          ))}
        </ul>
      </section>
    </div>
  );
};
