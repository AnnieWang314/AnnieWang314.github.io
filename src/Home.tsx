import React from "react";
import headshot from "./assets/headshot.jpg"; // Assuming headshot.jpg is in the same directory
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Importing icons

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "160px",
          height: "160px",
          overflow: "hidden",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px", // Move the image down a little
          float: "left", // Allow text to wrap around the image
          marginRight: "30px", // Add space between the image and text
        }}
      >
        <img
          src={headshot}
          alt="headshot"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
      <p style={{ textAlign: "left", fontSize: "20px" }}>
        Hi, I'm Annie&#8212;an MIT student studying Computer Science (6-3).
      </p>
      <p style={{ textAlign: "left", fontSize: "20px" }}>
        I'm interested in building at the intersection of software and hardware,
        especially embedded systems and human-computer interaction devices; most
        recently, I joined Biomechatronics at MIT Media Lab researching
        spider-web-like prosthetics and wearable body extensions that translate
        movements into sound. Before that, I built a nonintrusive bruxism
        prevention headband called Somniac.
      </p>
      <p style={{ textAlign: "left", fontSize: "20px" }}>
        I'm most excited about the AI x robotics and HCI space, especially with
        BCI applications to improve people's quality of life.
      </p>
      <p style={{ textAlign: "left", fontSize: "20px" }}>
        On campus, I'm a retired DevOps Head of the{" "}
        <a
          href="https://hackmit.org/"
          target="_blank"
          style={{ color: "#366f72" }}
        >
          HackMIT
        </a>{" "}
        organizing team. I led 15 engineers as tech lead to build and maintain 6
        web applications to streamline hackathon organization. See the{" "}
        <a href="/projects" style={{ color: "#366f72" }}>
          Projects
        </a>{" "}
        page for details.
      </p>
      <p style={{ textAlign: "left", fontSize: "20px" }}>
        In my free time, I'm probably at a local cafe adding to my Beli
        collection or running along the Charles.
      </p>
      <p style={{ textAlign: "left", fontSize: "20px" }}>
        Please contact me at awang27 [at] mit [dot] edu if you would like to
        chat!
      </p>
      <hr style={{ margin: "20px 0", border: "1px solid #ccc" }} />
      <div style={{ marginTop: "20px" }}>
        <a
          href="https://github.com/AnnieWang314"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px" }}
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/annie-wang-ma"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px" }}
        >
          <FaLinkedin size={30} />
        </a>
        <a href="mailto:awang27@mit.edu" style={{ margin: "0 10px" }}>
          <FaEnvelope size={30} />
        </a>
      </div>
    </div>
  );
};

export default Home;
