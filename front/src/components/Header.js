import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Header = () => {
    // return (
    //     <Navbar expand="lg" className="bg-body-tertiary">
    //     <Container>
    //     <Navbar.Brand href="#home">Checks</Navbar.Brand>
    //         {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
    //         <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="me-auto">
    //                 <Nav.Link href="/checks">Home</Nav.Link>
    //                 <Nav.Link href="/create">Link</Nav.Link>
    //             </Nav>
    //         </Navbar.Collapse>
    //     </Container>
    //     </Navbar>
    // );
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '80%'}}>
                <div style={{display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold', fontSize: 20}}>
                    <Navbar.Text href="#home" style={{marginLeft: 20, textDecoration: 'none'}}>
                        Давай разделим!
                    </Navbar.Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Nav.Link href={"/checks"} style={{marginRight: 24, textDecoration: 'none', fontSize: 20}}>
                        Домой
                    </Nav.Link>
                    <Nav.Link onClick={() => {
                        console.log('Exit')
                        localStorage.removeItem('authToken')
                    }} href={"/"}
                              style={{marginRight: 20, textDecoration: 'none', fontSize: 20}}>
                        Выйти
                    </Nav.Link>
                </div>
            </Container>
        </Navbar>


    );
};

export default Header;