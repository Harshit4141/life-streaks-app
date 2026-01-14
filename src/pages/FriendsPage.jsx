import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup, Badge, Modal, Alert } from 'react-bootstrap';
import { Search, PersonPlus, Trophy, Fire, X } from 'react-bootstrap-icons';
import { useFriends } from '../components/context/FriendsContext';
import DemoBanner from '../components/Common/DemoBanner';
import toast from 'react-hot-toast';

const FriendsPage = () => {
  const { 
    friends, 
    friendRequests, 
    suggestedFriends, 
    addFriend, 
    removeFriend, 
    acceptFriendRequest, 
    rejectFriendRequest,
    sendChallenge,
    getLeaderboard
  } = useFriends();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [challengeType, setChallengeType] = useState('streak');
  
  const leaderboard = getLeaderboard();
  
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = (friendId) => {
    addFriend(friendId);
  };

  const handleRemoveFriend = (friendId, friendName) => {
    if (window.confirm(`Remove ${friendName} from your friends?`)) {
      removeFriend(friendId);
    }
  };

  const handleAcceptRequest = (requestId, friendName) => {
    acceptFriendRequest(requestId);
  };

  const handleRejectRequest = (requestId, friendName) => {
    rejectFriendRequest(requestId);
  };

  const handleSendMessage = (friendName) => {
    toast.success(`Message prepared for ${friendName}`);
    // In a real app, this would open a chat interface
  };

  const handleOpenChallengeModal = (friend) => {
    setSelectedFriend(friend);
    setShowChallengeModal(true);
  };

  const handleSendChallenge = () => {
    if (selectedFriend) {
      sendChallenge(selectedFriend.id, challengeType);
      toast.success(`Challenge sent to ${selectedFriend.name}!`);
      setShowChallengeModal(false);
      setSelectedFriend(null);
    }
  };

  const handleCompareStreaks = (friendName, friendStreak, myStreak) => {
    const diff = myStreak - friendStreak;
    let message = '';
    
    if (diff > 0) {
      message = `You're ahead by ${diff} days! 🎉`;
    } else if (diff < 0) {
      message = `You're behind by ${Math.abs(diff)} days. Keep going! 💪`;
    } else {
      message = `You're tied! 👏`;
    }
    
    toast.success(`${friendName}: ${friendStreak} days | You: ${myStreak} days. ${message}`);
  };

  const getFriendStatus = (streak) => {
    if (streak >= 100) return { text: 'Legend', color: 'warning' };
    if (streak >= 30) return { text: 'Pro', color: 'success' };
    if (streak >= 7) return { text: 'Active', color: 'primary' };
    return { text: 'Beginner', color: 'secondary' };
  };

  return (
    <Container className="py-4">
      <DemoBanner />
      
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Friends</h1>
          <p className="text-muted">Stay motivated together with {friends.length} friends</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary">
            <PersonPlus className="me-2" />
            Find Friends
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title className="fw-bold mb-0">Your Friend Circle</Card.Title>
                <div style={{ width: '300px' }}>
                  <InputGroup>
                    <InputGroup.Text>
                      <Search />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search friends..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>
              
              {filteredFriends.length === 0 ? (
                <Alert variant="info" className="text-center py-5">
                  <PersonPlus size={48} className="mb-3 text-muted" />
                  <h4>No friends found</h4>
                  <p className="text-muted">
                    {searchTerm ? 'Try a different search term' : 'Add some friends to get started!'}
                  </p>
                  <Button variant="primary" onClick={() => {}}>
                    Find Friends
                  </Button>
                </Alert>
              ) : (
                <Row>
                  {filteredFriends.map(friend => {
                    const status = getFriendStatus(friend.streak);
                    return (
                      <Col md={6} key={friend.id} className="mb-3">
                        <Card className="h-100 border">
                          <Card.Body>
                            <div className="d-flex align-items-start mb-3">
                              <div className="position-relative">
                                <div 
                                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                  style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    backgroundColor: '#4A6FA5',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '18px'
                                  }}
                                >
                                  {friend.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {friend.online && (
                                  <div 
                                    className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                                    style={{ 
                                      width: '12px', 
                                      height: '12px', 
                                      border: '2px solid white' 
                                    }}
                                  />
                                )}
                              </div>
                              
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <Card.Title className="mb-1">{friend.name}</Card.Title>
                                    <div className="d-flex align-items-center">
                                      <Badge bg={status.color} className="me-2">
                                        {status.text}
                                      </Badge>
                                      <div className="d-flex align-items-center">
                                        <Fire className="text-warning me-1" size={12} />
                                        <span className="fw-bold">{friend.streak} day streak</span>
                                      </div>
                                    </div>
                                  </div>
                                  <Button 
                                    variant="link" 
                                    className="text-danger p-0"
                                    onClick={() => handleRemoveFriend(friend.id, friend.name)}
                                  >
                                    <X size={18} />
                                  </Button>
                                </div>
                                
                                <div className="text-muted small mt-2">
                                  Habits: {friend.habits.join(', ')}
                                </div>
                                
                                <div className="d-flex gap-2 mt-3">
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => handleSendMessage(friend.name)}
                                  >
                                     Message
                                  </Button>
                                  <Button 
                                    variant="outline-warning" 
                                    size="sm"
                                    onClick={() => handleOpenChallengeModal(friend)}
                                  >
                                    Challenge
                                  </Button>
                                  <Button 
                                    variant="outline-info" 
                                    size="sm"
                                    onClick={() => handleCompareStreaks(friend.name, friend.streak, 42)}
                                  >
                                    Compare
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Leaderboard</Card.Title>
              <ListGroup variant="flush">
                {leaderboard.slice(0, 5).map((friend, index) => (
                  <ListGroup.Item key={friend.id} className="d-flex align-items-center py-3">
                    <div className="me-3">
                      <Badge bg={index < 3 ? "warning" : "light"} 
                            text={index < 3 ? "dark" : "dark"} 
                            className="rounded-circle"
                            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        #{index + 1}
                      </Badge>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center">
                        <strong className="me-2">{friend.name}</strong>
                        <Badge bg={friend.online ? "success" : "secondary"} size="sm">
                          {friend.online ? "Online" : "Offline"}
                        </Badge>
                      </div>
                      <div className="text-muted small">
                        {friend.habits[0]} • {friend.streak} days
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <Trophy className={`me-2 ${index === 0 ? 'text-warning' : index === 1 ? 'text-secondary' : index === 2 ? 'text-danger' : 'text-muted'}`} />
                      <span className="fw-bold h5 mb-0">{friend.streak}</span>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">
                Friend Requests
                {friendRequests.length > 0 && (
                  <Badge bg="danger" className="ms-2">{friendRequests.length}</Badge>
                )}
              </Card.Title>
              
              {friendRequests.length > 0 ? (
                friendRequests.map(request => (
                  <div key={request.id} className="mb-3 p-3 border rounded">
                    <div className="d-flex align-items-center mb-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: '#6C757D',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        {request.avatar}
                      </div>
                      <div>
                        <div className="fw-bold">{request.name}</div>
                        <div className="text-muted small">{request.mutualFriends} mutual friends</div>
                      </div>
                    </div>
                    <div className="d-flex gap-1">
                      <Button 
                        size="sm" 
                        variant="success" 
                        className="flex-grow-1"
                        onClick={() => handleAcceptRequest(request.id, request.name)}
                      >
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline-danger"
                        onClick={() => handleRejectRequest(request.id, request.name)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-3">
                  <div className="text-muted">No pending requests</div>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Suggested Friends</Card.Title>
              
              {suggestedFriends.length > 0 ? (
                <ListGroup variant="flush">
                  {suggestedFriends.map(friend => (
                    <ListGroup.Item key={friend.id} className="d-flex align-items-center py-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: '#E9ECEF',
                          color: '#495057',
                          fontWeight: 'bold'
                        }}
                      >
                        {friend.avatar}
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold">{friend.name}</div>
                        <div className="text-muted small">
                          {friend.mutualFriends} mutual friends • {friend.habits?.join(', ')}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline-primary"
                        onClick={() => handleAddFriend(friend.id)}
                      >
                        Add
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-center py-3">
                  <div className="text-muted">No suggestions available</div>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Friend Activity</Card.Title>
              
              <div className="alert alert-success">
                <strong>🔥 Sarah Chen</strong> just reached a 30-day meditation streak!
              </div>
              
              <div className="alert alert-info">
                <strong>👥 Alex Johnson</strong> invited you to join "Morning Runners" team
              </div>
              
              <div className="alert alert-warning">
                <strong>🏆 Marcus Rodriguez</strong> is #1 on the leaderboard this week
              </div>
              
              <div className="alert alert-primary">
                <strong>💪 David Kim</strong> completed the 7-day fitness challenge
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Challenge Modal */}
      <Modal show={showChallengeModal} onHide={() => setShowChallengeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Challenge to {selectedFriend?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Challenge Type</Form.Label>
              <Form.Select 
                value={challengeType}
                onChange={(e) => setChallengeType(e.target.value)}
              >
                <option value="streak">Longest Streak</option>
                <option value="consistency">7-Day Consistency</option>
                <option value="speed">Fastest Check-in</option>
                <option value="team">Team Challenge</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Select defaultValue="7">
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message (Optional)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder={`Hey ${selectedFriend?.name}, I challenge you to...`}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChallengeModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendChallenge}>
            Send Challenge
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FriendsPage;