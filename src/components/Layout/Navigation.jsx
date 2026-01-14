import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  House, 
  CalendarCheck, 
  People, 
  GraphUp, 
  Gear,
  Trophy,
  Bell
} from 'react-bootstrap-icons';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: House,
      badge: null
    },
    {
      path: '/streaks',
      label: 'My Streaks',
      icon: CalendarCheck,
      badge: 5
    },
    {
      path: '/friends',
      label: 'Friends',
      icon: People,
      badge: 3
    },
    {
      path: '/teams',
      label: 'Teams',
      icon: Trophy,
      badge: 2
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: GraphUp,
      badge: null
    },
    {
      path: '/notifications',
      label: 'Notifications',
      icon: Bell,
      badge: 7
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: Gear,
      badge: null
    }
  ];

  return (
    <Nav className="flex-column">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || 
                        location.pathname.startsWith(item.path + '/');
        
        return (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            className={`
              d-flex align-items-center
              py-3 px-3
              ${isActive ? 'text-primary bg-primary bg-opacity-10' : 'text-dark'}
              rounded-3
              mb-1
            `}
          >
            <Icon className="me-3" size={20} />
            <span className="flex-grow-1">{item.label}</span>
            {item.badge && (
              <Badge bg={isActive ? "primary" : "light"} 
                     text={isActive ? "white" : "dark"} 
                     pill>
                {item.badge}
              </Badge>
            )}
          </Nav.Link>
        );
      })}
    </Nav>
  );
};

export default Navigation;