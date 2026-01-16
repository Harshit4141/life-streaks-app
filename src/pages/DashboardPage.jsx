import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, ProgressBar, 
  Badge, Alert, Modal, Form, ListGroup, 
  Tooltip, Dropdown, Spinner, Tabs, Tab, Toast, ToastContainer
} from 'react-bootstrap';
import { 
  Fire, Trophy, Star, Coin, Gem, 
  PlusCircle, Calendar, People, Bullseye, 
  ChevronRight, ChevronDown, Shield,
  GraphUp, Award, Heart, Clock, CheckCircle,
  Rocket, Target, Bell, Share, 
  BarChart, Play, Pause, Eye, EyeSlash,
  ArrowUp, ArrowDown, InfoCircle, ThreeDots,
  Grid3x3, ListUl, Bookmark, BookmarkCheck,
  Check2, X, VolumeUp, VolumeMute, Palette,
  Magic, Dice5, Puzzle, Lock, Unlock, Gift,
  CameraVideo, MusicNote, FileCode, Chat,
  EmojiSmile, EmojiHeartEyes, EmojiWink,
  Sun, Moon, Lightning
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useStreaks } from '../components/context/StreaksContext';
import { useFriends } from '../components/context/FriendsContext';
import { useTeams } from '../components/context/TeamsContext';
import DemoBanner from '../components/Common/DemoBanner';
import toast from 'react-hot-toast';
import CountUp from 'react-countup';
import Confetti from 'react-confetti';

const DashboardPage = ({ userData }) => {
  const navigate = useNavigate();
  const { streaks, getStreakStats, checkInStreak } = useStreaks();
  const { friends, getLeaderboard } = useFriends();
  const { teams, teamChallenges } = useTeams();
  
  // Core State
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('today');
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState(null);
  const [showDailyMission, setShowDailyMission] = useState(true);
  
  // Gamification State
  const [userLevel, setUserLevel] = useState(5);
  const [userXP, setUserXP] = useState(1250);
  const [userCoins, setUserCoins] = useState(1500);
  const [userGems, setUserGems] = useState(12);
  const [streakFreezes, setStreakFreezes] = useState(2);
  const [activeStreak, setActiveStreak] = useState(27);
  
  // Daily Mission
  const [dailyMission, setDailyMission] = useState({
    id: 1,
    title: "3-Streak Check-in Chain",
    description: "Maintain a 3-day streak for any 3 habits",
    progress: 2,
    target: 3,
    reward: { xp: 150, coins: 75, gems: 1 },
    expiresIn: "18 hours"
  });
  
  // Weekly Challenge
  const [weeklyChallenge, setWeeklyChallenge] = useState({
    id: 1,
    title: "7-Day Marathon",
    description: "Complete all daily streaks for 7 consecutive days",
    progress: 5,
    target: 7,
    participants: 1245,
    prize: "Legendary Flame Badge",
    endsIn: "2 days"
  });
  
  // Live Leaderboard
  const [liveLeaderboard, setLiveLeaderboard] = useState([
    { id: 1, name: "Alex", streak: 156, xp: 4500, avatar: "👑", change: "+3" },
    { id: 2, name: "You", streak: 27, xp: 1250, avatar: "🔥", change: "0" },
    { id: 3, name: "Sarah", streak: 23, xp: 980, avatar: "⚡", change: "+2" },
    { id: 4, name: "Mike", streak: 19, xp: 750, avatar: "💎", change: "-1" },
    { id: 5, name: "Emma", streak: 15, xp: 620, avatar: "⭐", change: "+4" }
  ]);
  
  // Streak Chains (Visual)
  const [streakChains, setStreakChains] = useState([
    { id: 1, name: "Morning Routine", chain: [1,1,1,1,1,0,1], currentStreak: 7 },
    { id: 2, name: "Workout", chain: [1,1,1,1,0,0,1], currentStreak: 4 },
    { id: 3, name: "Reading", chain: [1,1,1,1,1,1,1], currentStreak: 30 },
    { id: 4, name: "Meditation", chain: [1,1,1,0,1,1,1], currentStreak: 6 }
  ]);
  
  // Quick Check-ins with Gamification
  const [quickCheckIns, setQuickCheckIns] = useState([
    { 
      id: 1, 
      name: "Morning Meditation", 
      category: "Mindfulness", 
      time: "8:00 AM", 
      completed: true, 
      xp: 25, 
      coins: 15,
      streakBonus: 3
    },
    { 
      id: 2, 
      name: "Evening Workout", 
      category: "Fitness", 
      time: "7:00 PM", 
      completed: false, 
      xp: 50, 
      coins: 25,
      streakBonus: 5
    },
    { 
      id: 3, 
      name: "Read 20 Pages", 
      category: "Reading", 
      time: "9:00 PM", 
      completed: false, 
      xp: 30, 
      coins: 20,
      streakBonus: 2
    }
  ]);
  
  // Unlockable Rewards
  const [unlockableRewards, setUnlockableRewards] = useState([
    { id: 1, name: "Golden Flame Theme", cost: 1000, icon: "🔥", type: "theme", unlocked: false },
    { id: 2, name: "Diamond Streak Counter", cost: 500, icon: "💎", type: "badge", unlocked: true },
    { id: 3, name: "Animated Confetti", cost: 750, icon: "🎉", type: "effect", unlocked: false },
    { id: 4, name: "AI Habit Coach", cost: 1500, icon: "🤖", type: "feature", unlocked: false }
  ]);
  
  // Stats
  const stats = getStreakStats ? getStreakStats() : { 
    longestStreak: 27,
    consistencyRate: 75,
    totalCheckins: 156,
    currentStreak: 7
  };
  
  // Initialize
  useEffect(() => {
    // Check for streak milestones
    checkStreakMilestones();
    
    // Simulate live updates
    const interval = setInterval(() => {
      updateLiveLeaderboard();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Streak milestone celebrations
  const checkStreakMilestones = () => {
    const milestones = [7, 30, 100, 365];
    const currentStreak = stats.currentStreak || 0;
    
    if (milestones.includes(currentStreak)) {
      celebrateMilestone(currentStreak);
    }
  };
  
  const celebrateMilestone = (streak) => {
    setShowConfetti(true);
    setUnlockedAchievement({
      title: `${streak}-Day Streak! 🎉`,
      description: `You've maintained a streak for ${streak} days!`,
      reward: { xp: streak * 10, coins: streak * 5 }
    });
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    
    setTimeout(() => {
      setUnlockedAchievement(null);
    }, 5000);
  };
  
  // Live leaderboard updates
  const updateLiveLeaderboard = () => {
    setLiveLeaderboard(prev => {
      return prev.map(user => ({
        ...user,
        streak: user.id === 2 ? user.streak : Math.max(0, user.streak + (Math.random() > 0.5 ? 1 : -1)),
        change: user.id === 2 ? "0" : (Math.random() > 0.5 ? "+" : "-") + Math.floor(Math.random() * 5)
      })).sort((a, b) => b.streak - a.streak);
    });
  };
  
  // Enhanced Check-in with Rewards
  const handleQuickCheckIn = (checkInId) => {
    const checkIn = quickCheckIns.find(c => c.id === checkInId);
    if (!checkIn || checkIn.completed) return;
    
    // Update state
    setQuickCheckIns(prev => 
      prev.map(c => 
        c.id === checkInId 
          ? { ...c, completed: true } 
          : c
      )
    );
    
    // Award XP and Coins
    const xpReward = checkIn.xp + (checkIn.streakBonus || 0);
    const coinReward = checkIn.coins;
    
    setUserXP(prev => prev + xpReward);
    setUserCoins(prev => prev + coinReward);
    setActiveStreak(prev => prev + 1);
    
    // Check for level up
    if (userXP + xpReward >= userLevel * 250) {
      setUserLevel(prev => prev + 1);
      toast.success(`Level Up! 🎉 Now Level ${userLevel + 1}`);
    }
    
    // Show celebration
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    // Show toast with rewards
    toast.success(
      <div className="d-flex align-items-center">
        <CheckCircle className="me-2 text-success" />
        <div>
          <strong className="d-block">{checkIn.name} Completed!</strong>
          <small className="text">+{xpReward} XP • +{coinReward} Coins • +{checkIn.streakBonus || 0} Streak Bonus</small>
        </div>
      </div>,
      { duration: 3000, icon: '🔥' }
    );
    
    // Update daily mission progress
    setDailyMission(prev => ({
      ...prev,
      progress: Math.min(prev.target, prev.progress + 1)
    }));
  };
  
  // Streak Freeze
  const useStreakFreeze = () => {
    if (streakFreezes > 0) {
      setStreakFreezes(prev => prev - 1);
      toast.success(
        <div className="d-flex align-items-center">
          <Shield className="me-2 text-info" />
          <div>
            <strong className="d-block">Streak Protected! 🛡️</strong>
            <small className="text">Your streak is safe for today</small>
          </div>
        </div>
      );
    } else {
      toast.error("No streak freezes available!");
    }
  };
  
  // Unlock Reward
  const unlockReward = (rewardId) => {
    const reward = unlockableRewards.find(r => r.id === rewardId);
    if (!reward || reward.unlocked) return;
    
    if (userCoins >= reward.cost) {
      setUserCoins(prev => prev - reward.cost);
      setUnlockableRewards(prev => 
        prev.map(r => 
          r.id === rewardId ? { ...r, unlocked: true } : r
        )
      );
      
      toast.success(
        <div className="d-flex align-items-center">
          <Gift className="me-2 text-warning" />
          <div>
            <strong className="d-block">{reward.name} Unlocked! 🎁</strong>
            <small className="text">-{reward.cost} Coins</small>
          </div>
        </div>
      );
    } else {
      toast.error("Not enough coins! Keep building streaks!");
    }
  };
  
  // Join Challenge
  const joinWeeklyChallenge = () => {
    setWeeklyChallenge(prev => ({
      ...prev,
      participants: prev.participants + 1
    }));
    
    toast.success(
      <div className="d-flex align-items-center">
        <Trophy className="me-2 text-warning" />
        <div>
          <strong className="d-block">Challenge Joined! 🏆</strong>
          <small className="text">Good luck! Prize: {weeklyChallenge.prize}</small>
        </div>
      </div>
    );
  };
  
  // Invite Friend with Bonus
  const handleInviteFriend = () => {
    const inviteLink = "https://streakmaster.app/invite/friend123";
    navigator.clipboard.writeText(inviteLink);
    
    // Award bonus for inviting
    setUserCoins(prev => prev + 100);
    setUserXP(prev => prev + 50);
    
    toast.success(
      <div className="d-flex align-items-center">
        <People className="me-2 text-primary" />
        <div>
          <strong className="d-block">Invite Sent! +100 Coins 🎉</strong>
          <small className="text">Link copied to clipboard</small>
        </div>
      </div>
    );
  };
  
  // Render streak chain visualization
  const renderStreakChain = (chain) => {
    return (
      <div className="d-flex gap-1">
        {chain.map((day, index) => (
          <div
            key={index}
            className="streak-day"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '2px',
              backgroundColor: day ? (darkMode ? '#3b82f6' : '#2563eb') : (darkMode ? '#334155' : '#e2e8f0'),
              opacity: day ? 1 : 0.3,
              transition: 'transform 0.2s ease'
            }}
            title={`Day ${index + 1}: ${day ? 'Completed' : 'Missed'}`}
          />
        ))}
      </div>
    );
  };
  
  // Progress ring component
  const ProgressRing = ({ progress, size = 60, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    return (
      <div className="position-relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            stroke={darkMode ? '#334155' : '#e2e8f0'}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            stroke={progress >= 100 ? '#10b981' : '#3b82f6'}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <div className="fw-bold" style={{ 
            fontSize: '0.9rem',
            color: darkMode ? '#ffffff' : '#1e293b'
          }}>
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    );
  };
  
  // Get text color based on theme
  const getTextColor = () => darkMode ? '#ffffff' : '#1e293b';
  const getMutedTextColor = () => darkMode ? '#94a3b8' : '#64748b';
  
  return (
    <div className={darkMode ? 'dark-theme' : 'light-theme'} style={{ 
      background: darkMode 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      color: getTextColor()
    }}>
      {/* Confetti Celebration */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Achievement Toast */}
      {unlockedAchievement && (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
          <Toast 
            bg="success" 
            show={true} 
            autohide 
            delay={5000}
            onClose={() => setUnlockedAchievement(null)}
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">🎉 Achievement Unlocked!</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              <div className="d-flex align-items-center">
                <Trophy className="me-3" size={24} />
                <div>
                  <h6 className="mb-1">{unlockedAchievement.title}</h6>
                  <p className="mb-0 small">{unlockedAchievement.description}</p>
                  {unlockedAchievement.reward && (
                    <div className="mt-1">
                      <Badge bg="warning" className="me-2">
                        +{unlockedAchievement.reward.xp} XP
                      </Badge>
                      <Badge bg="light" text="dark">
                        +{unlockedAchievement.reward.coins} Coins
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      
      <Container fluid className="px-3 px-md-4 px-lg-5 py-4">
        {/* Demo Banner */}
        <DemoBanner />
        
        {/* Theme Toggle */}
        <div className="d-flex justify-content-end mb-4">
          <Button
            variant={darkMode ? "dark" : "light"}
            onClick={() => setDarkMode(!darkMode)}
            className="d-flex align-items-center rounded-pill px-3"
            style={{
              background: darkMode ? '#334155' : '#e2e8f0',
              border: 'none',
              color: getTextColor()
            }}
          >
            {darkMode ? (
              <>
                <Sun className="me-2" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="me-2" />
                Dark Mode
              </>
            )}
          </Button>
        </div>
        
        {/* Hero Welcome Section */}
        <Card className="border-0 shadow-lg mb-4" style={{
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
          border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
          borderRadius: '20px',
          backdropFilter: 'blur(20px)',
          color: getTextColor()
        }}>
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={8}>
                <div className="d-flex align-items-center mb-3">
                  <div className="position-relative me-3">
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                      borderRadius: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Fire size={32} className="text-white" />
                    </div>
                    <Badge 
                      bg="warning" 
                      className="position-absolute top-0 start-100 translate-middle rounded-pill px-2"
                    >
                      Lv.{userLevel}
                    </Badge>
                  </div>
                  <div>
                    <h1 className="fw-bold mb-1" style={{ 
                      color: getTextColor(),
                      fontSize: '2rem'
                    }}>
                      Welcome back, {userData?.name || 'Streak Master'}! 🔥
                    </h1>
                    <p className="mb-0" style={{ color: getMutedTextColor() }}>
                      Your {activeStreak}-day streak is 🔥 Keep the fire burning!
                    </p>
                  </div>
                </div>
                
                {/* Stats Bar */}
                <div className="d-flex flex-wrap gap-4">
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#f59e0b' }}>
                      <CountUp end={activeStreak} duration={1} />
                    </div>
                    <small style={{ color: getMutedTextColor() }}>Active Streak</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#3b82f6' }}>
                      <CountUp end={stats.totalCheckins || 156} duration={1} />
                    </div>
                    <small style={{ color: getMutedTextColor() }}>Total Check-ins</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#10b981' }}>
                      <CountUp end={stats.consistencyRate || 75} suffix="%" duration={1} />
                    </div>
                    <small style={{ color: getMutedTextColor() }}>Consistency</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#8b5cf6' }}>
                      <CountUp end={stats.currentStreak || 7} duration={1} />
                    </div>
                    <small style={{ color: getMutedTextColor() }}>Current Streak</small>
                  </div>
                </div>
              </Col>
              
              <Col md={4} className="mt-3 mt-md-0">
                <div className="d-flex flex-column gap-3">
                  <Button 
                    variant="warning" 
                    className="fw-bold py-3 d-flex align-items-center justify-content-center"
                    onClick={() => navigate('/streaks/new')}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '1rem',
                      color: '#ffffff'
                    }}
                  >
                    <PlusCircle className="me-2" size={20} />
                    New Streak
                  </Button>
                  
                  <Button 
                    variant={darkMode ? "outline-light" : "outline-dark"}
                    className="fw-bold py-2 d-flex align-items-center justify-content-center"
                    onClick={useStreakFreeze}
                    style={{ color: getTextColor() }}
                  >
                    <Shield className="me-2" />
                    Use Streak Freeze ({streakFreezes})
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {/* Main Dashboard Grid */}
        <Row className="g-4">
          {/* Left Column - Missions & Progress */}
          <Col lg={8}>
            {/* Daily Mission Card */}
            {showDailyMission && (
              <Card className="border-0 shadow-lg mb-4" style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`,
                borderRadius: '20px',
                color: getTextColor()
              }}>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="fw-bold mb-1" style={{ color: getTextColor() }}>
                        🎯 Today's Focus Mission
                      </h5>
                      <p className="mb-0" style={{ color: getMutedTextColor() }}>
                        {dailyMission.description}
                      </p>
                    </div>
                    <Badge bg="warning" className="px-3 py-2">
                      Expires: {dailyMission.expiresIn}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ color: getTextColor() }}>Progress</span>
                      <span className="fw-bold" style={{ color: '#3b82f6' }}>
                        {dailyMission.progress}/{dailyMission.target}
                      </span>
                    </div>
                    <ProgressBar 
                      now={(dailyMission.progress / dailyMission.target) * 100}
                      style={{ 
                        height: '12px',
                        borderRadius: '6px',
                        background: darkMode ? '#334155' : '#e2e8f0'
                      }}
                    >
                      <ProgressBar 
                        variant="primary"
                        style={{
                          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                          borderRadius: '6px'
                        }}
                      />
                    </ProgressBar>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="text small">Reward</div>
                      <div className="d-flex gap-2">
                        <Badge bg="success" className="px-3 py-2">
                          <Star className="me-1" /> +{dailyMission.reward.xp} XP
                        </Badge>
                        <Badge bg="warning" className="px-3 py-2">
                          <Coin className="me-1" /> +{dailyMission.reward.coins} Coins
                        </Badge>
                        <Badge bg="primary" className="px-3 py-2">
                          <Gem className="me-1" /> +{dailyMission.reward.gems} Gem
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="primary"
                      size="lg"
                      className="px-4"
                      disabled={dailyMission.progress >= dailyMission.target}
                    >
                      {dailyMission.progress >= dailyMission.target ? 'Completed! 🎉' : 'Continue Mission'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
            
            {/* Streak Chains Visualization */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: darkMode ? '#1e293b' : '#ffffff',
              border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
              borderRadius: '20px',
              color: getTextColor()
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: getTextColor() }}>
                    🔥 Streak Chains
                  </h5>
                  <Badge bg="light" text={darkMode ? "light" : "dark"} className="px-3 py-2">
                    {streakChains.reduce((acc, chain) => acc + chain.currentStreak, 0)} total streak days
                  </Badge>
                </div>
                
                <div className="row g-4">
                  {streakChains.map(chain => (
                    <div key={chain.id} className="col-md-6">
                      <div className="p-3 rounded-3" style={{
                        background: darkMode ? '#334155' : '#f8fafc',
                        border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`,
                        color: getTextColor()
                      }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: getTextColor() }}>
                              {chain.name}
                            </h6>
                            <div className="d-flex align-items-center">
                              <Fire className="me-1" style={{ color: '#f59e0b' }} />
                              <span className="fw-bold" style={{ color: '#f59e0b' }}>
                                {chain.currentStreak} days
                              </span>
                            </div>
                          </div>
                          <ProgressRing progress={(chain.currentStreak / 30) * 100} size={50} />
                        </div>
                        
                        <div className="mb-3">
                          {renderStreakChain(chain.chain)}
                        </div>
                        
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="w-100"
                          onClick={() => navigate(`/streaks/${chain.id}`)}
                          style={{ color: getTextColor() }}
                        >
                          Continue Streak
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
            
            {/* Quick Check-ins with Animations */}
            <Card className="border-0 shadow-lg" style={{
              background: darkMode ? '#1e293b' : '#ffffff',
              border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
              borderRadius: '20px',
              color: getTextColor()
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: getTextColor() }}>
                      ⚡ Quick Check-ins
                    </h5>
                    <p className="mb-0" style={{ color: getMutedTextColor() }}>
                      Complete these for bonus rewards and streak multipliers!
                    </p>
                  </div>
                  <Badge bg="warning" className="px-3 py-2">
                    <Fire className="me-1" />
                    Fast Track
                  </Badge>
                </div>
                
                <ListGroup variant="flush">
                  {quickCheckIns.map(checkIn => (
                    <ListGroup.Item 
                      key={checkIn.id} 
                      className="border-0 py-3"
                      style={{ 
                        background: 'transparent',
                        borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'} !important`,
                        color: getTextColor()
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="position-relative me-3">
                            <div style={{
                              width: '50px',
                              height: '50px',
                              background: checkIn.completed 
                                ? (darkMode ? '#334155' : '#e2e8f0')
                                : (darkMode ? '#1e293b' : '#ffffff'),
                              border: `2px solid ${checkIn.completed ? '#10b981' : '#3b82f6'}`,
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {checkIn.completed ? (
                                <CheckCircle size={24} className="text-success" />
                              ) : (
                                <Clock size={24} className="text-primary" />
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <div className="fw-bold" style={{ color: getTextColor() }}>
                              {checkIn.name}
                            </div>
                            <div className="d-flex align-items-center gap-3 mt-1">
                              <Badge bg="secondary" className="px-2 py-1">
                                {checkIn.category}
                              </Badge>
                              <small style={{ color: getMutedTextColor() }}>
                                <Clock size={12} className="me-1" />
                                {checkIn.time}
                              </small>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-end">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <Badge bg="success" className="px-2 py-1">
                              <Star size={10} className="me-1" />
                              +{checkIn.xp} XP
                            </Badge>
                            <Badge bg="warning" className="px-2 py-1">
                              <Coin size={10} className="me-1" />
                              +{checkIn.coins} Coins
                            </Badge>
                            {checkIn.streakBonus > 0 && (
                              <Badge bg="danger" className="px-2 py-1">
                                <Fire size={10} className="me-1" />
                                +{checkIn.streakBonus} Bonus
                              </Badge>
                            )}
                          </div>
                          
                          <Button
                            size="sm"
                            variant={checkIn.completed ? "success" : "primary"}
                            onClick={() => !checkIn.completed && handleQuickCheckIn(checkIn.id)}
                            disabled={checkIn.completed}
                            className="px-3"
                          >
                            {checkIn.completed ? (
                              <>
                                <CheckCircle className="me-2" />
                                Completed
                              </>
                            ) : (
                              <>
                                <Fire className="me-2" />
                                Quick Check-in
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Right Column - Gamification & Social */}
          <Col lg={4}>
            {/* Weekly Challenge */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)',
              border: `1px solid ${darkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'}`,
              borderRadius: '20px',
              color: darkMode ? '#ffffff' : '#1e293b'
            }}>
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <Trophy size={48} className="text-warning" />
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: '#d97706' }}>
                    🏆 Weekly Challenge
                  </h5>
                  <p className="text mb-3">
                    {weeklyChallenge.description}
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small style={{ color: darkMode ? '#fbbf24' : '#92400e' }}>Progress</small>
                    <small className="fw-bold" style={{ color: '#d97706' }}>
                      {weeklyChallenge.progress}/{weeklyChallenge.target} days
                    </small>
                  </div>
                  <ProgressBar 
                    now={(weeklyChallenge.progress / weeklyChallenge.target) * 100}
                    style={{ 
                      height: '10px',
                      borderRadius: '5px',
                      background: 'rgba(245, 158, 11, 0.2)'
                    }}
                  >
                    <ProgressBar 
                      variant="warning"
                      style={{
                        background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                        borderRadius: '5px'
                      }}
                    />
                  </ProgressBar>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <small className="d-block" style={{ color: darkMode ? '#fbbf24' : '#92400e' }}>Participants</small>
                    <div className="d-flex align-items-center">
                      <People className="me-1" style={{ color: '#f59e0b' }} />
                      <strong style={{ color: '#d97706' }}>
                        <CountUp end={weeklyChallenge.participants} duration={1} />
                      </strong>
                    </div>
                  </div>
                  <div>
                    <small className="d-block" style={{ color: darkMode ? '#fbbf24' : '#92400e' }}>Ends In</small>
                    <strong style={{ color: '#d97706' }}>{weeklyChallenge.endsIn}</strong>
                  </div>
                </div>
                
                <Button 
                  variant="warning" 
                  className="w-100 fw-bold py-3"
                  onClick={joinWeeklyChallenge}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                    border: 'none',
                    borderRadius: '15px',
                    color: '#ffffff'
                  }}
                >
                  <Trophy className="me-2" />
                  Join Challenge
                </Button>
              </Card.Body>
            </Card>
            
            {/* Live Leaderboard */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: darkMode ? '#1e293b' : '#ffffff',
              border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
              borderRadius: '20px',
              color: getTextColor()
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: getTextColor() }}>
                    👑 Live Leaderboard
                  </h5>
                  <Badge bg="info" className="px-3 py-2">
                    <Fire className="me-1" />
                    Live
                  </Badge>
                </div>
                
                <div className="leaderboard">
                  {liveLeaderboard.map((user, index) => (
                    <div 
                      key={user.id}
                      className={`d-flex align-items-center p-3 mb-2 rounded-3 ${user.id === 2 ? 'highlighted-user' : ''}`}
                      style={{
                        background: user.id === 2 
                          ? (darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)')
                          : (darkMode ? '#334155' : '#f8fafc'),
                        border: user.id === 2 
                          ? `2px solid #3b82f6`
                          : `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`,
                        color: getTextColor()
                      }}
                    >
                      <div className="d-flex align-items-center" style={{ width: '40px' }}>
                        {index === 0 ? (
                          <Trophy className="text-warning" size={20} />
                        ) : (
                          <span className="fw-bold" style={{ 
                            color: getMutedTextColor()
                          }}>
                            #{index + 1}
                          </span>
                        )}
                      </div>
                      
                      <div className="d-flex align-items-center flex-grow-1">
                        <div className="me-3">
                          <div style={{
                            width: '36px',
                            height: '36px',
                            background: darkMode ? '#475569' : '#e2e8f0',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px'
                          }}>
                            {user.avatar}
                          </div>
                        </div>
                        
                        <div className="flex-grow-1">
                          <div className="fw-bold" style={{ 
                            color: user.id === 2 ? '#3b82f6' : getTextColor()
                          }}>
                            {user.name}
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <small style={{ color: getMutedTextColor() }}>
                              <Fire size={12} className="me-1" />
                              {user.streak} days
                            </small>
                            <small style={{ color: getMutedTextColor() }}>
                              <Star size={12} className="me-1" />
                              {user.xp} XP
                            </small>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`change-indicator ${user.change.startsWith('+') ? 'positive' : 'negative'}`}>
                        {user.change}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline-primary" 
                  className="w-100 mt-3"
                  onClick={handleInviteFriend}
                  style={{ color: getTextColor() }}
                >
                  <People className="me-2" />
                  Invite Friends
                </Button>
              </Card.Body>
            </Card>
            
            {/* Unlockable Rewards */}
            <Card className="border-0 shadow-lg" style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
              border: `1px solid ${darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)'}`,
              borderRadius: '20px',
              color: getTextColor()
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: '#7c3aed' }}>
                    🎁 Unlockable Rewards
                  </h5>
                  <div className="d-flex align-items-center">
                    <Coin className="me-1 text-warning" />
                    <span className="fw-bold">{userCoins}</span>
                  </div>
                </div>
                
                <div className="row g-3">
                  {unlockableRewards.map(reward => (
                    <div key={reward.id} className="col-6">
                      <div 
                        className={`p-3 text-center rounded-3 ${reward.unlocked ? 'unlocked' : 'locked'}`}
                        style={{
                          background: reward.unlocked 
                            ? (darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
                            : (darkMode ? '#334155' : '#f8fafc'),
                          border: `2px solid ${reward.unlocked ? '#10b981' : (darkMode ? '#475569' : '#e2e8f0')}`,
                          cursor: !reward.unlocked && userCoins >= reward.cost ? 'pointer' : 'default',
                          opacity: !reward.unlocked && userCoins < reward.cost ? 0.5 : 1,
                          color: getTextColor()
                        }}
                        onClick={() => !reward.unlocked && userCoins >= reward.cost && unlockReward(reward.id)}
                      >
                        <div className="mb-2" style={{ fontSize: '24px' }}>
                          {reward.icon}
                        </div>
                        <h6 className="fw-bold mb-2" style={{ 
                          fontSize: '0.9rem',
                          color: getTextColor()
                        }}>
                          {reward.name}
                        </h6>
                        {!reward.unlocked && (
                          <div className="d-flex align-items-center justify-content-center">
                            <Coin size={12} className="me-1 text-warning" />
                            <small className="fw-bold">{reward.cost}</small>
                          </div>
                        )}
                        {reward.unlocked && (
                          <Badge bg="success" className="px-2 py-1">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Bottom Action Bar */}
        <div className="fixed-bottom-bar mt-4" style={{
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          borderTop: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
          backdropFilter: 'blur(20px)',
          padding: '1rem 0',
          borderRadius: '20px 20px 0 0',
          color: getTextColor()
        }}>
          <Container>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1" style={{ color: getTextColor() }}>
                  Today's Progress
                </h6>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#10b981',
                      borderRadius: '50%',
                      marginRight: '6px'
                    }} />
                    <small style={{ color: getMutedTextColor() }}>
                      {quickCheckIns.filter(c => c.completed).length}/{quickCheckIns.length} check-ins
                    </small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      marginRight: '6px'
                    }} />
                    <small style={{ color: getMutedTextColor() }}>
                      {dailyMission.progress}/{dailyMission.target} mission
                    </small>
                  </div>
                </div>
              </div>
              
              <div className="d-flex gap-3">
                <Button 
                  variant={darkMode ? "outline-light" : "outline-dark"}
                  className="px-4"
                  onClick={() => navigate('/stats')}
                  style={{ color: getTextColor() }}
                >
                  <BarChart className="me-2" />
                  View Stats
                </Button>
                <Button 
                  variant="primary"
                  className="px-4"
                  onClick={() => navigate('/achievements')}
                >
                  <Award className="me-2" />
                  Achievements
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </Container>
      
      {/* Custom Styles */}
      <style jsx>{`
        .dark-theme {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --text-primary: #ffffff;
          --text-secondary: #94a3b8;
          --border-color: #334155;
        }
        
        .light-theme {
          --bg-primary: #f8fafc;
          --bg-secondary: #ffffff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --border-color: #e2e8f0;
        }
        
        .streak-day:hover {
          transform: scale(1.2);
        }
        
        .highlighted-user {
          position: relative;
          overflow: hidden;
        }
        
        .highlighted-user::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }
        
        .change-indicator {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: bold;
        }
        
        .change-indicator.positive {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .change-indicator.negative {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .unlocked {
          animation: glow 2s infinite alternate;
        }
        
        @keyframes glow {
          from { box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
          to { box-shadow: 0 0 20px rgba(16, 185, 129, 0.8); }
        }
        
        .fixed-bottom-bar {
          position: sticky;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .fixed-bottom-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 0;
          }
          
          .fixed-bottom-bar .container {
            padding: 0.5rem 1rem;
          }
          
          .fixed-bottom-bar .btn {
            padding-left: 1rem;
            padding-right: 1rem;
            font-size: 0.9rem;
          }
        }
        
        /* Ensure all text is readable in dark mode */
        .dark-theme .card,
        .dark-theme .list-group-item,
        .dark-theme .modal-content,
        .dark-theme .dropdown-menu {
          color: #ffffff;
        }
        
        .dark-theme .text {
          color: #94a3b8 !important;
        }
        
        .dark-theme .btn-outline-light {
          color: #ffffff;
          border-color: #475569;
        }
        
        .dark-theme .btn-outline-light:hover {
          background-color: #475569;
          color: #ffffff;
        }
        
        .dark-theme .badge.bg-light {
          color: #1e293b !important;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;