import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineMail,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              ABOUT <span className="blue"> ME </span>
            </h1>
            <p className="home-about-body">
              I am a sophomore Electrical and Computer Engineering Student at UT Austin interested in Software, Computer Architecture, and Robotics.
              <br />
              <br />I have experience with multiple languages like
              <i>
                <b className="blue5"> C, C++, Python, Java, as well as JS, HTML and CSS </b>
              </i>
              with the development of this website.
              <br />
              <br />
              I'm always looking for new opportunities to &nbsp;
              <i>
                <b className="purple">collaborate </b> and
                {" "}
                <b className="purple">
                  learn more about tech!
                </b>
              </i>
              <br />
              <br />
              This website/portfolio showcases some of my past <b className="purple">experiences</b> and
              <i>
                <b className="purple">
                  {" "}
                  projects
                </b>
              </i>
            </p>
          </Col>

          
          
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/AshwinP10"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:ashwinprakash10@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineMail />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/ashwin-prakash-ece/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/ashwin.p10"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
