import styles from "./creditos.module.css";
import { Title } from "../../ui/components/common/Title";
import { ColaboradorCard, type Colaborador } from "./ColaboradorCard";
import linkedinProfiles from "./linkedin-profiles.json";

const perfiles: Record<string, Colaborador["perfil"]> = linkedinProfiles.profiles;

const fundadores: Colaborador[] = [
  {
    nombre: "Caesar Preciado",
    ocupacion: "FOUNDER & ORGANIZER",
    imagen: "img/portraits/CaesarPreciado.png",
    fondo: styles.FondoCaesar,
    perfil: perfiles.caesar,
  },
  {
    nombre: "Jair Castañeda",
    ocupacion: "CO-FOUNDER & TECHNICAL INSTRUCTOR",
    imagen: "img/JairCastaneda.jpg",
    perfil: perfiles.jair,
  },
];

const colaboradores: Colaborador[] = [
  {
    nombre: "Matt Castillo",
    ocupacion: "PROJECT MANAGER",
    imagen: "img/matt.png",
    perfil: perfiles.matt,
  },
  {
    nombre: "Rafael Acalá",
    ocupacion: "UX/UI DESIGNER",
    imagen: "img/portraits/RafaelAcala.png",
    fondo: styles.FondoRafael,
  },
  {
    nombre: "Juan Yllanes",
    ocupacion: "PROGRAMMER",
    imagen: "img/portraits/JuanYllanes.png",
    fondo: styles.FondoJuan,
    perfil: perfiles.juan,
  },
  {
    nombre: "Andy Chung",
    ocupacion: "PROGRAMMER",
    imagen: "img/portraits/AndyChung.png",
    fondo: styles.FondoAndy,
    perfil: perfiles.andy,
  },
  {
    nombre: "Ana Rivas",
    ocupacion: "PROGRAMMER",
    imagen: "img/portraits/AnaRivas.png",
    fondo: styles.FondoAna,
    perfil: perfiles.ana,
  },
];

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
        <h3 className={styles.Subtitulo} id="fundadores-titulo">Founders</h3>
        <ul className={styles.FundadoresGrid}>
          {fundadores.map((persona) => (
            <ColaboradorCard key={persona.nombre} persona={persona} destacado />
          ))}
        </ul>
      </section>

      <section className={`${styles.Grupo} ${styles.Equipo}`} aria-labelledby="equipo-titulo">
        <h3 className={styles.Subtitulo} id="equipo-titulo">Project team</h3>
        <ul className={styles.ColaboradoresGrid}>
          {colaboradores.map((persona) => (
            <ColaboradorCard key={persona.nombre} persona={persona} />
          ))}
        </ul>
      </section>
    </div>
  );
};
