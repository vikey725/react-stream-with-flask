import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAuthContext} from '../authentication/AuthContext';

const NavBar = ({user_name}) => {
  const auth = useAuthContext()

  
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          {!user_name && (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link eventKey={2} href="/register">
              Sign up
            </Nav.Link>
          </Nav>)} 
          {user_name && (<Nav>
            <Nav.Link eventKey={2} onClick={auth.signOut}>Logout {user_name}</Nav.Link>
          </Nav>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;