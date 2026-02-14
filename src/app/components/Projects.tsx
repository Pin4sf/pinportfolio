"use client";

import styles from "./Projects.module.scss";
import BlobButton from "./ui/BlobButton";
import CircleEyeButton from "./ui/CircleEyeButton";
import SquigglyLink from "./ui/SquigglyLink";
import { projectsData } from "@/data/portfolio";

export default function Projects() {
  const total = projectsData.length;

  return (
    <section className={`section ${styles.projects}`} id="startups">
      <h1 className={styles.projectsHeader}>My Startups</h1>
      {projectsData.map((project) => (
        <div key={project.slug} className={styles.project}>
          <div className={styles.projectHeader}>
            <span>
              {project.index}/{total}
            </span>
            <span>{project.subtitle}</span>
          </div>
          <div className={styles.projectInfos}>
            <h1 className={styles.projectInfosName}>
              {project.name}&nbsp;&nbsp;
              <span>({project.abbreviation})</span>
            </h1>
          </div>
          <div className={styles.projectImg}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.name} />
            <div className={styles.projectLinks}>
              <BlobButton href={project.github} darkFill>
                Github
              </BlobButton>
              <CircleEyeButton
                href={project.live}
                text={`.Visit ${project.name} Live.`}
              />
            </div>
            <div className={styles.projectTags}>
              {project.tags.map((tag) => (
                <SquigglyLink key={tag} text={tag} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
