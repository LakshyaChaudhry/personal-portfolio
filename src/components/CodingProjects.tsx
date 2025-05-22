// src/pages/CodingProjects.tsx
//import React from "react";
import ProjectCard from "../components/ProjectCard";      // ← adjust if paths differ
import { projects } from "../data/projects";
import "../CodingProjects.css";                         // keep any custom styles

/**
 * Accent colour that matches your LC logo.
 * If you already declared --accent in CSS, you can read it with
 * const accent = getComputedStyle(document.documentElement)
 *                 .getPropertyValue("--accent");
 */
//const ACCENT_COLOUR = "#0D6EFD";

export default function CodingProjects() {
  return (
    <section className="page-section coding-projects">
      <h1 className="title">Coding Projects</h1>
      <p className="subtitle">This is a showcase of my coding work</p>

      {/* --- responsive grid of glass cards ------------------------------- */}
      <div className="projects-grid">
        {projects.map((proj) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            //accent={ACCENT_COLOUR}
          />
        ))}
      </div>
    </section>
  );
}
