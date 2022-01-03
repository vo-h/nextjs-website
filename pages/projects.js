import {Card, Container, Row, Col} from 'react-bootstrap';
import Expo from '../components/Expo'
import ResCard from '../components/ResCard'
import NavBar from '../components/NavBar'

export default function Projects() {

  const short_intro=`Below are the things that I've done that are worth showing according to my arbitrary standards :)`

  return (
    <Container className="mb-5 pb-5">
      <NavBar/>
      <Expo headline="Projects" text={short_intro}/>
      <hr/>
      <Container>
        <Row>
          <Col lg>

            <ResCard
              img="https://repository-images.githubusercontent.com/395060155/31d699b4-7f31-4477-8d30-ebc5ce164485"
              title="Chicago Crime"
              text="A dashboard of crime in Chicago & Hyde Park that queries data from Google Bigquery using pandas, plotly, and streamlit. Deployed on Heroku."
              link="https://chicago-crime-dashboard.herokuapp.com/"
              github="https://github.com/vo-h/Chicago-Crime"
            />
            </Col>

          <Col lg>

          </Col>

        </Row>
      </Container>

    </Container>
  )
}
