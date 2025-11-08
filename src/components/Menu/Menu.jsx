import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../assets/logovelo.png';
import { logout } from '../../config/axiosInstance';

function Menu({ titulo }) {
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <div>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: '4rem', objectFit: 'contain' }}
              />
            </Link>
          </div>
          <Navbar.Brand>
            {titulo ? titulo : 'Velocity Cart'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Nav.Link as="span">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Aluguéis
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/brinquedos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Cadastro de Brinquedos
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/contratos" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Cadastro de Contratos
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/relatorios" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Relatórios
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <span
                  style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;