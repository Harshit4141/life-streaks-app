import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Nav, Alert, Badge } from 'react-bootstrap';
import { Bell, Shield, Palette, Moon } from 'react-bootstrap-icons';
import DemoBanner from '../components/Common/DemoBanner';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    streakReminders: true,
    friendActivity: true,
    weeklyReports: false,
  });

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const notificationSettings = [
    { key: 'email', label: 'Email Notifications', description: 'Receive updates via email' },
    { key: 'push', label: 'Push Notifications', description: 'Get app notifications' },
    { key: 'streakReminders', label: 'Streak Reminders', description: 'Daily check-in reminders' },
    { key: 'friendActivity', label: 'Friend Activity', description: 'Updates from friends' },
    { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly progress summary' },
  ];

  const themeOptions = [
    { id: 'light', name: 'Light', description: 'Bright and clean' },
    { id: 'dark', name: 'Dark', description: 'Easy on eyes' },
    { id: 'auto', name: 'Auto', description: 'Follow system' },
  ];

  const privacyOptions = [
    { id: 'public', name: 'Public', description: 'Anyone can see your profile' },
    { id: 'friends', name: 'Friends Only', description: 'Only friends can see your activity' },
    { id: 'private', name: 'Private', description: 'Only you can see your activity' },
  ];

  return (
    <Container className="py-4">

        <Container className="py-4">
  <DemoBanner />
  {/* Rest of the code */}
</Container>

{/* // In the Account Management section, add demo note: */}
<Alert variant="warning" className="mb-4">
  <strong>Demo Note:</strong> Account management features are disabled in demo mode. 
  Sign up to access all features.
</Alert>
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Settings</h1>
          <p className="text-muted">Manage your account and preferences</p>
        </Col>
      </Row>

      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Row>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="profile" className="d-flex align-items-center">
                      {/* <User className="me-2" /> */}
                      Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="notifications" className="d-flex align-items-center">
                      <Bell className="me-2" />
                      Notifications
                      <Badge bg="light" text="dark" className="ms-auto">5</Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="privacy" className="d-flex align-items-center">
                      <Shield className="me-2" />
                      Privacy & Security
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="appearance" className="d-flex align-items-center">
                      <Palette className="me-2" />
                      Appearance
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="account" className="d-flex align-items-center">
                      {/* <User className="me-2" /> */}
                      Account
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {/* Profile Settings */}
              <Tab.Pane eventKey="profile">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Profile Settings</Card.Title>
                    <Form>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" defaultValue="John Doe" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" defaultValue="john@example.com" />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={3}
                          defaultValue="Fitness enthusiast and lifelong learner. Currently on a 75-day coding streak!"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Daily Goal</Form.Label>
                        <Form.Select defaultValue="3">
                          <option value="1">1 habit per day</option>
                          <option value="2">2 habits per day</option>
                          <option value="3">3 habits per day</option>
                          <option value="5">5 habits per day</option>
                          <option value="7">7+ habits per day</option>
                        </Form.Select>
                      </Form.Group>
                      <Button variant="primary">Save Changes</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Notification Settings */}
              <Tab.Pane eventKey="notifications">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Notification Preferences</Card.Title>
                    <p className="text-muted mb-4">Choose what notifications you want to receive</p>
                    
                    {notificationSettings.map((setting) => (
                      <div key={setting.key} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                        <div>
                          <div className="fw-bold">{setting.label}</div>
                          <div className="text-muted small">{setting.description}</div>
                        </div>
                        <Form.Check 
                          type="switch"
                          checked={notifications[setting.key]}
                          onChange={() => handleNotificationChange(setting.key)}
                        />
                      </div>
                    ))}

                    <div className="mt-4">
                      <h6 className="fw-bold mb-3">Notification Schedule</h6>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Daily Reminder Time</Form.Label>
                            <Form.Control type="time" defaultValue="09:00" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Weekly Report Day</Form.Label>
                            <Form.Select defaultValue="sunday">
                              <option value="monday">Monday</option>
                              <option value="sunday">Sunday</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>

                    <Button variant="primary" className="mt-3">Save Preferences</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Privacy Settings */}
              <Tab.Pane eventKey="privacy">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Privacy & Security</Card.Title>
                    
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Profile Visibility</h6>
                      {privacyOptions.map((option) => (
                        <Form.Check
                          key={option.id}
                          type="radio"
                          id={`privacy-${option.id}`}
                          name="privacy"
                          label={
                            <div>
                              <div className="fw-bold">{option.name}</div>
                              <div className="text-muted small">{option.description}</div>
                            </div>
                          }
                          defaultChecked={option.id === 'friends'}
                          className="mb-2"
                        />
                      ))}
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Data & Privacy</h6>
                      <Form.Check 
                        type="switch"
                        id="data-sharing"
                        label="Allow anonymous data sharing for improvement"
                        defaultChecked
                        className="mb-2"
                      />
                      <Form.Check 
                        type="switch"
                        id="export-data"
                        label="Enable data export"
                        defaultChecked
                      />
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Security</h6>
                      <Button variant="outline-primary" className="me-2">Change Password</Button>
                      <Button variant="outline-primary">Two-Factor Authentication</Button>
                    </div>

                    <Alert variant="warning">
                      <strong>Note:</strong> Changing privacy settings may affect how others see your activity.
                    </Alert>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Appearance Settings */}
              <Tab.Pane eventKey="appearance">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Appearance</Card.Title>
                    
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Theme</h6>
                      <Row>
                        {themeOptions.map((theme) => (
                          <Col md={4} key={theme.id} className="mb-3">
                            <Card className={`border ${theme.id === 'light' ? 'border-primary' : ''}`}>
                              <Card.Body className="text-center">
                                <Moon size={30} className="mb-3" />
                                <Card.Title>{theme.name}</Card.Title>
                                <Card.Text className="text-muted small">{theme.description}</Card.Text>
                                <Button 
                                  variant={theme.id === 'light' ? 'primary' : 'outline-primary'}
                                  size="sm"
                                >
                                  Select
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Streak Display</h6>
                      <Form.Select defaultValue="fire">
                        <option value="fire">Fire Emoji (Default)</option>
                        <option value="numbers">Numbers Only</option>
                        <option value="both">Both Emoji and Numbers</option>
                      </Form.Select>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Dashboard Layout</h6>
                      <Form.Select defaultValue="grid">
                        <option value="grid">Grid View</option>
                        <option value="list">List View</option>
                        <option value="compact">Compact View</option>
                      </Form.Select>
                    </div>

                    <Button variant="primary">Save Appearance Settings</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Account Settings */}
              <Tab.Pane eventKey="account">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-4">Account Management</Card.Title>
                    
                    <Alert variant="danger" className="mb-4">
                      <strong>Danger Zone</strong> - These actions are irreversible
                    </Alert>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Export Data</h6>
                      <p className="text-muted mb-3">
                        Download all your data including streaks, habits, and activity history.
                      </p>
                      <Button variant="outline-secondary">Export My Data</Button>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Delete Account</h6>
                      <p className="text-muted mb-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="outline-danger">Delete Account</Button>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Subscription</h6>
                      <Card className="border-success">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-bold">Pro Plan</div>
                              <div className="text-muted">$9.99/month • Next billing: Jan 15, 2024</div>
                            </div>
                            <Button variant="outline-secondary">Manage Subscription</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
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

export default SettingsPage;