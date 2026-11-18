import type { ComponentPropsWithoutRef } from "react";
import styles from "./title.module.css";

type TitleProps = Omit<ComponentPropsWithoutRef<"h2">, "children"> & {
  as?: "h1" | "h2" | "h3";
  children: string;
};

export const Title = ({ as: Heading = "h2", children, className, ...props }: TitleProps) => {
  const lastSpace = children.lastIndexOf(" ");

  return (
    <Heading className={[styles.title, className].filter(Boolean).join(" ")} {...props}>
      {children.slice(0, lastSpace + 1)}
      <span className={styles.ending}>
        {children.slice(lastSpace + 1)}
        <span className={styles.slash} aria-hidden="true" />
      </span>
    </Heading>
  );
};
