import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Badge, Dropdown, Form, InputGroup, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  PersonCircle, 
  Trophy, 
  Fire, 
  Search, 
  Moon, 
  Sun, 
  Gear, 
  GraphUp,
  People,
  CalendarCheck,
  Lightning,
  ChevronDown,
  List,
  X,
  Star,
  ShieldCheck,
  Rocket
} from 'react-bootstrap-icons';
import { useStreaks } from '../context/StreaksContext';
import toast from 'react-hot-toast';

const Header = ({ userData, isDemoMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getStreakStats, checkInStreak } = useStreaks();
  const stats = getStreakStats();
  
  const [notifications, setNotifications] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showQuickCheckin, setShowQuickCheckin] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [streakPulse, setStreakPulse] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname.split('/')[1] || 'dashboard');
  }, [location]);

  useEffect(() => {
    // Pulse animation for streak counter
    const interval = setInterval(() => {
      setStreakPulse(true);
      setTimeout(() => setStreakPulse(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickCheckIn = () => {
    const todayStreaks = Math.floor(Math.random() * 3) + 1;
    toast.success(`✅ ${todayStreaks} streaks checked in! Keep going!`);
    navigate('/streaks');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for "${searchQuery}"...`);
      setSearchQuery('');
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(0);
    }
  };

  const quickCheckinItems = [
    { id: 1, name: 'Morning Meditation', emoji: '🧘', time: '8:00 AM' },
    { id: 2, name: 'Daily Exercise', emoji: '💪', time: '6:00 PM' },
    { id: 3, name: 'Read Book', emoji: '📚', time: '9:00 PM' },
    { id: 4, name: 'Water Intake', emoji: '💧', time: 'Throughout day' }
  ];

  const handleQuickCheckinItem = (item) => {
    toast.success(`Checked in: ${item.name} ${item.emoji}`);
    setShowQuickCheckin(false);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <GraphUp size={18} />, badge: null },
    { path: '/streaks', label: 'Streaks', icon: <Fire size={18} />, badge: stats.totalStreaks || 0 },
    { path: '/friends', label: 'Friends', icon: <People size={18} />, badge: '3' },
    { path: '/teams', label: 'Teams', icon: <People size={18} />, badge: '2' },
    { path: '/analytics', label: 'Analytics', icon: <GraphUp size={18} />, badge: null },
    { path: '/achievements', label: 'Achievements', icon: <Trophy size={18} />, badge: '5' },
  ];

  const userMenuItems = [
    { label: 'My Profile', path: '/dashboard', icon: <PersonCircle /> },
    { label: 'My Streaks', path: '/streaks', icon: <Fire /> },
    { label: 'Analytics', path: '/analytics', icon: <GraphUp /> },
    { label: 'Settings', path: '/settings', icon: <Gear /> },
    { label: 'Upgrade Plan', path: '/pricing', icon: <Rocket />, premium: true }
  ];

  return (
    <>
      <Navbar 
        expand="lg" 
        sticky="top" 
        className={`header-navbar ${darkMode ? 'dark-mode' : 'light-mode'}`}
        style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Container fluid="xl">
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center brand-logo">
            <div className="logo-icon">
              <Fire className="logo-fire" />
            </div>
            <div className="brand-text">
              <span className="fw-bold" style={{ color: darkMode ? '#fff' : '#1e293b' }}>
                LifeStreaks
              </span>
              {isDemoMode && (
                <Badge bg="info" className="ms-2 demo-badge" pill>
                  DEMO
                </Badge>
              )}
            </div>
          </Navbar.Brand>

          {/* Mobile Menu Toggle */}
          <Button
            variant="link"
            className="d-lg-none text-dark border-0 p-2"
            onClick={() => setShowMobileMenu(true)}
          >
            <List size={24} />
          </Button>

          {/* Main Navigation */}
          <Navbar.Collapse id="navbar-nav">
            {/* Search Bar */}
            <div className="search-container me-3">
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <InputGroup.Text className="search-icon">
                    <Search size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search streaks, friends, teams..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                      color: darkMode ? '#fff' : '#1e293b'
                    }}
                  />
                </InputGroup>
              </Form>
            </div>

            {/* Navigation Links */}
            <Nav className="mx-auto">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  as={Link}
                  to={item.path}
                  className={`nav-link-item ${activeTab === item.path.split('/')[1] ? 'active' : ''}`}
                  style={{
                    color: activeTab === item.path.split('/')[1] 
                      ? (darkMode ? '#60a5fa' : '#3b82f6')
                      : (darkMode ? '#cbd5e1' : '#64748b')
                  }}
                >
                  <div className="d-flex align-items-center">
                    {item.icon}
                    <span className="ms-2">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        bg={activeTab === item.path.split('/')[1] ? 'primary' : 'light'} 
                        text={activeTab === item.path.split('/')[1] ? 'white' : 'dark'} 
                        pill
                        className="ms-2"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
              ))}
            </Nav>

            {/* Right Side Actions */}
            <div className="d-flex align-items-center gap-3">
              {/* Streak Counter */}
              <div 
                className={`streak-counter ${streakPulse ? 'pulse' : ''}`}
                onClick={handleQuickCheckIn}
                style={{
                  background: darkMode 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' 
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  border: darkMode 
                    ? '1px solid rgba(59, 130, 246, 0.2)' 
                    : '1px solid rgba(59, 130, 246, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <Fire className="text-warning me-2" />
                <div>
                  <div className="small text-muted">Current Streak</div>
                  <div className="h5 mb-0 fw-bold">{stats.longestStreak || 0} days</div>
                </div>
              </div>

              {/* Quick Check-in Button */}
              <Dropdown show={showQuickCheckin} onToggle={setShowQuickCheckin}>
                <Dropdown.Toggle
                  variant="primary"
                  className="quick-checkin-btn"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    borderRadius: '12px'
                  }}
                >
                  <Lightning className="me-2" />
                  Quick Check-in
                </Dropdown.Toggle>
                <Dropdown.Menu 
                  className="shadow-lg border-0"
                  style={{
                    background: darkMode ? '#1e293b' : '#ffffff',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    minWidth: '280px'
                  }}
                >
                  <Dropdown.Header className="text-center fw-bold">
                    <CalendarCheck className="me-2" />
                    Quick Check-in
                  </Dropdown.Header>
                  {quickCheckinItems.map((item) => (
                    <Dropdown.Item 
                      key={item.id}
                      className="d-flex align-items-center justify-content-between py-3"
                      onClick={() => handleQuickCheckinItem(item)}
                      style={{
                        color: darkMode ? '#e2e8f0' : '#1e293b',
                        borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="emoji me-3">{item.emoji}</span>
                        <div>
                          <div className="fw-bold">{item.name}</div>
                          <div className="small text-muted">{item.time}</div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline-success"
                        className="rounded-pill"
                      >
                        Check In
                      </Button>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              {/* Theme Toggle */}
              <Button
                variant="link"
                className="theme-toggle p-2"
                onClick={() => setDarkMode(!darkMode)}
                style={{ color: darkMode ? '#fbbf24' : '#64748b' }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>

              {/* Notifications */}
              <div className="position-relative">
                <Button
                  variant="link"
                  className="notification-btn p-2 position-relative"
                  onClick={handleNotificationClick}
                  style={{ color: darkMode ? '#cbd5e1' : '#64748b' }}
                >
                  <Bell size={20} />
                  {notifications > 0 && (
                    <Badge 
                      bg="danger" 
                      pill 
                      className="notification-badge"
                    >
                      {notifications}
                    </Badge>
                  )}
                </Button>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div 
                    className="notification-dropdown shadow-lg border-0"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: darkMode ? '#1e293b' : '#ffffff',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '12px',
                      minWidth: '320px',
                      zIndex: 1050,
                      marginTop: '10px'
                    }}
                  >
                    <div className="p-3 border-bottom" style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0 fw-bold">Notifications</h6>
                        <Button variant="link" size="sm" className="p-0">
                          Mark all as read
                        </Button>
                      </div>
                    </div>
                    <div className="p-2">
                      {[1, 2, 3].map((_, i) => (
                        <div 
                          key={i}
                          className="notification-item p-3 border-bottom"
                          style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
                        >
                          <div className="d-flex">
                            <div className="me-3">
                              <div className="notification-icon rounded-circle d-flex align-items-center justify-content-center"
                                style={{ 
                                  width: '36px', 
                                  height: '36px',
                                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                  color: 'white'
                                }}
                              >
                                <Trophy size={16} />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-bold mb-1">Achievement Unlocked!</div>
                              <div className="small text-muted mb-2">You earned the "Week Warrior" badge</div>
                              <div className="small text-muted">2 minutes ago</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  className="user-menu-toggle d-flex align-items-center p-0"
                  style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}
                >
                  <div className="user-avatar me-2">
                    <PersonCircle size={32} />
                  </div>
                  <div className="d-none d-md-block text-start">
                    <div className="small fw-bold">{userData?.name || 'Welcome'}</div>
                    <div className="small text-muted">Premium User</div>
                  </div>
                  <ChevronDown className="ms-2" size={16} />
                </Dropdown.Toggle>

                <Dropdown.Menu 
                  className="shadow-lg border-0 user-dropdown"
                  style={{
                    background: darkMode ? '#1e293b' : '#ffffff',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    minWidth: '240px'
                  }}
                >
                  <Dropdown.Header className="text-center">
                    <div className="user-avatar-large mx-auto mb-2">
                      <PersonCircle size={48} />
                    </div>
                    <div className="fw-bold">{userData?.name || 'Demo User'}</div>
                    <div className="small text-muted">{userData?.email || 'demo@lifestreaks.com'}</div>
                    {isDemoMode && (
                      <Badge bg="info" className="mt-2" pill>
                        <ShieldCheck className="me-1" /> Demo Mode
                      </Badge>
                    )}
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  {userMenuItems.map((item, index) => (
                    <Dropdown.Item 
                      key={index}
                      as={Link}
                      to={item.path}
                      className="d-flex align-items-center py-3"
                      style={{
                        color: darkMode ? '#e2e8f0' : '#1e293b',
                        borderBottom: index < userMenuItems.length - 1 
                          ? (darkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)') 
                          : 'none'
                      }}
                    >
                      <div className="me-3" style={{ color: item.premium ? '#f59e0b' : (darkMode ? '#94a3b8' : '#64748b') }}>
                        {item.icon}
                      </div>
                      <div className="flex-grow-1">{item.label}</div>
                      {item.premium && (
                        <Star className="text-warning" size={14} />
                      )}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="end"
        className={darkMode ? 'dark-mode' : ''}
        style={{
          background: darkMode ? '#0f172a' : '#ffffff',
          color: darkMode ? '#e2e8f0' : '#1e293b'
        }}
      >
        <Offcanvas.Header className="border-bottom" style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
          <div className="d-flex align-items-center">
            <Fire className="text-warning me-2" />
            <Offcanvas.Title className="fw-bold">LifeStreaks</Offcanvas.Title>
          </div>
          <Button
            variant="link"
            className="p-0"
            onClick={() => setShowMobileMenu(false)}
            style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}
          >
            <X size={24} />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-4">
            <Form onSubmit={handleSearch}>
              <InputGroup>
                <InputGroup.Text style={{ background: darkMode ? '#1e293b' : '#f8fafc' }}>
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: darkMode ? '#1e293b' : '#f8fafc',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                    color: darkMode ? '#e2e8f0' : '#1e293b'
                  }}
                />
              </InputGroup>
            </Form>
          </div>
          
          <Nav className="flex-column">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className="d-flex align-items-center justify-content-between py-3"
                onClick={() => setShowMobileMenu(false)}
                style={{
                  color: activeTab === item.path.split('/')[1] 
                    ? (darkMode ? '#60a5fa' : '#3b82f6')
                    : (darkMode ? '#cbd5e1' : '#64748b'),
                  borderBottom: '1px solid',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="d-flex align-items-center">
                  {item.icon}
                  <span className="ms-3">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge bg="primary" pill>
                    {item.badge}
                  </Badge>
                )}
              </Nav.Link>
            ))}
          </Nav>
          
          <div className="mt-4 p-3 rounded" style={{ background: darkMode ? '#1e293b' : '#f1f5f9' }}>
            <div className="d-flex align-items-center mb-3">
              <PersonCircle size={40} className="me-3" />
              <div>
                <div className="fw-bold">{userData?.name || 'User'}</div>
                <div className="small text-muted">Premium Account</div>
              </div>
            </div>
            <Button 
              as={Link} 
              to="/dashboard" 
              variant="primary" 
              className="w-100 mb-2"
              onClick={() => setShowMobileMenu(false)}
            >
              Go to Dashboard
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <style jsx>{`
        .header-navbar {
          transition: all 0.3s ease;
        }
        
        .brand-logo {
          text-decoration: none;
        }
        
        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }
        
        .logo-fire {
          color: white;
          font-size: 20px;
          animation: fire-flicker 2s ease-in-out infinite;
        }
        
        .brand-text {
          display: flex;
          align-items: center;
        }
        
        .demo-badge {
          font-size: 0.6rem;
          padding: 2px 8px;
        }
        
        .search-container {
          width: 300px;
        }
        
        .search-icon {
          background: transparent;
          border: none;
          color: #64748b;
        }
        
        .search-input {
          border-left: none;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }
        
        .nav-link-item {
          padding: 12px 16px;
          border-radius: 8px;
          margin: 0 4px;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .nav-link-item:hover {
          background: rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }
        
        .nav-link-item.active {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
          font-weight: 600;
        }
        
        .streak-counter {
          padding: 8px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .streak-counter:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
        }
        
        .streak-counter.pulse {
          animation: pulse 1s ease;
        }
        
        .quick-checkin-btn {
          padding: 10px 20px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .quick-checkin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        }
        
        .theme-toggle {
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
          background: rgba(0, 0, 0, 0.05);
          transform: rotate(15deg);
        }
        
        .notification-btn {
          border-radius: 50%;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .notification-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        
        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 10px;
          padding: 4px 6px;
          min-width: 20px;
          animation: badge-pulse 2s infinite;
        }
        
        .user-menu-toggle {
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .user-menu-toggle:hover {
          transform: translateY(-2px);
        }
        
        .user-avatar {
          color: #3b82f6;
        }
        
        .user-avatar-large {
          color: #3b82f6;
        }
        
        .user-dropdown .dropdown-item {
          transition: all 0.2s ease;
        }
        
        .user-dropdown .dropdown-item:hover {
          background: rgba(59, 130, 246, 0.1);
          padding-left: 20px;
        }
        
        .notification-dropdown {
          animation: slide-down 0.3s ease;
        }
        
        .notification-item {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .notification-item:hover {
          background: rgba(59, 130, 246, 0.05);
          padding-left: 20px;
        }
        
        @keyframes fire-flicker {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(5deg); }
          50% { transform: scale(1.2) rotate(0deg); }
          75% { transform: scale(1.1) rotate(-5deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
        }
        
        @keyframes badge-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Dark mode adjustments */
        .dark-mode .nav-link-item:hover {
          background: rgba(59, 130, 246, 0.2);
        }
        
        .dark-mode .search-input:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }
        
        .dark-mode .theme-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .dark-mode .notification-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 992px) {
          .search-container {
            width: 100%;
            margin-bottom: 1rem;
          }
          
          .streak-counter, .quick-checkin-btn {
            margin-bottom: 1rem;
          }
        }
        
        @media (max-width: 768px) {
          .header-navbar {
            padding: 0.5rem 0;
          }
          
          .brand-text span {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;