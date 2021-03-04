import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import './navBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const NavBarMain = () =>{
    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand>
                <Link to ='/' className = 'link'>
                    Parcial 3 iweb
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features"></Nav.Link>
                    <Nav.Link>
                        <Link to ='/templateEntities' className = 'link'>
                            Template Entities
                        </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to ='/mapEntities' className = 'link'>
                            Map Entities
                        </Link>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default NavBarMain;