import { ArrowUpRight } from "lucide-react";
import { asset, club } from "../../../config/club";

export const CommunityLink = ({
  className = "button button-primary",
  children = "Únete a Discord",
}) => (
  <a
    className={className}
    href={club.discord}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      className="discord-mark"
      src={asset("img/discord.png")}
      width="20"
      height="20"
      alt=""
    />
    {children}
    <ArrowUpRight size={17} aria-hidden="true" />
    <span className="sr-only"> (se abre en una pestaña nueva)</span>
  </a>
);
