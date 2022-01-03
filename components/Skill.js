import {Container, Row, Col, Image} from 'react-bootstrap'

export default function Skill(props) {

  const starSize=50;
  const star_rating = [...Array(props.stars)].map((value, index) =>
    <div className="d-inline-flex p-0 my-1" key={index}><Image src="star.png" alt="star" width={starSize} height={starSize} fluid/></div>
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
