import {Card, Row, Col, Container, Image} from 'react-bootstrap';

export default function ResCard(props) {
  return (
    <Container className="my-3">
    <Row className="">
      <Col className="">
      <Card style={{backgroundColor: "#292421"}}>
        <Card.Img src={props.img} style={{maxHeight: 250, width:"auto"}}/>
        <Card.Body style={{backgroundColor: "#1C1F23", color: "white"}}>
          <Card.Title className="pb-2">{props.title}</Card.Title>
          <Card.Text style={{minHeight:150}}>{props.text}</Card.Text>
        <Card.Footer className="d-flex justify-content-end">
          <a href={props.link} target="_blank" rel="noreferrer">
            <Image src="link_white.webp" alt="Link icon" style={{maxWidth:20, heigh:"auto"}} className="mx-2" flex/>
          </a>
          <a href={props.github} target="_blank" rel="noreferrer">
            <Image src="github_white.webp" alt="GitHub icon" style={{maxWidth:20, heigh:"auto"}} className="mx-2" flex/>
          </a>
        </Card.Footer>
        </Card.Body>
      </Card>
      </Col>
    </Row>
    </Container>
  )
};
