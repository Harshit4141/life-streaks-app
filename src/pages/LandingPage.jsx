import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield } from 'react-bootstrap-icons';

const LandingPage = () => {
  const features = [
    {
      icon: <CheckCircle size={40} />,
      title: "Build Consistency",
      description: "Turn goals into daily habits with streak tracking"
    },
    {
      icon: <CheckCircle size={40} />,
      title: "Social Accountability",
      description: "Stay motivated with friends and teams"
    },
    {
    //   icon: <TrendingUp size={40} />,
      title: "Progress Analytics",
      description: "Track your growth with detailed insights"
    },
    {
      icon: <Shield size={40} />,
      title: "Positive Environment",
      description: "No toxic competition, only support"
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Startup Founder",
      text: "Life Streaks transformed how our team stays productive. 40% increase in goal completion!"
    },
    {
      name: "Sarah Chen",
      role: "Fitness Coach",
      text: "My clients love the streak system. Retention rates doubled since we started using it."
    },
    {
      name: "Marcus R.",
      role: "Software Engineer",
      text: "Finally a habit app that focuses on consistency, not just logging. 75-day coding streak!"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6}>
              <Badge bg="light" text="dark" className="mb-3">🚀 Startup Ready</Badge>
              <h1 className="display-4 fw-bold mb-4">
                Build Lasting Habits<br />Through <span className="text-warning">Social Streaks</span>
              </h1>
              <p className="lead mb-4">
                Join thousands who stay consistent with positive accountability. 
                Perfect for individuals, friends, and teams.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/register" size="lg" variant="light" className="fw-bold">
                  Start Free Trial
                </Button>
                <Button as={Link} to="/pricing" size="lg" variant="outline-light">
                  For Teams
                </Button>
              </div>
              <p className="mt-3 text-light">
                No credit card required • 14-day free trial
              </p>
            </Col>
            <Col lg={6}>
              <div className="bg-white rounded-3 p-4 shadow-lg">
                <div className="text-center mb-4">
                  <div className="display-6 fw-bold text-primary">🔥 42</div>
                  <p className="text-muted">Current Streak Days</p>
                </div>
                <div className="row text-center">
                  <div className="col">
                    <div className="h4">1,250+</div>
                    <small className="text-muted">Active Users</small>
                  </div>
                  <div className="col">
                    <div className="h4">89%</div>
                    <small className="text-muted">Retention Rate</small>
                  </div>
                  <div className="col">
                    <div className="h4">256</div>
                    <small className="text-muted">Teams</small>
                  </div>
                </div>
              </div>
            
<div className="d-flex gap-3 mt-4">
  <Button as={Link} to="/dashboard" size="lg" variant="light" className="fw-bold">
    Try Demo Now
  </Button>
  <Button as={Link} to="/pricing" size="lg" variant="outline-light">
    View Plans
  </Button>
</div>




            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Why Life Streaks Works</h2>
              <p className="text-muted">Designed for real behavior change</p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={3} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="text-primary mb-3">{feature.icon}</div>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-light py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-center">Trusted by Innovators</h2>
            </Col>
          </Row>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Text className="fst-italic">"{testimonial.text}"</Card.Text>
                    <div className="mt-3">
                      <strong>{testimonial.name}</strong>
                      <div className="text-muted">{testimonial.role}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="fw-bold mb-4">Ready to Build Better Habits?</h2>
              <p className="lead mb-4">
                Join individuals and teams who are achieving more through consistency.
              </p>
              <Button as={Link} to="/register" size="lg" variant="primary" className="px-5">
                Get Started Free
              </Button>
              <p className="mt-3 text-muted">
                No setup fee • Cancel anytime • 24/7 support
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;