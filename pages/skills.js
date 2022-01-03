import {Container, Accordion} from 'react-bootstrap'
import Expo from '../components/Expo'
import Skill from '../components/Skill'
import skills from '../public/skills_data.js'
import NavBar from '../components/NavBar'

export default function Skills() {

  const short_intro=`Updated in Dec 2021 - So I've dabbled in a few things. My first programming language was Java in high school.
  But then I discovered Python in college, and wondered why every other langauge wasn't dead yet because of Python. From then, I've been
  picking up a collection of tech skills through a combination of 'I want to make this cool thing happen' and 'I refuse to be bested
  by this bug!'`

  const starSize=50;

  const ordered_categories = [
    "Programming/Scripting Languages",
    "DS/ML/AI/Programming Tools",
    "Cloud Technologies",
    "DS/ML/AI Topics",
    "Web Dev. Tools",
    "Languages"
  ]

  return (
    <>
      <NavBar/>
      <Expo headline="Skills" text={short_intro}/>
      <hr/>

      <Container className="mb-5 pb-5">
      <Accordion>

        { ordered_categories.map((category, index) =>
          <Accordion.Item className="bg-transparent" eventKey={index} key={category}>

            <Accordion.Header>
              {category}
            </Accordion.Header>

            <Accordion.Body className="bg-dark">
              {
                skills.filter(skill =>
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
