import {Form, Button} from 'react-bootstrap'

export default function ContactForm(props) {
  return (
    <>
    <Form className="px-3" onSubmit={props.customSubmit}>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="text" placeholder="Name" name="name"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Email" name="email"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} placeholder="Your message ..." name="message" required/>
      </Form.Group>

      <Button variant="primary" type="submit">Send</Button>
    </Form>
    </>
  )
};
