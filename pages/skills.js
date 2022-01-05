import {Container, Accordion} from 'react-bootstrap'
import Expo from '../components/Expo'
import Skill from '../components/Skill'
//import skills from '../public/skills_data.js'
import NavBar from '../components/NavBar'
import {parseSkills} from '../lib/others'
import {getRecords} from '../lib/notion-comm'
import {Client} from "@notionhq/client"

export default function Skills(props) {

  const short_intro=`Updated in Dec 2021 - So I've dabbled in a few things. My first programming language was Java in high school.
  But then I discovered Python in college, and wondered why every other langauge wasn't dead yet because of Python. From then, I've been
  picking up a collection of tech skills through a combination of 'I want to make this cool thing happen' and 'I refuse to be bested
  by this bug!'`

  const categories = Array.from(new Set(props.skills.map(skill => {return skill.category[0]})))

  return (
    <>
      <NavBar/>
      <Expo headline="Skills" text={short_intro}/>
      <hr/>

      <Container className="mb-5 pb-5">
      <Accordion>

        { categories.map((category, index) =>
          <Accordion.Item className="bg-transparent" eventKey={index} key={category}>

            <Accordion.Header>
              {category}
            </Accordion.Header>

            <Accordion.Body className="bg-dark">
              {
                props.skills.filter(skill =>
                  skill.category.includes(category)
                ).map((skill, skillIndex) =>
                  <Skill skill={skill.skill} stars={skill.stars} key={skill}/>
                )
              }
            </Accordion.Body>

          </Accordion.Item>
        )
        }

      </Accordion>
      </Container>
    </>
  )
}

export async function getStaticProps() {

  const notion = new Client({auth: process.env.NOTION_KEY})
  const records = await getRecords(process.env.NOTION_SKILLS_DB, notion)
  const skills = parseSkills(records)

  return {props: {skills: skills}}


}
