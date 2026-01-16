import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Badge, ProgressBar, 
  Modal, Tabs, Tab, ListGroup
} from 'react-bootstrap';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
  ComposedChart
} from 'recharts';
import { 
  Fire, Trophy, Star, Lightning, Rocket, Award,
  GraphUp, Calendar, Clock, People, Gem, Coin, Bullseye,
  CheckCircle, Download, Share, Bell, Gift, Magic
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CountUp from 'react-countup';
import Confetti from 'react-confetti';
import { TypeAnimation } from 'react-type-animation';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  
  // Core State
  const [userLevel, setUserLevel] = useState(7);
  const [userXP, setUserXP] = useState(1250);
  const [userCoins, setUserCoins] = useState(3450);
  const [userGems, setUserGems] = useState(28);
  const [totalStreakDays, setTotalStreakDays] = useState(187);
  const [activeChallenges, setActiveChallenges] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  
  // XP to next level
  const xpToNextLevel = userLevel * 250;
  const xpProgress = ((userXP % xpToNextLevel) / xpToNextLevel) * 100;
  
  // Enhanced Gamified Data
  const [weeklyPerformance, setWeeklyPerformance] = useState([
    { day: 'Mon', streaks: 4, checkins: 3, xpEarned: 120, rank: 2 },
    { day: 'Tue', streaks: 6, checkins: 5, xpEarned: 180, rank: 1 },
    { day: 'Wed', streaks: 7, checkins: 6, xpEarned: 210, rank: 1 },
    { day: 'Thu', streaks: 5, checkins: 4, xpEarned: 150, rank: 3 },
    { day: 'Fri', streaks: 8, checkins: 7, xpEarned: 240, rank: 1 },
    { day: 'Sat', streaks: 9, checkins: 8, xpEarned: 270, rank: 1 },
    { day: 'Sun', streaks: 7, checkins: 6, xpEarned: 210, rank: 2 },
  ]);
  
  // Habit Distribution with Gaming Elements
  const [habitDistribution, setHabitDistribution] = useState([
    { name: 'Fitness', value: 35, color: '#4CAF50', level: 'Master', xp: 450, icon: '💪' },
    { name: 'Learning', value: 25, color: '#2196F3', level: 'Advanced', xp: 320, icon: '📚' },
    { name: 'Wellness', value: 20, color: '#FF9800', level: 'Intermediate', xp: 280, icon: '🧘' },
    { name: 'Productivity', value: 15, color: '#9C27B0', level: 'Rookie', xp: 180, icon: '⚡' },
    { name: 'Creative', value: 5, color: '#607D8B', level: 'Beginner', xp: 90, icon: '🎨' },
  ]);
  
  // Streak Growth with Achievements
  const [streakGrowth, setStreakGrowth] = useState([
    { month: 'Jan', streaks: 12, achievement: 'Rookie', badge: '🥉' },
    { month: 'Feb', streaks: 18, achievement: 'Grinder', badge: '🥈' },
    { month: 'Mar', streaks: 15, achievement: 'Consistent', badge: '📈' },
    { month: 'Apr', streaks: 22, achievement: 'Pro', badge: '🥇' },
    { month: 'May', streaks: 25, achievement: 'Master', badge: '👑' },
    { month: 'Jun', streaks: 30, achievement: 'Legend', badge: '🔥' },
  ]);
  
  // Social & Competitive Data
  const [socialRanking, setSocialRanking] = useState({
    yourRank: 45,
    totalPlayers: 1000,
    percentile: 95,
    friendsRanking: [
      { name: 'Alex Chen', rank: 12, avatar: '👑', progress: 95, status: 'online' },
      { name: 'Sarah Johnson', rank: 28, avatar: '⚡', progress: 88, status: 'online' },
      { name: 'Mike Rodriguez', rank: 67, avatar: '💎', progress: 75, status: 'away' },
      { name: 'Emma Wilson', rank: 102, avatar: '⭐', progress: 62, status: 'offline' },
      { name: 'You', rank: 45, avatar: '🔥', progress: 82, status: 'online' },
    ]
  });
  
  // Active Missions & Challenges
  const [activeMissions, setActiveMissions] = useState([
    { 
      id: 1, 
      title: "7-Day Fire Streak", 
      description: "Check in every day this week",
      reward: { xp: 500, coins: 250, gems: 1 },
      progress: { current: 5, total: 7 },
      deadline: "2 days left",
      difficulty: "🔥 Hard",
      icon: <Fire />
    },
    { 
      id: 2, 
      title: "Consistency Champion", 
      description: "Maintain 90%+ consistency for 30 days",
      reward: { xp: 1000, coins: 500, gems: 3 },
      progress: { current: 85, total: 100 },
      deadline: "25 days left",
      difficulty: "⚡ Medium",
      icon: <Fire />
    },
    { 
      id: 3, 
      title: "Habit Master", 
      description: "Complete 5 different habits daily",
      reward: { xp: 300, coins: 150 },
      progress: { current: 3, total: 5 },
      deadline: "Today",
      difficulty: "💪 Easy",
      icon: <Trophy />
    },
  ]);
  
  // Storytelling Insights
  const [storyInsights, setStoryInsights] = useState([
    {
      id: 1,
      title: "🔥 You're on Fire This Week!",
      content: "Your Tuesday performance was outstanding - you earned more XP than 95% of users!",
      metric: "+270 XP",
      trend: "up",
      icon: <Fire className="text-warning" />,
      emotion: "excited"
    },
    {
      id: 2,
      title: "🎯 Best Performing Habit",
      content: "Fitness habits show 92% consistency - your strongest category by far!",
      metric: "35% of total",
      trend: "up",
      icon: <Fire className="text-success" />,
      emotion: "proud"
    },
    {
      id: 3,
      title: "💎 Rare Achievement Unlocked",
      content: "You've reached Legend status in streak consistency! Only 5% of users achieve this.",
      metric: "Top 5%",
      trend: "new",
      icon: <Gem className="text-info" />,
      emotion: "accomplished"
    },
    {
      id: 4,
      title: "📈 Consistency is Your Superpower",
      content: "Your streak growth shows incredible month-over-month improvement",
      metric: "+150% growth",
      trend: "up",
      icon: <Fire className="text-primary" />,
      emotion: "motivated"
    },
  ]);
  
  // AI Predictions & Recommendations
  const [aiInsights, setAiInsights] = useState([
    {
      id: 1,
      type: "prediction",
      title: "🎯 Next Milestone Prediction",
      content: "Based on your current pace, you'll reach 200 total streak days in just 13 days!",
      confidence: 92,
      action: "Keep your current routine",
      icon: <Bullseye className="text-danger" />
    },
    {
      id: 2,
      type: "recommendation",
      title: "💡 Smart Optimization",
      content: "You perform 40% better on weekdays. Consider adjusting weekend goals.",
      confidence: 85,
      action: "Adjust weekend targets",
      icon: <Magic className="text-warning" />
    },
    {
      id: 3,
      type: "warning",
      title: "⚠️ At-Risk Streak",
      content: "Your evening meditation has 65% success rate. Try moving it to mornings.",
      confidence: 78,
      action: "Reschedule habit",
      icon: <Bell className="text-danger" />
    },
    {
      id: 4,
      type: "opportunity",
      title: "🚀 Quick Win Available",
      content: "Complete your daily reading goal to earn double XP today!",
      confidence: 95,
      action: "Claim bonus",
      icon: <Fire className="text-success" />
    },
  ]);
  
  // Recent Achievements
  const [recentAchievements, setRecentAchievements] = useState([
    { id: 1, title: "7-Day Fire Streak", earned: "2 hours ago", reward: "🔥 Flame Badge", icon: <Fire /> },
    { id: 2, title: "Consistency Master", earned: "Yesterday", reward: "500 XP", icon: <Fire /> },
    { id: 3, title: "Early Bird", earned: "3 days ago", reward: "🌅 Dawn Breaker", icon: <Calendar /> },
    { id: 4, title: "Social Butterfly", earned: "1 week ago", reward: "🦋 Social Badge", icon: <People /> },
  ]);
  
  // Event System
  const [currentEvents, setCurrentEvents] = useState([
    { id: 1, name: "Double XP Weekend", endsIn: "2 days", bonus: "+100% XP" },
    { id: 2, name: "Monthly Marathon", endsIn: "7 days", bonus: "🏆 Trophy" },
    { id: 3, name: "Friend Challenge", endsIn: "1 day", bonus: "500 Coins" },
  ]);
  
  // Effects for Live Updates
  useEffect(() => {
    const xpInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setUserXP(prev => {
          const newXP = prev + Math.floor(Math.random() * 50) + 10;
          if (newXP >= userLevel * 250) {
            setUserLevel(prev => prev + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
            toast.success(
              <div className="d-flex align-items-center">
                <Trophy className="me-2 text-warning" />
                <div>
                  <strong className="d-block" style={{ color: '#ffffff' }}>Level Up! 🎉</strong>
                  <small className="text">You've reached Level {userLevel + 1}!</small>
                </div>
              </div>
            );
          }
          return newXP;
        });
      }
    }, 30000);
    
    const rankInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setSocialRanking(prev => ({
          ...prev,
          yourRank: Math.max(1, prev.yourRank + (Math.random() > 0.5 ? -1 : 1)),
          percentile: Math.min(99, prev.percentile + (Math.random() > 0.5 ? 1 : -1))
        }));
      }
    }, 60000);
    
    return () => {
      clearInterval(xpInterval);
      clearInterval(rankInterval);
    };
  }, [userLevel]);
  
  // Handlers
  const handleClaimMission = (missionId) => {
    const mission = activeMissions.find(m => m.id === missionId);
    if (mission) {
      setUserXP(prev => prev + mission.reward.xp);
      setUserCoins(prev => prev + mission.reward.coins);
      if (mission.reward.gems) {
        setUserGems(prev => prev + mission.reward.gems);
      }
      
      setActiveMissions(prev => prev.filter(m => m.id !== missionId));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      
      toast.success(
        <div className="d-flex align-items-center">
          <Trophy className="me-2 text-warning" />
          <div>
            <strong className="d-block" style={{ color: '#ffffff' }}>Mission Complete! 🏆</strong>
            <small className="text">
              +{mission.reward.xp} XP • +{mission.reward.coins} Coins
              {mission.reward.gems ? ` • +${mission.reward.gems} Gems` : ''}
            </small>
          </div>
        </div>
      );
    }
  };
  
  const handleShareAchievement = (achievement) => {
    toast.success(
      <div className="d-flex align-items-center">
        <Share className="me-2 text-primary" />
        <div>
          <strong className="d-block" style={{ color: '#ffffff' }}>Shared to Community! 📢</strong>
          <small className="text">Your friends will see your {achievement} achievement</small>
        </div>
      </div>
    );
  };
  
  const handleJoinEvent = (eventId) => {
    toast.success(
      <div className="d-flex align-items-center">
        <Rocket className="me-2 text-warning" />
        <div>
          <strong className="d-block" style={{ color: '#ffffff' }}>Event Joined! 🚀</strong>
          <small className="text">Good luck! Bonus rewards activated</small>
        </div>
      </div>
    );
  };
  
  const getRankTitle = (percentile) => {
    if (percentile >= 95) return { title: 'Legend', color: 'warning', icon: '👑' };
    if (percentile >= 85) return { title: 'Master', color: 'danger', icon: '🔥' };
    if (percentile >= 70) return { title: 'Pro', color: 'success', icon: '⚡' };
    if (percentile >= 50) return { title: 'Grinder', color: 'primary', icon: '💎' };
    return { title: 'Rookie', color: 'secondary', icon: '⭐' };
  };
  
  const rankInfo = getRankTitle(socialRanking.percentile);
  
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      {/* Confetti Celebration */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <Container fluid className="py-4 px-3 px-md-4 px-lg-5">
        {/* Hero Header */}
        <Card className="border-0 shadow-lg mb-4" style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '25px',
          backdropFilter: 'blur(20px)'
        }}>
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={8}>
                <div className="d-flex align-items-center mb-3">
                  <div className="position-relative me-3">
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      borderRadius: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)'
                    }}>
                      <Trophy size={32} className="text-white" />
                    </div>
                    <Badge bg="warning" className="position-absolute top-0 start-100 translate-middle rounded-pill px-3 py-2">
                      Lv. {userLevel}
                    </Badge>
                  </div>
                  <div>
                    <h1 className="fw-bold mb-2" style={{ fontSize: '2.2rem', color: '#ffffff' }}>
                      <TypeAnimation
                        sequence={[
                          'Progress Palace 🏰',
                          2000,
                          'Your Achievement Hub 🎯',
                          2000,
                          'Growth Gallery 📈',
                          2000,
                          'Victory Vault 🏆',
                          2000
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                      />
                    </h1>
                    <p className="mb-0" style={{ color: '#94a3b8' }}>
                      Where data transforms into motivation and numbers tell your success story
                    </p>
                  </div>
                </div>
                
                {/* Quick Stats Bar */}
                <div className="d-flex flex-wrap gap-4">
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#f59e0b' }}>
                      <CountUp end={totalStreakDays} duration={1.5} />
                      <span className="ms-1" style={{ fontSize: '1rem', color: '#94a3b8' }}>days</span>
                    </div>
                    <small className="text" style={{ color: '#94a3b8' }}>Total Streak</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#10b981' }}>
                      <CountUp end={socialRanking.percentile} duration={1.5} suffix="%" />
                    </div>
                    <small className="text" style={{ color: '#94a3b8' }}>Better Than</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#8b5cf6' }}>
                      {rankInfo.icon} {rankInfo.title}
                    </div>
                    <small className="text" style={{ color: '#94a3b8' }}>Your Rank</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#3b82f6' }}>
                      <CountUp end={activeChallenges} duration={1.5} />
                    </div>
                    <small className="text" style={{ color: '#94a3b8' }}>Active Missions</small>
                  </div>
                </div>
              </Col>
              
              <Col md={4} className="mt-3 mt-md-0">
                <div className="d-flex flex-column gap-3">
                  <Button 
                    variant="warning" 
                    className="fw-bold py-3 d-flex align-items-center justify-content-center"
                    onClick={() => setShowMissionModal(true)}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '1rem',
                      boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                      color: '#ffffff'
                    }}
                  >
                    <Rocket className="me-2" />
                    Start New Mission
                  </Button>
                  
                  <Button 
                    variant="primary"
                    className="fw-bold py-3 d-flex align-items-center justify-content-center"
                    onClick={() => setShowSocialModal(true)}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '1rem',
                      color: '#ffffff'
                    }}
                  >
                    <People className="me-2" />
                    Compare with Friends
                  </Button>
                </div>
              </Col>
            </Row>
            
            {/* XP Progress Bar */}
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <Fire className="text-warning me-2" />
                  <span style={{ color: '#ffffff' }}>Progress to Level {userLevel + 1}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Badge bg="warning" className="me-2">
                    <Star size={12} className="me-1" />
                    {userXP % xpToNextLevel}/{xpToNextLevel} XP
                  </Badge>
                  <Badge bg="info">
                    <Gem size={12} className="me-1" />
                    {userGems} Gems
                  </Badge>
                </div>
              </div>
              <ProgressBar 
                now={xpProgress}
                style={{ 
                  height: '12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <ProgressBar 
                  variant="warning"
                  style={{
                    background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                    borderRadius: '6px'
                  }}
                />
              </ProgressBar>
            </div>
          </Card.Body>
        </Card>
        
        {/* Main Content */}
        <Row className="g-4">
          {/* Left Column - Story & Insights */}
          <Col lg={8}>
            {/* Storytelling Dashboard */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#ffffff' }}>📖 Your Progress Story</h5>
                    <p className="mb-0" style={{ color: '#94a3b8' }}>Data transformed into your personal success narrative</p>
                  </div>
                  <Badge bg="primary" className="px-3 py-2">
                    <Fire className="me-1" />
                    Live Updates
                  </Badge>
                </div>
                
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                  variant="pills"
                >
                  <Tab eventKey="story" title="🎯 Weekly Story">
                    <div className="p-3">
                      <div className="text-center mb-4">
                        <h4 className="fw-bold mb-3" style={{ color: '#ffffff' }}>🔥 Your Best Week Yet!</h4>
                        <p style={{ color: '#94a3b8' }}>
                          You earned <strong style={{ color: '#f59e0b' }}>1,380 XP</strong> this week - 
                          that's <strong style={{ color: '#10b981' }}>42% more</strong> than your average!
                        </p>
                      </div>
                      
                      <div className="row g-4">
                        {storyInsights.map((insight) => (
                          <div key={insight.id} className="col-md-6">
                            <Card className="border-0 h-100" style={{
                              background: '#334155',
                              border: '1px solid #475569',
                              borderRadius: '15px'
                            }}>
                              <Card.Body>
                                <div className="d-flex align-items-start mb-3">
                                  <div className="me-3">
                                    {insight.icon}
                                  </div>
                                  <div>
                                    <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                                      {insight.title}
                                    </h6>
                                    <p className="mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                      {insight.content}
                                    </p>
                                    <Badge bg={insight.trend === 'up' ? 'success' : 'info'} className="px-3">
                                      {insight.metric}
                                    </Badge>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab eventKey="predictions" title="🔮 AI Predictions">
                    <div className="p-3">
                      <div className="text-center mb-4">
                        <h4 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Smart Insights & Predictions</h4>
                        <p style={{ color: '#94a3b8' }}>
                          AI-powered analysis of your habits and future opportunities
                        </p>
                      </div>
                      
                      <div className="ai-insights">
                        {aiInsights.map((insight) => (
                          <div key={insight.id} className="mb-3 p-3 rounded" style={{
                            background: '#334155',
                            border: '1px solid #475569',
                            borderLeft: `4px solid ${insight.type === 'warning' ? '#ef4444' : insight.type === 'opportunity' ? '#10b981' : '#3b82f6'}`
                          }}>
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="d-flex align-items-start">
                                <div className="me-3">
                                  {insight.icon}
                                </div>
                                <div>
                                  <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                                    {insight.title}
                                  </h6>
                                  <p className="mb-2" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                    {insight.content}
                                  </p>
                                </div>
                              </div>
                              <Badge bg={insight.confidence > 90 ? 'success' : 'warning'}>
                                {insight.confidence}%
                              </Badge>
                            </div>
                            <Button 
                              variant={insight.type === 'warning' ? 'danger' : 'primary'} 
                              size="sm"
                              className="mt-2"
                              style={{ color: '#ffffff' }}
                            >
                              {insight.action}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
            
            {/* Active Missions */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#ffffff' }}>🎮 Active Missions</h5>
                    <p className="mb-0" style={{ color: '#94a3b8' }}>Complete missions to earn epic rewards</p>
                  </div>
                  <Badge bg="warning" className="px-3 py-2">
                    {activeMissions.length} Active
                  </Badge>
                </div>
                
                <div className="missions-grid">
                  {activeMissions.map((mission) => (
                    <Card key={mission.id} className="mb-3 border-0" style={{
                      background: '#334155',
                      border: '1px solid #475569',
                      borderRadius: '15px'
                    }}>
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center">
                            <div className="mission-icon me-3" style={{
                              width: '48px',
                              height: '48px',
                              background: 'rgba(245, 158, 11, 0.2)',
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {mission.icon}
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>{mission.title}</h6>
                              <p className="mb-0" style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                                {mission.description}
                              </p>
                            </div>
                          </div>
                          <Badge bg="danger">{mission.difficulty}</Badge>
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <small style={{ color: '#94a3b8' }}>Progress</small>
                            <small className="fw-bold" style={{ color: '#ffffff' }}>
                              {mission.progress.current}/{mission.progress.total} • {mission.deadline}
                            </small>
                          </div>
                          <ProgressBar 
                            now={(mission.progress.current / mission.progress.total) * 100}
                            style={{ 
                              height: '8px',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <ProgressBar 
                              variant="warning"
                              style={{ borderRadius: '4px' }}
                            />
                          </ProgressBar>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex gap-2">
                            <Badge bg="warning" className="d-flex align-items-center px-3 py-2">
                              <Star size={12} className="me-1" />
                              {mission.reward.xp} XP
                            </Badge>
                            <Badge bg="light" text="dark" className="d-flex align-items-center px-3 py-2">
                              <Coin size={12} className="me-1" />
                              {mission.reward.coins} Coins
                            </Badge>
                            {mission.reward.gems && (
                              <Badge bg="info" className="d-flex align-items-center px-3 py-2">
                                <Gem size={12} className="me-1" />
                                {mission.reward.gems} Gems
                              </Badge>
                            )}
                          </div>
                          <Button 
                            variant={mission.progress.current >= mission.progress.total ? 'success' : 'primary'} 
                            size="sm"
                            onClick={() => mission.progress.current >= mission.progress.total && handleClaimMission(mission.id)}
                            disabled={mission.progress.current < mission.progress.total}
                            style={{ color: '#ffffff' }}
                          >
                            {mission.progress.current >= mission.progress.total ? 'Claim Reward' : 'In Progress'}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Card.Body>
            </Card>
            
            {/* Visual Analytics */}
            <Card className="border-0 shadow-lg" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#ffffff' }}>📊 Performance Dashboard</h5>
                    <p className="mb-0" style={{ color: '#94a3b8' }}>Interactive charts with gamified insights</p>
                  </div>
                  <div className="d-flex gap-2">
                    <Button variant="outline-light" size="sm" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
                      <Download className="me-1" />
                      Export
                    </Button>
                    <Button variant="outline-light" size="sm" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
                      <Share className="me-1" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultActiveKey="weekly" className="mb-4">
                  <Tab eventKey="weekly" title="🔥 Weekly Performance">
                    <div style={{ height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={weeklyPerformance}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="day" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <RechartsTooltip 
                            contentStyle={{ 
                              background: '#1e293b', 
                              border: '1px solid #334155',
                              borderRadius: '10px',
                              color: '#ffffff'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="xpEarned" fill="#f59e0b" name="XP Earned" barSize={30} />
                          <Line type="monotone" dataKey="rank" stroke="#3b82f6" strokeWidth={3} name="Daily Rank" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </Tab>
                  
                  <Tab eventKey="habits" title="🎯 Habit Mastery">
                    <div className="row">
                      <div className="col-md-6">
                        <div style={{ height: '250px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={habitDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {habitDistribution.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                contentStyle={{ 
                                  background: '#1e293b', 
                                  border: '1px solid #334155',
                                  borderRadius: '10px',
                                  color: '#ffffff'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="habit-levels">
                          {habitDistribution.map((habit) => (
                            <div key={habit.name} className="d-flex align-items-center mb-3 p-3 rounded" style={{
                              background: '#334155',
                              border: '1px solid #475569'
                            }}>
                              <div className="me-3">
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  background: habit.color,
                                  borderRadius: '10px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontSize: '20px'
                                }}>
                                  {habit.icon}
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="fw-bold" style={{ color: '#ffffff' }}>{habit.name}</div>
                                  <Badge bg={habit.level === 'Master' ? 'warning' : 'info'}>
                                    {habit.level}
                                  </Badge>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-1">
                                  <small style={{ color: '#94a3b8' }}>{habit.xp} XP earned</small>
                                  <small className="fw-bold" style={{ color: habit.color }}>
                                    {habit.value}%
                                  </small>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Right Column - Social & Events */}
          <Col lg={4}>
            {/* Social Ranking */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#10b981' }}>
                      🏆 Social Ranking
                    </h5>
                    <p className="mb-0" style={{ color: '#94a3b8' }}>Compare with friends & community</p>
                  </div>
                  <Badge bg="success" className="px-3 py-2">
                    Top {socialRanking.percentile}%
                  </Badge>
                </div>
                
                <div className="text-center mb-4">
                  <div className="ranking-circle mb-3">
                    <div style={{
                      width: '100px',
                      height: '100px',
                      margin: '0 auto',
                      background: `conic-gradient(#10b981 ${socialRanking.percentile}%, #334155 0%)`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#1e293b',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div className="text-center">
                          <div className="h4 fw-bold mb-0" style={{ color: '#ffffff' }}>
                            #{socialRanking.yourRank}
                          </div>
                          <small style={{ color: '#94a3b8' }}>of {socialRanking.totalPlayers}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="fw-bold mb-2" style={{ color: '#ffffff' }}>
                    {rankInfo.icon} {rankInfo.title}
                  </h4>
                  <p style={{ color: '#94a3b8' }}>
                    You're performing better than <strong style={{ color: '#10b981' }}>{socialRanking.percentile}%</strong> of users
                  </p>
                </div>
                
                <div className="friends-ranking">
                  <h6 className="fw-bold mb-3" style={{ color: '#10b981' }}>Friends Leaderboard</h6>
                  {socialRanking.friendsRanking.map((friend, index) => (
                    <div 
                      key={index}
                      className="d-flex align-items-center p-3 mb-2 rounded-3"
                      style={{
                        background: friend.name === 'You' 
                          ? 'rgba(59, 130, 246, 0.2)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        border: friend.name === 'You' 
                          ? '2px solid #3b82f6'
                          : '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <div className="me-3">
                        <Badge 
                          bg={friend.rank <= 50 ? "warning" : "secondary"} 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '36px', height: '36px' }}
                        >
                          #{friend.rank}
                        </Badge>
                      </div>
                      
                      <div className="d-flex align-items-center flex-grow-1">
                        <div className="me-3">
                          <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px'
                          }}>
                            {friend.avatar}
                          </div>
                          {friend.status === 'online' && (
                            <div 
                              className="position-absolute top-0 start-100 translate-middle bg-success rounded-circle"
                              style={{ 
                                width: '10px', 
                                height: '10px', 
                                border: '2px solid #334155' 
                              }}
                            />
                          )}
                        </div>
                        
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="fw-bold" style={{ color: '#ffffff' }}>
                              {friend.name}
                            </div>
                            <Badge bg={friend.progress > 80 ? 'success' : 'warning'}>
                              {friend.progress}%
                            </Badge>
                          </div>
                          <ProgressBar 
                            now={friend.progress}
                            style={{ 
                              height: '4px',
                              borderRadius: '2px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              marginTop: '4px'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="success" 
                  className="w-100 mt-3"
                  onClick={() => setShowSocialModal(true)}
                  style={{ color: '#ffffff' }}
                >
                  <People className="me-2" />
                  View Full Leaderboard
                </Button>
              </Card.Body>
            </Card>
            
            {/* Recent Achievements */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#f59e0b' }}>
                      🏅 Recent Achievements
                    </h5>
                    <p className="mb-0" style={{ color: '#94a3b8' }}>Your latest victories & badges</p>
                  </div>
                  <Badge bg="warning" className="px-3 py-2">
                    4 New
                  </Badge>
                </div>
                
                <div className="achievements-list">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="d-flex align-items-center p-3 mb-3 rounded-3" 
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                      onClick={() => handleShareAchievement(achievement.title)}
                    >
                      <div className="me-3">
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: 'rgba(245, 158, 11, 0.2)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#f59e0b'
                        }}>
                          {achievement.icon}
                        </div>
                      </div>
                      
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="fw-bold" style={{ color: '#ffffff' }}>
                            {achievement.title}
                          </div>
                          <small style={{ color: '#94a3b8' }}>{achievement.earned}</small>
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          <small style={{ color: '#94a3b8' }}>
                            <Gift className="me-1" size={12} />
                            {achievement.reward}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-warning" 
                    size="sm"
                    onClick={() => toast.success("All achievements shared!")}
                    style={{ color: '#f59e0b', borderColor: '#f59e0b' }}
                  >
                    <Share className="me-2" />
                    Share All
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            {/* Live Events */}
            <Card className="border-0 shadow-lg" style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#8b5cf6' }}>
                      🎪 Live Events
                    </h5>
                    <p className="mb-0" style={{ color: '#94a3b8' }}>Special challenges & bonuses</p>
                  </div>
                  <Badge bg="primary" className="px-3 py-2">
                    <Fire className="me-1" />
                    Active
                  </Badge>
                </div>
                
                <div className="events-list">
                  {currentEvents.map((event) => (
                    <div key={event.id} className="d-flex align-items-center justify-content-between p-3 mb-3 rounded-3"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                      <div>
                        <div className="fw-bold" style={{ color: '#ffffff' }}>{event.name}</div>
                        <div className="d-flex align-items-center gap-3 mt-1">
                          <small style={{ color: '#94a3b8' }}>
                            <Clock size={12} className="me-1" />
                            {event.endsIn}
                          </small>
                          <Badge bg="primary">{event.bonus}</Badge>
                        </div>
                      </div>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleJoinEvent(event.id)}
                        style={{ color: '#ffffff' }}
                      >
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-primary" 
                    className="w-100"
                    onClick={() => toast.success("Event calendar opened!")}
                    style={{ color: '#8b5cf6', borderColor: '#8b5cf6' }}
                  >
                    <Calendar className="me-2" />
                    View Event Calendar
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            {/* Streak Milestones */}
            <Card className="border-0 shadow-lg mt-4" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                      🎯 Upcoming Milestones
                    </h5>
                    <p className="mb-0" style={{ color: '#94a3b8' }}>Next achievements to unlock</p>
                  </div>
                </div>
                
                <div className="milestones">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        200
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold" style={{ color: '#ffffff' }}>200 Total Streak Days</div>
                      <div className="d-flex align-items-center">
                        <small style={{ color: '#94a3b8' }}>13 days away • 500 XP reward</small>
                      </div>
                    </div>
                    <Badge bg="info">Soon</Badge>
                  </div>
                  
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        30
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold" style={{ color: '#ffffff' }}>30-Day Continuous Streak</div>
                      <div className="d-flex align-items-center">
                        <small style={{ color: '#94a3b8' }}>5 days away • 1 Gem reward</small>
                      </div>
                    </div>
                    <Badge bg="warning">Close</Badge>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        95%
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold" style={{ color: '#ffffff' }}>95% Weekly Consistency</div>
                      <div className="d-flex align-items-center">
                        <small style={{ color: '#94a3b8' }}>This week • Legend Badge</small>
                      </div>
                    </div>
                    <Badge bg="success">Active</Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Modals */}
      {/* Mission Modal */}
      <Modal show={showMissionModal} onHide={() => setShowMissionModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ 
          background: '#1e293b', 
          borderColor: '#334155',
          color: '#ffffff'
        }}>
          <Modal.Title>
            🎯 Start New Mission
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1e293b', color: '#ffffff' }}>
          <div className="text-center mb-4">
            <Rocket size={64} className="text-warning mb-3" />
            <h4 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Choose Your Challenge</h4>
            <p style={{ color: '#94a3b8' }}>Select a mission that matches your goals</p>
          </div>
          
          <div className="row g-3">
            <div className="col-md-6">
              <Card className="border-0 h-100" style={{
                background: '#334155',
                border: '2px solid #3b82f6',
                borderRadius: '15px'
              }}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <Fire size={32} className="text-warning" />
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>7-Day Fire Streak</h5>
                  <p style={{ color: '#94a3b8' }} className="mb-3">Check in every day for 7 days straight</p>
                  <div className="mb-3">
                    <Badge bg="warning" className="me-2">500 XP</Badge>
                    <Badge bg="light" text="dark" className="me-2">250 Coins</Badge>
                    <Badge bg="info">1 Gem</Badge>
                  </div>
                  <Button variant="warning" className="w-100" style={{ color: '#ffffff' }}>
                    Start Mission
                  </Button>
                </Card.Body>
              </Card>
            </div>
            
            <div className="col-md-6">
              <Card className="border-0 h-100" style={{
                background: '#334155',
                border: '2px solid #10b981',
                borderRadius: '15px'
              }}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3">
                    <Fire size={32} className="text-success" />
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Consistency Master</h5>
                  <p style={{ color: '#94a3b8' }} className="mb-3">Maintain 90%+ consistency for 30 days</p>
                  <div className="mb-3">
                    <Badge bg="warning" className="me-2">1000 XP</Badge>
                    <Badge bg="light" text="dark" className="me-2">500 Coins</Badge>
                    <Badge bg="info">3 Gems</Badge>
                  </div>
                  <Button variant="success" className="w-100" style={{ color: '#ffffff' }}>
                    Start Mission
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
      {/* Social Comparison Modal */}
      <Modal show={showSocialModal} onHide={() => setShowSocialModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ 
          background: '#1e293b', 
          borderColor: '#334155',
          color: '#ffffff'
        }}>
          <Modal.Title>
            👥 Social Leaderboard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1e293b', color: '#ffffff', height: '500px', overflowY: 'auto' }}>
          <div className="text-center mb-4">
            <Trophy size={48} className="text-warning mb-3" />
            <h4 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Global Rankings</h4>
            <p style={{ color: '#94a3b8' }}>See how you stack up against the community</p>
          </div>
          
          <div className="leaderboard">
            {[...socialRanking.friendsRanking, ...Array(10).fill().map((_, i) => ({
              name: `Player ${i + 100}`,
              rank: i + 150,
              avatar: '👤',
              progress: Math.floor(Math.random() * 100),
              status: Math.random() > 0.5 ? 'online' : 'offline'
            }))].sort((a, b) => a.rank - b.rank).map((player, index) => (
              <div 
                key={index}
                className="d-flex align-items-center p-3 mb-2 rounded-3"
                style={{
                  background: player.name === 'You' 
                    ? 'rgba(59, 130, 246, 0.3)' 
                    : index < 3
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: player.name === 'You' 
                    ? '2px solid #3b82f6'
                    : index < 3
                    ? '2px solid #f59e0b'
                    : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="me-3">
                  <Badge 
                    bg={index < 3 ? "warning" : "secondary"} 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '40px', height: '40px' }}
                  >
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${player.rank}`}
                  </Badge>
                </div>
                
                <div className="d-flex align-items-center flex-grow-1">
                  <div className="me-3">
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {player.avatar}
                    </div>
                  </div>
                  
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-bold" style={{ color: '#ffffff' }}>
                        {player.name}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Badge bg={player.progress > 80 ? 'success' : 'warning'}>
                          {player.progress}%
                        </Badge>
                        {player.status === 'online' && (
                          <div className="online-indicator" />
                        )}
                      </div>
                    </div>
                    <ProgressBar 
                      now={player.progress}
                      style={{ 
                        height: '4px',
                        borderRadius: '2px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        marginTop: '4px'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1e293b', borderColor: '#334155' }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowSocialModal(false)}
            style={{ background: '#475569', borderColor: '#475569', color: '#ffffff' }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnalyticsPage;