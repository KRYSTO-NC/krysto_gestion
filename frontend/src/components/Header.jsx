import {Navbar , Nav , Container} from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">KRYSTO</Navbar.Brand>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header