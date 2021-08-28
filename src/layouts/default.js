import React from "react";
import "../styles/markdown.scss";

export function Default({ children }) {
  return (
    <section className="hero">
      <div className="hero-body">{children}</div>
    </section>
  );
}
