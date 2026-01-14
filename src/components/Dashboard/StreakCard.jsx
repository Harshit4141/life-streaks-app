import React, { useState } from 'react';
import { Card, ProgressBar, Badge, Button, Dropdown } from 'react-bootstrap';
import { Fire, CalendarCheck, TrendingUp, ThreeDots, CheckCircle, XCircle, ArrowRepeat } from 'react-bootstrap-icons';
import { useStreaks } from '../context/StreaksContext';
import toast from 'react-hot-toast';

const StreakCard = ({ streak }) => {
  const { checkInStreak, deleteStreak, resetStreak } = useStreaks();
  const [isCheckedIn, setIsCheckedIn] = useState(streak.lastChecked === "Today");
  const [isLoading, setIsLoading] = useState(false);

  const getStreakStatus = (days) => {
    if (days >= 100) return { variant: 'danger', label: 'Legendary', emoji: '🔥🔥🔥' };
    if (days >= 50) return { variant: 'warning', label: 'Amazing', emoji: '🔥🔥' };
    if (days >= 10) return { variant: 'info', label: 'Great', emoji: '🔥' };
    return { variant: 'success', label: 'Good', emoji: '✨' };
  };

  const status = getStreakStatus(streak.streak);

  const handleCheckIn = async () => {
    if (isCheckedIn) {
      toast.error("Already checked in today!");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      checkInStreak(streak.id);
      setIsCheckedIn(true);
      toast.success(`✅ ${streak.name} streak extended to ${streak.streak + 1} days!`);
    } catch (error) {
      toast.error("Failed to check in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${streak.name}" streak?`)) {
      deleteStreak(streak.id);
    }
  };

  const handleReset = () => {
    if (window.confirm(`Reset "${streak.name}" streak to 0?`)) {
      resetStreak(streak.id);
      setIsCheckedIn(false);
    }
  };

  const completionRate = streak.bestStreak > 0 
    ? Math.round((streak.streak / streak.bestStreak) * 100) 
    : 0;

  return (
    <Card className="h-100 shadow-sm border-0 hover-lift">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="fw-bold">{streak.name}</Card.Title>
            <div className="d-flex align-items-center">
              <Badge bg="light" text="dark" className="me-2">{streak.category}</Badge>
              <Badge bg={status.variant} className="d-flex align-items-center">
                <Fire size={12} className="me-1" /> {status.label}
              </Badge>
            </div>
          </div>
          
          <Dropdown>
            <Dropdown.Toggle variant="link" className="text-dark p-0">
              <ThreeDots />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleCheckIn} disabled={isCheckedIn}>
                <CheckCircle className="me-2" /> Check-in
              </Dropdown.Item>
              <Dropdown.Item onClick={handleReset}>
                <ArrowRepeat className="me-2" /> Reset Streak
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleDelete} className="text-danger">
                <XCircle className="me-2" /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Card.Text className="text-muted small flex-grow-1 mb-3">
          {streak.description}
        </Card.Text>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary">{streak.streak}</div>
              <div className="text-muted small">Current</div>
            </div>
            <div className="text-center">
              <div className="h2 mb-0">{status.emoji}</div>
              <div className="text-muted small">Status</div>
            </div>
            <div className="text-center">
              <div className="h3 fw-bold">{streak.bestStreak}</div>
              <div className="text-muted small">Best</div>
            </div>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <small className="text-muted">Progress to Best</small>
              <small className="text-muted">{completionRate}%</small>
            </div>
            <ProgressBar 
              now={completionRate} 
              variant={completionRate >= 100 ? "success" : "primary"} 
              animated={completionRate < 100}
            />
          </div>

          <div className="d-grid gap-2">
            <Button 
              variant={isCheckedIn ? "success" : "primary"}
              onClick={handleCheckIn}
              disabled={isCheckedIn || isLoading}
              className="d-flex align-items-center justify-content-center"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Checking in...
                </>
              ) : isCheckedIn ? (
                <>
                  <CheckCircle className="me-2" />
                  Checked In Today
                </>
              ) : (
                <>
                  <CalendarCheck className="me-2" />
                  Check In Now
                </>
              )}
            </Button>
            
            <div className="d-flex justify-content-between small text-muted">
              <span>Last: {streak.lastChecked}</span>
              <span>Started: {new Date(streak.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StreakCard;