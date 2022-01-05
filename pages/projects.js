import {Card, Container, Row, Col} from 'react-bootstrap';
import Expo from '../components/Expo'
import ResCard from '../components/ResCard'
import NavBar from '../components/NavBar'
import {Client} from "@notionhq/client"
import {parseProjects} from '../lib/others'
import {getRecords} from '../lib/notion-comm'
export default function Projects(props) {

  const short_intro=`Below are the things that I've done that are worth showing according to my arbitrary standards :)`

  return (
    <Container className="mb-5 pb-5">
      <NavBar/>
      <Expo headline="Projects" text={short_intro}/>
      <hr/>
      <Container>
        {
          props.projects.map((projectGroups, index) =>
            <Row key={index}>
              {
                projectGroups.map(project =>
                  <Col lg={6} key={project.title}>
                    <ResCard
                      img={project.img}
                      title={project.title}
                      text={project.text}
                      link={project.link}
                      github={project.github}
                    />
                  </Col>
                )
              }
            </Row>
          )
        }
      </Container>

    </Container>
  )
}

export async function getStaticProps() {

  const notion = new Client({auth: process.env.NOTION_KEY})
  const records = await getRecords(process.env.NOTION_PROJECTS_DB, notion)
  const projects = await parseProjects(records)

  return {props: {projects: projects}}
}
