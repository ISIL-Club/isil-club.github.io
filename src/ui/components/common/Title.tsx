import type { ComponentPropsWithoutRef } from "react";
import styles from "./title.module.css";

type TitleProps = Omit<ComponentPropsWithoutRef<"h2">, "children"> & {
  as?: "h1" | "h2" | "h3";
  children: string;
  underlined?: boolean;
};

export const Title = ({ as: Heading = "h2", children, underlined = true, className, ...props }: TitleProps) => {
  const lastSpace = children.lastIndexOf(" ");
  const labelClass = underlined ? styles.label : undefined;

  return (
    <Heading className={[styles.title, className].filter(Boolean).join(" ")} {...props}>
      <span className={labelClass}>{children.slice(0, lastSpace + 1)}</span>
      <span className={styles.ending}>
        <span className={labelClass}>{children.slice(lastSpace + 1)}</span>
        <span className={styles.slash} aria-hidden="true" />
      </span>
    </Heading>
  );
};
