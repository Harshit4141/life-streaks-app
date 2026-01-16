import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Button, Badge, Dropdown, Form, InputGroup, Offcanvas, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Trophy, 
  Fire, 
  Search, 
  Moon, 
  Sun, 
  Gear, 
  
  People,
  CalendarCheck,
  Lightning,
  
  List,
  X,
  Star,
  ShieldCheck,
  Rocket,
  Clock,
  House,
  BarChart
} from 'react-bootstrap-icons';
import { useStreaks } from '../context/StreaksContext';
import toast from 'react-hot-toast';

const Header = ({ userData, isDemoMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getStreakStats } = useStreaks();
  const stats = getStreakStats();
  
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true); // Changed to true for dark mode by default
  const [showQuickCheckin, setShowQuickCheckin] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [streakPulse, setStreakPulse] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [logoSpin, setLogoSpin] = useState(false);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    setActiveTab(location.pathname.split('/')[1] || 'dashboard');
  }, [location]);

  useEffect(() => {
    // Pulse animation for streak counter every 10 seconds
    const interval = setInterval(() => {
      setStreakPulse(true);
      setTimeout(() => setStreakPulse(false), 1000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleQuickCheckIn = () => {
    toast.success(
      <div className="d-flex align-items-center">
        <Rocket className="me-2 text-warning" size={16} />
        <div>
          <strong>Quick check-in ready!</strong>
        </div>
      </div>
    );
    navigate('/streaks');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching: "${searchQuery}"`);
      setSearchQuery('');
      setShowSearchSuggestions(false);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && notifications > 0) {
      setNotifications(0);
    }
  };

  const handleLogoClick = () => {
    setLogoSpin(true);
    setTimeout(() => setLogoSpin(false), 1000);
    navigate('/dashboard');
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    toast.success(
      <div className="d-flex align-items-center">
        {darkMode ? <Sun className="me-2" /> : <Moon className="me-2" />}
        <span>Switched to {darkMode ? 'light' : 'dark'} mode</span>
      </div>
    );
  };

  const quickCheckinItems = [
    { id: 1, name: 'Meditation', emoji: '🧘', color: '#8B5CF6' },
    { id: 2, name: 'Exercise', emoji: '💪', color: '#10B981' },
    { id: 3, name: 'Reading', emoji: '📚', color: '#3B82F6' },
  ];

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <House size={16} />, shortLabel: 'Home' },
    { path: '/streaks', label: 'Streaks', icon: <Fire size={16} />, shortLabel: 'Streaks', badge: stats.totalStreaks || 0 },
    { path: '/friends', label: 'Friends', icon: <People size={16} />, shortLabel: 'Friends', badge: '3' },
    { path: '/analytics', label: 'Analytics', icon: <BarChart size={16} />, shortLabel: 'Stats' },
    { path: '/achievements', label: 'Achievements', icon: <Trophy size={16} />, shortLabel: 'Awards', badge: '5' },
  ];

  const userMenuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <House /> },
    { label: 'My Streaks', path: '/streaks', icon: <Fire /> },
    { label: 'Analytics', path: '/analytics', icon: <BarChart /> },
    { label: 'Settings', path: '/settings', icon: <Gear /> },
    { label: 'Upgrade', path: '/pricing', icon: <Rocket />, premium: true }
  ];

  const notificationItems = [
    { id: 1, title: 'Achievement Unlocked!', message: 'You earned the "Week Warrior" badge', time: '2m ago', icon: <Trophy /> },
    { id: 2, title: 'Friend Activity', message: 'John completed his meditation streak', time: '15m ago', icon: <People /> },
    { id: 3, title: 'Daily Reminder', message: 'Time for your evening exercise', time: '1h ago', icon: <Clock /> },
  ];

  return (
    <>
      <Navbar 
        expand="lg" 
        sticky="top" 
        className={`header-navbar ${darkMode ? 'dark-mode' : 'light-mode'}`}
        style={{
          background: darkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.15)' 
            : '1px solid rgba(203, 213, 225, 0.5)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          height: '64px',
          minHeight: '64px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Container fluid="xl" className="px-3 px-lg-4">
          {/* Compact Brand Logo */}
          <div className="d-flex align-items-center">
            <Button
              variant="link"
              className="brand-logo p-0 me-3"
              onClick={handleLogoClick}
              style={{ textDecoration: 'none' }}
            >
              <div className="logo-container position-relative">
                <div className={`logo-core ${logoSpin ? 'spin' : ''}`}
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.6s ease'
                  }}
                >
                  <Fire className="logo-fire" style={{ color: 'white', fontSize: '18px' }} />
                </div>
                {logoSpin && (
                  <div className="logo-ring" 
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      left: '-4px',
                      right: '-4px',
                      bottom: '-4px',
                      border: '2px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '14px',
                      animation: 'ring-expand 0.6s ease-out'
                    }}
                  />
                )}
              </div>
            </Button>

            {/* Compact Brand Text */}
            <div className="brand-text d-none d-md-block">
              <span className="fw-bold" style={{ 
                fontSize: '1.1rem',
                color: darkMode ? '#e2e8f0' : '#1e293b',
                letterSpacing: '-0.3px'
              }}>
                Life<span style={{ 
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Streaks</span>
              </span>
              {isDemoMode && (
                <Badge bg="info" className="ms-2" pill style={{ 
                  fontSize: '0.6rem', 
                  padding: '2px 6px',
                  verticalAlign: 'middle'
                }}>
                  DEMO
                </Badge>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle - Minimal */}
          <Button
            variant="link"
            className="d-lg-none mobile-menu-toggle p-2"
            onClick={() => setShowMobileMenu(true)}
            style={{ 
              color: darkMode ? '#94a3b8' : '#64748b',
              borderRadius: '10px',
              marginLeft: 'auto'
            }}
          >
            <List size={20} />
          </Button>

          {/* Main Navigation - Compact */}
          <Navbar.Collapse id="navbar-nav" className="justify-content-between">
            {/* Compact Navigation */}
            <Nav className="mx-3">
              {navItems.map((item) => (
                <OverlayTrigger
                  key={item.path}
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-${item.path}`}>
                      {item.label}
                    </Tooltip>
                  }
                >
                  <Nav.Link
                    as={Link}
                    to={item.path}
                    className={`nav-link-item ${activeTab === item.path.split('/')[1] ? 'active' : ''}`}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      margin: '0 2px',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <div className="position-relative">
                      <div className="nav-icon-wrapper">
                        {React.cloneElement(item.icon, {
                          style: {
                            color: activeTab === item.path.split('/')[1] 
                              ? (darkMode ? '#60a5fa' : '#3b82f6')
                              : (darkMode ? '#94a3b8' : '#64748b'),
                            transition: 'all 0.2s ease'
                          }
                        })}
                      </div>
                      
                      {/* Active indicator */}
                      {activeTab === item.path.split('/')[1] && (
                        <div className="active-dot" 
                          style={{
                            position: 'absolute',
                            bottom: '-6px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '4px',
                            height: '4px',
                            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                            borderRadius: '50%',
                            animation: 'dot-pulse 2s ease-in-out infinite'
                          }}
                        />
                      )}
                      
                      {/* Badge */}
                      {item.badge && (
                        <Badge 
                          pill
                          className="nav-badge"
                          style={{
                            position: 'absolute',
                            top: '-4px',
                            right: '-4px',
                            fontSize: '0.6rem',
                            padding: '2px 5px',
                            minWidth: '18px',
                            background: activeTab === item.path.split('/')[1]
                              ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                              : (darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'),
                            color: activeTab === item.path.split('/')[1] ? 'white' : (darkMode ? '#cbd5e1' : '#64748b'),
                            border: activeTab === item.path.split('/')[1] ? 'none' : `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                          }}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Label for larger screens */}
                    <div className="nav-label d-none d-xl-block mt-1" 
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: activeTab === item.path.split('/')[1] 
                          ? (darkMode ? '#60a5fa' : '#3b82f6')
                          : (darkMode ? '#94a3b8' : '#64748b'),
                        textAlign: 'center'
                      }}
                    >
                      {item.shortLabel}
                    </div>
                  </Nav.Link>
                </OverlayTrigger>
              ))}
            </Nav>

            {/* Right Side Actions - Compact */}
            <div className="d-flex align-items-center gap-2">
              {/* Compact Search */}
              <div className="search-container" ref={searchRef}>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Quick search</Tooltip>}
                >
                  <div className="position-relative">
                    <Form onSubmit={handleSearch}>
                      <InputGroup className="search-group" style={{ width: '180px' }}>
                        <InputGroup.Text className="search-icon-wrapper" 
                          style={{ 
                            background: 'transparent', 
                            border: 'none', 
                            padding: '8px 12px' 
                          }}
                        >
                          <Search size={14} style={{ color: darkMode ? '#94a3b8' : '#64748b' }} />
                        </InputGroup.Text>
                        <Form.Control
                          type="search"
                          placeholder="Search..."
                          className="search-input"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setShowSearchSuggestions(true)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: darkMode ? '#e2e8f0' : '#1e293b',
                            fontSize: '0.85rem',
                            padding: '8px 12px',
                            paddingLeft: '0'
                          }}
                        />
                      </InputGroup>
                    </Form>
                    
                    {/* Search Suggestions */}
                    {showSearchSuggestions && searchQuery && (
                      <div 
                        className="search-suggestions shadow-lg"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: darkMode ? '#1e293b' : '#ffffff',
                          border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(203, 213, 225, 0.5)',
                          borderRadius: '8px',
                          marginTop: '4px',
                          zIndex: 1000,
                          maxHeight: '300px',
                          overflowY: 'auto'
                        }}
                      >
                        <div className="p-2">
                          <div className="small px-2 py-1 text-muted">Suggestions</div>
                          {['Meditation Streak', 'Exercise Tracker', 'Reading Challenge', 'Friends Activity'].map((suggestion, index) => (
                            <div 
                              key={index}
                              className="search-suggestion-item px-3 py-2"
                              onClick={() => {
                                setSearchQuery(suggestion);
                                setShowSearchSuggestions(false);
                              }}
                              style={{
                                cursor: 'pointer',
                                borderRadius: '6px',
                                transition: 'all 0.2s ease',
                                color: darkMode ? '#e2e8f0' : '#1e293b'
                              }}
                            >
                              <Search size={12} className="me-2" />
                              <small>{suggestion}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </OverlayTrigger>
              </div>

              {/* Compact Streak Counter */}
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Current streak - Click to check in</Tooltip>}
              >
                <div 
                  className={`streak-counter ${streakPulse ? 'pulse' : ''}`}
                  onClick={handleQuickCheckIn}
                  style={{
                    background: darkMode 
                      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1))' 
                      : 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(251, 191, 36, 0.05))',
                    border: darkMode 
                      ? '1px solid rgba(245, 158, 11, 0.2)' 
                      : '1px solid rgba(245, 158, 11, 0.1)',
                    borderRadius: '12px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minWidth: '80px'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <Fire size={14} className="text-warning me-2" />
                    <div>
                      <div className="fw-bold" style={{ 
                        fontSize: '0.9rem',
                        color: darkMode ? '#fbbf24' : '#d97706'
                      }}>
                        {stats.longestStreak || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </OverlayTrigger>

              {/* Quick Check-in Button - Compact */}
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Quick check-in</Tooltip>}
              >
                <Button
                  variant="link"
                  className="quick-checkin-btn p-2"
                  onClick={() => setShowQuickCheckin(!showQuickCheckin)}
                  style={{ 
                    color: darkMode ? '#cbd5e1' : '#64748b',
                    borderRadius: '10px',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Lightning size={16} />
                </Button>
              </OverlayTrigger>
              
              {/* Quick Check-in Dropdown */}
              {showQuickCheckin && (
                <div 
                  className="quick-checkin-dropdown shadow-xl"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '120px',
                    background: darkMode ? '#1e293b' : '#ffffff',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(203, 213, 225, 0.5)',
                    borderRadius: '12px',
                    minWidth: '200px',
                    zIndex: 1050,
                    marginTop: '8px',
                    animation: 'slide-down 0.2s ease'
                  }}
                >
                  <div className="px-3 pb-2 border-bottom" style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                    <div className="d-flex align-items-center">
                      <CalendarCheck size={14} className="me-2 text-primary" />
                      <small className="fw-bold">Quick Check-in</small>
                    </div>
                  </div>
                  
                  {quickCheckinItems.map((item) => (
                    <div 
                      key={item.id}
                      className="px-3 py-2 quick-checkin-item"
                      onClick={() => {
                        toast.success(`Checked in: ${item.name} ${item.emoji}`);
                        setShowQuickCheckin(false);
                      }}
                      style={{
                        borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: darkMode ? '#e2e8f0' : '#1e293b'
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="me-2" style={{ fontSize: '20px' }}>{item.emoji}</span>
                        <div>
                          <div className="small fw-medium">{item.name}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Theme Toggle - Compact */}
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Toggle theme</Tooltip>}
              >
                <Button
                  variant="link"
                  className="theme-toggle p-2"
                  onClick={handleThemeToggle}
                  style={{ 
                    color: darkMode ? '#fbbf24' : '#64748b',
                    borderRadius: '10px',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
              </OverlayTrigger>

              {/* Notifications - Compact */}
              <div className="position-relative" ref={notificationRef}>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Notifications</Tooltip>}
                >
                  <Button
                    variant="link"
                    className="notification-btn p-2 position-relative"
                    onClick={handleNotificationClick}
                    style={{ 
                      color: darkMode ? '#cbd5e1' : '#64748b',
                      borderRadius: '10px',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Bell size={16} />
                    {notifications > 0 && (
                      <Badge 
                        bg="danger" 
                        pill 
                        className="notification-badge"
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          minWidth: '16px',
                          height: '16px',
                          fontSize: '0.6rem',
                          padding: '2px',
                          border: darkMode ? '2px solid #1e293b' : '2px solid white',
                          animation: notifications > 0 ? 'badge-bounce 1s ease infinite' : 'none'
                        }}
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </OverlayTrigger>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div 
                    className="notification-dropdown shadow-xl"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: darkMode ? '#1e293b' : '#ffffff',
                      border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(203, 213, 225, 0.5)',
                      borderRadius: '12px',
                      width: '320px',
                      zIndex: 1050,
                      marginTop: '8px',
                      animation: 'slide-down 0.2s ease'
                    }}
                  >
                    <div className="p-3 border-bottom" style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <Bell size={16} className="me-2 text-primary" />
                          <small className="fw-bold">Notifications</small>
                          {notifications > 0 && (
                            <Badge bg="primary" pill className="ms-2" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
                              {notifications} new
                            </Badge>
                          )}
                        </div>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0"
                          style={{ fontSize: '0.75rem' }}
                          onClick={() => {
                            setNotifications(0);
                            toast.success('Cleared all notifications');
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                    
                    <div className="notification-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {notificationItems.map((item) => (
                        <div 
                          key={item.id}
                          className="notification-item p-3 border-bottom"
                          style={{ 
                            borderColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            color: darkMode ? '#e2e8f0' : '#1e293b'
                          }}
                          onClick={() => {
                            toast.success(`Notification: ${item.title}`);
                            setShowNotifications(false);
                          }}
                        >
                          <div className="d-flex">
                            <div className="me-3">
                              <div 
                                className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{ 
                                  width: '32px', 
                                  height: '32px',
                                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                  color: 'white'
                                }}
                              >
                                {item.icon}
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="small fw-medium mb-1">{item.title}</div>
                              <div className="small text-muted mb-1">{item.message}</div>
                              <div className="small text-muted">{item.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-2 border-top" style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                      <Button 
                        variant="link" 
                        className="w-100 text-center"
                        size="sm"
                        onClick={() => navigate('/notifications')}
                        style={{ fontSize: '0.75rem' }}
                      >
                        View all notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu - Compact */}
              <Dropdown align="end" ref={userMenuRef}>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Account menu</Tooltip>}
                >
                  <Dropdown.Toggle
                    variant="link"
                    className="user-menu-toggle p-0"
                    style={{ 
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div className="user-avatar"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        position: 'relative'
                      }}
                    >
                      {userData?.name?.charAt(0) || 'U'}
                      <div className="online-status"
                        style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          width: '8px',
                          height: '8px',
                          background: '#10b981',
                          borderRadius: '50%',
                          border: darkMode ? '2px solid #1e293b' : '2px solid white'
                        }}
                      />
                    </div>
                  </Dropdown.Toggle>
                </OverlayTrigger>

                <Dropdown.Menu 
                  className="shadow-xl border-0"
                  style={{
                    background: darkMode ? '#1e293b' : '#ffffff',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(203, 213, 225, 0.5)',
                    borderRadius: '12px',
                    minWidth: '200px',
                    padding: '12px 0',
                    marginTop: '8px'
                  }}
                >
                  <div className="px-3 pb-3 border-bottom" style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
                    <div className="text-center">
                      <div className="user-avatar-large mx-auto mb-2"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}
                      >
                        {userData?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="small fw-bold mb-1">{userData?.name || 'User'}</div>
                      <div className="small text-muted mb-2">{userData?.email || 'demo@lifestreaks.com'}</div>
                      {isDemoMode && (
                        <Badge bg="info" className="px-2 py-1" pill style={{ fontSize: '0.65rem' }}>
                          <ShieldCheck size={10} className="me-1" /> Demo
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {userMenuItems.map((item, index) => (
                    <Dropdown.Item 
                      key={index}
                      as={Link}
                      to={item.path}
                      className="px-3 py-2"
                      style={{
                        borderBottom: index < userMenuItems.length - 1 
                          ? `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                          : 'none',
                        transition: 'all 0.2s ease',
                        color: darkMode ? '#e2e8f0' : '#1e293b'
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="me-3"
                            style={{
                              color: item.premium ? '#f59e0b' : (darkMode ? '#94a3b8' : '#64748b')
                            }}
                          >
                            {item.icon}
                          </div>
                          <div className="small">{item.label}</div>
                        </div>
                        {item.premium && (
                          <Star size={12} className="text-warning" fill="currentColor" />
                        )}
                      </div>
                    </Dropdown.Item>
                  ))}
                  
                  <div className="px-3 pt-2">
                    <Button 
                      variant={darkMode ? 'outline-light' : 'outline-secondary'} 
                      size="sm"
                      className="w-100"
                      onClick={() => {
                        toast.success('Logged out successfully');
                        navigate('/login');
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu - Compact */}
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        placement="end"
        className={`mobile-offcanvas ${darkMode ? 'dark-mode' : ''}`}
        style={{
          background: darkMode ? '#0f172a' : '#ffffff',
          borderLeft: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(203, 213, 225, 0.5)',
          width: '280px'
        }}
      >
        <Offcanvas.Header className="border-bottom py-3" style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
          <div className="d-flex align-items-center w-100">
            <div className="logo-container me-3">
              <div className="logo-core"
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Fire style={{ color: 'white', fontSize: '16px' }} />
              </div>
            </div>
            <Offcanvas.Title className="fw-bold mb-0" style={{ 
              fontSize: '1.1rem',
              color: darkMode ? '#e2e8f0' : '#1e293b'
            }}>
              LifeStreaks
            </Offcanvas.Title>
            <Button
              variant="link"
              className="p-0 ms-auto"
              onClick={() => setShowMobileMenu(false)}
              style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}
            >
              <X size={20} />
            </Button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <div className="p-3 border-bottom" style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>
            <Form onSubmit={handleSearch}>
              <InputGroup>
                <InputGroup.Text style={{ 
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(203, 213, 225, 0.5)',
                  borderRight: 'none',
                  color: darkMode ? '#94a3b8' : '#64748b'
                }}>
                  <Search size={14} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(203, 213, 225, 0.5)',
                    borderLeft: 'none',
                    color: darkMode ? '#e2e8f0' : '#1e293b',
                    fontSize: '0.9rem'
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
                className="mobile-nav-item py-3 px-4"
                onClick={() => setShowMobileMenu(false)}
                style={{
                  color: activeTab === item.path.split('/')[1] 
                    ? (darkMode ? '#60a5fa' : '#3b82f6')
                    : (darkMode ? '#cbd5e1' : '#64748b'),
                  background: activeTab === item.path.split('/')[1]
                    ? (darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)')
                    : 'transparent',
                  borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="me-3" style={{ 
                      width: '20px',
                      color: activeTab === item.path.split('/')[1] 
                        ? (darkMode ? '#60a5fa' : '#3b82f6')
                        : (darkMode ? '#cbd5e1' : '#64748b')
                    }}>
                      {item.icon}
                    </div>
                    <span className="small">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge 
                      bg={activeTab === item.path.split('/')[1] ? 'primary' : (darkMode ? 'secondary' : 'light')} 
                      pill 
                      style={{ 
                        fontSize: '0.65rem', 
                        padding: '2px 6px',
                        color: darkMode ? '#e2e8f0' : '#1e293b'
                      }}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Nav.Link>
            ))}
          </Nav>
          
          <div className="p-4" style={{ borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}` }}>
            <div className="d-flex align-items-center mb-3">
              <div className="user-avatar-mobile me-3"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                {userData?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="small fw-bold" style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                  {userData?.name || 'User'}
                </div>
                <div className="small" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                  Premium Account
                </div>
              </div>
            </div>
            <Button 
              as={Link} 
              to="/dashboard" 
              variant="primary" 
              className="w-100 mb-3 py-2"
              onClick={() => setShowMobileMenu(false)}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.9rem'
              }}
            >
              Go to Dashboard
            </Button>
            <div className="d-flex gap-2">
              <Button 
                variant={darkMode ? 'outline-light' : 'outline-secondary'} 
                size="sm"
                onClick={() => {
                  handleThemeToggle();
                  setShowMobileMenu(false);
                }}
                className="flex-grow-1 py-2"
                style={{ 
                  borderRadius: '8px', 
                  fontSize: '0.8rem',
                  color: darkMode ? '#e2e8f0' : '#1e293b',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(203, 213, 225, 0.5)'
                }}
              >
                {darkMode ? <Sun size={14} className="me-2" /> : <Moon size={14} className="me-2" />}
                Theme
              </Button>
              <Button 
                variant={darkMode ? 'outline-light' : 'outline-secondary'} 
                size="sm"
                as={Link}
                to="/settings"
                onClick={() => setShowMobileMenu(false)}
                className="flex-grow-1 py-2"
                style={{ 
                  borderRadius: '8px', 
                  fontSize: '0.8rem',
                  color: darkMode ? '#e2e8f0' : '#1e293b',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(203, 213, 225, 0.5)'
                }}
              >
                <Gear size={14} className="me-2" />
                Settings
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* CSS Animations */}
      <style jsx>{`
        /* Global header styles */
        .header-navbar {
          height: 64px;
          min-height: 64px;
          max-height: 64px;
        }
        
        .navbar-collapse {
          align-items: center;
        }
        
        /* Logo animations */
        .logo-core.spin {
          animation: logo-spin 0.6s ease;
        }
        
        @keyframes logo-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes ring-expand {
          0% { 
            transform: scale(0.8);
            opacity: 1;
          }
          100% { 
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        /* Navigation animations */
        .nav-link-item {
          transition: all 0.2s ease;
        }
        
        .nav-link-item:hover {
          background: ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'};
        }
        
        .nav-link-item.active {
          background: ${darkMode ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.15)'};
        }
        
        @keyframes dot-pulse {
          0%, 100% { 
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translateX(-50%) scale(1.5);
            opacity: 0.7;
          }
        }
        
        /* Streak counter animations */
        .streak-counter {
          transition: all 0.2s ease;
        }
        
        .streak-counter:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
        }
        
        .streak-counter.pulse {
          animation: streak-pulse 1s ease;
        }
        
        @keyframes streak-pulse {
          0% { 
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
          }
          70% { 
            box-shadow: 0 0 0 6px rgba(245, 158, 11, 0);
          }
          100% { 
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
          }
        }
        
        /* Badge animations */
        @keyframes badge-bounce {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.2);
          }
        }
        
        /* Dropdown animations */
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
        
        /* Search suggestions hover */
        .search-suggestion-item:hover {
          background: ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }
        
        /* Quick check-in hover */
        .quick-checkin-item:hover {
          background: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
        }
        
        /* Notification item hover */
        .notification-item:hover {
          background: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
        }
        
        /* Mobile responsive */
        @media (max-width: 1200px) {
          .search-container {
            display: none;
          }
        }
        
        @media (max-width: 992px) {
          .nav-label {
            display: none !important;
          }
          
          .streak-counter {
            min-width: 60px;
            padding: 6px 8px;
          }
        }
        
        @media (max-width: 768px) {
          .header-navbar {
            padding: 0.5rem 0;
          }
          
          .brand-text {
            display: none;
          }
          
          .search-container,
          .streak-counter,
          .quick-checkin-btn,
          .theme-toggle,
          .notification-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Header;