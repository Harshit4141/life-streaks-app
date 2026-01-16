import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Badge, ListGroup, Alert, 
  Tabs, Tab, Modal, Form, ProgressBar, Spinner
} from 'react-bootstrap';
import { 
  Check, X, Star, Building, Fire, Trophy, Shield, People, Clock, ArrowRight, Gift, Lock, Unlock, 
  Award,  Rocket,
  ShieldCheck, Sun, Moon, InfoCircle,
  Calendar
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

const PricingPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [darkMode, setDarkMode] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('plans');

  // Gamified Plans with Identity Tiers
  const plans = [
    {
      id: 'explorer',
      name: "Explorer",
      subtitle: "Start Your Journey",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for trying habits & building momentum",
      features: [
        { included: true, text: "Up to 3 streaks", highlight: false },
        { included: true, text: "7-day history", highlight: false },
        { included: true, text: "Basic badges", highlight: false },
        { included: false, text: "Advanced analytics", highlight: true },
        { included: false, text: "Team challenges", highlight: true },
        { included: false, text: "Legendary achievements", highlight: true },
      ],
      buttonVariant: "outline-primary",
      popular: false,
      identity: "Beginner Mindset",
      icon: "🌱",
      color: "#10B981",
      limitWarning: "You've used 2/3 streaks",
      progression: "Ready to level up?",
      stats: "67% of Explorers upgrade in 30 days"
    },
    {
      id: 'challenger',
      name: "Challenger",
      subtitle: "For Serious Builders",
      price: { monthly: 9.99, yearly: 99.99 },
      description: "Unlock discipline and join the top performers",
      features: [
        { included: true, text: "Unlimited streaks", highlight: true },
        { included: true, text: "Advanced analytics", highlight: true },
        { included: true, text: "Team challenges", highlight: true },
        { included: true, text: "Friend leaderboards", highlight: false },
        { included: true, text: "Custom themes", highlight: false },
        { included: false, text: "Enterprise features", highlight: true },
      ],
      buttonVariant: "primary",
      popular: true,
      identity: "Disciplined Achiever",
      icon: "⚡",
      color: "#3B82F6",
      badge: "Most Popular",
      stats: "Top 85% of users are Challengers",
      fomo: "Join 12,453 disciplined builders"
    },
    {
      id: 'master',
      name: "Master",
      subtitle: "Elite Performance",
      price: { monthly: 19.99, yearly: 199.99 },
      description: "Maximum accountability & team excellence",
      features: [
        { included: true, text: "Everything in Challenger", highlight: false },
        { included: true, text: "Team dashboard", highlight: true },
        { included: true, text: "Priority support", highlight: true },
        { included: true, text: "Custom branding", highlight: true },
        { included: true, text: "API access", highlight: true },
        { included: true, text: "Legendary achievements", highlight: true },
      ],
      buttonVariant: "outline-primary",
      popular: false,
      identity: "Elite Leader",
      icon: "👑",
      color: "#F59E0B",
      badge: "Pro Tier",
      stats: "Teams achieve 3× more consistency",
      bonus: "Includes 5 team member seats"
    }
  ];

  // Enterprise Features
  const enterpriseFeatures = [
    "Custom onboarding & training",
    "Dedicated account manager",
    "SLA guarantee (99.9% uptime)",
    "Custom integrations & API",
    "Advanced security features",
    "White-label solution",
    "Usage analytics dashboard",
    "Priority feature requests"
  ];

  // Achievement-based unlocks for paid plans
  const achievementUnlocks = [
    {
      id: 1,
      title: "Legendary Streak Badge",
      description: "Exclusive animated badge for 100+ day streaks",
      locked: true,
      plan: "challenger"
    },
    {
      id: 2,
      title: "Golden Theme",
      description: "Premium theme with custom animations",
      locked: true,
      plan: "challenger"
    },
    {
      id: 3,
      title: "Team War Room",
      description: "Advanced team analytics and competition",
      locked: true,
      plan: "master"
    },
    {
      id: 4,
      title: "AI Habit Coach",
      description: "Personalized habit optimization",
      locked: true,
      plan: "master"
    }
  ];

  // Social proof data
  const socialProof = [
    { stat: "72%", label: "of top streak holders use Pro" },
    { stat: "3.2×", label: "higher consistency rate" },
    { stat: "92%", label: "renew yearly" },
    { stat: "⭐ 4.9/5", label: "user satisfaction" }
  ];

  // FAQ with objection handling
  const faqs = [
    {
      question: "What happens if I cancel?",
      answer: "You keep all your data forever. You can re-subscribe anytime and pick up right where you left off. No data loss, ever.",
      emotion: "trust"
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes! Get 14 days free on any paid plan. No credit card required upfront. Experience the full Pro/Master features risk-free.",
      emotion: "safety"
    },
    {
      question: "Can I switch between plans?",
      answer: "Absolutely. Upgrade, downgrade, or cancel anytime. Changes happen instantly, and you only pay the difference.",
      emotion: "freedom"
    },
    {
      question: "What payment methods do you accept?",
      answer: "All major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfers for enterprise.",
      emotion: "convenience"
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, 30-day money-back guarantee. If you're not satisfied, we'll refund your payment, no questions asked.",
      emotion: "confidence"
    },
    {
      question: "How secure is my data?",
      answer: "Enterprise-grade security with encryption, regular backups, and GDPR compliance. Your habits are yours forever.",
      emotion: "security"
    }
  ];

  // Limited time offers
  const limitedOffers = [
    {
      id: 1,
      title: "Annual Commitment Bonus",
      description: "Get 2 months free when choosing yearly billing",
      expires: "3 days",
      icon: "🎁"
    },
    {
      id: 2,
      title: "Team Founding Member",
      description: "Lock in current pricing forever for your team",
      expires: "7 days",
      icon: "👥"
    }
  ];

  // Text color based on theme
  const getTextColor = () => darkMode ? '#ffffff' : '#1e293b';
  const getMutedTextColor = () => darkMode ? '#94a3b8' : '#64748b';
  const getCardBg = () => darkMode ? '#1e293b' : '#ffffff';
  const getCardBorder = () => darkMode ? '#334155' : '#e2e8f0';
  const getHoverBg = () => darkMode ? '#334155' : '#f8fafc';

  // Handle plan selection
  const handlePlanSelect = (planId) => {
    const plan = plans.find(p => p.id === planId);
    setSelectedPlan(plan);
    
    if (plan.price[billingCycle] > 0) {
      setShowTrialModal(true);
    } else {
      navigate('/signup');
    }
  };

  // Start trial with celebration
  const startTrial = () => {
    setIsLoading(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowTrialModal(false);
      setShowConfetti(false);
      
      toast.success(
        <div className="d-flex align-items-center">
          <Rocket className="me-2 text-warning" />
          <div>
            <strong className="d-block" style={{ color: '#ffffff' }}>Trial Started! 🚀</strong>
            <small style={{ color: '#d1d5db' }}>14 days of {selectedPlan?.name} features unlocked</small>
          </div>
        </div>
      );
      
      navigate('/dashboard');
    }, 2000);
  };

  // Toggle billing cycle
  const toggleBillingCycle = (cycle) => {
    setBillingCycle(cycle);
    toast.success(
      <div className="d-flex align-items-center">
        <Calendar className="me-2 text-success" />
        <div>
          <strong className="d-block" style={{ color: '#ffffff' }}>
            {cycle === 'yearly' ? 'Annual billing selected' : 'Monthly billing selected'}
          </strong>
          <small style={{ color: '#d1d5db' }}>
            {cycle === 'yearly' ? 'Save 16% with yearly commitment!' : 'Flexible monthly payments'}
          </small>
        </div>
      </div>
    );
  };

  // Contact enterprise sales
  const contactEnterprise = () => {
    setShowEnterpriseModal(true);
  };

  return (
    <div style={{ 
      background: darkMode 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #16213e 100%)' 
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #e6f0ff 100%)',
      minHeight: '100vh',
      color: getTextColor()
    }}>
      {/* Confetti Celebration */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Theme Toggle */}
      <div className="d-flex justify-content-end p-4">
        <Button
          variant={darkMode ? "dark" : "light"}
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-pill px-3"
          style={{
            background: darkMode ? '#334155' : '#e2e8f0',
            border: 'none',
            color: getTextColor()
          }}
        >
          {darkMode ? (
            <>
              <Sun className="me-2" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="me-2" />
              Dark Mode
            </>
          )}
        </Button>
      </div>

      <Container className="py-5">
        {/* Hero Section */}
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <Badge 
              bg="primary" 
              className="px-3 py-2 mb-3 rounded-pill"
              style={{ 
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                fontSize: '0.9rem'
              }}
            >
              <Fire className="me-2" /> Trusted by 50,000+ disciplined builders
            </Badge>
            <h1 className="display-4 fw-bold mb-4" style={{ color: getTextColor() }}>
              Choose Your <span style={{ 
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Discipline Level</span>
            </h1>
            <p className="lead mb-4" style={{ color: getMutedTextColor() }}>
              Not just features — upgrade your identity. Join builders who achieve 3× more consistency.
            </p>
            
            {/* Social Proof Stats */}
            <Row className="justify-content-center mb-5">
              <Col md={8}>
                <div className="d-flex justify-content-center flex-wrap gap-4">
                  {socialProof.map((proof, index) => (
                    <div key={index} className="text-center">
                      <div className="h3 fw-bold mb-1" style={{ color: '#3b82f6' }}>
                        {proof.stat}
                      </div>
                      <small style={{ color: getMutedTextColor() }}>{proof.label}</small>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Billing Toggle with FOMO */}
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <Card className="border-0" style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
              border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`,
              borderRadius: '15px',
              padding: '1rem'
            }}>
              <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                <div className="text-start">
                  <h6 className="fw-bold mb-1" style={{ color: getTextColor() }}>Commitment Level</h6>
                  <small style={{ color: getMutedTextColor() }}>
                    {billingCycle === 'yearly' 
                      ? '92% of serious builders choose yearly' 
                      : 'Monthly offers maximum flexibility'}
                  </small>
                </div>
                
                <div className="btn-group" role="group">
                  <Button
                    variant={billingCycle === 'monthly' ? 'primary' : 'outline-primary'}
                    onClick={() => toggleBillingCycle('monthly')}
                    className="px-4"
                    style={{
                      color: billingCycle === 'monthly' ? '#ffffff' : (darkMode ? '#ffffff' : '#3b82f6'),
                      borderColor: billingCycle === 'monthly' ? '#3b82f6' : (darkMode ? '#475569' : '#3b82f6')
                    }}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={billingCycle === 'yearly' ? 'primary' : 'outline-primary'}
                    onClick={() => toggleBillingCycle('yearly')}
                    className="px-4"
                    style={{
                      color: billingCycle === 'yearly' ? '#ffffff' : (darkMode ? '#ffffff' : '#3b82f6'),
                      borderColor: billingCycle === 'yearly' ? '#3b82f6' : (darkMode ? '#475569' : '#3b82f6')
                    }}
                  >
                    Yearly <Badge bg="success" className="ms-2">Save 16%</Badge>
                  </Button>
                </div>
              </div>
              
              {/* Limited Time Offer */}
              <Alert variant="warning" className="mb-0" style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1))',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                color: darkMode ? '#ffffff' : '#92400e'
              }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Clock className="me-2" />
                    <div>
                      <strong className="d-block">Limited Time Offer</strong>
                      <small>Get 2 months free with yearly billing • Ends in 3 days</small>
                    </div>
                  </div>
                  <Badge bg="warning" className="px-3 py-2" style={{ color: '#000000' }}>
                    <Fire className="me-1" /> Hot Deal
                  </Badge>
                </div>
              </Alert>
            </Card>
          </Col>
        </Row>

        {/* Identity-Based Plans */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-5"
          variant="pills"
        >
          <Tab eventKey="plans" title="🎯 Plans" className="pt-4">
            <Row className="g-4">
              {plans.map((plan, index) => (
                <Col lg={4} key={plan.id}>
                  <Card 
                    className={`h-100 border-0 shadow-lg transition-all ${plan.popular ? 'popular-plan' : ''}`}
                    style={{
                      background: getCardBg(),
                      border: `2px solid ${plan.popular ? plan.color : getCardBorder()}`,
                      borderRadius: '20px',
                      transform: plan.popular ? 'translateY(-10px)' : 'none',
                      transition: 'all 0.3s ease',
                      color: getTextColor()
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = plan.popular ? 'translateY(-10px)' : 'none'}
                  >
                    {plan.popular && (
                      <div className="position-absolute top-0 start-50 translate-middle mt-2">
                        <Badge 
                          bg="primary" 
                          pill 
                          className="px-3 py-2"
                          style={{ 
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            fontSize: '0.9rem'
                          }}
                        >
                          <Star className="me-1" /> {plan.badge || 'Most Popular'}
                        </Badge>
                      </div>
                    )}
                    
                    {plan.id === 'explorer' && (
                      <div className="position-absolute top-0 end-0 m-3">
                        <Alert variant="info" className="mb-0 py-1 px-2" style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: 'none',
                          fontSize: '0.8rem',
                          color: getTextColor()
                        }}>
                          <span style={{ fontSize: '0.9rem' }}>{plan.icon}</span> {plan.limitWarning}
                        </Alert>
                      </div>
                    )}
                    
                    <Card.Body className="p-4 d-flex flex-column">
                      <div className="mb-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="me-2" style={{ fontSize: '2rem' }}>{plan.icon}</span>
                          <div>
                            <Card.Title className="fw-bold h3 mb-1" style={{ color: getTextColor() }}>
                              {plan.name}
                            </Card.Title>
                            <small className="text" style={{ color: plan.color }}>
                              {plan.subtitle}
                            </small>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <span className="display-4 fw-bold" style={{ color: getTextColor() }}>
                            ${plan.price[billingCycle]}
                          </span>
                          <span style={{ color: getMutedTextColor() }}>
                            {plan.price[billingCycle] > 0 ? `/${billingCycle === 'monthly' ? 'mo' : 'yr'}` : '/forever'}
                          </span>
                        </div>
                        
                        <p style={{ color: getMutedTextColor() }} className="mb-3">
                          {plan.description}
                        </p>
                        
                        <Badge 
                          bg="secondary" 
                          className="px-3 py-2 mb-2"
                          style={{ 
                            background: darkMode ? '#334155' : '#e2e8f0',
                            color: getTextColor()
                          }}
                        >
                          <Award className="me-2" />
                          {plan.identity}
                        </Badge>
                        
                        {plan.stats && (
                          <div className="mt-2 p-2 rounded" style={{
                            background: darkMode ? '#334155' : '#f8fafc',
                            fontSize: '0.85rem'
                          }}>
                            <small style={{ color: getMutedTextColor() }}>
                              <Check className="me-1 text-success" size={12} />
                              {plan.stats}
                            </small>
                          </div>
                        )}
                      </div>

                      <ListGroup variant="flush" className="mb-4 flex-grow-1">
                        {plan.features.map((feature, idx) => (
                          <ListGroup.Item 
                            key={idx} 
                            className="border-0 px-0 py-2"
                            style={{ 
                              background: 'transparent',
                              color: getTextColor()
                            }}
                          >
                            <div className="d-flex align-items-center">
                              {feature.included ? (
                                <Check className="me-2" style={{ 
                                  color: feature.highlight ? plan.color : '#10b981',
                                  minWidth: '20px'
                                }} />
                              ) : (
                                <Lock className="me-2" style={{ 
                                  color: getMutedTextColor(),
                                  minWidth: '20px'
                                }} />
                              )}
                              <span style={{
                                color: feature.included 
                                  ? (feature.highlight ? plan.color : getTextColor())
                                  : getMutedTextColor(),
                                fontWeight: feature.highlight ? '600' : 'normal'
                              }}>
                                {feature.text}
                              </span>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>

                      <div className="mt-auto">
                        {plan.fomo && (
                          <div className="mb-3 p-2 rounded text-center" style={{
                            background: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                            border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`
                          }}>
                            <small style={{ color: getMutedTextColor() }}>
                              <People className="me-1" />
                              {plan.fomo}
                            </small>
                          </div>
                        )}
                        
                        <Button 
                          variant={plan.buttonVariant} 
                          size="lg" 
                          className="w-100 fw-bold py-3"
                          onClick={() => handlePlanSelect(plan.id)}
                          style={{
                            background: plan.popular 
                              ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                              : 'transparent',
                            borderColor: plan.color,
                            color: plan.popular ? '#ffffff' : plan.color,
                            borderRadius: '12px',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (!plan.popular) {
                              e.currentTarget.style.background = plan.color;
                              e.currentTarget.style.color = '#ffffff';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!plan.popular) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = plan.color;
                            }
                          }}
                        >
                          {plan.price[billingCycle] > 0 ? (
                            <>
                              <Rocket className="me-2" />
                              Start 14-Day Free Trial
                            </>
                          ) : (
                            <>
                              <ArrowRight className="me-2" />
                              Get Started Free
                            </>
                          )}
                        </Button>
                        
                        {plan.price[billingCycle] > 0 && billingCycle === 'yearly' && (
                          <div className="text-center mt-2">
                            <small style={{ color: '#10b981' }}>
                              <strong>2 months free</strong> with yearly billing
                            </small>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tab>

          <Tab eventKey="achievements" title="🏆 Unlocks" className="pt-4">
            <Row className="mb-5">
              <Col>
                <Card className="border-0 shadow-lg" style={{
                  background: getCardBg(),
                  border: `1px solid ${getCardBorder()}`,
                  borderRadius: '20px',
                  color: getTextColor()
                }}>
                  <Card.Body className="p-5">
                    <div className="text-center mb-5">
                      <Trophy size={64} className="text-warning mb-4" />
                      <h2 className="fw-bold mb-3" style={{ color: getTextColor() }}>
                        Premium Achievement Unlocks
                      </h2>
                      <p className="lead" style={{ color: getMutedTextColor() }}>
                        Earn exclusive badges, themes, and features only available to Pro users
                      </p>
                    </div>
                    
                    <Row className="g-4">
                      {achievementUnlocks.map((achievement) => (
                        <Col md={6} key={achievement.id}>
                          <Card className="border-0 h-100" style={{
                            background: darkMode ? '#334155' : '#f8fafc',
                            border: `2px solid ${achievement.locked ? '#475569' : '#10b981'}`,
                            borderRadius: '15px'
                          }}>
                            <Card.Body className="p-4">
                              <div className="d-flex align-items-start mb-3">
                                <div className="me-3">
                                  <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: achievement.locked 
                                      ? (darkMode ? '#475569' : '#e2e8f0')
                                      : 'linear-gradient(135deg, #10b981, #34d399)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: achievement.locked ? getMutedTextColor() : '#ffffff'
                                  }}>
                                    {achievement.locked ? <Lock size={20} /> : <Award size={20} />}
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-start">
                                    <h6 className="fw-bold mb-1" style={{ color: getTextColor() }}>
                                      {achievement.title}
                                    </h6>
                                    <Badge bg={achievement.plan === 'challenger' ? 'primary' : 'warning'}>
                                      {achievement.plan === 'challenger' ? 'Challenger' : 'Master'}
                                    </Badge>
                                  </div>
                                  <p className="mb-0" style={{ 
                                    fontSize: '0.9rem',
                                    color: getMutedTextColor()
                                  }}>
                                    {achievement.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="mt-3">
                                <ProgressBar 
                                  now={achievement.locked ? 0 : 100}
                                  style={{ 
                                    height: '6px',
                                    borderRadius: '3px',
                                    background: darkMode ? '#475569' : '#e2e8f0'
                                  }}
                                >
                                  <ProgressBar 
                                    variant={achievement.locked ? 'secondary' : 'success'}
                                    style={{ borderRadius: '3px' }}
                                  />
                                </ProgressBar>
                                <div className="d-flex justify-content-between mt-1">
                                  <small style={{ color: getMutedTextColor() }}>
                                    Status
                                  </small>
                                  <small className="fw-bold" style={{
                                    color: achievement.locked ? getMutedTextColor() : '#10b981'
                                  }}>
                                    {achievement.locked ? 'Locked' : 'Unlocked!'}
                                  </small>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                    
                    <div className="text-center mt-5">
                      <Button 
                        variant="primary" 
                        size="lg"
                        className="px-5"
                        onClick={() => handlePlanSelect('challenger')}
                      >
                        <Fire className="me-2" />
                        Unlock All Premium Achievements
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="teams" title="👥 Teams" className="pt-4">
            <Row>
              <Col>
                <Card className="border-0 shadow-lg" style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))',
                  border: '1px solid #334155',
                  borderRadius: '20px',
                  color: '#ffffff'
                }}>
                  <Card.Body className="p-5">
                    <Row className="align-items-center">
                      <Col md={8}>
                        <div className="d-flex align-items-center mb-4">
                          <div style={{
                            width: '70px',
                            height: '70px',
                            background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1.5rem'
                          }}>
                            <People size={32} className="text-white" />
                          </div>
                          <div>
                            <h2 className="fw-bold mb-2" style={{ color: '#ffffff' }}>
                              Transform Team Culture
                            </h2>
                            <p className="lead mb-0" style={{ color: '#cbd5e1' }}>
                              Build disciplined teams that achieve 3× more together
                            </p>
                          </div>
                        </div>
                        
                        <div className="row g-4 mb-5">
                          {[
                            { icon: '📈', title: 'Team Analytics', desc: 'Track collective progress' },
                            { icon: '🏆', title: 'Team Challenges', desc: 'Build competitive spirit' },
                            { icon: '👑', title: 'Leaderboards', desc: 'Recognize top performers' },
                            { icon: '🎯', title: 'Group Goals', desc: 'Align team objectives' }
                          ].map((item, index) => (
                            <div key={index} className="col-md-6">
                              <div className="d-flex align-items-center p-3 rounded-3" style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                              }}>
                                <span className="me-3" style={{ fontSize: '24px' }}>{item.icon}</span>
                                <div>
                                  <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>{item.title}</h6>
                                  <small style={{ color: '#cbd5e1' }}>{item.desc}</small>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Col>
                      
                      <Col md={4}>
                        <Card className="border-0" style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '15px'
                        }}>
                          <Card.Body className="text-center p-4">
                            <div className="mb-4">
                              <div className="h2 fw-bold mb-2" style={{ color: '#ffffff' }}>
                                $49.99
                              </div>
                              <small style={{ color: '#cbd5e1' }}>per month for 5 seats</small>
                              <div className="mt-3">
                                <Badge bg="success" className="px-3 py-2">
                                  <Fire className="me-1" />
                                  +3 seats included
                                </Badge>
                              </div>
                            </div>
                            
                            <ListGroup variant="flush" className="mb-4">
                              {enterpriseFeatures.slice(0, 4).map((feature, idx) => (
                                <ListGroup.Item key={idx} className="border-0 px-0" style={{
                                  background: 'transparent',
                                  color: '#ffffff'
                                }}>
                                  <Check className="text-success me-2" />
                                  <small>{feature}</small>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                            
                            <Button 
                              variant="light" 
                              size="lg"
                              className="w-100"
                              onClick={contactEnterprise}
                            >
                              <Building className="me-2" />
                              Request Team Demo
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>

        {/* Comparison Section */}
        <Row className="mb-5">
          <Col>
            <Card className="border-0 shadow-lg" style={{
              background: getCardBg(),
              border: `1px solid ${getCardBorder()}`,
              borderRadius: '20px',
              color: getTextColor()
            }}>
              <Card.Body className="p-5">
                <div className="text-center mb-5">
                  <h2 className="fw-bold mb-3" style={{ color: getTextColor() }}>
                    Why Serious Builders Choose Pro
                  </h2>
                  <p className="lead" style={{ color: getMutedTextColor() }}>
                    Compare what you get vs what you're missing
                  </p>
                </div>
                
                <div className="table-responsive">
                  <table className="table" style={{ color: getTextColor() }}>
                    <thead>
                      <tr>
                        <th style={{ borderColor: getCardBorder(), color: getTextColor() }}>Feature</th>
                        {plans.map(plan => (
                          <th 
                            key={plan.id} 
                            className="text-center"
                            style={{ 
                              borderColor: getCardBorder(),
                              color: plan.color,
                              fontWeight: '600'
                            }}
                          >
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ borderColor: getCardBorder(), color: getTextColor() }}>
                          <strong>Daily Streak Limit</strong>
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <span style={{ color: getMutedTextColor() }}>3 streaks</span>
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <span style={{ color: '#10b981' }}>Unlimited</span>
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <span style={{ color: '#10b981' }}>Unlimited</span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderColor: getCardBorder(), color: getTextColor() }}>
                          <strong>Advanced Analytics</strong>
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <X className="text-danger" />
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <Check className="text-success" />
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <Check className="text-success" />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderColor: getCardBorder(), color: getTextColor() }}>
                          <strong>Team Challenges</strong>
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <X className="text-danger" />
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <Check className="text-success" />
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <Check className="text-success" />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderColor: getCardBorder(), color: getTextColor() }}>
                          <strong>Legendary Achievements</strong>
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <X className="text-danger" />
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <Check className="text-success" />
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <Check className="text-success" />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderColor: getCardBorder(), color: getTextColor() }}>
                          <strong>Priority Support</strong>
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <X className="text-danger" />
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <X className="text-danger" />
                        </td>
                        <td className="text-center" style={{ borderColor: getCardBorder() }}>
                          <Check className="text-success" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section - Objection Handling */}
        <Row className="mb-5">
          <Col>
            <h2 className="fw-bold text-center mb-5" style={{ color: getTextColor() }}>
              Everything You Need to Know
            </h2>
            <Row>
              {faqs.map((faq, index) => (
                <Col md={6} key={index} className="mb-4">
                  <Card className="border-0 shadow-sm h-100" style={{
                    background: getCardBg(),
                    border: `1px solid ${getCardBorder()}`,
                    borderRadius: '15px',
                    color: getTextColor()
                  }}>
                    <Card.Body>
                      <Card.Title className="fw-bold mb-3" style={{ color: getTextColor() }}>
                        {faq.question}
                      </Card.Title>
                      <Card.Text style={{ color: getMutedTextColor() }}>
                        {faq.answer}
                      </Card.Text>
                      <div className="mt-3">
                        <Badge 
                          bg="secondary" 
                          className="px-3 py-2"
                          style={{
                            background: darkMode ? '#334155' : '#e2e8f0',
                            color: getTextColor()
                          }}
                        >
                          {faq.emotion === 'trust' && <Shield className="me-1" />}
                          {faq.emotion === 'safety' && <ShieldCheck className="me-1" />}
                          {faq.emotion === 'freedom' && <Unlock className="me-1" />}
                          {faq.emotion === 'convenience' && <Fire className="me-1" />}
                          {faq.emotion === 'confidence' && <Award className="me-1" />}
                          {faq.emotion === 'security' && <Lock className="me-1" />}
                          {faq.emotion.charAt(0).toUpperCase() + faq.emotion.slice(1)}
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* Final CTA */}
        <Alert variant="light" className="text-center border-0 shadow-lg" style={{
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
          border: `1px solid ${getCardBorder()}`,
          borderRadius: '20px',
          color: getTextColor()
        }}>
          <div className="p-5">
            <h3 className="fw-bold mb-4" style={{ color: getTextColor() }}>
              Ready to Level Up Your Discipline?
            </h3>
            <p className="lead mb-4" style={{ color: getMutedTextColor() }}>
              Join 12,453 builders who've transformed their habits with Pro
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button 
                variant="outline-primary" 
                size="lg"
                className="px-5"
                onClick={() => navigate('/contact')}
                style={{ color: getTextColor() }}
              >
                <InfoCircle className="me-2" />
                Need Help Choosing?
              </Button>
              <Button 
                variant="primary" 
                size="lg"
                className="px-5"
                onClick={() => handlePlanSelect('challenger')}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  border: 'none'
                }}
              >
                <Rocket className="me-2" />
                Start Free Trial
              </Button>
            </div>
            <p className="mt-4 mb-0" style={{ color: getMutedTextColor() }}>
              <small>
                <Check className="me-1 text-success" />
                14-day free trial • No credit card required • Cancel anytime
              </small>
            </p>
          </div>
        </Alert>
      </Container>

      {/* Trial Modal */}
      <Modal show={showTrialModal} onHide={() => setShowTrialModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          borderColor: darkMode ? '#334155' : '#dee2e6',
          color: darkMode ? '#ffffff' : '#000000'
        }}>
          <Modal.Title>
            🚀 Start Your {selectedPlan?.name} Trial
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000'
        }}>
          <div className="text-center mb-4">
            <div className="mb-3">
              <Rocket size={64} className="text-warning" />
            </div>
            <h4 className="fw-bold mb-3" style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              You're Almost There!
            </h4>
            <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              Get 14 days free to experience everything {selectedPlan?.name} has to offer
            </p>
          </div>
          
          <Card className="mb-4 border-0" style={{
            background: darkMode ? '#334155' : '#f8f9fa',
            border: `1px solid ${darkMode ? '#475569' : '#dee2e6'}`
          }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                    {selectedPlan?.name} Plan
                  </h6>
                  <small style={{ color: darkMode ? '#94a3b8' : '#6c757d' }}>
                    {billingCycle === 'yearly' ? 'Yearly billing' : 'Monthly billing'}
                  </small>
                </div>
                <div className="text-end">
                  <div className="h4 fw-bold mb-0" style={{ color: '#3b82f6' }}>
                    ${selectedPlan?.price[billingCycle]}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </div>
                  <small style={{ color: darkMode ? '#94a3b8' : '#6c757d' }}>
                    Starts after 14-day trial
                  </small>
                </div>
              </div>
              
              <Alert variant="success" className="mb-0">
                <div className="d-flex align-items-center">
                  <Gift className="me-2" />
                  <div>
                    <strong className="d-block">Trial Bonus!</strong>
                    <small>Get 2 months free if you choose yearly billing</small>
                  </div>
                </div>
              </Alert>
            </Card.Body>
          </Card>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: darkMode ? '#ffffff' : '#000000' }}>Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="you@example.com"
                style={{
                  background: darkMode ? '#334155' : '#ffffff',
                  borderColor: darkMode ? '#475569' : '#ced4da',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          borderColor: darkMode ? '#334155' : '#dee2e6'
        }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowTrialModal(false)}
            style={{
              background: darkMode ? '#475569' : '#6c757d',
              borderColor: darkMode ? '#475569' : '#6c757d',
              color: '#ffffff'
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={startTrial}
            disabled={isLoading}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              border: 'none',
              minWidth: '150px'
            }}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Starting Trial...
              </>
            ) : (
              <>
                <Rocket className="me-2" />
                Start Free Trial
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Enterprise Modal */}
      <Modal show={showEnterpriseModal} onHide={() => setShowEnterpriseModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          borderColor: darkMode ? '#334155' : '#dee2e6',
          color: darkMode ? '#ffffff' : '#000000'
        }}>
          <Modal.Title>
            🏢 Enterprise Solutions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000'
        }}>
          <div className="text-center mb-4">
            <Building size={64} className="text-primary mb-3" />
            <h4 className="fw-bold mb-3" style={{ color: darkMode ? '#ffffff' : '#000000' }}>
              Custom Solutions for Your Organization
            </h4>
            <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
              Transform team culture and drive productivity with custom enterprise solutions
            </p>
          </div>
          
          <Row className="g-4">
            {enterpriseFeatures.map((feature, index) => (
              <Col md={6} key={index}>
                <div className="d-flex align-items-start p-3 rounded" style={{
                  background: darkMode ? '#334155' : '#f8f9fa',
                  border: `1px solid ${darkMode ? '#475569' : '#dee2e6'}`
                }}>
                  <Check className="text-success me-2 mt-1" />
                  <span style={{ color: darkMode ? '#ffffff' : '#000000' }}>{feature}</span>
                </div>
              </Col>
            ))}
          </Row>
          
          <Alert variant="info" className="mt-4">
            <div className="d-flex align-items-center">
              <InfoCircle className="me-2" />
              <div>
                <strong>Request a custom demo:</strong>
                <small className="d-block">Our team will create a personalized demo based on your specific needs</small>
              </div>
            </div>
          </Alert>
        </Modal.Body>
        <Modal.Footer style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          borderColor: darkMode ? '#334155' : '#dee2e6'
        }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowEnterpriseModal(false)}
            style={{
              background: darkMode ? '#475569' : '#6c757d',
              borderColor: darkMode ? '#475569' : '#6c757d',
              color: '#ffffff'
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            onClick={() => window.location.href = 'mailto:sales@streakmaster.app'}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              border: 'none'
            }}
          >
            <Building className="me-2" />
            Contact Enterprise Sales
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom Styles */}
      <style jsx>{`
        .popular-plan {
          position: relative;
          overflow: hidden;
        }
        
        .popular-plan::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .table {
          --bs-table-bg: transparent;
          --bs-table-striped-bg: ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
          --bs-table-color: ${getTextColor()};
          --bs-table-border-color: ${getCardBorder()};
        }
        
        .table th {
          border-bottom: 2px solid ${getCardBorder()};
        }
        
        .table td, .table th {
          padding: 1rem;
          vertical-align: middle;
        }
        
        .dark-theme .btn-outline-primary {
          color: #ffffff;
          border-color: #475569;
        }
        
        .dark-theme .btn-outline-primary:hover {
          background-color: #475569;
          color: #ffffff;
        }
        
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          
          .btn-group {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .btn-group .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default PricingPage;