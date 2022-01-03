import {Navbar, Container, Nav, Image, Row, Col} from 'react-bootstrap';

export default function NavBar() {

  const socialSize=35 ;

  return (
    <>
    <Container className="pt-5 mt-5" fluid>
    </Container>
    <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Hien Vo</Navbar.Brand>
          <a href="https://www.linkedin.com/in/h-vo/" target="_blank" rel="noreferrer" className="mx-2">
            <Image src="../linkedin.png" alt="LinkedIn icon" width={socialSize} height={socialSize}/>
          </a>
          <a href="https://github.com/vo-h" target="_blank" rel="noreferrer" className="mx-2">
            <Image src="../github.png" alt="GitHub icon" width={socialSize} height={socialSize}/>
          </a>
          <a href="https://medium.com/@h-vo" target="_blank" rel="noreferrer" className="mx-2">
            <Image src="../medium.png" alt="Medium icon" width={socialSize} height={socialSize}/>
          </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/skills">Skills</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
};
