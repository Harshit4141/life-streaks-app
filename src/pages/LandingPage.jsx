import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Shield, 
  Lightning,
  Award,
  Star,
  Heart,
  ArrowRight,
  Play,
  ChevronRight,
  GraphUp,
  Clock,
  Gem,
  Rocket
} from 'react-bootstrap-icons';

const LandingPage = () => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isHovered, setIsHovered] = useState(null);

  const stats = [
    { value: 1250, label: 'Active Users', suffix: '+', color: '#8B5CF6' },
    { value: 89, label: 'Retention Rate', suffix: '%', color: '#10B981' },
    { value: 256, label: 'Active Teams', suffix: '', color: '#3B82F6' },
    { value: 42, label: 'Avg Streak Days', suffix: '', color: '#F59E0B' }
  ];

  const features = [
    {
      icon: <Rocket size={48} />,
      title: "Smart Habit Tracking",
      description: "AI-powered streak tracking that adapts to your lifestyle and goals.",
      gradient: "from-purple-500 to-pink-500",
      color: "#8B5CF6"
    },
    {
      icon: <Clock size={48} />,
      title: "Social Accountability",
      description: "Motivate each other with friends and teams. Positive vibes only.",
      gradient: "from-blue-500 to-cyan-500",
      color: "#3B82F6"
    },
    {
      icon: <GraphUp size={48} />,
      title: "Advanced Analytics",
      description: "Deep insights and personalized recommendations for growth.",
      gradient: "from-green-500 to-emerald-500",
      color: "#10B981"
    },
    {
      icon: <Rocket size={48} />,
      title: "Goal Setting",
      description: "Set smart goals and track progress with milestone celebrations.",
      gradient: "from-orange-500 to-red-500",
      color: "#F97316"
    },
    {
      icon: <Gem size={48} />,
      title: "Rewards System",
      description: "Earn badges and unlock achievements for consistency.",
      gradient: "from-pink-500 to-rose-500",
      color: "#EC4899"
    },
    {
      icon: <Clock size={48} />,
      title: "Time Management",
      description: "Smart reminders and optimal scheduling for habit success.",
      gradient: "from-indigo-500 to-purple-500",
      color: "#6366F1"
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Startup Founder",
      text: "Life Streaks transformed our team's productivity. We're achieving goals we never thought possible!",
      avatar: "AJ",
      rating: 5,
      company: "TechScale Inc."
    },
    {
      name: "Sarah Chen",
      role: "Fitness Coach",
      text: "My clients' retention doubled with Life Streaks. The streak psychology really works!",
      avatar: "SC",
      rating: 5,
      company: "FitMind Studio"
    },
    {
      name: "Marcus R.",
      role: "Lead Developer",
      text: "150-day coding streak and counting! This app changed how I approach daily habits.",
      avatar: "MR",
      rating: 5,
      company: "CodeCraft AI"
    },
    {
      name: "Emily Wang",
      role: "Product Manager",
      text: "Our remote team's engagement skyrocketed. The team challenges feature is genius.",
      avatar: "EW",
      rating: 5,
      company: "RemoteFirst"
    }
  ];

  const successStories = [
    { habit: "Morning Meditation", days: 365, user: "David K.", color: "#8B5CF6" },
    { habit: "Daily Workout", days: 240, user: "Maria L.", color: "#10B981" },
    { habit: "Learn Spanish", days: 180, user: "Tom B.", color: "#3B82F6" },
    { habit: "Write Journal", days: 150, user: "Sarah M.", color: "#F59E0B" }
  ];

  const companyLogos = [
    { name: "TechCorp", color: "#3B82F6" },
    { name: "StartupHub", color: "#8B5CF6" },
    { name: "GrowthLabs", color: "#10B981" },
    { name: "InnovateCo", color: "#F59E0B" },
    { name: "FutureTech", color: "#EC4899" },
    { name: "Visionary", color: "#6366F1" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let start = 0;
    const end = stats[currentStatIndex].value;
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedValue(Math.floor(start));
    }, 16);
    
    return () => clearInterval(timer);
  }, [currentStatIndex]);

  const StatCounter = () => (
    <div className="stat-counter rounded-4 p-5 shadow-2xl" style={{
      background: `linear-gradient(135deg, ${stats[currentStatIndex].color}20 0%, ${stats[currentStatIndex].color}40 100%)`,
      border: `2px solid ${stats[currentStatIndex].color}40`,
      backdropFilter: 'blur(10px)'
    }}>
      <div className="display-4 fw-bold mb-2" style={{ color: stats[currentStatIndex].color }}>
        {animatedValue}
        <span style={{ color: stats[currentStatIndex].color }}>{stats[currentStatIndex].suffix}</span>
      </div>
      <div className="h5 mb-3 text-dark">{stats[currentStatIndex].label}</div>
      <div className="progress mt-3" style={{ height: '6px', backgroundColor: `${stats[currentStatIndex].color}20` }}>
        <div 
          className="progress-bar rounded-pill" 
          style={{ 
            width: '100%',
            background: `linear-gradient(90deg, ${stats[currentStatIndex].color}, ${stats[currentStatIndex].color}AA)`
          }}
        ></div>
      </div>
    </div>
  );

  const SuccessStoryCard = ({ story, index }) => (
    <Card 
      className="h-100 border-0 shadow-lg hover-lift transition-all"
      onMouseEnter={() => setIsHovered(index)}
      onMouseLeave={() => setIsHovered(null)}
      style={{
        background: `linear-gradient(135deg, ${story.color}10 0%, ${story.color}05 100%)`,
        border: `2px solid ${story.color}20`,
        transform: isHovered === index ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Card.Body className="text-center p-5">
        <div className="position-relative">
          <div className="floating-emoji" style={{ animationDelay: `${index * 0.5}s` }}>
            🔥
          </div>
          <div 
            className="display-2 fw-bold mt-5 mb-2 gradient-text"
            style={{ background: `linear-gradient(135deg, ${story.color}, ${story.color}AA)` }}
          >
            {story.days}
          </div>
          <div className="text-muted small mb-4">CONSECUTIVE DAYS</div>
        </div>
        <Card.Title className="h3 fw-bold mb-3" style={{ color: story.color }}>
          {story.habit}
        </Card.Title>
        <Card.Text className="text-muted mb-4">
          by <span className="fw-bold">{story.user}</span>
        </Card.Text>
        <Badge 
          className="px-4 py-2 rounded-pill"
          style={{ 
            background: `linear-gradient(90deg, ${story.color}, ${story.color}AA)`,
            border: 'none'
          }}
        >
          <Rocket className="me-2" /> Active Streak
        </Badge>
      </Card.Body>
    </Card>
  );

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden min-vh-100 d-flex align-items-center">
        <div className="position-absolute top-0 start-0 w-100 h-100 hero-gradient"></div>
        <div className="floating-shapes">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="floating-shape" style={{
              animationDelay: `${i * 0.5}s`,
              background: `radial-gradient(circle, ${features[i % features.length].color}20, transparent 70%)`
            }}></div>
          ))}
        </div>
        
        <Container className="position-relative py-6">
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <Badge className="mb-4 px-4 py-2 rounded-pill border-0 shadow-sm" style={{
                background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
                color: 'white'
              }}>
                <Rocket className="me-2" /> Next-Gen Habit Platform
              </Badge>
              
              <h1 className="display-2 fw-bold text-white mb-4">
                Build <span className="highlight-text">Unbreakable</span><br />
                Habits with <span className="gradient-text">Social</span><br />
                <span className="d-inline-block animate-typing">Accountability</span>
              </h1>
              
              <p className="lead text-light mb-5 opacity-90" style={{ fontSize: '1.25rem' }}>
                Join 10,000+ achievers who transformed their lives through daily consistency.
                The only habit app that combines psychology, community, and smart technology.
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-4 mb-5">
                <Button 
                  as={Link} 
                  to="/dashboard" 
                  size="lg" 
                  className="fw-bold px-6 py-3 rounded-pill shadow-lg hover-lift border-0"
                  style={{
                    background: 'linear-gradient(90deg, #F59E0B, #F97316)',
                    color: 'white'
                  }}
                >
                  <Play className="me-2" />
                  Launch Free Demo
                </Button>
                <Button 
                  as={Link} 
                  to="/pricing" 
                  size="lg" 
                  variant="outline-light" 
                  className="fw-bold px-6 py-3 rounded-pill border-2 hover-lift"
                >
                  <Rocket className="me-2" />
                  See Premium Features
                  <ArrowRight className="ms-2" />
                </Button>
              </div>
              
              <div className="d-flex flex-wrap gap-4 text-light opacity-90">
                <div className="d-flex align-items-center">
                  <CheckCircle className="text-success me-2" size={20} />
                  <span>No credit card required</span>
                </div>
                <div className="d-flex align-items-center">
                  <Award className="text-warning me-2" size={20} />
                  <span>14-day free trial</span>
                </div>
                <div className="d-flex align-items-center">
                  <Shield className="text-info me-2" size={20} />
                  <span>100% satisfaction guarantee</span>
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="position-relative hero-visual">
                <div className="main-visual-card rounded-4 p-5 shadow-2xl" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div className="text-center">
                    <div className="pulse-ring mb-4">
                      <div className="fire-emoji display-1">🔥</div>
                    </div>
                    <div className="display-3 fw-bold gradient-text mb-2" style={{
                      background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)'
                    }}>
                      42
                    </div>
                    <p className="text-dark mb-4" style={{ fontSize: '1.1rem' }}>
                      Average Streak Days
                    </p>
                    
                    <div className="stats-grid mt-5">
                      <div className="stat-item">
                        <div className="h4 fw-bold text-primary">92%</div>
                        <div className="small text-muted">Success Rate</div>
                      </div>
                      <div className="stat-item">
                        <div className="h4 fw-bold text-success">3.5x</div>
                        <div className="small text-muted">More Consistent</div>
                      </div>
                      <div className="stat-item">
                        <div className="h4 fw-bold text-warning">40%</div>
                        <div className="small text-muted">Goal Completion</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="floating-stats">
                  <StatCounter />
                </div>
                
                <div className="success-preview rounded-4 p-4 shadow-2xl">
                  <h6 className="fw-bold mb-3 text-dark">Recent Success Stories</h6>
                  {successStories.slice(0, 2).map((story, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <div className="rounded-circle p-2" style={{
                          background: `linear-gradient(135deg, ${story.color}, ${story.color}AA)`,
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span className="fw-bold">{story.days}</span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold text-dark">{story.habit}</div>
                        <small className="text-muted">by {story.user}</small>
                      </div>
                      <Badge className="rounded-pill" style={{
                        background: `linear-gradient(90deg, ${story.color}20, ${story.color}40)`,
                        color: story.color,
                        border: `1px solid ${story.color}40`
                      }}>
                        🔥
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trusted By Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <p className="text-muted mb-4">TRUSTED BY INNOVATIVE TEAMS AT</p>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            {companyLogos.map((company, index) => (
              <Col key={index} xs={4} sm={4} md={2} className="mb-4">
                <div className="company-logo rounded-3 p-3 text-center hover-lift" style={{
                  background: `linear-gradient(135deg, ${company.color}10, ${company.color}05)`,
                  border: `2px solid ${company.color}20`,
                  transition: 'all 0.3s ease'
                }}>
                  <div className="h5 fw-bold mb-0" style={{ color: company.color }}>
                    {company.name}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-6 py-lg-7">
        <Container>
          <Row className="text-center mb-6">
            <Col lg={8} className="mx-auto">
              <Badge className="mb-4 px-4 py-2 rounded-pill border-0" style={{
                background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
                color: 'white'
              }}>
                Why Choose Life Streaks
              </Badge>
              <h2 className="display-4 fw-bold mb-4">
                Everything You Need to <span className="gradient-text">Build Better Habits</span>
              </h2>
              <p className="lead text-muted mb-5">
                We combine cutting-edge technology with proven psychology to help you succeed
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col lg={4} md={6} key={index}>
                <Card 
                  className="h-100 border-0 shadow-lg hover-lift feature-card"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}05, transparent 100%)`,
                    border: `2px solid ${feature.color}20`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Card.Body className="p-5">
                    <div className="feature-icon-wrapper mb-4">
                      <div className="feature-icon-inner" style={{
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}AA)`,
                        color: 'white'
                      }}>
                        {feature.icon}
                      </div>
                    </div>
                    <Card.Title className="h3 fw-bold mb-3" style={{ color: feature.color }}>
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted mb-4" style={{ fontSize: '1.05rem' }}>
                      {feature.description}
                    </Card.Text>
                    <Button 
                      variant="link" 
                      className="text-decoration-none p-0 d-flex align-items-center"
                      style={{ color: feature.color }}
                    >
                      Learn more <ChevronRight className="ms-2" />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-6 py-lg-7 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 testimonial-bg"></div>
        <Container className="position-relative">
          <Row className="text-center mb-6">
            <Col lg={8} className="mx-auto">
              <Badge className="mb-4 px-4 py-2 rounded-pill border-0" style={{
                background: 'linear-gradient(90deg, #F59E0B, #F97316)',
                color: 'white'
              }}>
                Loved Worldwide
              </Badge>
              <h2 className="display-4 fw-bold text-white mb-4">
                What Our <span className="gradient-text">Community</span> Says
              </h2>
            </Col>
          </Row>
          
          <Row className="g-4">
            {testimonials.map((testimonial, index) => (
              <Col lg={3} md={6} key={index}>
                <Card className="h-100 border-0 shadow-lg hover-lift" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <div className="avatar-circle me-3" style={{
                        background: `linear-gradient(135deg, ${features[index % features.length].color}, ${features[index % features.length].color}AA)`,
                        color: 'white'
                      }}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="fw-bold text-dark">{testimonial.name}</div>
                        <small className="text-muted">{testimonial.role}</small>
                        <div className="small text-primary">{testimonial.company}</div>
                      </div>
                    </div>
                    
                    <Card.Text className="fst-italic text-dark mb-4" style={{ fontSize: '1.05rem' }}>
                      "{testimonial.text}"
                    </Card.Text>
                    
                    <div className="d-flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-warning me-1" fill="currentColor" />
                      ))}
                    </div>
                    
                    <div className="text-end">
                      <Heart className="text-danger" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Success Stories Section */}
      <section className="py-6 py-lg-7">
        <Container>
          <Row className="text-center mb-6">
            <Col lg={8} className="mx-auto">
              <Badge className="mb-4 px-4 py-2 rounded-pill border-0" style={{
                background: 'linear-gradient(90deg, #10B981, #059669)',
                color: 'white'
              }}>
                Real Impact
              </Badge>
              <h2 className="display-4 fw-bold mb-4">
                Success Stories That <span className="gradient-text">Inspire</span>
              </h2>
              <p className="lead text-muted mb-5">
                See how consistent small actions created massive life changes
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {successStories.map((story, index) => (
              <Col lg={3} md={6} key={index}>
                <SuccessStoryCard story={story} index={index} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-6 py-lg-7 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 cta-gradient"></div>
        <div className="floating-shapes">
          {[1, 2, 3].map(i => (
            <div key={i} className="floating-shape" style={{
              animationDelay: `${i * 0.7}s`,
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%)`
            }}></div>
          ))}
        </div>
        
        <Container className="position-relative">
          <Row className="justify-content-center text-center">
            <Col lg={8} className="mx-auto">
              <Badge className="mb-4 px-4 py-2 rounded-pill border-0" style={{
                background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
                color: 'white'
              }}>
                Ready to Transform?
              </Badge>
              
              <h2 className="display-3 fw-bold text-white mb-4">
                Start Your <span className="highlight-text">Journey</span> Today
              </h2>
              
              <p className="lead text-light mb-5 opacity-90" style={{ fontSize: '1.25rem' }}>
                Join thousands who turned aspirations into achievements through daily consistency.
                Your best habits start today.
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-4 justify-content-center mb-5">
                <Button 
                  as={Link} 
                  to="/dashboard" 
                  size="lg" 
                  className="fw-bold px-6 py-3 rounded-pill shadow-lg hover-lift border-0"
                  style={{
                    background: 'linear-gradient(90deg, #F59E0B, #F97316)',
                    color: 'white'
                  }}
                >
                  <Rocket className="me-2" />
                  Launch Free Demo
                </Button>
                <Button 
                  as={Link} 
                  to="/pricing" 
                  size="lg" 
                  variant="outline-light" 
                  className="fw-bold px-6 py-3 rounded-pill border-2 hover-lift"
                >
                  <Gem className="me-2" />
                  Explore Premium Plans
                  <ArrowRight className="ms-2" />
                </Button>
              </div>
              
              <div className="d-flex flex-wrap justify-content-center gap-4 text-light opacity-90">
                <div className="d-flex align-items-center">
                  <CheckCircle className="text-success me-2" />
                  <span>No setup fee • Cancel anytime</span>
                </div>
                <div className="d-flex align-items-center">
                  <Shield className="text-primary me-2" />
                  <span>24/7 support • 100% secure</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .landing-page {
          overflow-x: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%);
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, 
            rgba(30, 27, 75, 0.95) 0%, 
            rgba(49, 46, 129, 0.9) 50%, 
            rgba(67, 56, 202, 0.85) 100%
          );
        }
        
        .cta-gradient {
          background: linear-gradient(135deg, 
            rgba(67, 56, 202, 0.95) 0%, 
            rgba(79, 70, 229, 0.9) 50%, 
            rgba(99, 102, 241, 0.85) 100%
          );
        }
        
        .testimonial-bg {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #8B5CF6, #3B82F6, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        .highlight-text {
          background: linear-gradient(90deg, #F59E0B, #F97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-shape:nth-child(1) { width: 200px; height: 200px; top: 10%; left: 5%; }
        .floating-shape:nth-child(2) { width: 150px; height: 150px; top: 60%; right: 10%; }
        .floating-shape:nth-child(3) { width: 180px; height: 180px; bottom: 20%; left: 15%; }
        .floating-shape:nth-child(4) { width: 120px; height: 120px; top: 30%; right: 20%; }
        .floating-shape:nth-child(5) { width: 100px; height: 100px; bottom: 40%; right: 5%; }
        
        .hero-visual {
          height: 500px;
        }
        
        .main-visual-card {
          position: absolute;
          width: 100%;
          z-index: 2;
        }
        
        .floating-stats {
          position: absolute;
          top: -50px;
          right: -30px;
          width: 250px;
          z-index: 3;
          animation: float 5s ease-in-out infinite;
        }
        
        .success-preview {
          position: absolute;
          bottom: -50px;
          left: -30px;
          width: 280px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          z-index: 3;
          animation: float 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .pulse-ring {
          display: inline-block;
          position: relative;
        }
        
        .pulse-ring::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F59E0B, #F97316);
          opacity: 0.3;
          animation: pulse 2s ease-out infinite;
        }
        
        .fire-emoji {
          position: relative;
          z-index: 2;
          animation: fire 2s ease-in-out infinite;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        
        .stat-item {
          text-align: center;
          padding: 10px;
        }
        
        .floating-emoji {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3rem;
          animation: float 3s ease-in-out infinite;
        }
        
        .feature-icon-wrapper {
          display: inline-block;
          position: relative;
        }
        
        .feature-icon-inner {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .avatar-circle {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .company-logo {
          transition: all 0.3s ease;
        }
        
        .company-logo:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        
        .animate-typing {
          overflow: hidden;
          border-right: 3px solid #8B5CF6;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
        }
        
        @keyframes fire {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(5deg); }
          50% { transform: scale(1.2) rotate(0deg); }
          75% { transform: scale(1.1) rotate(-5deg); }
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #8B5CF6 }
        }
        
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
        }
        
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .py-6 {
          padding-top: 5rem !important;
          padding-bottom: 5rem !important;
        }
        
        .py-7 {
          padding-top: 6rem !important;
          padding-bottom: 6rem !important;
        }
        
        .mb-6 {
          margin-bottom: 5rem !important;
        }
        
        @media (max-width: 992px) {
          .display-2 { font-size: 2.5rem; }
          .display-3 { font-size: 2rem; }
          .display-4 { font-size: 1.75rem; }
          
          .hero-visual {
            height: auto;
            margin-top: 3rem;
          }
          
          .main-visual-card,
          .floating-stats,
          .success-preview {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            margin-bottom: 2rem;
            animation: none !important;
          }
          
          .py-6 {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
          }
          
          .py-7 {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .display-2 { font-size: 2rem; }
          .display-3 { font-size: 1.75rem; }
          .display-4 { font-size: 1.5rem; }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;