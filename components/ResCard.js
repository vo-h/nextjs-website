import {Card, Row, Col, Container, Image} from 'react-bootstrap';

export default function ResCard(props) {

  const socialSize=20;

  return (
    <Container>
    <Row className="">
      <Col className="">
      <Card style={{backgroundColor: "#292421"}}>
        <Card.Img src={props.img}/>
        <Card.Body style={{backgroundColor: "#1C1F23", color: "white"}}>
          <Card.Title className="pb-2">{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        <Card.Footer className="d-flex justify-content-end">
          <a href={props.link} target="_blank" rel="noreferrer">
            <Image src="link_white.png" alt="Link icon" width={socialSize} height={socialSize} className="mx-2" flex/>
          </a>
          <a href={props.github} target="_blank" rel="noreferrer">
            <Image src="github_white.png" alt="GitHub icon" width={socialSize} height={socialSize} className="mx-2" flex/>
          </a>
        </Card.Footer>
        </Card.Body>
      </Card>
      </Col>
    </Row>
    </Container>
  )
};
