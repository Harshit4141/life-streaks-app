import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, ListGroup, Badge, Alert } from 'react-bootstrap';
import { PlusCircle, Trophy, Calendar, Fire, Lightning } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useStreaks } from '../components/context/StreaksContext';
import { useFriends } from '../components/context/FriendsContext';
import { useTeams } from '../components/context/TeamsContext';
import StreakCard from '../components/Dashboard/StreakCard';
import FriendList from '../components/Dashboard/FriendsList';
import TeamCard from '../components/Dashboard/TeamCard';
import ProgressChart from '../components/Dashboard/ProgressChart';
import DemoBanner from '../components/Common/DemoBanner';
import toast from 'react-hot-toast';

const DashboardPage = ({ userData }) => {
  const navigate = useNavigate();
  const { streaks, getStreakStats, checkInStreak } = useStreaks();
  const { friends, getLeaderboard } = useFriends();
  const { teams, teamChallenges, getTeamStats } = useTeams();
  
  const [quickCheckIns, setQuickCheckIns] = useState([]);
  const [todaysGoal, setTodaysGoal] = useState(3);
  const [todaysProgress, setTodaysProgress] = useState(0);
  const [motivationQuote, setMotivationQuote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const stats = getStreakStats();
  const leaderboard = getLeaderboard();
  const teamStats = getTeamStats();

  useEffect(() => {
    // Load today's progress
    const checkedInToday = streaks.filter(s => s.lastChecked === "Today").length;
    setTodaysProgress(checkedInToday);

    // Load motivation quote
    const quotes = [
      "The secret of getting ahead is getting started.",
      "Don't watch the clock; do what it does. Keep going.",
      "The way to get started is to quit talking and begin doing.",
      "It does not matter how slowly you go as long as you do not stop.",
      "The future depends on what you do today."
    ];
    setMotivationQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Load quick check-ins
    setQuickCheckIns([
      { id: 1, name: "Morning", time: "8:00 AM", completed: true },
      { id: 2, name: "Afternoon", time: "1:00 PM", completed: false },
      { id: 3, name: "Evening", time: "8:00 PM", completed: false }
    ]);
  }, [streaks]);

  const handleQuickCheckIn = (checkInId) => {
    setQuickCheckIns(prev => 
      prev.map(checkIn => 
        checkIn.id === checkInId 
          ? { ...checkIn, completed: true } 
          : checkIn
      )
    );
    setTodaysProgress(prev => prev + 1);
    toast.success("Quick check-in recorded!");
  };

  const handleCheckAllStreaks = () => {
    setIsLoading(true);
    let checkedCount = 0;
    
    streaks.forEach(streak => {
      if (streak.lastChecked !== "Today") {
        checkInStreak(streak.id);
        checkedCount++;
      }
    });

    setTimeout(() => {
      setIsLoading(false);
      if (checkedCount > 0) {
        toast.success(`Checked in ${checkedCount} streaks!`);
      } else {
        toast.info("All streaks already checked in today!");
      }
    }, 1000);
  };

  const handleCreateNewStreak = () => {
    navigate('/streaks');
    toast.loading("Redirecting to create streak...");
  };

  const handleInviteFriend = () => {
    const inviteLink = "https://lifestreaks.app/invite/demo123";
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard!");
  };

  const handleJoinTeam = () => {
    navigate('/teams');
    toast.loading("Redirecting to teams...");
  };

  const getWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      name: day,
      streaks: Math.floor(Math.random() * 10) + 1,
      checkins: Math.floor(Math.random() * 8) + 1,
      goals: Math.floor(Math.random() * 12) + 1
    }));
  };

  const performanceStats = [
    { 
      metric: 'Current Streak', 
      value: `${stats.longestStreak} days`, 
      icon: <Fire className="text-warning" />,
      change: '+5%',
      color: 'warning'
    },
    { 
      metric: 'Consistency', 
      value: `${stats.consistencyRate}%`, 
      icon: <Fire className="text-success" />,
      change: '+3%',
      color: 'success'
    },
    { 
      metric: 'Weekly Activity', 
      value: `${Math.round(todaysProgress/todaysGoal * 100)}%`, 
      icon: <Fire className="text-info" />,
      change: '+8%',
      color: 'info'
    },
    { 
      metric: 'Friends Active', 
      value: `${friends.filter(f => f.online).length}/${friends.length}`, 
      icon: <Fire className="text-primary" />,
      change: '+12%',
      color: 'primary'
    }
  ];

  return (
    <Container className="py-4">
      <DemoBanner />
      
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold">Welcome back, {userData?.name || 'Streaker'}! 👋</h1>
              <p className="text-muted mb-0">
                {motivationQuote}
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                onClick={handleCreateNewStreak}
                className="d-flex align-items-center"
              >
                <PlusCircle className="me-2" />
                New Streak
              </Button>
              <Button 
                variant="outline-primary" 
                onClick={handleCheckAllStreaks}
                disabled={isLoading}
                className="d-flex align-items-center"
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Checking...
                  </>
                ) : (
                  <>
                    <Calendar className="me-2" />
                    Check All
                  </>
                )}
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        {performanceStats.map((stat, index) => (
          <Col md={3} key={index} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="text-muted small mb-1">{stat.metric}</div>
                    <div className="h3 fw-bold mb-0">{stat.value}</div>
                    <Badge bg={stat.color} className="mt-2">{stat.change}</Badge>
                  </div>
                  <div className={`text-${stat.color}`}>
                    {React.cloneElement(stat.icon, { size: 32 })}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100 mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title className="fw-bold mb-0">Today's Goals</Card.Title>
                <div className="text-muted">
                  {todaysProgress}/{todaysGoal} completed
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Daily Progress</span>
                  <span>{Math.round((todaysProgress/todaysGoal) * 100)}%</span>
                </div>
                <ProgressBar 
                  now={(todaysProgress/todaysGoal) * 100} 
                  variant="success" 
                  animated 
                />
              </div>

              <div className="row g-3">
                {streaks.slice(0, 4).map(streak => (
                  <div className="col-md-6" key={streak.id}>
                    <StreakCard streak={streak} />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Weekly Performance</Card.Title>
              <ProgressChart 
                data={getWeeklyData()} 
                title="Activity Trends" 
                type="line" 
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="fw-bold mb-0">Quick Check-ins</Card.Title>
                <Badge bg="light" text="dark">
                  <Lightning className="me-1" /> Quick
                </Badge>
              </div>
              
              <ListGroup variant="flush">
                {quickCheckIns.map(checkIn => (
                  <ListGroup.Item key={checkIn.id} className="border-0">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="fw-bold">{checkIn.name}</div>
                        <div className="text-muted small">{checkIn.time}</div>
                      </div>
                      <Button
                        size="sm"
                        variant={checkIn.completed ? "success" : "outline-primary"}
                        onClick={() => !checkIn.completed && handleQuickCheckIn(checkIn.id)}
                        disabled={checkIn.completed}
                      >
                        {checkIn.completed ? "Done" : "Check In"}
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <div className="mt-3">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="w-100"
                  onClick={() => navigate('/streaks')}
                >
                  View All Streaks
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="fw-bold mb-0">Friend Activity</Card.Title>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={handleInviteFriend}
                >
                  Invite
                </Button>
              </div>
              
              <FriendList friends={friends.slice(0, 3)} />
              
              <div className="mt-3">
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  className="w-100"
                  onClick={() => navigate('/friends')}
                >
                  View All Friends
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title className="fw-bold mb-0">Team Challenges</Card.Title>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={handleJoinTeam}
                >
                  Join Team
                </Button>
              </div>
              
              {teamChallenges.slice(0, 2).map(challenge => (
                <div key={challenge.id} className="mb-3 p-3 border rounded">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>{challenge.name}</strong>
                    <Badge bg={challenge.progress >= 100 ? "success" : "primary"}>
                      {challenge.progress}%
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between text-muted">
                    <span>{challenge.team}</span>
                    <span>Ends: {challenge.endDate}</span>
                  </div>
                  <ProgressBar 
                    now={challenge.progress} 
                    variant={challenge.progress >= 100 ? "success" : "info"} 
                    className="mt-2"
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;