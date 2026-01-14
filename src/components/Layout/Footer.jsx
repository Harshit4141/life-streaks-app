import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="fw-bold">🚀 Life Streaks</h5>
            <p className="text-muted">
              Helping individuals and teams build lasting consistency through positive accountability.
            </p>
          </Col>
          <Col md={2}>
            <h6>Product</h6>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-muted p-0 mb-1">Features</Nav.Link>
              <Nav.Link as={Link} to="/pricing" className="text-muted p-0 mb-1">Pricing</Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-1">API</Nav.Link>
            </Nav>
          </Col>
          <Col md={2}>
            <h6>Company</h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-muted p-0 mb-1">About</Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-1">Blog</Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-1">Careers</Nav.Link>
            </Nav>
          </Col>
          <Col md={2}>
            <h6>Legal</h6>
            <Nav className="flex-column">
              <Nav.Link href="#" className="text-muted p-0 mb-1">Privacy</Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-1">Terms</Nav.Link>
              <Nav.Link href="#" className="text-muted p-0 mb-1">Security</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <hr className="mt-4 mb-3" />
        <Row>
          <Col>
            <p className="text-center text-muted mb-0">
              © {new Date().getFullYear()} Life Streaks. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;