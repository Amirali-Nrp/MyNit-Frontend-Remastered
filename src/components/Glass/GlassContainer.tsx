import React, { ReactNode } from "react";

import styles from "./GlassContainer.module.css";

interface GlassContainerProps {
  children: ReactNode;
  /**
   * "light" → use on dark backdrops
   * "dark"  → use on light backdrops
   */
  variant?: "light" | "dark";
  className?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  variant = "light",
  className = "",
}) => {
  const variantClass = variant === "light" ? styles.light : styles.dark;
  return (
    <div className={`${styles.glass} ${variantClass} ${className}`}>
      {children}
      <div className={styles.noise} />
    </div>
  );
};

export default GlassContainer;
