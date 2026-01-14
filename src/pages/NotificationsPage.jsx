import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Badge, Button, Form } from 'react-bootstrap';
import { Bell, CheckCircle, People, Trophy, Calendar, X } from 'react-bootstrap-icons';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'friend',
      title: 'Friend Request',
      message: 'Alex Johnson wants to be your friend',
      time: '2 minutes ago',
      read: false,
      action: 'accept'
    },
    {
      id: 2,
      type: 'streak',
      title: 'Streak Milestone',
      message: 'You reached 30 days on "Morning Run"!',
      time: '1 hour ago',
      read: false,
      action: 'view'
    },
    {
      id: 3,
      type: 'challenge',
      title: 'New Challenge',
      message: 'Your team "Dev Warriors" started a new coding challenge',
      time: '3 hours ago',
      read: true,
      action: 'join'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Daily Check-in',
      message: "Don't forget to check in for your meditation streak",
      time: '5 hours ago',
      read: true,
      action: 'checkin'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You earned the "Week Warrior" badge!',
      time: '1 day ago',
      read: true,
      action: 'view'
    }
  ]);

  const getIcon = (type) => {
    switch(type) {
      case 'friend': return <People className="text-primary" />;
      case 'streak': return <Trophy className="text-warning" />;
      case 'challenge': return <Calendar className="text-success" />;
      case 'reminder': return <Bell className="text-info" />;
      case 'achievement': return <CheckCircle className="text-danger" />;
      default: return <Bell />;
    }
  };

  const getBadgeVariant = (type) => {
    switch(type) {
      case 'friend': return 'primary';
      case 'streak': return 'warning';
      case 'challenge': return 'success';
      case 'reminder': return 'info';
      case 'achievement': return 'danger';
      default: return 'secondary';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold">Notifications</h1>
              <p className="text-muted">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            <div className="d-flex gap-2">
              {unreadCount > 0 && (
                <Button variant="outline-primary" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="outline-danger" size="sm" onClick={clearAll}>
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              {notifications.length === 0 ? (
                <div className="text-center py-5">
                  <Bell size={48} className="text-muted mb-3" />
                  <h4 className="fw-bold">No notifications</h4>
                  <p className="text-muted">You're all caught up!</p>
                </div>
              ) : (
                <ListGroup variant="flush">
                  {notifications.map(notification => (
                    <ListGroup.Item 
                      key={notification.id}
                      className={`
                        border-0 px-0 py-3
                        ${!notification.read ? 'bg-light bg-opacity-25' : ''}
                      `}
                    >
                      <div className="d-flex">
                        <div className="me-3 mt-1">
                          {getIcon(notification.type)}
                        </div>
                        
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="fw-bold mb-1">
                                {notification.title}
                                {!notification.read && (
                                  <Badge bg="primary" pill className="ms-2">New</Badge>
                                )}
                              </h6>
                              <p className="mb-1">{notification.message}</p>
                              <small className="text-muted">{notification.time}</small>
                            </div>
                            <div className="d-flex gap-1">
                              {!notification.read && (
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  className="text-success p-0"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark read
                                </Button>
                              )}
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="text-danger p-0"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          </div>
                          
                          {notification.action && (
                            <div className="mt-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                className="me-2"
                              >
                                {notification.action === 'accept' ? 'Accept' : 
                                 notification.action === 'view' ? 'View' : 
                                 notification.action === 'join' ? 'Join' : 
                                 'Check-in'}
                              </Button>
                              {notification.action === 'accept' && (
                                <Button variant="outline-secondary" size="sm">
                                  Decline
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Notification Settings</Card.Title>
              <Form>
                {[
                  { id: 'streaks', label: 'Streak reminders', defaultChecked: true },
                  { id: 'friends', label: 'Friend activity', defaultChecked: true },
                  { id: 'challenges', label: 'Challenge updates', defaultChecked: true },
                  { id: 'achievements', label: 'Achievements', defaultChecked: true },
                  { id: 'weekly', label: 'Weekly reports', defaultChecked: false },
                ].map(setting => (
                  <Form.Check 
                    key={setting.id}
                    type="switch"
                    id={setting.id}
                    label={setting.label}
                    defaultChecked={setting.defaultChecked}
                    className="mb-2"
                  />
                ))}
              </Form>
              <Button variant="primary" className="mt-3 w-100">Save Settings</Button>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Notification Types</Card.Title>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center">
                  <Badge bg="primary" pill className="me-2">F</Badge>
                  <small>Friend requests & activity</small>
                </div>
                <div className="d-flex align-items-center">
                  <Badge bg="warning" pill className="me-2">S</Badge>
                  <small>Streak milestones</small>
                </div>
                <div className="d-flex align-items-center">
                  <Badge bg="success" pill className="me-2">C</Badge>
                  <small>Challenge updates</small>
                </div>
                <div className="d-flex align-items-center">
                  <Badge bg="info" pill className="me-2">R</Badge>
                  <small>Reminders</small>
                </div>
                <div className="d-flex align-items-center">
                  <Badge bg="danger" pill className="me-2">A</Badge>
                  <small>Achievements</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationsPage;