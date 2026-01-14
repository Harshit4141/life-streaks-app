import React from 'react';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import { PersonCheck, Trophy, Fire } from 'react-bootstrap-icons';

const FriendList = ({ friends }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Friends Activity</h6>
        <Button size="sm" variant="outline-primary">View All</Button>
      </div>
      
      <ListGroup variant="flush">
        {friends.map((friend, index) => (
          <ListGroup.Item key={index} className="border-0 px-0">
            <div className="d-flex align-items-center">
              <div className="position-relative me-3">
                <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '40px', height: '40px' }}>
                  <span className="text-white fw-bold">
                    {friend.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {friend.online && (
                  <div className="position-absolute bottom-0 end-0 bg-success rounded-circle" 
                       style={{ width: '10px', height: '10px', border: '2px solid white' }} />
                )}
              </div>
              
              <div className="flex-grow-1">
                <div className="fw-bold">{friend.name}</div>
                <div className="d-flex align-items-center">
                  <Fire size={12} className="text-warning me-1" />
                  <span className="text-muted small">
                    {friend.currentStreak} day streak • {friend.habit}
                  </span>
                </div>
              </div>
              
              <div className="text-end">
                {friend.achievement && (
                  <Badge bg="warning" text="dark" pill className="d-flex align-items-center">
                    <Trophy size={12} className="me-1" />
                    {friend.achievement}
                  </Badge>
                )}
                {friend.justJoined && (
                  <Badge bg="info" pill className="small">
                    <PersonCheck size={12} className="me-1" />
                    New
                  </Badge>
                )}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default FriendList;