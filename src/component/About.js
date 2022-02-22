import Card from "react-bootstrap/Card";

function About() {
  return (
    <div>
      <Card
        style={{ width: "72rem", display: "flex", justifyContent: "center" }}
      >
        <Card.Body>
          <Card.Title style={{ display: "flex", justifyContent: "center" }}>
            About
          </Card.Title>
          <Card.Text
            className="cardText"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              Hello! My name is <strong>Bo Wen Hou</strong>, you can call me{" "}
              <strong>Bo</strong>.
              <br />I am a student at Seneca College in Computer Programming and
              Analysis.
              <br />
              This is one of my web assignments on React learning .
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default About;
