import React from "react";
import Card from "react-bootstrap/Card";
import { ImBubble } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            My name is <span className="purple"> Ashwin Prakash </span>
            and I'm from <span className="purple"> Pleasanton, California.</span>
            <br />
            I am an Electrical and Computer Engineering Student at UT Austin.
            <br />
            I developed this website to showcase many of my projects in my portfolio.
            <br />
            <br />
            In my free time, I like to
          </p>
          <ul>
            <li className="about-activity">
              <ImBubble />   Play Basketball
            </li>
            <li className="about-activity">
              <ImBubble />   Spend time with friends and family
            </li>
            <li className="about-activity">
              <ImBubble />   Work on side projects
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
