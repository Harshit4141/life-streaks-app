import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Alert } from 'react-bootstrap';
import { Check, X, Star, Building } from 'react-bootstrap-icons';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started",
      features: [
        { included: true, text: "Up to 3 streaks" },
        { included: true, text: "Basic analytics" },
        { included: true, text: "Individual use only" },
        { included: false, text: "Team features" },
        { included: false, text: "Advanced analytics" },
        { included: false, text: "Custom reminders" },
      ],
      buttonVariant: "outline-primary",
      popular: false
    },
    {
      name: "Pro",
      price: { monthly: 9.99, yearly: 99.99 },
      description: "For serious habit builders",
      features: [
        { included: true, text: "Unlimited streaks" },
        { included: true, text: "Advanced analytics" },
        { included: true, text: "Friend challenges" },
        { included: true, text: "Custom themes" },
        { included: false, text: "Team dashboard" },
        { included: false, text: "Priority support" },
      ],
      buttonVariant: "primary",
      popular: true
    },
    {
      name: "Team",
      price: { monthly: 49.99, yearly: 499.99 },
      description: "For teams and companies",
      features: [
        { included: true, text: "Everything in Pro" },
        { included: true, text: "Team dashboard" },
        { included: true, text: "Admin controls" },
        { included: true, text: "Custom branding" },
        { included: true, text: "Priority support" },
        { included: true, text: "API access" },
      ],
      buttonVariant: "outline-primary",
      popular: false
    }
  ];

  const enterpriseFeatures = [
    "Custom onboarding & training",
    "Dedicated account manager",
    "SLA guarantee",
    "Custom integrations",
    "Advanced security features",
    "White-label solution"
  ];

  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="fw-bold">Simple, Transparent Pricing</h1>
          <p className="lead text-muted">
            Choose the perfect plan for your journey to consistency
          </p>
        </Col>
      </Row>

      {/* Billing Toggle */}
      <Row className="justify-content-center mb-5">
        <Col md={6} className="text-center">
          <div className="btn-group" role="group">
            <Button
              variant={billingCycle === 'monthly' ? 'primary' : 'outline-primary'}
              onClick={() => setBillingCycle('monthly')}
              className="px-4"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'primary' : 'outline-primary'}
              onClick={() => setBillingCycle('yearly')}
              className="px-4"
            >
              Yearly <Badge bg="success" className="ms-2">Save 16%</Badge>
            </Button>
          </div>
        </Col>
      </Row>

      {/* Pricing Cards */}
      <Row className="g-4 mb-5">
        {plans.map((plan, index) => (
          <Col lg={4} key={index}>
            <Card className={`h-100 border-0 shadow-lg ${plan.popular ? 'border-primary border-2' : ''}`}>
              {plan.popular && (
                <div className="position-absolute top-0 start-50 translate-middle mt-2">
                  <Badge bg="primary" pill className="px-3 py-2">
                    <Star className="me-1" /> Most Popular
                  </Badge>
                </div>
              )}
              <Card.Body className="p-4 d-flex flex-column">
                <div className="mb-4">
                  <Card.Title className="fw-bold h3">{plan.name}</Card.Title>
                  <div className="mb-3">
                    <span className="display-4 fw-bold">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-muted">
                      {plan.price[billingCycle] > 0 ? `/${billingCycle === 'monthly' ? 'mo' : 'yr'}` : ''}
                    </span>
                  </div>
                  <p className="text-muted">{plan.description}</p>
                </div>

                <ListGroup variant="flush" className="mb-4 flex-grow-1">
                  {plan.features.map((feature, idx) => (
                    <ListGroup.Item key={idx} className="border-0 px-0">
                      <div className="d-flex align-items-center">
                        {feature.included ? (
                          <Check className="text-success me-2" />
                        ) : (
                          <X className="text-muted me-2" />
                        )}
                        <span className={feature.included ? '' : 'text-muted'}>
                          {feature.text}
                        </span>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className="mt-auto"
                >
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Enterprise Section */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-lg bg-dark text-white">
            <Card.Body className="p-5">
              <Row className="align-items-center">
                <Col md={8}>
                  <Building size={48} className="mb-4" />
                  <h2 className="fw-bold">Enterprise Plan</h2>
                  <p className="lead mb-4">
                    Custom solutions for large teams and organizations
                  </p>
                  <Row>
                    {enterpriseFeatures.map((feature, index) => (
                      <Col md={6} key={index} className="mb-2">
                        <Check className="text-success me-2" />
                        {feature}
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col md={4} className="text-center">
                  <div className="mb-4">
                    <div className="h4">Custom Pricing</div>
                    <p className="text-light">Based on your needs</p>
                  </div>
                  <Button variant="light" size="lg" className="px-4">
                    Contact Sales
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="fw-bold text-center mb-5">Frequently Asked Questions</h2>
          <Row>
            <Col md={6}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>Can I switch plans later?</Card.Title>
                  <Card.Text className="text-muted">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>Is there a free trial?</Card.Title>
                  <Card.Text className="text-muted">
                    Yes! All paid plans come with a 14-day free trial. No credit card required to start.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>What payment methods do you accept?</Card.Title>
                  <Card.Text className="text-muted">
                    We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <Card.Title>Can I cancel anytime?</Card.Title>
                  <Card.Text className="text-muted">
                    Absolutely. You can cancel your subscription at any time, and you'll retain access until the end of your billing period.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Final CTA */}
      <Alert variant="light" className="text-center border">
        <h4 className="fw-bold mb-3">Still have questions?</h4>
        <p className="mb-4">
          Our team is here to help you choose the right plan for your needs.
        </p>
        <Button variant="outline-primary" size="lg" className="me-2">
          Contact Support
        </Button>
        <Button variant="primary" size="lg">
          Start Free Trial
        </Button>
      </Alert>
    </Container>
  );
};

export default PricingPage;