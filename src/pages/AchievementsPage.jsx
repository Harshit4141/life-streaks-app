import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Badge, ProgressBar, 
  Modal, Nav, Spinner, Form
} from 'react-bootstrap';
import { 
  Trophy, Star,Lightning, Fire, Rocket, 
  People, Coin, Gift, Share, Download, 
 Calendar, Clock, CheckCircle,  
    ChevronRight, Shield,Lock,
  Heart, HeartFill, Flag
} from 'react-bootstrap-icons';
import CountUp from 'react-countup';
import Confetti from 'react-confetti';
import { TypeAnimation } from 'react-type-animation';

const AchievementsPage = () => {
  // Core State
  const [userLevel, setUserLevel] = useState(42);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [seasonProgress, setSeasonProgress] = useState(65);

  // Dynamic Stats
  const [stats, setStats] = useState({
    total: 48,
    earned: 22,
    completion: 46,
    legendary: 2,
    epic: 5,
    rare: 8,
    common: 7,
    recent: 4,
    globalRank: 142,
    totalPlayers: 10000,
    percentile: 98.6
  });

  // Achievement Evolution System
  const [achievementTiers, setAchievementTiers] = useState([
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Master the art of consistency',
      tiers: [
        { level: 'Bronze', required: 7, earned: true, date: '2024-01-15', icon: '🔥' },
        { level: 'Silver', required: 30, earned: true, date: '2024-02-15', icon: '⚡' },
        { level: 'Gold', required: 90, earned: true, date: '2024-05-01', icon: '👑' },
        { level: 'Diamond', required: 365, earned: false, progress: 187, icon: '💎' }
      ],
      currentTier: 3,
      nextMilestone: 'Diamond (178 days to go)'
    },
    {
      id: 'habit-champion',
      title: 'Habit Champion',
      description: 'Dominate multiple habits simultaneously',
      tiers: [
        { level: 'Rookie', required: 1, earned: true, date: '2024-01-10', icon: '🌱' },
        { level: 'Grinder', required: 3, earned: true, date: '2024-02-20', icon: '💪' },
        { level: 'Pro', required: 5, earned: false, progress: 4, icon: '⭐' },
        { level: 'Master', required: 8, earned: false, progress: 4, icon: '🏆' },
        { level: 'Legend', required: 12, earned: false, progress: 4, icon: '🔥' }
      ],
      currentTier: 2,
      nextMilestone: 'Pro (1 habit to go)'
    }
  ]);

  // Enhanced Achievements with Evolution
  const [allAchievements, setAllAchievements] = useState([
    {
      id: 1,
      title: 'First Flame',
      description: 'Complete your first 7-day streak',
      icon: <Fire className="text-warning" size={28} />,
      earned: true,
      date: '2024-01-15',
      rarity: 'common',
      tier: 'Bronze',
      xpReward: 100,
      coinReward: 50,
      ownedBy: '92%',
      evolution: {
        current: 1,
        max: 4,
        next: 'Silver Flame (23 days to go)'
      },
      category: 'streak',
      favorite: true
    },
    {
      id: 2,
      title: 'Consistency King',
      description: 'Maintain a streak for 30 consecutive days',
      icon: <Fire className="text-warning" size={28} />,
      earned: true,
      date: '2024-02-15',
      rarity: 'rare',
      tier: 'Silver',
      xpReward: 500,
      coinReward: 250,
      ownedBy: '45%',
      evolution: {
        current: 2,
        max: 4,
        next: 'Golden Crown (60 days to go)'
      },
      category: 'streak',
      favorite: true
    },
    {
      id: 3,
      title: 'Social Butterfly',
      description: 'Connect with 10 friends',
      icon: <People className="text-primary" size={28} />,
      earned: true,
      date: '2024-03-01',
      rarity: 'common',
      tier: 'Bronze',
      xpReward: 150,
      coinReward: 75,
      ownedBy: '78%',
      evolution: {
        current: 1,
        max: 3,
        next: 'Social Leader (5 friends to go)'
      },
      category: 'social'
    },
    {
      id: 4,
      title: 'Team Player',
      description: 'Complete 5 team challenges',
      icon: <Shield className="text-success" size={28} />,
      earned: false,
      progress: 3,
      required: 5,
      rarity: 'epic',
      tier: 'Locked',
      xpReward: 750,
      coinReward: 500,
      ownedBy: '18%',
      evolution: {
        current: 0,
        max: 3,
        next: 'Team Captain (2 challenges to go)'
      },
      category: 'team'
    },
    {
      id: 5,
      title: 'Speed Demon',
      description: 'Check in 5 days in a row without missing',
      icon: <Lightning className="text-info" size={28} />,
      earned: false,
      progress: 2,
      required: 5,
      rarity: 'rare',
      tier: 'Locked',
      xpReward: 300,
      coinReward: 150,
      ownedBy: '32%',
      evolution: {
        current: 0,
        max: 3,
        next: 'Lightning Bolt (3 days to go)'
      },
      category: 'consistency'
    },
    {
      id: 6,
      title: 'Habit Master',
      description: 'Maintain 5 different streaks for 30 days',
      icon: <Trophy className="text-danger" size={28} />,
      earned: false,
      progress: 0,
      required: 30,
      rarity: 'legendary',
      tier: 'Locked',
      xpReward: 2000,
      coinReward: 1000,
      ownedBy: '3%',
      evolution: {
        current: 0,
        max: 5,
        next: 'Beginner (5 habits to start)'
      },
      category: 'mastery'
    },
    {
      id: 7,
      title: 'Early Bird',
      description: 'Complete morning routines 7 days straight',
      icon: <Fire className="text-warning" size={28} />,
      earned: true,
      date: '2024-03-15',
      rarity: 'rare',
      tier: 'Gold',
      xpReward: 400,
      coinReward: 200,
      ownedBy: '28%',
      evolution: {
        current: 3,
        max: 5,
        next: 'Dawn Breaker (15 days to go)'
      },
      category: 'time'
    },
    {
      id: 8,
      title: 'Weekend Warrior',
      description: 'Perfect weekend consistency for 4 weeks',
      icon: <Flag className="text-success" size={28} />,
      earned: true,
      date: '2024-02-28',
      rarity: 'epic',
      tier: 'Silver',
      xpReward: 800,
      coinReward: 400,
      ownedBy: '12%',
      evolution: {
        current: 2,
        max: 4,
        next: 'Weekend Champion (2 weeks to go)'
      },
      category: 'consistency'
    }
  ]);

  // Limited Time Events & Seasons
  const [currentEvents, setCurrentEvents] = useState([
    {
      id: 1,
      title: "New Year Resolution Rush",
      description: "Start strong with January challenges",
      endDate: "2024-01-31",
      rewards: "2x XP + Limited Badge",
      progress: 65,
      active: true,
      color: "#FF6B6B"
    },
    {
      id: 2,
      title: "Consistency Carnival",
      description: "30 days of streak challenges",
      endDate: "2024-02-15",
      rewards: "Legendary Frame + 5 Gems",
      progress: 42,
      active: true,
      color: "#4ECDC4"
    },
    {
      id: 3,
      title: "Spring Cleaning Sprint",
      description: "Build habits for spring renewal",
      endDate: "2024-03-20",
      rewards: "Seasonal Avatar + 1000 Coins",
      progress: 15,
      active: true,
      color: "#FFD166"
    }
  ]);

  // Daily & Weekly Quests
  const [activeQuests, setActiveQuests] = useState([
    {
      id: 1,
      title: "Daily Streak",
      description: "Maintain your current streak",
      type: "daily",
      reward: { xp: 50, coins: 25 },
      completed: true,
      streak: 7
    },
    {
      id: 2,
      title: "Morning Routine",
      description: "Complete 3 morning habits",
      type: "daily",
      reward: { xp: 75, coins: 50 },
      completed: false,
      progress: 2,
      total: 3
    },
    {
      id: 3,
      title: "Weekly Consistency",
      description: "Achieve 85% weekly consistency",
      type: "weekly",
      reward: { xp: 200, coins: 100, gems: 1 },
      completed: false,
      progress: 72,
      total: 85
    },
    {
      id: 4,
      title: "Habit Explorer",
      description: "Try 2 new habits this week",
      type: "weekly",
      reward: { xp: 150, coins: 75 },
      completed: false,
      progress: 1,
      total: 2
    }
  ]);

  // Social Achievements
  const [socialAchievements, setSocialAchievements] = useState([
    {
      id: 1,
      title: "Friend Leader",
      description: "Top among 5 friends for 1 week",
      earned: true,
      date: '2024-02-10',
      rarity: 'rare',
      friends: ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey']
    },
    {
      id: 2,
      title: "Community Hero",
      description: "Help 3 friends achieve their streaks",
      earned: true,
      date: '2024-01-25',
      rarity: 'epic',
      friends: ['Morgan', 'Riley', 'Drew']
    },
    {
      id: 3,
      title: "Global Contender",
      description: "Top 100 globally for 1 month",
      earned: false,
      progress: 142,
      required: 100,
      rarity: 'legendary'
    }
  ]);

  // Achievement Categories
  const categories = [
    { id: 'all', name: 'All', count: stats.total, icon: '🏆' },
    { id: 'streak', name: 'Streaks', count: 12, icon: '🔥' },
    { id: 'social', name: 'Social', count: 8, icon: '👥' },
    { id: 'team', name: 'Team', count: 6, icon: '🛡️' },
    { id: 'mastery', name: 'Mastery', count: 10, icon: '👑' },
    { id: 'time', name: 'Time-Based', count: 7, icon: '⏰' },
    { id: 'seasonal', name: 'Seasonal', count: 5, icon: '🎄' }
  ];

  // Effects
  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const updatedQuests = [...activeQuests];
        const randomQuest = updatedQuests[Math.floor(Math.random() * updatedQuests.length)];
        if (!randomQuest.completed && randomQuest.progress) {
          randomQuest.progress = Math.min(randomQuest.total, randomQuest.progress + 1);
          if (randomQuest.progress >= randomQuest.total) {
            randomQuest.completed = true;
          }
          setActiveQuests(updatedQuests);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeQuests]);

  // Handlers
  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
    if (achievement.earned) {
      setShowEvolutionModal(true);
    }
  };

  const handleFavoriteToggle = (achievementId) => {
    setAllAchievements(prev => prev.map(ach => 
      ach.id === achievementId ? { ...ach, favorite: !ach.favorite } : ach
    ));
  };

  const handleShareAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    setShowShareModal(true);
  };

  const handleClaimQuest = (questId) => {
    const quest = activeQuests.find(q => q.id === questId);
    if (quest && quest.completed) {
      setStats(prev => ({
        ...prev,
        earned: prev.earned + 1,
        completion: Math.round(((prev.earned + 1) / prev.total) * 100)
      }));
      setActiveQuests(prev => prev.filter(q => q.id !== questId));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return '#6B7280';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case 'Bronze': return '#CD7F32';
      case 'Silver': return '#C0C0C0';
      case 'Gold': return '#FFD700';
      case 'Diamond': return '#B9F2FF';
      case 'Legend': return '#FF6B6B';
      default: return '#6B7280';
    }
  };

  const filteredAchievements = allAchievements.filter(ach => 
    activeTab === 'all' || ach.category === activeTab
  );

  const earnedAchievements = allAchievements.filter(ach => ach.earned);
  const upcomingAchievements = allAchievements.filter(ach => !ach.earned);

  const renderAchievementCard = (achievement, showProgress = true) => {
    const isEarned = achievement.earned;
    const rarityColor = getRarityColor(achievement.rarity);
    const tierColor = getTierColor(achievement.tier);

    return (
      <Col key={achievement.id} xl={3} lg={4} md={6} className="mb-4">
        <Card 
          className={`border-0 shadow-lg h-100 transition-all ${!isEarned ? 'opacity-75' : 'hover-lift'}`}
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
            border: `2px solid ${isEarned ? rarityColor : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => handleAchievementClick(achievement)}
        >
          <Card.Body className="p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div style={{ position: 'relative' }}>
                <div 
                  className="rounded-3 p-3"
                  style={{
                    background: isEarned 
                      ? `linear-gradient(135deg, ${rarityColor}20, ${rarityColor}40)`
                      : 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${isEarned ? rarityColor : 'rgba(255, 255, 255, 0.1)'}`
                  }}
                >
                  {achievement.icon}
                </div>
                {achievement.favorite && isEarned && (
                  <HeartFill 
                    className="position-absolute top-0 end-0 translate-middle text-danger" 
                    size={16}
                  />
                )}
              </div>
              
              <div className="d-flex gap-2">
                <Badge 
                  style={{ 
                    background: rarityColor,
                    color: achievement.rarity === 'legendary' ? '#000000' : '#ffffff'
                  }}
                  className="px-3 py-2"
                >
                  {achievement.rarity.toUpperCase()}
                </Badge>
                {isEarned && (
                  <Badge 
                    style={{ 
                      background: tierColor,
                      color: '#000000'
                    }}
                    className="px-3 py-2"
                  >
                    {achievement.tier}
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <Card.Title className="fw-bold mb-2" style={{ color: '#ffffff' }}>
              {achievement.title}
            </Card.Title>
            <Card.Text className="mb-3" style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>
              {achievement.description}
            </Card.Text>

            {/* Progress or Date */}
            {isEarned ? (
              <div className="mb-3">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-success" />
                  <small style={{ color: '#94A3B8' }}>Earned: {achievement.date}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <People size={14} className="text-primary" />
                  <small style={{ color: '#94A3B8' }}>Owned by {achievement.ownedBy} of users</small>
                </div>
              </div>
            ) : showProgress && (
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small style={{ color: '#CBD5E1' }}>Progress</small>
                  <small style={{ color: '#CBD5E1' }}>
                    {achievement.progress}/{achievement.required}
                  </small>
                </div>
                <ProgressBar 
                  now={(achievement.progress / achievement.required) * 100}
                  style={{ 
                    height: '6px',
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                />
              </div>
            )}

            {/* Evolution & Rewards */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="d-flex align-items-center gap-2">
                  {[1, 2, 3, 4].map((tier) => (
                    <div
                      key={tier}
                      className="rounded-circle"
                      style={{
                        width: '12px',
                        height: '12px',
                        background: tier <= achievement.evolution.current 
                          ? rarityColor 
                          : 'rgba(255, 255, 255, 0.1)',
                        border: `1px solid ${rarityColor}`
                      }}
                    />
                  ))}
                  <small style={{ color: '#94A3B8' }} className="ms-2">
                    Tier {achievement.evolution.current}/{achievement.evolution.max}
                  </small>
                </div>
              </div>
              
              <div className="d-flex gap-2">
                <Badge bg="warning" className="px-2 py-1">
                  <Star size={12} className="me-1" />
                  {achievement.xpReward}
                </Badge>
                <Badge bg="light" text="dark" className="px-2 py-1">
                  <Coin size={12} className="me-1" />
                  {achievement.coinReward}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            {isEarned && (
              <div className="d-flex gap-2 mt-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="flex-fill"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShareAchievement(achievement);
                  }}
                  style={{ borderColor: rarityColor, color: rarityColor }}
                >
                  <Share size={14} className="me-1" />
                  Share
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="px-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(achievement.id);
                  }}
                >
                  {achievement.favorite ? <HeartFill size={14} /> : <Heart size={14} />}
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  };

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
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: '25px',
          backdropFilter: 'blur(20px)'
        }}>
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col lg={8}>
                <div className="d-flex align-items-center mb-3">
                  <div className="position-relative me-3">
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)'
                    }}>
                      <Trophy size={36} className="text-white" />
                    </div>
                    <Badge 
                      bg="warning" 
                      className="position-absolute top-0 start-100 translate-middle rounded-pill px-3 py-2"
                      style={{ color: '#000000' }}
                    >
                      Lv. {userLevel}
                    </Badge>
                  </div>
                  <div>
                    <h1 className="fw-bold mb-2" style={{ fontSize: '2.5rem', color: '#ffffff' }}>
                      <TypeAnimation
                        sequence={[
                          'Achievement Hall 🏛️',
                          2000,
                          'Trophy Room 🏆',
                          2000,
                          'Badge Gallery 🎨',
                          2000,
                          'Victory Vault 💎',
                          2000
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                      />
                    </h1>
                    <p className="mb-0" style={{ color: '#E2E8F0' }}>
                      Where your consistency transforms into legendary status symbols
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <Row className="g-3">
                  <Col md={3}>
                    <div className="text-center p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <div className="h4 fw-bold mb-1" style={{ color: '#f59e0b' }}>
                        <CountUp end={stats.earned} duration={1.5} />/{stats.total}
                      </div>
                      <small style={{ color: '#CBD5E1' }}>Achievements</small>
                      <ProgressBar 
                        now={stats.completion} 
                        variant="warning"
                        className="mt-2"
                        style={{ height: '4px', background: 'rgba(255, 255, 255, 0.1)' }}
                      />
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <div className="h4 fw-bold mb-1" style={{ color: '#8B5CF6' }}>
                        {stats.legendary}
                      </div>
                      <small style={{ color: '#CBD5E1' }}>Legendary</small>
                      <div className="mt-2">
                        <Fire size={20} className="text-warning" />
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <div className="h4 fw-bold mb-1" style={{ color: '#3B82F6' }}>
                        #{stats.globalRank}
                      </div>
                      <small style={{ color: '#CBD5E1' }}>Global Rank</small>
                      <Badge bg="info" className="mt-2">
                        Top {stats.percentile}%
                      </Badge>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="text-center p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <div className="h4 fw-bold mb-1" style={{ color: '#10B981' }}>
                        {stats.recent}
                      </div>
                      <small style={{ color: '#CBD5E1' }}>This Month</small>
                      <Fire size={20} className="text-success mt-2" />
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col lg={4} className="mt-4 mt-lg-0">
                <div className="d-flex flex-column gap-3">
                  <Button
                    variant="warning"
                    className="fw-bold py-3 d-flex align-items-center justify-content-center"
                    onClick={() => setShowUnlockModal(true)}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '1rem',
                      boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                      color: '#000000'
                    }}
                  >
                    <Rocket className="me-2" />
                    View Next Unlocks
                  </Button>

                  <Button
                    variant="primary"
                    className="fw-bold py-3 d-flex align-items-center justify-content-center"
                    onClick={() => setActiveTab('seasonal')}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '1rem',
                      color: '#ffffff'
                    }}
                  >
                    <Calendar className="me-2" />
                    Seasonal Events
                  </Button>

                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-light"
                      className="flex-fill"
                      onClick={() => window.print()}
                      style={{ color: '#ffffff', borderColor: '#ffffff' }}
                    >
                      <Download className="me-2" />
                      Export
                    </Button>
                    <Button
                      variant="outline-light"
                      className="flex-fill"
                      onClick={() => setShowShareModal(true)}
                      style={{ color: '#ffffff', borderColor: '#ffffff' }}
                    >
                      <Share className="me-2" />
                      Share Profile
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Main Content */}
        <Row className="g-4">
          {/* Left Sidebar - Categories */}
          <Col lg={3}>
            <Card className="border-0 shadow-lg mb-4" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4" style={{ color: '#ffffff' }}>🏆 Categories</h5>
                <Nav variant="pills" className="flex-column">
                  {categories.map(category => (
                    <Nav.Item key={category.id} className="mb-2">
                      <Nav.Link
                        eventKey={category.id}
                        active={activeTab === category.id}
                        onClick={() => setActiveTab(category.id)}
                        className="d-flex justify-content-between align-items-center py-3 rounded-3"
                        style={{
                          background: activeTab === category.id 
                            ? 'rgba(59, 130, 246, 0.2)' 
                            : 'transparent',
                          border: activeTab === category.id 
                            ? '2px solid #3b82f6' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#ffffff'
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <span className="me-3" style={{ fontSize: '1.2rem' }}>
                            {category.icon}
                          </span>
                          <span>{category.name}</span>
                        </div>
                        <Badge bg={activeTab === category.id ? "primary" : "secondary"}>
                          {category.count}
                        </Badge>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                {/* Quests Section */}
                <div className="mt-4 pt-4 border-top border-secondary">
                  <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>🎯 Active Quests</h6>
                  {activeQuests.map(quest => (
                    <div key={quest.id} className="mb-3 p-3 rounded-3" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="fw-bold" style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                          {quest.title}
                        </div>
                        <Badge bg={quest.completed ? "success" : "secondary"} className="px-2 py-1">
                          {quest.type}
                        </Badge>
                      </div>
                      <small style={{ color: '#CBD5E1' }} className="d-block mb-2">
                        {quest.description}
                      </small>
                      {quest.completed ? (
                        <Button
                          variant="success"
                          size="sm"
                          className="w-100"
                          onClick={() => handleClaimQuest(quest.id)}
                          style={{ color: '#ffffff' }}
                        >
                          <Gift className="me-2" />
                          Claim Reward
                        </Button>
                      ) : quest.progress !== undefined ? (
                        <div>
                          <div className="d-flex justify-content-between mb-1">
                            <small style={{ color: '#CBD5E1' }}>Progress</small>
                            <small style={{ color: '#CBD5E1' }}>
                              {quest.progress}/{quest.total}
                            </small>
                          </div>
                          <ProgressBar 
                            now={(quest.progress / quest.total) * 100}
                            variant="primary"
                            style={{ height: '4px' }}
                          />
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <Fire className="text-warning me-2" />
                          <small style={{ color: '#f59e0b' }}>Day {quest.streak}</small>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Evolution Progress */}
            <Card className="border-0 shadow-lg" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4" style={{ color: '#ffffff' }}>📈 Evolution Progress</h5>
                {achievementTiers.map(tier => (
                  <div key={tier.id} className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="fw-bold mb-0" style={{ color: '#ffffff' }}>{tier.title}</h6>
                      <Badge bg="info">Tier {tier.currentTier}/4</Badge>
                    </div>
                    <div className="evolution-track">
                      {tier.tiers.map((tierLevel, index) => (
                        <div key={tierLevel.level} className="d-flex align-items-center mb-2">
                          <div className="position-relative me-3">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: '32px',
                                height: '32px',
                                background: tierLevel.earned 
                                  ? getTierColor(tierLevel.level)
                                  : 'rgba(255, 255, 255, 0.1)',
                                border: `2px solid ${getTierColor(tierLevel.level)}`,
                                color: tierLevel.earned ? '#000000' : '#ffffff'
                              }}
                            >
                              {tierLevel.icon}
                            </div>
                            {index < tier.tiers.length - 1 && (
                              <div 
                                className="position-absolute top-50 start-100"
                                style={{
                                  width: '40px',
                                  height: '2px',
                                  background: tierLevel.earned 
                                    ? getTierColor(tierLevel.level)
                                    : 'rgba(255, 255, 255, 0.1)'
                                }}
                              />
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div className="fw-bold" style={{ color: '#ffffff' }}>
                              {tierLevel.level}
                            </div>
                            <small style={{ color: '#94A3B8' }}>
                              {tierLevel.earned 
                                ? `Earned: ${tierLevel.date}`
                                : `${tierLevel.required} days required`
                              }
                            </small>
                          </div>
                          {tierLevel.earned ? (
                            <CheckCircle className="text-success" />
                          ) : (
                            <Lock className="text-secondary" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-2 rounded" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                      <small style={{ color: '#3B82F6' }}>
                        <ChevronRight className="me-1" />
                        Next: {tier.nextMilestone}
                      </small>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Main Achievements Grid */}
          <Col lg={9}>
            {/* Tab Navigation */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                  {activeTab === 'all' ? 'All Achievements' : 
                   activeTab === 'earned' ? 'Earned Badges' :
                   activeTab === 'upcoming' ? 'Upcoming Challenges' :
                   `${categories.find(c => c.id === activeTab)?.name} Achievements`}
                </h3>
                <p style={{ color: '#CBD5E1' }}>
                  {activeTab === 'all' && 'Your complete collection of badges and trophies'}
                  {activeTab === 'earned' && 'Celebrate your victories and hard-earned rewards'}
                  {activeTab === 'upcoming' && 'Challenges waiting to be conquered'}
                  {activeTab !== 'all' && activeTab !== 'earned' && activeTab !== 'upcoming' && 
                   `Specialized achievements in ${categories.find(c => c.id === activeTab)?.name.toLowerCase()}`}
                </p>
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant={activeTab === 'earned' ? 'warning' : 'outline-warning'}
                  onClick={() => setActiveTab('earned')}
                  style={{ 
                    color: activeTab === 'earned' ? '#000000' : '#f59e0b',
                    borderColor: '#f59e0b'
                  }}
                >
                  <CheckCircle className="me-2" />
                  Earned ({earnedAchievements.length})
                </Button>
                <Button
                  variant={activeTab === 'upcoming' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTab('upcoming')}
                  style={{ 
                    color: activeTab === 'upcoming' ? '#ffffff' : '#3b82f6',
                    borderColor: '#3b82f6'
                  }}
                >
                  <Fire className="me-2" />
                  Upcoming ({upcomingAchievements.length})
                </Button>
              </div>
            </div>

            {/* Achievements Grid */}
            <Row>
              {isLoading ? (
                <Col className="text-center py-5">
                  <Spinner animation="border" variant="warning" />
                  <p className="mt-3" style={{ color: '#CBD5E1' }}>Loading achievements...</p>
                </Col>
              ) : filteredAchievements.length === 0 ? (
                <Col className="text-center py-5">
                  <div className="display-1 mb-3">🏆</div>
                  <h4 style={{ color: '#ffffff' }}>No achievements found</h4>
                  <p style={{ color: '#CBD5E1' }}>Try selecting a different category</p>
                </Col>
              ) : (
                filteredAchievements.map(achievement => 
                  renderAchievementCard(achievement, activeTab !== 'earned')
                )
              )}
            </Row>

            {/* Seasonal Events */}
            <Card className="border-0 shadow-lg mt-4" style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#8B5CF6' }}>
                      🎪 Seasonal Events & Limited Challenges
                    </h5>
                    <p style={{ color: '#E2E8F0' }}>
                      Time-limited achievements with exclusive rewards
                    </p>
                  </div>
                  <Badge bg="primary" className="px-3 py-2">
                    <Clock className="me-2" />
                    Active Now
                  </Badge>
                </div>

                <Row className="g-3">
                  {currentEvents.map(event => (
                    <Col md={4} key={event.id}>
                      <Card className="border-0 h-100" style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: `2px solid ${event.color}`,
                        borderRadius: '15px'
                      }}>
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                                {event.title}
                              </h6>
                              <small style={{ color: '#CBD5E1' }}>
                                {event.description}
                              </small>
                            </div>
                            <Badge bg={event.active ? "success" : "secondary"}>
                              {event.active ? 'Active' : 'Ended'}
                            </Badge>
                          </div>
                          
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <small style={{ color: '#CBD5E1' }}>Progress</small>
                              <small style={{ color: '#CBD5E1' }}>{event.progress}%</small>
                            </div>
                            <ProgressBar 
                              now={event.progress}
                              style={{ 
                                height: '6px',
                                background: 'rgba(255, 255, 255, 0.1)'
                              }}
                            >
                              <ProgressBar 
                                style={{ background: event.color }}
                              />
                            </ProgressBar>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <small style={{ color: '#CBD5E1' }}>
                                <Calendar size={12} className="me-1" />
                                Ends: {event.endDate}
                              </small>
                            </div>
                            <Badge bg="warning" style={{ color: '#000000' }}>
                              {event.rewards}
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Social Achievements */}
            <Card className="border-0 shadow-lg mt-4" style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#10B981' }}>
                      👥 Social & Competitive Achievements
                    </h5>
                    <p style={{ color: '#E2E8F0' }}>
                      Compare your progress with friends and the community
                    </p>
                  </div>
                  <People size={24} className="text-success" />
                </div>

                <Row className="g-3">
                  {socialAchievements.map(achievement => (
                    <Col md={4} key={achievement.id}>
                      <Card className="border-0 h-100" style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '15px'
                      }}>
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                                {achievement.title}
                              </h6>
                              <small style={{ color: '#CBD5E1' }}>
                                {achievement.description}
                              </small>
                            </div>
                            <Badge bg={achievement.earned ? "success" : "secondary"}>
                              {achievement.earned ? 'Earned' : 'Locked'}
                            </Badge>
                          </div>
                          
                          {achievement.earned ? (
                            <div>
                              <small style={{ color: '#94A3B8' }} className="d-block mb-2">
                                <Calendar size={12} className="me-1" />
                                Earned: {achievement.date}
                              </small>
                              {achievement.friends && (
                                <div>
                                  <small style={{ color: '#94A3B8' }}>With friends:</small>
                                  <div className="d-flex flex-wrap gap-1 mt-1">
                                    {achievement.friends.map(friend => (
                                      <Badge key={friend} bg="info" className="px-2 py-1">
                                        {friend}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              <div className="d-flex justify-content-between mb-1">
                                <small style={{ color: '#CBD5E1' }}>Rank Progress</small>
                                <small style={{ color: '#CBD5E1' }}>
                                  #{achievement.progress} / #{achievement.required}
                                </small>
                              </div>
                              <ProgressBar 
                                now={(achievement.progress / achievement.required) * 100}
                                variant="success"
                                style={{ height: '6px' }}
                              />
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Evolution Modal */}
      <Modal show={showEvolutionModal} onHide={() => setShowEvolutionModal(false)} centered>
        <Modal.Header closeButton style={{ 
          background: '#1e293b', 
          borderColor: '#334155',
          color: '#ffffff'
        }}>
          <Modal.Title>📈 Achievement Evolution</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1e293b', color: '#ffffff' }}>
          {selectedAchievement && (
            <div className="text-center">
              <div className="mb-4">
                <div 
                  className="rounded-3 p-4 d-inline-block"
                  style={{
                    background: `linear-gradient(135deg, ${getRarityColor(selectedAchievement.rarity)}40, ${getRarityColor(selectedAchievement.rarity)}60)`,
                    border: `3px solid ${getRarityColor(selectedAchievement.rarity)}`
                  }}
                >
                  {selectedAchievement.icon}
                </div>
              </div>
              
              <h4 className="fw-bold mb-3" style={{ color: '#ffffff' }}>
                {selectedAchievement.title}
              </h4>
              <p style={{ color: '#CBD5E1' }} className="mb-4">
                {selectedAchievement.description}
              </p>
              
              <div className="mb-4">
                <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Evolution Path</h6>
                <div className="d-flex justify-content-center align-items-center">
                  {[1, 2, 3, 4].map((tier) => (
                    <div key={tier} className="text-center mx-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: tier <= selectedAchievement.evolution.current
                            ? getRarityColor(selectedAchievement.rarity)
                            : 'rgba(255, 255, 255, 0.1)',
                          border: `3px solid ${getRarityColor(selectedAchievement.rarity)}`,
                          color: tier <= selectedAchievement.evolution.current ? '#ffffff' : '#94A3B8'
                        }}
                      >
                        {tier}
                      </div>
                      <small style={{ 
                        color: tier <= selectedAchievement.evolution.current ? '#ffffff' : '#94A3B8'
                      }}>
                        Tier {tier}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-3 rounded" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                <small style={{ color: '#3B82F6' }}>
                  <ChevronRight className="me-1" />
                  Next evolution: {selectedAchievement.evolution.next}
                </small>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
        <Modal.Header closeButton style={{ 
          background: '#1e293b', 
          borderColor: '#334155',
          color: '#ffffff'
        }}>
          <Modal.Title>📢 Share Achievement</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1e293b', color: '#ffffff' }}>
          <div className="text-center mb-4">
            <Share size={48} className="text-primary mb-3" />
            <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>
              Share Your Success
            </h5>
            <p style={{ color: '#CBD5E1' }}>
              Inspire your friends by sharing your achievements
            </p>
          </div>
          
          <div className="mb-4">
            <Form.Control
              placeholder="Add a motivational message..."
              as="textarea"
              rows={3}
              className="mb-3"
              style={{
                background: '#334155',
                borderColor: '#475569',
                color: '#ffffff'
              }}
            />
          </div>
          
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="primary" className="px-4">
              <Share className="me-2" />
              Share to Community
            </Button>
            <Button variant="outline-light">
              <Download className="me-2" />
              Download Image
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AchievementsPage;