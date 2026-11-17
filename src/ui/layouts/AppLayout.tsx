import {
  ArrowUpRight,
  Code,
  GitBranch,
  Heart,
  Lightbulb,
  Users,
} from "lucide-react";
import { ActividadesPage } from "../../features/actividades/ActividadesPage";
import { CreditosPage } from "../../features/creditos/CreditosPage";
import { Eventos } from "../../features/Eventos/Eventos";
import { HomePage } from "../../features/home/HomePage";
import { RecursosPage } from "../../features/recursos/RecursosPage";
import { Header } from "../components/common/Header";
import { Footer } from "../components/common/Footer";
import { CommunityLink } from "../components/common/CommunityLink";
import { club } from "../../config/club";

const benefits = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Aprende con otros",
    text: "Pregunta, comparte lo que sabes y descubre nuevas formas de resolver problemas. Aquí siempre hay algo por aprender.",
  },
  {
    icon: Code,
    number: "02",
    title: "Construye algo tuyo",
    text: "Lleva tus ideas más allá del aula. Practica con proyectos, experimenta con tecnología y aprende en el proceso.",
  },
  {
    icon: Users,
    number: "03",
    title: "Encuentra a tu gente",
    text: "Conecta con estudiantes que comparten tus intereses. Porque avanzar acompañado se siente diferente.",
  },
];
export const AppLayout = () => (
  <>
    <Header />
    <main id="main">
      <section id="home">
        <HomePage />
      </section>
      <div className="topic-strip" aria-label="Áreas de interés">
        <div className="container">
          <span>Desarrollo web</span>
          <i />
          <span>Inteligencia artificial</span>
          <i />
          <span>Apps móviles</span>
          <i />
          <span>Proyectos colaborativos</span>
        </div>
      </div>
      <section id="about" className="section section-about">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HOLA, SOMOS ISIL DEVELOPERS CLUB</span>
              <h2>
                Tu curiosidad tiene
                <br />
                un lugar aquí<span className="blue-text">.</span>
              </h2>
            </div>
            <p>
              Una comunidad de estudiantes de ISIL para aprender, compartir y
              dar el siguiente paso como desarrolladores.
            </p>
          </div>
          <div className="benefits-grid">
            {benefits.map(({ icon: Icon, number, title, text }) => (
              <article className="benefit" key={number}>
                <div className="benefit-top">
                  <Icon size={27} strokeWidth={1.6} aria-hidden="true" />
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="events" className="section section-muted">
        <Eventos />
      </section>
      <section id="activities" className="section">
        <ActividadesPage />
      </section>
      <section id="projects" className="section section-projects">
        <div className="container project-feature">
          <div className="project-visual" aria-hidden="true">
            <div className="mini-browser">
              <div className="mini-browser-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="mini-site">
                <span className="mini-logo">&lt;/&gt; ISIL</span>
                <strong>
                  Las ideas se
                  <br />
                  <span>construyen en equipo.</span>
                </strong>
                <div className="mini-button" />
                <div className="mini-columns">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <span className="project-label">
              <GitBranch size={15} /> Hecho por el club
            </span>
          </div>
          <div className="project-copy">
            <span className="eyebrow">DEL PRIMER COMMIT A LA PRIMERA DEMO</span>
            <h2>
              Lo que aprendes,
              <br />
              lo ponemos en práctica.
            </h2>
            <p>
              Esta web también es un proyecto de la comunidad. Explora su
              código, descubre cómo está construida y encuentra una forma de
              aportar.
            </p>
            <div className="tag-list">
              <span>React</span>
              <span>TypeScript</span>
              <span>Trabajo en equipo</span>
            </div>
            <a
              className="text-link"
              href={club.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explorar el proyecto en GitHub{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only"> (pestaña nueva)</span>
            </a>
          </div>
        </div>
      </section>
      <section id="resources" className="section">
        <RecursosPage />
      </section>
      <section id="community" className="community-section">
        <div className="container community-inner">
          <div className="community-graphic" aria-hidden="true">
            <span>{"{"}</span>
            <Heart size={42} strokeWidth={1.3} />
            <span>{"}"}</span>
          </div>
          <span className="eyebrow">EL SIGUIENTE PASO ES CONECTAR</span>
          <h2>
            Tu próximo proyecto empieza
            <br /> con una conversación.
          </h2>
          <p>
            Comparte una idea, resuelve una duda o simplemente ven a conocer a
            la comunidad. Nos encontramos en Discord.
          </p>
          <CommunityLink className="button button-white" />
          <span className="community-footnote">
            Trae tus ideas. Las ganas de aprender son suficientes.
          </span>
        </div>
      </section>
      <section id="credits" className="section section-muted">
        <CreditosPage />
      </section>
    </main>
    <Footer />
  </>
);
