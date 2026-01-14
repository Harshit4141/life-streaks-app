import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, PersonCircle, Trophy, Fire } from 'react-bootstrap-icons';
import { useStreaks } from '../context/StreaksContext';

const Header = ({ userData, isDemoMode }) => {
  const navigate = useNavigate();
  const { getStreakStats } = useStreaks();
  const stats = getStreakStats();
  const [notifications] = useState(3);

  const handleQuickCheckIn = () => {
    // toast.success("Quick check-in recorded!");
    navigate('/streaks');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
          <Fire className="me-2" />
          Life Streaks
        </Navbar.Brand>
        
        <div className="d-none d-lg-flex align-items-center">
          <div className="text-white me-4">
            <div className="small">Current Streak</div>
            <div className="h4 mb-0">
              <Fire className="text-warning" /> {stats.longestStreak} days
            </div>
          </div>
          <Button 
            variant="outline-light" 
            size="sm" 
            className="me-2"
            onClick={handleQuickCheckIn}
          >
            Quick Check-in
          </Button>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/streaks">My Streaks</Nav.Link>
            <Nav.Link as={Link} to="/friends">
              Friends {stats.totalStreaks > 0 && <Badge bg="light" text="dark" pill>{stats.totalStreaks}</Badge>}
            </Nav.Link>
            <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
            <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
            <Nav.Link as={Link} to="/achievements">
              <Trophy className="me-1" /> Achievements
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link as={Link} to="/notifications" className="position-relative">
              <Bell size={20} />
              {notifications > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.6rem', padding: '2px 5px' }}
                >
                  {notifications}
                </Badge>
              )}
            </Nav.Link>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="user-dropdown" className="d-flex align-items-center">
                <PersonCircle className="me-2" />
                {userData?.name || 'User'}
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                <Dropdown.Header>
                  <div className="fw-bold">{userData?.name}</div>
                  <div className="small text-muted">{userData?.email}</div>
                  {isDemoMode && <Badge bg="info" className="mt-1">Demo Mode</Badge>}
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/dashboard">
                  <PersonCircle className="me-2" /> Dashboard
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/streaks">
                  <Fire className="me-2" /> My Streaks
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/analytics">
                  📊 Analytics
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  ⚙️ Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/pricing" className="text-primary">
                  💎 Upgrade Plan
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;