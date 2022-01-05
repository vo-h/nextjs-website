import {Container, Row, Col, Image} from 'react-bootstrap'

export default function Skill(props) {

  const star_rating = [...Array(props.stars)].map((value, index) =>
    <div className="d-inline-flex p-0 my-1" key={index}><Image src="star.webp" alt="star" style={{maxWidth:40, height:"auto"}} fluid/></div>
  )

  return (
    <>
      <Row>
        <Col className="px-3"><p className="text-light my-2 text-end">{props.skill}</p></Col>
        <Col className="px-3">
          {star_rating}
        </Col>
      </Row>
    </>
)}
