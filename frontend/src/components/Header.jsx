import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {
  FaBalanceScale,
  FaBuilding,
  FaGem,
  FaHome,
  FaPhone,
  FaProductHunt,

  FaRecycle,

  FaTruck,

  FaUser,
  FaUserAltSlash,
  FaUserTimes,
  FaWineBottle,

} from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'

import logo from '../assets/logo.svg'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="header">
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>
              <img className="header-logo" src={logo} alt="" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navabar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <LinkContainer to={'/home'}>
                    <Nav.Link>
                      <FaHome /> Accueil
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Productions" id="basic-nav-dropdown">

                  <LinkContainer to={'/produits'}>
                    <Nav.Link>
                      <FaProductHunt /> Produits
                    </Nav.Link>
                  </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Plastique" id="basic-nav-dropdown">

                  <LinkContainer to={'/collectes'}>
                    <Nav.Link>
                      <FaTruck /> Collectes
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={'/types-de-plastique'}>
                    <Nav.Link>
                      <FaRecycle /> Types de plastiques
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={'/recettes'}>
                    <Nav.Link>
                      <FaBalanceScale /> recettes
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to={'/matiere-premieres'}>
                    <Nav.Link>
                      <FaGem /> Matières premières
                    </Nav.Link>
                  </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Tiers" id="basic-nav-dropdown">
                    <LinkContainer to={'/tiers'}>
                      <Nav.Link>
                        {' '}
                        <FaBuilding /> tiers
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={'/contacts'}>
                      <Nav.Link>
                        {' '}
                        <FaPhone /> contacts
                      </Nav.Link>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title={userInfo?.name} id="username">
                    <LinkContainer to={'/profile'}>
                      <NavDropdown.Item>
                        {' '}
                        <FaUser /> Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaUserAltSlash /> Deconnexion
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to={'/'}>
                  <Nav.Link>
                    {' '}
                    <FaUser /> se connecter
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to={'/admin/userlist'}>
                    <NavDropdown.Item>
                      {' '}
                      <FaUserTimes /> Utilisteurs
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
