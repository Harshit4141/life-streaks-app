import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

const StreakCounter = ({ streak, habitName, color = 'primary' }) => {
  const getFireEmoji = (days) => {
    if (days >= 100) return '🔥🔥🔥';
    if (days >= 50) return '🔥🔥';
    if (days >= 10) return '🔥';
    return '✨';
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="text-center">
        <div className="display-4 fw-bold text-primary">{streak}</div>
        <Card.Title className="mt-2">{habitName}</Card.Title>
        <div className="fs-1">{getFireEmoji(streak)}</div>
        <div className="mt-3">
          <small className="text-muted">Days in a row</small>
          <ProgressBar 
            now={Math.min(streak, 100)} 
            variant={color} 
            className="mt-2"
            label={`${Math.min(streak, 100)}%`}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default StreakCounter;