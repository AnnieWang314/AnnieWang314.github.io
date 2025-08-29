import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"; // Importing icons

interface Project {
  title: string;
  description: string;
  technologies: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Plume",
      description:
        "HackMIT's all-in-one platform for managing hackathons; Includes application portal, check in process, project submission, judging platform, streamlined bulk admin tools, etc.; Led team of 15 to build the MVP (and beyond)",
      technologies: [
        "React",
        "Typescript",
        "Python",
        "Flask",
        "PostgreSQL",
        "AWS",
      ],
      links: {
        demo: "https://plume.hackmit.org",
      },
    },
    {
      title: "Pigeon",
      description:
        "HackMIT's RAG email assistant to automate responses based on email responses; Responsible in overseeing its Chrome extension integration into Gmail and Outlook; Additionally added authentication and imports for documents",
      technologies: [
        "Python",
        "Flask",
        "Redis",
        "PostgreSQL",
        "Chrome Extensions",
      ],
      links: {
        demo: "https://pigeon.hackmit.org/",
      },
    },
    {
      title: "Splash",
      description:
        "HackMIT's landing page for the HackMIT and Blueprint hackathons—with the most recent one linked; Check out <a href='https://archive.hackmit.org' target='_blank' rel='noopener noreferrer'>archive.hackmit.org</a> and <a href='https://bparchive.hackmit.org' target='_blank' rel='noopener noreferrer'>bparchive.hackmit.org</a> for more",
      technologies: ["React", "Three.js"],
      links: {
        demo: "https://blueprint.hackmit.org",
      },
    },
    {
      title: "Wodou",
      description:
        "NYT's Wordle with a twist; HackMIT 2024 organizer admission puzzle; Combines algorithms, cryptography, and Chinese calligraphy",
      technologies: ["React", "Next.js", "Redis", "Vercel"],
      links: {
        github: "https://github.com/AnnieWang314/wodou",
        demo: "https://wodou.vercel.app/",
      },
    },
    {
      title: "Blank[space]",
      description:
        "AI-powered personalized writing assistant; Project submitted to Hack@Brown 2024; Winner of the Best Use of MongoDB Atlas Prize; Led team of 4 to build end-to-end; Differs from standard autocompletion tools given personalized purpose of writing",
      technologies: ["React", "Express.js", "Javascript", "MongoDB", "AI"],
      links: {
        github: "https://github.com/AnnieWang314/blankspace",
      },
    },
    {
      title: "SlangZ",
      description:
        "Platform to learn Gen Z slang; Web Lab (6.9620) final project; Led team of 3 to develop end-to-end app; Track users' personal progress of study flashcards and exercises; Imagine Duolingo x Quizlet",
      technologies: ["React", "Express.js", "Typescript", "MongoDB"],
      links: {
        github: "https://github.com/AnnieWang314/slangz",
      },
    },
    {
      title: "RCA",
      description:
        "On the Hilbert Series of the Rational Cherednik Algebra; Explicitly determined the Hilbert series of a specific case for the polynomial representation of the rational Cherednik algebra; Paper posted on MIT PRIMES website as first author; Presented at MAA’s 2023 Joint Mathematics Meetings",
      technologies: ["Mathematics", "Research", "Python"],
      links: {
        demo: "https://math.mit.edu/research/highschool/primes/materials/2022/WangAn.pdf",
      },
    },
  ];

  return (
    <div className="projects-container">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }} // Ensure card takes full height
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ margin: 0, fontSize: "32px", fontWeight: "600" }}>
                  {project.title}
                </div>
                {project.links && (
                  <div className="project-links" style={{ marginLeft: "auto" }}>
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        style={{ fontSize: "24px", color: "black" }} // Increased size and changed color to black
                      >
                        <FaGithub />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Demo"
                        style={{ fontSize: "24px", color: "black" }} // Increased size and changed color to black
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
            </div>
            <div className="tech-stack" style={{ marginTop: "auto" }}>
              {" "}
              {/* Ensure technologies are at the bottom */}
              {project.technologies.map((tech, i) => (
                <span key={i} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
