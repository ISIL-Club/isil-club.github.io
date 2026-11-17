import "./recursos.css";


//PRUEBA DE CONEXION A DISCORD2
const recursosIcons: { linkIcon: string; descripcion: string; linkRef: string }[] = [
    {
        descripcion: "Cursos Gratuitos",
        linkIcon: "cursosgratuitos.png",
        linkRef: "https://www.freecodecamp.org/espanol/learn/",
    },
    {
        descripcion: "Certificados",
        linkIcon: "certificado.png",
        linkRef: "https://www.freecodecamp.org/espanol/learn/",
    },
    {
        descripcion: "Articulos",
        linkIcon: "articulos.png",
        linkRef: "https://developer.mozilla.org/es/docs/Learn_web_development",
    },
    {
        descripcion: "Herramientas",
        linkIcon: "tools.png",
        linkRef: "https://code.visualstudio.com/",
    },
];

export const RecursosPage = () => {
    return (
        <div className="recursos-body">
            <h1>Recursos/</h1>
            <div className="recursos-list">
                {recursosIcons.map(({ descripcion, linkIcon, linkRef }, i) => (
                    <div key={i} className="recursos-item">
                        <img src={`img/${linkIcon}`} alt={descripcion} />
                        <h4>{descripcion}</h4>
                        <button aria-label={`Ver más: ${descripcion}`} onClick={() => window.open(linkRef, "_blank", "noopener,noreferrer")}>Ver más</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
