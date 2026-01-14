import React from 'react';
import { Card, ProgressBar, Badge, Button } from 'react-bootstrap';
import { People, Trophy, Calendar, ArrowUp } from 'react-bootstrap-icons';

const TeamCard = ({ team }) => {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="fw-bold">{team.name}</Card.Title>
            <div className="d-flex align-items-center">
              <Badge bg="light" text="dark" className="me-2">
                <People size={12} className="me-1" />
                {team.memberCount} members
              </Badge>
              <Badge bg={team.active ? "success" : "secondary"}>
                {team.active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          {team.rank <= 3 && (
            <Badge bg="warning" text="dark" pill className="fs-6">
              #{team.rank}
            </Badge>
          )}
        </div>

        <Card.Text className="text-muted small mb-4">
          {team.description}
        </Card.Text>

        <div className="mb-4">
          <div className="d-flex justify-content-between mb-1">
            <span className="small">Team Progress</span>
            <span className="small fw-bold">{team.progress}%</span>
          </div>
          <ProgressBar now={team.progress} variant="primary" />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div className="d-flex align-items-center">
              <Trophy className="text-warning me-2" />
              <span className="fw-bold">{team.streak}</span>
            </div>
            <small className="text-muted">Day streak</small>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <Calendar className="text-primary me-2" />
              <span className="fw-bold">{team.challenges}</span>
            </div>
            <small className="text-muted">Challenges</small>
          </div>
          <div>
            <div className="d-flex align-items-center">
              <ArrowUp className="text-success me-2" />
              <span className="fw-bold">{team.growth}%</span>
            </div>
            <small className="text-muted">Growth</small>
          </div>
        </div>

        <div className="d-grid gap-2">
          <Button variant={team.joined ? "outline-primary" : "primary"}>
            {team.joined ? "View Team" : "Join Team"}
          </Button>
          {team.joined && (
            <Button variant="outline-secondary" size="sm">
              Invite Friends
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;