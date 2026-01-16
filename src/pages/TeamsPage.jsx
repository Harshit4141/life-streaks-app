import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav, Badge, ProgressBar } from 'react-bootstrap';
import { People, Trophy, Calendar, Plus, Award } from 'react-bootstrap-icons';

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState('my-teams');

  const teams = [
    { id: 1, name: "Dev Warriors", members: 12, streak: 45, category: "Coding", activeChallenge: true },
    { id: 2, name: "Fitness Crew", members: 8, streak: 28, category: "Fitness", activeChallenge: true },
    { id: 3, name: "Book Club", members: 15, streak: 60, category: "Reading", activeChallenge: false },
    { id: 4, name: "Morning Risers", members: 5, streak: 90, category: "Productivity", activeChallenge: true },
  ];

  const teamChallenges = [
    { id: 1, name: "30-Day Code Sprint", team: "Dev Warriors", progress: 75, endDate: "2024-12-15" },
    { id: 2, name: "Fitness Marathon", team: "Fitness Crew", progress: 45, endDate: "2024-12-20" },
    { id: 3, name: "Reading Challenge", team: "Book Club", progress: 90, endDate: "2024-12-10" },
  ];

  const suggestedTeams = [
    { id: 1, name: "Remote Workers", members: 150, category: "Productivity" },
    { id: 2, name: "Language Learners", members: 89, category: "Education" },
    { id: 3, name: "Meditation Group", members: 45, category: "Wellness" },
  ];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Teams</h1>
          <p className="text-muted">Collaborate and achieve goals together</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary">
            <Plus className="me-2" />
            Create Team
          </Button>
        </Col>
      </Row>

      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Row>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="my-teams" className="d-flex justify-content-between align-items-center">
                      <span>
                        <People className="me-2" />
                        My Teams
                      </span>
                      <Badge bg="light" text="dark" pill>{teams.length}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="challenges" className="d-flex justify-content-between align-items-center">
                      <span>
                        <Trophy className="me-2" />
                        Challenges
                      </span>
                      <Badge bg="light" text="dark" pill>{teamChallenges.length}</Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="discover" className="d-flex justify-content-between align-items-center">
                      <span>
                        <Award className="me-2" />
                        Discover
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mt-4">
              <Card.Body>
                <Card.Title className="fw-bold mb-3">Team Stats</Card.Title>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total Teams</span>
                    <strong>{teams.length}</strong>
                  </div>
                  <ProgressBar now={100} variant="primary" className="mt-1" />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Active Members</span>
                    <strong>40</strong>
                  </div>
                  <ProgressBar now={80} variant="success" className="mt-1" />
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Success Rate</span>
                    <strong>85%</strong>
                  </div>
                  <ProgressBar now={85} variant="warning" className="mt-1" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="my-teams">
                <Row>
                  {teams.map(team => (
                    <Col md={6} key={team.id} className="mb-4">
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <Card.Title className="fw-bold">{team.name}</Card.Title>
                            {team.activeChallenge && (
                              <Badge bg="success" pill>Active Challenge</Badge>
                            )}
                          </div>
                          <div className="mb-3">
                            <Badge bg="light" text="dark" className="me-2">
                              <People className="me-1" /> {team.members}
                            </Badge>
                            <Badge bg="light" text="dark">
                              <Trophy className="me-1" /> {team.streak} days
                            </Badge>
                          </div>
                          <Card.Text className="text-muted">
                            Category: <strong>{team.category}</strong>
                          </Card.Text>
                          <div className="mt-4">
                            <div className="d-flex justify-content-between mb-1">
                              <small className="text-muted">Team Engagement</small>
                              <small className="text-muted">85%</small>
                            </div>
                            <ProgressBar now={85} variant="info" />
                          </div>
                          <div className="d-grid gap-2 mt-4">
                            <Button variant="primary">Enter Team</Button>
                            <Button variant="outline-secondary">Invite Members</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="challenges">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Team Challenges</Card.Title>
                    {teamChallenges.map(challenge => (
                      <Card key={challenge.id} className="mb-3 border">
                        <Card.Body>
                          <Row className="align-items-center">
                            <Col md={6}>
                              <h5 className="fw-bold">{challenge.name}</h5>
                              <div className="text-muted">Team: {challenge.team}</div>
                              <div className="text-muted small">
                                <Calendar className="me-1" />
                                Ends: {challenge.endDate}
                              </div>
                            </Col>
                            <Col md={4}>
                              <div className="mb-2">
                                <div className="d-flex justify-content-between">
                                  <small>Progress</small>
                                  <small>{challenge.progress}%</small>
                                </div>
                                <ProgressBar now={challenge.progress} variant={challenge.progress > 70 ? "success" : "warning"} />
                              </div>
                            </Col>
                            <Col md={2} className="text-end">
                              <Button variant={challenge.progress === 100 ? "success" : "primary"}>
                                {challenge.progress === 100 ? "Completed" : "Continue"}
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="discover">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Suggested Teams</Card.Title>
                    <Row>
                      {suggestedTeams.map(team => (
                        <Col md={4} key={team.id} className="mb-4">
                          <Card className="h-100 border">
                            <Card.Body className="text-center">
                              <div className="bg-primary rounded-circle p-3 mb-3 mx-auto" style={{ width: '70px' }}>
                                <People size={30} className="text-white" />
                              </div>
                              <Card.Title>{team.name}</Card.Title>
                              <Card.Text className="text-muted">
                                {team.members} members
                                <br />
                                <Badge bg="light" text="dark">{team.category}</Badge>
                              </Card.Text>
                              <Button variant="outline-primary" className="w-100">Join Team</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default TeamsPage;