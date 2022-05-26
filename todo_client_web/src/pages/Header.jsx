import { Link, useNavigate } from 'react-router-dom'
import { React } from 'react'
import { Button, Navbar, NavDropdown, Nav, Container} from 'react-bootstrap'
import {USER} from '../utils/Storage'

export const Header = () => {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem(USER)
        navigate("login", {replace: true})
    }

    function login() {
        navigate("login", {replace: true})
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Главная</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/note/all">Заметки</Nav.Link>
                        <Nav.Link as={Link} to="/task/all">Задачи</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
                <div className="col-md-3 text-end">
                    <button onClick={login} type="button" className="btn btn-outline-primary me-2">Войти</button>
                    <button onClick={logout} type="button" className="btn btn-primary">Выйти</button>
                </div>
            </Container>
        </Navbar>
    )
} 