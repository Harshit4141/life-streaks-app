import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { 
  Link, 
  useLocation,
  useNavigate 
} from 'react-router-dom';
import { 
  Fire, 
  ArrowUp, 
  Envelope, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Send,
  CheckCircle,
  ShieldCheck,
  Award,
  Globe,
  Mailbox,
  Lightning,
  Star,
  People,
  Trophy,
  Clock,
  Phone,
  Map,
  ChevronRight,
  Apple,
  GooglePlay,
  QrCode,
  HeartFill
} from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [activeLink, setActiveLink] = useState('');

  // Track scroll position for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active link based on current route
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success('Back to top! 🚀');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success(
        <div className="d-flex align-items-center">
          <CheckCircle className="me-2 text-success" />
          <div>
            <strong>Subscribed!</strong> Welcome to the streak family! 🔥
          </div>
        </div>
      );
      setEmail('');
      // Reset subscription status after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const handleNewsletterClick = () => {
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: <Fire />, value: '10K+', label: 'Active Streaks', color: '#F59E0B' },
    { icon: <People />, value: '5K+', label: 'Happy Users', color: '#3B82F6' },
    { icon: <Trophy />, value: '2M+', label: 'Days Tracked', color: '#8B5CF6' },
    { icon: <Clock />, value: '95%', label: 'Success Rate', color: '#10B981' },
  ];

  const quickLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <ChevronRight size={14} /> },
    { path: '/streaks', label: 'My Streaks', icon: <Fire size={14} /> },
    { path: '/friends', label: 'Friends', icon: <People size={14} /> },
    { path: '/teams', label: 'Teams', icon: <QrCode size={14} /> },
    { path: '/analytics', label: 'Analytics', icon: <QrCode size={14} /> },
    { path: '/achievements', label: 'Achievements', icon: <Trophy size={14} /> },
    { path: '/pricing', label: 'Pricing', icon: <Star size={14} /> },
    { path: '/settings', label: 'Settings', icon: <HeartFill  size={14} /> },
  ];

  const resources = [
    { label: 'Blog & Articles', description: 'Productivity tips', icon: '📝' },
    { label: 'Help Center', description: 'Get support', icon: '❓' },
    { label: 'Community', description: 'Join discussions', icon: '👥' },
    { label: 'Webinars', description: 'Live sessions', icon: '🎥' },
    { label: 'Templates', description: 'Ready-to-use', icon: '📋' },
    { label: 'API Docs', description: 'For developers', icon: '⚙️' },
  ];

  const company = [
    { label: 'About Us', description: 'Our story', icon: '🏢' },
    { label: 'Careers', description: 'Join our team', icon: '💼' },
    { label: 'Press Kit', description: 'Media resources', icon: '📰' },
    { label: 'Contact', description: 'Get in touch', icon: '📞' },
    { label: 'Partners', description: 'Collaborations', icon: '🤝' },
    { label: 'Legal', description: 'Terms & privacy', icon: '⚖️' },
  ];

  const socialLinks = [
    { platform: 'Twitter', icon: <Twitter />, url: '#', color: '#1DA1F2' },
    { platform: 'Instagram', icon: <Instagram />, url: '#', color: '#E4405F' },
    { platform: 'LinkedIn', icon: <Linkedin />, url: '#', color: '#0A66C2' },
    { platform: 'GitHub', icon: <Github />, url: '#', color: '#181717' },
  ];

  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          variant="primary"
          className="position-fixed bottom-4 end-4 rounded-circle p-3 shadow-lg"
          onClick={scrollToTop}
          style={{
            zIndex: 1000,
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            border: 'none',
            animation: 'bounce 2s infinite'
          }}
        >
          <ArrowUp size={24} />
        </Button>
      )}

      {/* Stats Section */}
      <div className="py-5" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col key={index} xs={6} md={3}>
                <div className="text-center p-4 rounded-4" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="mb-3" style={{
                    width: '60px',
                    height: '60px',
                    background: `${stat.color}20`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    color: stat.color
                  }}>
                    {React.cloneElement(stat.icon, { size: 24 })}
                  </div>
                  <h3 className="fw-bold mb-2" style={{ 
                    color: '#e2e8f0',
                    background: 'linear-gradient(90deg, #e2e8f0, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {stat.value}
                  </h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Newsletter Section */}
      <div id="newsletter" className="py-5" style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="p-4 p-md-5 rounded-4" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <Badge bg="warning" className="mb-3 px-3 py-2">
                  <Lightning className="me-2" />
                  Exclusive Content
                </Badge>
                <h3 className="fw-bold mb-3" style={{ color: '#e2e8f0' }}>
                  Stay Ahead with Our <span style={{ color: '#f59e0b' }}>Pro Tips</span> Newsletter
                </h3>
                <p className="text-muted mb-4">
                  Get weekly productivity hacks, habit-building strategies, and exclusive content 
                  delivered straight to your inbox. Join 5,000+ streak masters!
                </p>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <CheckCircle className="text-success me-2" />
                    <small className="text-muted">No spam, ever</small>
                  </div>
                  <div>
                    <ShieldCheck className="text-info me-2" />
                    <small className="text-muted">Unsubscribe anytime</small>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="p-4 p-md-5 rounded-4" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                {isSubscribed ? (
                  <div className="text-center py-4">
                    <div className="mb-4">
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        animation: 'checkmark-pop 0.5s ease'
                      }}>
                        <CheckCircle size={40} className="text-white" />
                      </div>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#e2e8f0' }}>
                      Welcome to the Streak Family! 🎉
                    </h4>
                    <p className="text-muted">
                      Check your inbox for a special welcome gift! Your first productivity pack is on its way.
                    </p>
                    <Button 
                      variant="outline-light" 
                      className="mt-3"
                      onClick={() => setIsSubscribed(false)}
                    >
                      Subscribe Another Email
                    </Button>
                  </div>
                ) : (
                  <>
                    <h4 className="fw-bold mb-4" style={{ color: '#e2e8f0' }}>
                      Subscribe Now & Get <span style={{ color: '#f59e0b' }}>Free Template</span>
                    </h4>
                    <Form onSubmit={handleSubscribe}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRight: 'none'
                        }}>
                          <Envelope className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="Your best email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderLeft: 'none',
                            color: '#e2e8f0'
                          }}
                        />
                        <Button 
                          type="submit"
                          variant="warning"
                          style={{
                            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                            border: 'none'
                          }}
                        >
                          <Send className="me-2" />
                          Subscribe
                        </Button>
                      </InputGroup>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="newsletterConsent"
                          defaultChecked
                        />
                        <label className="form-check-label text-muted small" htmlFor="newsletterConsent">
                          I agree to receive newsletters and accept the privacy policy
                        </label>
                      </div>
                    </Form>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer */}
      <footer className="py-5" style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          zIndex: 0
        }} />

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="g-5">
            {/* Brand Column */}
            <Col lg={4} className="mb-5 mb-lg-0">
              <div className="d-flex align-items-center mb-4">
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <Fire size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="fw-bold mb-0" style={{ 
                    color: '#e2e8f0',
                    background: 'linear-gradient(90deg, #e2e8f0, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    LifeStreaks
                  </h3>
                  <small className="text-muted">Build habits that last</small>
                </div>
              </div>
              
              <p className="text-muted mb-4">
                Helping millions build consistency through positive accountability. 
                Join the movement and transform your habits today.
              </p>
              
              {/* App Store Buttons */}
              <div className="mb-4">
                <p className="text-muted small mb-2">Get the mobile app</p>
                <div className="d-flex gap-2">
                  <Button 
                    variant="dark" 
                    size="sm"
                    className="d-flex align-items-center px-3 py-2"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                  >
                    <Apple className="me-2" />
                    <div className="text-start">
                      <small className="d-block" style={{ fontSize: '0.7rem' }}>Download on</small>
                      <span style={{ fontSize: '0.9rem' }}>App Store</span>
                    </div>
                  </Button>
                  <Button 
                    variant="dark" 
                    size="sm"
                    className="d-flex align-items-center px-3 py-2"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                  >
                    <GooglePlay className="me-2" />
                    <div className="text-start">
                      <small className="d-block" style={{ fontSize: '0.7rem' }}>Get it on</small>
                      <span style={{ fontSize: '0.9rem' }}>Google Play</span>
                    </div>
                  </Button>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="d-none d-md-block">
                <div className="d-flex align-items-center p-3 rounded-3" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  maxWidth: '200px'
                }}>
                  <div className="me-3">
                    <QrCode size={40} className="text-muted" />
                  </div>
                  <div>
                    <small className="d-block text-muted">Scan to download</small>
                    <small style={{ color: '#94a3b8' }}>Mobile App</small>
                  </div>
                </div>
              </div>
            </Col>

            {/* Quick Links Column */}
            <Col md={6} lg={2} className="mb-5 mb-md-0">
              <h6 className="fw-bold mb-4" style={{ color: '#e2e8f0' }}>
                <ChevronRight className="me-2" size={16} />
                Quick Links
              </h6>
              <Nav className="flex-column">
                {quickLinks.map((link, index) => (
                  <Nav.Link
                    key={index}
                    as={Link}
                    to={link.path}
                    className={`d-flex align-items-center p-0 mb-2 ${activeLink === link.path ? 'active' : ''}`}
                    style={{
                      color: activeLink === link.path ? '#3b82f6' : '#94a3b8',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (activeLink !== link.path) {
                        e.currentTarget.style.color = '#e2e8f0';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeLink !== link.path) {
                        e.currentTarget.style.color = '#94a3b8';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {link.icon}
                    <span className="ms-2">{link.label}</span>
                  </Nav.Link>
                ))}
              </Nav>
            </Col>

            {/* Resources Column */}
            <Col md={6} lg={3} className="mb-5 mb-md-0">
              <h6 className="fw-bold mb-4" style={{ color: '#e2e8f0' }}>
                <Award className="me-2" size={16} />
                Resources
              </h6>
              <div className="row g-2">
                {resources.map((resource, index) => (
                  <div key={index} className="col-6">
                    <div 
                      className="p-3 rounded-3 cursor-pointer"
                      onClick={() => navigate('/resources')}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div className="d-flex align-items-center mb-2">
                        <span className="me-2">{resource.icon}</span>
                        <small className="fw-medium" style={{ color: '#e2e8f0' }}>
                          {resource.label}
                        </small>
                      </div>
                      <small className="text-muted">{resource.description}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Col>

            {/* Company & Contact Column */}
            <Col md={6} lg={3}>
              <h6 className="fw-bold mb-4" style={{ color: '#e2e8f0' }}>
                <Globe className="me-2" size={16} />
                Company
              </h6>
              <div className="mb-4">
                {company.map((item, index) => (
                  <div 
                    key={index}
                    className="d-flex align-items-center justify-content-between mb-3 cursor-pointer"
                    onClick={() => navigate('/company')}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-2">{item.icon}</span>
                      <div>
                        <div style={{ color: '#e2e8f0' }}>{item.label}</div>
                        <small className="text-muted">{item.description}</small>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-muted" />
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="p-4 rounded-3" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h6 className="fw-bold mb-3" style={{ color: '#e2e8f0' }}>
                  <Mailbox className="me-2" size={16} />
                  Contact Us
                </h6>
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Envelope size={14} className="text-muted me-2" />
                    <small style={{ color: '#94a3b8' }}>hello@lifestreaks.com</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Phone size={14} className="text-muted me-2" />
                    <small style={{ color: '#94a3b8' }}>+1 (555) 123-4567</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <Map size={14} className="text-muted me-2" />
                    <small style={{ color: '#94a3b8' }}>San Francisco, CA</small>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Bottom Footer */}
          <Row className="mt-5 pt-5 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <Col md={6} className="mb-3 mb-md-0">
              <div className="d-flex flex-wrap align-items-center">
                <p className="text-muted mb-0 me-3">
                  © {currentYear} LifeStreaks. All rights reserved.
                </p>
                <Nav className="d-flex">
                  <Nav.Link href="#" className="text-muted px-2" style={{ fontSize: '0.9rem' }}>
                    Privacy Policy
                  </Nav.Link>
                  <Nav.Link href="#" className="text-muted px-2" style={{ fontSize: '0.9rem' }}>
                    Terms of Service
                  </Nav.Link>
                  <Nav.Link href="#" className="text-muted px-2" style={{ fontSize: '0.9rem' }}>
                    Cookies
                  </Nav.Link>
                </Nav>
              </div>
            </Col>
            
            <Col md={6}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <HeartFill size={14} className="text-danger me-2" />
                  <small className="text-muted">
                    Made with passion for habit enthusiasts worldwide
                  </small>
                </div>
                
                {/* Social Links */}
                <div className="d-flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      style={{
                        width: '36px',
                        height: '36px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: social.color,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = social.color;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          {/* Trust Badges */}
          <Row className="mt-4">
            <Col>
              <div className="d-flex flex-wrap justify-content-center gap-4">
                <div className="d-flex align-items-center">
                  <ShieldCheck className="text-success me-2" />
                  <small className="text-muted">GDPR Compliant</small>
                </div>
                <div className="d-flex align-items-center">
                  <Award className="text-warning me-2" />
                  <small className="text-muted">Award Winning 2023</small>
                </div>
                <div className="d-flex align-items-center">
                  <CheckCircle className="text-info me-2" />
                  <small className="text-muted">SSL Secured</small>
                </div>
                <div className="d-flex align-items-center">
                  <People className="text-primary me-2" />
                  <small className="text-muted">Trusted by 10K+ Teams</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes checkmark-pop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
        
        .social-icon:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        /* Custom scrollbar for footer */
        footer ::-webkit-scrollbar {
          width: 6px;
        }
        
        footer ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        footer ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        
        /* Smooth transitions */
        .nav-link, .btn, .social-icon {
          transition: all 0.3s ease;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2rem;
          }
          
          .stat-card {
            padding: 1.5rem;
          }
          
          .newsletter-form {
            padding: 1.5rem;
          }
        }
        
        /* Selection color */
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: #e2e8f0;
        }
        
        /* Focus styles */
        a:focus, button:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

export default Footer;