import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
// 400px source for a 172px circle; the 3504px original was a 926KB download.
import headshot from "./assets/headshot-400.jpg";

const now: { label: string; body: React.ReactNode }[] = [
  {
    label: "Learning about",
    body: "AI x robotics x HCI, and how to make cool stuff",
  },
  { label: "Otherwise", body: "at a cafe, or running along the Charles" },
];

const Home: React.FC = () => {
  return (
    <div>
      <div className="hero">
        <div>
          <h1 className="lede">
            hi
          </h1>
          <div className="prose">
            <p>
              I'm Annie, a senior at MIT. I like embedded
              systems and robotics.
            </p>
            <p>
              Last summer I was at Modal, figuring out when containers
              should spin up and when they should shut down. Before that I built a headband for teeth grinders. I'm also a retired
              DevOps Head at{" "}
              <a href="https://hackmit.org/" target="_blank" rel="noopener noreferrer">
                HackMIT
              </a>
              , where I ran 15 engineers across five apps.
            </p>
          </div>
        </div>

        <img
          className="hero-photo"
          src={headshot}
          alt="Annie Wang"
          width={172}
          height={172}
          decoding="async"
        />
      </div>

      <section className="now" aria-labelledby="now-heading">
        <p className="eyebrow" id="now-heading">
          Currently
        </p>
        <ul className="now-list">
          {now.map(({ label, body }) => (
            <li key={label}>
              <span className="now-label">{label}</span>
              <span>{body}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="prose">
        <p>
          Check out my <Link to="/work">work</Link> page to see how I've gone from math to software to hardware! If any
          of it sounds interesting, I'd love to hear from you — awang27 [at] mit
          [dot] edu.
        </p>
      </div>

      <div className="socials">
        <a
          href="https://github.com/AnnieWang314"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/annie-wang-ma"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a href="mailto:awang27@mit.edu" aria-label="Email">
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default Home;
