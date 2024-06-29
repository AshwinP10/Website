import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import pcb from "../../Assets/Projects/pcb.png";
import suicide from "../../Assets/Projects/suicide.png";
import website from "../../Assets/Projects/website.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few things I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={pcb}
              isBlog={false}
              title="Embedded Systems Handheld Video Game"
              description="Designed a PCB game controller using KiCAD for the TI MSPM0 microcontroller. Soldered switches, LEDs, an audio port, an LCD screen, a variable resistor slide pot, UART ports, and other components onto the PCB.
              Recreated the old arcade game “Asteroids” in C, C++, and ARM Assembly, using multithreading with Systick interrupts to read player input.
              "
              ghLink="https://github.com/AshwinP10/gamelab"
              demoLink="https://www.youtube.com/watch?v=-TJatr4mJDc&t=77s&ab_channel=AshwinPrakash"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={website}
              isBlog={false}
              title="This Website"
              description="My personal portfolio showcasing a little bit about me and my projects. Built using React and Bootstrap. My introduction to using Vercel for hosting, and using HTML, CSS, and JS."
              ghLink="https://google.com"
              demoLink="https://ashw.vercel.app"
            />
          </Col>
          


        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
