import {Container, Row, Col, Image} from 'react-bootstrap'
import Expo from '../components/Expo'
import NavBar from '../components/NavBar'

export default function Home() {

  const short_intro=`Hello. Welcome to my first website! I coded this using a combination of Next.js, React-Bootstrap, Notion.
  I intended for this website to be combination of resume, portfolio & blog. But we'll see how it goes.`

  return (
    <Container>
      <NavBar path=""/>
      <Row>

        <Col lg className="d-flex justify-text-center">
          <Expo headline="Hello!" text={short_intro}/>
        </Col>

        <Col lg className="d-flex justify-content-center my-auto">
          <Image src="profile.webp" width={300} height={300} alt="profile image" roundedCircle fluid/>
        </Col>

      </Row>
    </Container>
  )
};
