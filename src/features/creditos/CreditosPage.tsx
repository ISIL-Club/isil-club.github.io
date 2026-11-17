import styles from "./creditos.module.css";

const colaboradores = [
  {
    nombre: "Cesar Preciado",
    ocupacion: "CEO",
    imagen: "img/portraits/CesarPreciado.png",
    fondo: styles.FondoCesar,
  },
  {
    nombre: "Rafael Acalá",
    ocupacion: "UX/UI DESIGNER",
    imagen: "img/portraits/RafaelAcala.png",
    fondo: styles.FondoRafael,
  },
  {
    nombre: "Juan Yllanes",
    ocupacion: "PROGRAMER",
    imagen: "img/portraits/JuanYllanes.png",
    fondo: styles.FondoJuan,
  },
  {
    nombre: "Jair Castañeda",
    ocupacion: "CO-FOUNDER & TECHNICAL INSTRUCTOR",
    imagen: "img/JairCastañeda.jpg",
  },
  {
    nombre: "Andy Chung",
    ocupacion: "PROGRAMMER",
    imagen: "img/portraits/AndyChung.png",
    fondo: styles.FondoAndy,
  },
  {
    nombre: "Ana Rivas",
    ocupacion: "PROGRAMMER",
    imagen: "img/portraits/AnaRivas.png",
    fondo: styles.FondoAna,
  },
  {
    nombre: "Matt Castillo",
    ocupacion: "PROJECT MANAGER",
    imagen: "img/matt.png",
  },
];

export const CreditosPage = () => {
  return (
    <div className={styles.CreditosPage}>
      <div className={styles.CreditosImg}>
        <img src="img/Creditos.png" alt="Créditos" />
      </div>
      <h4 className={styles.mensaje}>
        Este proyecto es desarrollado por estudiantes del ISIL Developers Club. Todo el contenido, herramientas y diseño web son realizados por y para{" "}
        <br />
        estudiantes. Nuestro objetivo es construir una comunidad donde todos puedan aprender, compartir y avanzar en su camino como desarrolladores.
      </h4>
      <div className={styles.ColaboradoresGrid}>
        {colaboradores.map((colab) => (
          <div className={styles.CardColaborador} key={colab.nombre}>
            <div className={styles.FotoWrapper}>
              <img
                className={[styles.Fotos, colab.fondo].filter(Boolean).join(" ")}
                src={colab.imagen}
                alt={colab.nombre}
              />
            </div>
            <h4 className={styles.Ocupacion}>{colab.ocupacion}</h4>
            <h4 className={styles.Nombre}>{colab.nombre}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
