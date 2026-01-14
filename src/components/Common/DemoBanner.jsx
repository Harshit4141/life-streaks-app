import React from 'react';
import { Alert, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStreaks } from '../context/StreaksContext';

const DemoBanner = () => {
  const { getStreakStats } = useStreaks();
  const stats = getStreakStats();

  return (
    <Alert variant="info" className="mb-4">
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-2">
            <strong className="me-2">🚀 Demo Mode - All Features Active</strong>
            <div className="small">
              {stats.totalStreaks} streaks • {stats.totalStreakDays} total days • {stats.consistencyRate}% consistency
            </div>
          </div>
          <ProgressBar 
            now={stats.consistencyRate} 
            variant="info" 
            label={`${stats.consistencyRate}% Consistency`}
            className="mb-2"
          />
          <div className="small text-muted">
            You're using sample data. <Link to="/pricing" className="alert-link">Sign up for free</Link> to start your own streaks!
          </div>
        </div>
        <Button 
          variant="outline-info" 
          size="sm" 
          as={Link} 
          to="/pricing"
          className="ms-3 flex-shrink-0"
        >
          Get Started Free
        </Button>
      </div>
    </Alert>
  );
};

export default DemoBanner;