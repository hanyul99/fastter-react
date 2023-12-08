// NavBar.js
import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Container } from 'react-bootstrap';
import UserCard from './UserCard';

function NavbarComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand className="ml-3" href="/">Fastter</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Feed</Nav.Link>
              <Nav.Link onClick={toggleModal}>Followers</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-light" href="/login">로그인</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={isModalOpen} onHide={toggleModal} size="lg" scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <UserCard avatarUrl="https://picsum.photos/512/512" username="User 1" />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;