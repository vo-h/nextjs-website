import {Navbar, Container, Nav, Image, Row, Col} from 'react-bootstrap';

export default function NavBar_Posts(props) {

  const socialSize=100  ;

  var newPath = ''

  if (props.newpath) {
    newPath=props.newpath
    console.log(newPath)
  }

  const linkedinIcon=`${newPath}linkedin.webp`
  const gitIcon= `${newPath}github.webp`
  const medIcon=`${newPath}medium.webp`

  return (
    <>
    <Container className="pt-5 mt-5" fluid>
    </Container>
    <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">Hien Vo</Navbar.Brand>
          <a href="https://www.linkedin.com/in/h-vo/" target="_blank" rel="noreferrer" className="mx-2">
            <Image src={linkedinIcon} alt="LinkedIn icon" style={{maxWidth: 35, height: "auto"}}/>
          </a>
          <a href="https://github.com/vo-h" target="_blank" rel="noreferrer" className="mx-2">
            <Image src={gitIcon} alt="GitHub icon" style={{maxWidth: 35, height: "auto"}}/>
          </a>
          <a href="https://medium.com/@h-vo" target="_blank" rel="noreferrer" className="mx-2">
            <Image src={medIcon} alt="Medium icon" style={{maxWidth: 35, height: "auto"}}/>
          </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="d-flex flex-row-reverse">About</Nav.Link>
            <Nav.Link href="/skills" className="d-flex flex-row-reverse">Skills</Nav.Link>
            <Nav.Link href="/projects" className="d-flex flex-row-reverse">Projects</Nav.Link>
            <Nav.Link href="/blog" className="d-flex flex-row-reverse">Blog</Nav.Link>
            <Nav.Link href="/contact" className="d-flex flex-row-reverse">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
};
