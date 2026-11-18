import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Building2, Linkedin, X } from "lucide-react";
import styles from "./creditos.module.css";

type PerfilProfesional = {
  url: string;
  title?: string;
  displayTitle?: string;
  company?: string;
  headline?: string;
  displayHeadline?: string;
};

export type Colaborador = {
  nombre: string;
  ocupacion: string;
  imagen: string;
  fondo?: string;
  perfil?: PerfilProfesional;
};

export const ColaboradorCard = ({ persona, destacado = false }: {
  persona: Colaborador;
  destacado?: boolean;
}) => {
  const profileId = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const perfil = (persona.perfil?.title?.trim() && persona.perfil.company?.trim()) || persona.perfil?.headline?.trim()
    ? persona.perfil : undefined;

  const positionProfile = useCallback(() => {
    if (!panel.current?.matches(":popover-open") || !trigger.current) return;
    const anchor = trigger.current.getBoundingClientRect();
    const { width, height } = panel.current.getBoundingClientRect();
    const gap = 12;
    const edge = 16;
    const fitsRight = anchor.right + gap + width <= window.innerWidth - edge;
    const fitsLeft = anchor.left - gap - width >= edge;
    const left = fitsRight ? anchor.right + gap
      : fitsLeft ? anchor.left - gap - width
        : anchor.left + (anchor.width - width) / 2;
    const top = fitsRight || fitsLeft ? anchor.top + (anchor.height - height) / 2
      : anchor.top - gap - height >= edge ? anchor.top - gap - height
        : anchor.bottom + gap;
    panel.current.style.left = `${Math.max(edge, Math.min(left, window.innerWidth - width - edge))}px`;
    panel.current.style.top = `${Math.max(edge, Math.min(top, window.innerHeight - height - edge))}px`;
  }, []);

  const hideProfile = useCallback((restoreFocus = false) => {
    if (typeof panel.current?.hidePopover === "function" && panel.current.matches(":popover-open")) {
      panel.current.hidePopover();
    }
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", positionProfile);
    window.addEventListener("scroll", positionProfile, true);
    return () => {
      window.removeEventListener("resize", positionProfile);
      window.removeEventListener("scroll", positionProfile, true);
    };
  }, [open, positionProfile]);

  const portrait = (
    <span className={styles.FotoWrapper}>
      <img className={[styles.Fotos, persona.fondo].filter(Boolean).join(" ")}
        src={persona.imagen} alt={persona.nombre} />
    </span>
  );

  return (
    <li className={[styles.CardColaborador, destacado && styles.Fundador].filter(Boolean).join(" ")}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) hideProfile();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          hideProfile(true);
        }
      }}
    >
      {perfil ? (
        <button ref={trigger} type="button" className={styles.ProfileTrigger}
          aria-label={`View work profile: ${persona.nombre}`}
          aria-haspopup="dialog" aria-expanded={open} aria-controls={profileId}
          popoverTarget={profileId} popoverTargetAction="toggle"
          onClick={(event) => {
            event.preventDefault();
            if (typeof panel.current?.showPopover !== "function") {
              window.open(perfil.url, "_blank", "noopener,noreferrer");
              return;
            }
            if (panel.current.matches(":popover-open")) {
              hideProfile(true);
              return;
            }
            panel.current.showPopover();
            positionProfile();
            requestAnimationFrame(() => panel.current?.focus({ preventScroll: true }));
          }}
        >
          {portrait}
          <span className={styles.ProfileHint} aria-hidden="true"><Linkedin size={12} /></span>
        </button>
      ) : portrait}
      <h4 className={styles.Nombre}>{persona.nombre}</h4>
      <p className={styles.Ocupacion}>{persona.ocupacion}</p>

      {perfil && (
        <div ref={panel} id={profileId} popover="auto" role="dialog" tabIndex={-1}
          aria-label={`Work profile: ${persona.nombre}`} className={styles.WorkProfile}
          onToggle={(event) => {
            const showing = event.newState === "open";
            setOpen(showing);
            if (showing) positionProfile();
          }}
        >
          <div className={styles.ProfileHeader}>
            <span><BriefcaseBusiness size={13} aria-hidden="true" /> Professional profile</span>
            <button type="button" className={styles.ProfileClose} aria-label="Close work profile"
              onClick={() => hideProfile(true)}><X size={15} aria-hidden="true" /></button>
          </div>
          {perfil.title && perfil.company ? <>
            <p className={styles.JobTitle}>{perfil.displayTitle ?? perfil.title}</p>
            <p className={styles.Company}><Building2 size={14} aria-hidden="true" /> {perfil.company}</p>
          </> : <p className={`${styles.JobTitle} ${styles.Headline}`}>{perfil.displayHeadline ?? perfil.headline}</p>}
          <a className={styles.ProfileLink} href={perfil.url} target="_blank" rel="noopener noreferrer">
            View LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      )}
    </li>
  );
};
