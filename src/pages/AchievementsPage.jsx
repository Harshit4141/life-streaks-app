import React from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { Trophy, Star, Award, Gem, Lightning, Fire } from 'react-bootstrap-icons';

const AchievementsPage = () => {
  const earnedAchievements = [
    {
      id: 1,
      title: 'First Streak',
      description: 'Complete your first 7-day streak',
      icon: <Trophy className="text-warning" size={24} />,
      earned: true,
      date: '2024-01-15',
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Maintain a streak for 30 consecutive days',
      icon: <Star className="text-warning" size={24} />,
      earned: true,
      date: '2024-02-15',
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Social Butterfly',
      description: 'Connect with 10 friends',
      icon: <Award className="text-primary" size={24} />,
      earned: true,
      date: '2024-03-01',
      rarity: 'common'
    },
    {
      id: 4,
      title: 'Team Player',
      description: 'Complete 5 team challenges',
      icon: <Gem className="text-success" size={24} />,
      earned: false,
      progress: 3,
      required: 5,
      rarity: 'epic'
    },
    {
      id: 5,
      title: 'Speed Demon',
      description: 'Check in 5 days in a row without missing',
      icon: <Lightning className="text-info" size={24} />,
      earned: false,
      progress: 2,
      required: 5,
      rarity: 'rare'
    }
  ];

  const upcomingAchievements = [
    {
      id: 6,
      title: 'Habit Master',
      description: 'Maintain 5 different streaks simultaneously for 30 days',
      icon: <Fire className="text-danger" size={24} />,
      progress: 0,
      required: 30,
      rarity: 'legendary'
    },
    {
      id: 7,
      title: 'Consistency King',
      description: '90-day streak on any habit',
      icon: <Trophy className="text-warning" size={24} />,
      progress: 42,
      required: 90,
      rarity: 'legendary'
    }
  ];

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'secondary';
      case 'rare': return 'primary';
      case 'epic': return 'success';
      case 'legendary': return 'warning';
      default: return 'secondary';
    }
  };

  const stats = {
    total: 15,
    earned: 8,
    completion: 53,
    recent: 3
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Achievements</h1>
          <p className="text-muted">Track your progress and unlock badges</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center h-100">
            <Card.Body>
              <div className="display-6 fw-bold">{stats.earned}/{stats.total}</div>
              <Card.Title>Achievements</Card.Title>
              <ProgressBar now={stats.completion} variant="primary" className="mb-3" />
              <small className="text-muted">{stats.completion}% completed</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center h-100">
            <Card.Body>
              <div className="display-6 fw-bold">3</div>
              <Card.Title>Streak Badges</Card.Title>
              <div className="mt-2">
                <Badge bg="warning" className="me-1">🔥 7d</Badge>
                <Badge bg="warning" className="me-1">🔥 30d</Badge>
                <Badge bg="warning">🔥 90d</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center h-100">
            <Card.Body>
              <div className="display-6 fw-bold">#{42}</div>
              <Card.Title>Global Rank</Card.Title>
              <div className="mt-2">
                <Badge bg="info">Top 10%</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm text-center h-100">
            <Card.Body>
              <div className="display-6 fw-bold">{stats.recent}</div>
              <Card.Title>This Month</Card.Title>
              <div className="mt-2">
                <Badge bg="success">+2 from last month</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tab.Container defaultActiveKey="earned">
        <Row>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="earned" className="d-flex justify-content-between">
                      <span>Earned</span>
                      <Badge bg="primary" pill>{earnedAchievements.filter(a => a.earned).length}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="upcoming" className="d-flex justify-content-between">
                      <span>Upcoming</span>
                      <Badge bg="light" text="dark" pill>{upcomingAchievements.length}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="all" className="d-flex justify-content-between">
                      <span>All Achievements</span>
                      <Badge bg="light" text="dark" pill>{stats.total}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="earned">
                <Row>
                  {earnedAchievements
                    .filter(achievement => achievement.earned)
                    .map(achievement => (
                      <Col md={6} lg={4} key={achievement.id} className="mb-4">
                        <Card className="border-0 shadow-sm h-100">
                          <Card.Body className="text-center">
                            <div className="mb-3">
                              {achievement.icon}
                            </div>
                            <Card.Title className="fw-bold">{achievement.title}</Card.Title>
                            <Card.Text className="text-muted small">
                              {achievement.description}
                            </Card.Text>
                            <div className="mt-3">
                              <Badge bg={getRarityColor(achievement.rarity)}>
                                {achievement.rarity.toUpperCase()}
                              </Badge>
                              <div className="text-muted small mt-2">
                                Earned: {achievement.date}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="upcoming">
                <Row>
                  {upcomingAchievements.map(achievement => (
                    <Col md={6} key={achievement.id} className="mb-4">
                      <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                          <div className="d-flex align-items-start mb-3">
                            <div className="me-3">
                              {achievement.icon}
                            </div>
                            <div className="flex-grow-1">
                              <Card.Title className="fw-bold">{achievement.title}</Card.Title>
                              <Card.Text className="text-muted small">
                                {achievement.description}
                              </Card.Text>
                            </div>
                            <Badge bg={getRarityColor(achievement.rarity)}>
                              {achievement.rarity.toUpperCase()}
                            </Badge>
                          </div>
                          <div>
                            <div className="d-flex justify-content-between mb-1">
                              <small>Progress</small>
                              <small>{achievement.progress}/{achievement.required}</small>
                            </div>
                            <ProgressBar 
                              now={(achievement.progress / achievement.required) * 100} 
                              variant="primary" 
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="all">
                <Row>
                  {[...earnedAchievements, ...upcomingAchievements].map(achievement => (
                    <Col md={6} lg={4} key={achievement.id} className="mb-4">
                      <Card className={`border-0 shadow-sm h-100 ${!achievement.earned ? 'opacity-75' : ''}`}>
                        <Card.Body className="text-center">
                          <div className="mb-3">
                            {achievement.icon}
                          </div>
                          <Card.Title className="fw-bold">{achievement.title}</Card.Title>
                          <Card.Text className="text-muted small">
                            {achievement.description}
                          </Card.Text>
                          <div className="mt-3">
                            <Badge bg={getRarityColor(achievement.rarity)}>
                              {achievement.rarity.toUpperCase()}
                            </Badge>
                            {achievement.earned ? (
                              <div className="text-success small mt-2">
                                {/* <CheckCircle className="me-1" /> */}
                                Earned
                              </div>
                            ) : (
                              <div className="text-muted small mt-2">
                                Progress: {achievement.progress || 0}/{achievement.required}
                              </div>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AchievementsPage;