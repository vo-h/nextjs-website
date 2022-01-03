import {Card, Container} from 'react-bootstrap'

export default function Expo(props) {
  return (
    <Container>
      <Card bg="dark" text="light" border="0">
        <Card.Body>
          <Card.Title className="d-inline-block">
            <h1 className="headline py-1">{props.headline}</h1>
          </Card.Title>
          <Card.Text>
            <p className="h6 lh-base">{props.text}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
};
