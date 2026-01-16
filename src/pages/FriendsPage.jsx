import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, Row, Col, Card, Button, Form, InputGroup, 
  ListGroup, Badge, Modal, Alert, Tab, Tabs, ProgressBar,
  Dropdown, OverlayTrigger, Tooltip, Toast, ToastContainer,
  Accordion, ButtonGroup
} from 'react-bootstrap';
import { 
  Search, PersonPlus, Trophy, Fire, X, People, 
  ChatDots, Lightning, Star, Shield, 
  Bullseye, GraphUp, ArrowUp, ArrowDown, 
  Heart, HeartFill, EmojiSmile, EmojiWink, 
  EmojiHeartEyes, Award, Clock, Bell, Send,
  CheckCircle, PlusCircle, ThreeDots, Share,
  VolumeUp, VolumeMute, Dice5, Rocket, Gift,
  Zap, Play, Stop, VolumeUpFill, VolumeMuteFill,
  CameraVideo, MusicNote, Palette, Magic, Coin 
} from 'react-bootstrap-icons';
import { useFriends } from '../components/context/FriendsContext';
import DemoBanner from '../components/Common/DemoBanner';
import toast from 'react-hot-toast';
import CountUp from 'react-countup';
import Confetti from 'react-confetti';

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
  
  // Core State
  const [searchTerm, setSearchTerm] = useState('');
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [activeTab, setActiveTab] = useState('socialHub');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedChatFriend, setSelectedChatFriend] = useState(null);
  const [message, setMessage] = useState('');
  const [showGameModal, setShowGameModal] = useState(false);
  const [gameType, setGameType] = useState('streakDuel');
  
  // Social State
  const [socialFeed, setSocialFeed] = useState([
    { 
      id: 1, 
      user: { name: "Alex Chen", avatar: "👑", rank: "Legend" },
      action: "🔥 just completed a 100-day meditation streak!",
      type: "milestone",
      time: "5 min ago",
      reactions: { fire: 12, clap: 8, heart: 15 },
      comments: 3
    },
    { 
      id: 2, 
      user: { name: "Sarah Johnson", avatar: "⚡", rank: "Pro" },
      action: "🏆 won the Weekly Marathon challenge!",
      type: "achievement", 
      time: "1 hour ago",
      reactions: { trophy: 20, fire: 15, clap: 10 },
      comments: 7
    },
    { 
      id: 3, 
      user: { name: "Mike Rodriguez", avatar: "💎", rank: "Grinder" },
      action: "⚔️ challenged you to a 7-Day Duel!",
      type: "challenge",
      time: "2 hours ago",
      reactions: { zap: 5, fire: 8 },
      comments: 2
    },
    { 
      id: 4, 
      user: { name: "Emma Wilson", avatar: "⭐", rank: "Rookie" },
      action: "✨ just started their fitness journey!",
      type: "welcome",
      time: "5 hours ago",
      reactions: { heart: 25, clap: 12 },
      comments: 10
    }
  ]);
  
  // Weekly League State
  const [weeklyLeague, setWeeklyLeague] = useState({
    name: "Diamond League",
    rank: 3,
    totalPlayers: 50,
    promotion: { target: 2, progress: 70 },
    demotion: { threshold: 15 },
    friendsInLeague: [
      { name: "You", rank: 3, streak: 27, change: "▲2", avatar: "🔥" },
      { name: "Alex", rank: 1, streak: 45, change: "▲1", avatar: "👑" },
      { name: "Sarah", rank: 2, streak: 38, change: "▲3", avatar: "⚡" },
      { name: "Mike", rank: 5, streak: 23, change: "▼1", avatar: "💎" },
      { name: "Emma", rank: 12, streak: 15, change: "▲4", avatar: "⭐" }
    ]
  });
  
  // Active Games with Friends
  const [activeGames, setActiveGames] = useState([
    {
      id: 1,
      type: "streakDuel",
      opponent: { name: "Alex Chen", avatar: "👑" },
      stake: 250,
      status: "active",
      progress: { you: 5, opponent: 3 },
      endsIn: "3 days",
      prize: { xp: 500, coins: 250 }
    },
    {
      id: 2,
      type: "consistencyRace",
      opponent: { name: "Sarah Johnson", avatar: "⚡" },
      stake: 150,
      status: "winning",
      progress: { you: 85, opponent: 65 },
      endsIn: "1 day",
      prize: { xp: 300, coins: 150 }
    }
  ]);
  
  // Chat Messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "friend", text: "Hey! Ready for our streak duel? 🏆", time: "10:30 AM" },
    { id: 2, sender: "you", text: "Absolutely! I've been crushing my morning routine 🔥", time: "10:32 AM" },
    { id: 3, sender: "friend", text: "Nice! I just hit 30 days on meditation. Wanna race to 60? ⚡", time: "10:33 AM" },
    { id: 4, sender: "you", text: "You're on! Let's make it interesting - loser buys coffee ☕", time: "10:35 AM" },
    { id: 5, sender: "friend", text: "Deal! May the best streak win 💪", time: "10:36 AM" }
  ]);
  
  // Stats
  const [socialStats, setSocialStats] = useState({
    totalFriends: friends.length || 5,
    activeToday: 4,
    challengesSent: 12,
    reactionsReceived: 45,
    rank: "Social Butterfly"
  });
  
  const leaderboard = getLeaderboard();
  
  // Filter friends
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Initialize
  useEffect(() => {
    // Simulate live feed updates
    const feedInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const actions = [
          "just checked in their morning routine! 🌅",
          "completed a 7-day streak! 🔥",
          "earned a new achievement! 🏆",
          "joined a new challenge! ⚔️",
          "helped a friend with their streak! 🤝"
        ];
        const users = ["Alex Chen", "Sarah Johnson", "Mike Rodriguez", "Emma Wilson", "David Kim"];
        const newFeedItem = {
          id: Date.now(),
          user: { 
            name: users[Math.floor(Math.random() * users.length)], 
            avatar: ["👑", "⚡", "💎", "⭐", "🔥"][Math.floor(Math.random() * 5)],
            rank: ["Legend", "Pro", "Grinder", "Rookie"][Math.floor(Math.random() * 4)]
          },
          action: actions[Math.floor(Math.random() * actions.length)],
          type: "activity",
          time: "Just now",
          reactions: { fire: Math.floor(Math.random() * 10), clap: Math.floor(Math.random() * 8), heart: Math.floor(Math.random() * 12) },
          comments: Math.floor(Math.random() * 5)
        };
        setSocialFeed(prev => [newFeedItem, ...prev.slice(0, 9)]);
      }
    }, 30000);
    
    // Simulate league rank updates
    const leagueInterval = setInterval(() => {
      setWeeklyLeague(prev => ({
        ...prev,
        rank: Math.max(1, prev.rank + (Math.random() > 0.5 ? -1 : 1)),
        promotion: {
          ...prev.promotion,
          progress: Math.min(100, prev.promotion.progress + (Math.random() > 0.5 ? 5 : -3))
        }
      }));
    }, 60000);
    
    return () => {
      clearInterval(feedInterval);
      clearInterval(leagueInterval);
    };
  }, []);
  
  // Handle adding friend with celebration
  const handleAddFriend = (friendId) => {
    const friend = suggestedFriends.find(f => f.id === friendId);
    if (!friend) return;
    
    addFriend(friendId);
    
    // Add to social feed
    const newFeedItem = {
      id: Date.now(),
      user: { name: "You", avatar: "🔥", rank: "Player" },
      action: `🤝 became friends with ${friend.name}!`,
      type: "friend_add",
      time: "Just now",
      reactions: { heart: 0, clap: 0 },
      comments: 0
    };
    setSocialFeed(prev => [newFeedItem, ...prev.slice(0, 9)]);
    
    // Update stats
    setSocialStats(prev => ({
      ...prev,
      totalFriends: prev.totalFriends + 1
    }));
    
    // Celebration
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    toast.success(
      <div className="d-flex align-items-center">
        <People className="me-2 text-success" />
        <div>
          <strong className="d-block">Friends with {friend.name}! 🎉</strong>
          <small className="text">+25 XP • Challenge them now!</small>
        </div>
      </div>
    );
  };
  
  // Handle challenge with game-like interface
  const handleOpenChallengeModal = (friend) => {
    setSelectedFriend(friend);
    setShowChallengeModal(true);
  };
  
  // Send challenge with stakes
  const handleSendChallenge = () => {
    if (selectedFriend) {
      sendChallenge(selectedFriend.id, gameType);
      
      // Add to social feed
      const newFeedItem = {
        id: Date.now(),
        user: { name: "You", avatar: "🔥", rank: "Player" },
        action: `⚔️ challenged ${selectedFriend.name} to a ${gameType === 'streakDuel' ? '7-Day Duel' : 'Consistency Race'}!`,
        type: "challenge_sent",
        time: "Just now",
        reactions: { zap: 0, fire: 0 },
        comments: 0
      };
      setSocialFeed(prev => [newFeedItem, ...prev.slice(0, 9)]);
      
      // Update active games
      const newGame = {
        id: Date.now(),
        type: gameType,
        opponent: { name: selectedFriend.name, avatar: "👤" },
        stake: gameType === 'streakDuel' ? 250 : 150,
        status: "pending",
        progress: { you: 0, opponent: 0 },
        endsIn: "7 days",
        prize: { xp: gameType === 'streakDuel' ? 500 : 300, coins: gameType === 'streakDuel' ? 250 : 150 }
      };
      setActiveGames(prev => [newGame, ...prev]);
      
      // Update stats
      setSocialStats(prev => ({
        ...prev,
        challengesSent: prev.challengesSent + 1
      }));
      
      toast.success(
        <div className="d-flex align-items-center">
          <Trophy className="me-2 text-warning" />
          <div>
            <strong className="d-block">Challenge Sent! 🏆</strong>
            <small className="text">
              Stakes: {gameType === 'streakDuel' ? '500 XP, 250 Coins' : '300 XP, 150 Coins'}
            </small>
          </div>
        </div>
      );
      
      setShowChallengeModal(false);
      setSelectedFriend(null);
    }
  };
  
  // React to feed item
  const handleReaction = (feedId, reactionType) => {
    setSocialFeed(prev => prev.map(item => {
      if (item.id === feedId) {
        const updatedReactions = {
          ...item.reactions,
          [reactionType]: (item.reactions[reactionType] || 0) + 1
        };
        
        // Update stats
        setSocialStats(prevStats => ({
          ...prevStats,
          reactionsReceived: prevStats.reactionsReceived + 1
        }));
        
        return {
          ...item,
          reactions: updatedReactions
        };
      }
      return item;
    }));
    
    toast.success(
      <div className="d-flex align-items-center">
        <Heart className="me-2 text-danger" />
        <div>
          <strong className="d-block">Reaction Sent! ❤️</strong>
          <small className="text">Keep the positivity flowing!</small>
        </div>
      </div>
    );
  };
  
  // Open chat with friend
  const handleOpenChat = (friend) => {
    setSelectedChatFriend(friend);
    setShowChat(true);
    setMessage('');
  };
  
  // Send chat message
  const handleSendMessage = () => {
    if (!message.trim() || !selectedChatFriend) return;
    
    const newMessage = {
      id: Date.now(),
      sender: "you",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate friend response after delay
    setTimeout(() => {
      const responses = [
        "Nice! Keep up the great work! 🔥",
        "Challenge accepted! Let's do this 💪",
        "That's impressive! How do you stay consistent?",
        "Want to make a friendly bet on this? 🏆",
        "You're inspiring me to push harder! ✨"
      ];
      const friendResponse = {
        id: Date.now() + 1,
        sender: "friend",
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, friendResponse]);
    }, 2000);
  };
  
  // Start a mini-game
  const handleStartGame = (friend, gameType) => {
    setSelectedFriend(friend);
    setGameType(gameType);
    setShowGameModal(true);
  };
  
  // Accept challenge from feed
  const handleAcceptChallenge = (feedItem) => {
    // Add to active games
    const newGame = {
      id: Date.now(),
      type: "streakDuel",
      opponent: feedItem.user,
      stake: 250,
      status: "active",
      progress: { you: 0, opponent: 0 },
      endsIn: "7 days",
      prize: { xp: 500, coins: 250 }
    };
    setActiveGames(prev => [newGame, ...prev]);
    
    // Update feed
    setSocialFeed(prev => prev.map(item => {
      if (item.id === feedItem.id) {
        return {
          ...item,
          action: `✅ You accepted ${feedItem.user.name}'s challenge!`,
          type: "challenge_accepted"
        };
      }
      return item;
    }));
    
    toast.success(
      <div className="d-flex align-items-center">
        <Bullseye className="me-2 text-success" />
        <div>
          <strong className="d-block">Challenge Accepted! 🎯</strong>
          <small className="text">Good luck! The duel begins now.</small>
        </div>
      </div>
    );
  };
  
  // Get friend rank
  const getFriendRank = (streak) => {
    if (streak >= 100) return { text: '🔥 Legend', color: 'warning', icon: '👑' };
    if (streak >= 30) return { text: '⚡ Pro', color: 'success', icon: '⚡' };
    if (streak >= 7) return { text: '💎 Grinder', color: 'primary', icon: '💎' };
    return { text: '⭐ Rookie', color: 'secondary', icon: '⭐' };
  };
  
  // Get league promotion progress
  const getPromotionProgress = () => {
    const progress = weeklyLeague.promotion.progress;
    if (progress >= 90) return { text: "Promotion Imminent!", variant: "success" };
    if (progress >= 70) return { text: "Promotion Zone", variant: "warning" };
    if (progress >= 50) return { text: "Safe Zone", variant: "info" };
    return { text: "Needs Improvement", variant: "secondary" };
  };
  
  const promotionStatus = getPromotionProgress();
  
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      {/* Confetti Celebration */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <Container fluid className="px-3 px-md-4 px-lg-5 py-4">
        <DemoBanner />
        
        {/* Header with Stats */}
        <Card className="border-0 shadow-lg mb-4" style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid #334155',
          borderRadius: '20px',
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
                      justifyContent: 'center'
                    }}>
                      <People size={32} className="text-white" />
                    </div>
                    <Badge bg="warning" className="position-absolute top-0 start-100 translate-middle rounded-pill px-2">
                      {socialStats.totalFriends}
                    </Badge>
                  </div>
                  <div>
                    <h1 className="fw-bold mb-1" style={{ fontSize: '2rem', color: '#ffffff' }}>
                      Social Hub
                    </h1>
                    <p className="mb-0 text" style={{ color: '#94a3b8' }}>
                      Where habits become friendships and competition fuels growth
                    </p>
                  </div>
                </div>
                
                {/* Social Stats Bar */}
                <div className="d-flex flex-wrap gap-4">
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#3b82f6' }}>
                      <CountUp end={socialStats.activeToday} duration={1} />
                    </div>
                    <small className="text" style={{ color: '#94a3b8' }}>Active Today</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#10b981' }}>
                      <CountUp end={socialStats.challengesSent} duration={1} />
                    </div>
                    <small className="text" style={{ color: '#94a3b8' }}>Challenges</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#f59e0b' }}>
                      <CountUp end={socialStats.reactionsReceived} duration={1} />
                    </div>
                    <small className="text" style={{ color: '#94a3b8' }}>Reactions</small>
                  </div>
                  <div className="text-center">
                    <div className="h3 fw-bold mb-1" style={{ color: '#8b5cf6' }}>
                      {socialStats.rank}
                    </div>
                    <small className="text" style={{ color: '#94a3b8' }}>Your Rank</small>
                  </div>
                </div>
              </Col>
              
              <Col md={4} className="mt-3 mt-md-0">
                <div className="d-flex flex-column gap-3">
                  <Button 
                    variant="primary" 
                    className="fw-bold py-3 d-flex align-items-center justify-content-center"
                    onClick={() => setActiveTab('findFriends')}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      border: 'none',
                      borderRadius: '15px',
                      fontSize: '1rem',
                      color: '#ffffff'
                    }}
                  >
                    <PersonPlus className="me-2" size={20} />
                    Find Friends
                  </Button>
                  
                  <Button 
                    variant="warning"
                    className="fw-bold py-2 d-flex align-items-center justify-content-center"
                    onClick={() => toast.success("Live matchmaking started! 🤝")}
                    style={{ color: '#1e293b' }}
                  >
                    <Lightning className="me-2" />
                    Quick Match
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {/* Main Social Hub */}
        <Row className="g-4">
          {/* Left Column - Social Feed & Leagues */}
          <Col lg={8}>
            {/* Weekly League Card */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#fbbf24' }}>
                      🏆 {weeklyLeague.name}
                    </h5>
                    <p className="mb-0" style={{ color: '#fde68a' }}>
                      Rank #{weeklyLeague.rank} of {weeklyLeague.totalPlayers}
                    </p>
                  </div>
                  <Badge bg={promotionStatus.variant} className="px-3 py-2">
                    {promotionStatus.text}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small style={{ color: '#fbbf24' }}>Promotion Progress</small>
                    <small className="fw-bold" style={{ color: '#fbbf24' }}>
                      {weeklyLeague.promotion.progress}%
                    </small>
                  </div>
                  <ProgressBar 
                    now={weeklyLeague.promotion.progress}
                    style={{ 
                      height: '12px',
                      borderRadius: '6px',
                      background: 'rgba(245, 158, 11, 0.2)'
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
                
                <div className="mt-4">
                  <h6 className="fw-bold mb-3" style={{ color: '#fbbf24' }}>
                    Friends in League
                  </h6>
                  <div className="league-standings">
                    {weeklyLeague.friendsInLeague.map((player, index) => (
                      <div 
                        key={index}
                        className="d-flex align-items-center p-3 mb-2 rounded-3"
                        style={{
                          background: player.name === 'You' 
                            ? 'rgba(59, 130, 246, 0.2)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: player.name === 'You' 
                            ? '2px solid #3b82f6'
                            : '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div className="me-3">
                          <Badge 
                            bg={index < 3 ? "warning" : "secondary"} 
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '36px', height: '36px' }}
                          >
                            #{player.rank}
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
                              {player.avatar}
                            </div>
                          </div>
                          
                          <div className="flex-grow-1">
                            <div className="fw-bold" style={{ color: '#ffffff' }}>
                              {player.name}
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <small style={{ color: '#94a3b8' }}>
                                <Fire size={12} className="me-1" />
                                {player.streak} days
                              </small>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`change-indicator ${player.change.includes('▲') ? 'positive' : 'negative'}`}>
                          {player.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            {/* Social Activity Feed */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: '#ffffff' }}>🔥 Live Social Feed</h5>
                  <Badge bg="danger" className="px-3 py-2">
                    <Lightning className="me-1" />
                    Live
                  </Badge>
                </div>
                
                <div className="social-feed">
                  {socialFeed.map((item) => (
                    <div key={item.id} className="social-feed-item p-3 mb-3 rounded-3" 
                      style={{
                        background: '#334155',
                        border: '1px solid #475569'
                      }}>
                      <div className="d-flex align-items-start mb-2">
                        <div className="position-relative me-3">
                          <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                          }}>
                            {item.user.avatar}
                          </div>
                          {item.user.rank === 'Legend' && (
                            <Fire className="position-absolute top-0 start-100 translate-middle text-warning" size={16} />
                          )}
                        </div>
                        
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <div className="fw-bold" style={{ color: '#ffffff' }}>{item.user.name}</div>
                              <Badge bg={item.user.rank === 'Legend' ? 'warning' : 'secondary'} className="me-2">
                                {item.user.rank}
                              </Badge>
                              <small style={{ color: '#94a3b8' }}>{item.time}</small>
                            </div>
                            {item.type === 'challenge' && (
                              <Button 
                                variant="warning" 
                                size="sm"
                                onClick={() => handleAcceptChallenge(item)}
                              >
                                Accept Challenge
                              </Button>
                            )}
                          </div>
                          
                          <p className="mt-2 mb-3" style={{ color: '#e2e8f0' }}>{item.action}</p>
                          
                          {/* Reactions */}
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-light" 
                                size="sm"
                                className="d-flex align-items-center"
                                onClick={() => handleReaction(item.id, 'fire')}
                                style={{ color: '#ffffff' }}
                              >
                                <Fire size={12} className="me-1" />
                                {item.reactions.fire || 0}
                              </Button>
                              <Button 
                                variant="outline-light" 
                                size="sm"
                                className="d-flex align-items-center"
                                onClick={() => handleReaction(item.id, 'heart')}
                                style={{ color: '#ffffff' }}
                              >
                                <Heart size={12} className="me-1" />
                                {item.reactions.heart || 0}
                              </Button>
                              <Button 
                                variant="outline-light" 
                                size="sm"
                                className="d-flex align-items-center"
                                onClick={() => handleReaction(item.id, 'clap')}
                                style={{ color: '#ffffff' }}
                              >
                                <EmojiHeartEyes size={12} className="me-1" />
                                {item.reactions.clap || 0}
                              </Button>
                            </div>
                            <small style={{ color: '#94a3b8' }}>
                              {item.comments} comments
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
            
            {/* Active Games */}
            {activeGames.length > 0 && (
              <Card className="border-0 shadow-lg" style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '20px'
              }}>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0" style={{ color: '#ffffff' }}>🎮 Active Games</h5>
                    <Badge bg="success" className="px-3 py-2">
                      {activeGames.length} Active
                    </Badge>
                  </div>
                  
                  <div className="row g-3">
                    {activeGames.map((game) => (
                      <div key={game.id} className="col-md-6">
                        <div className="p-3 rounded-3" style={{
                          background: '#334155',
                          border: `2px solid ${game.status === 'winning' ? '#10b981' : '#3b82f6'}`,
                          borderRadius: '15px'
                        }}>
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-3">
                              <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '18px'
                              }}>
                                {game.opponent.avatar}
                              </div>
                            </div>
                            <div>
                              <div className="fw-bold" style={{ color: '#ffffff' }}>{game.opponent.name}</div>
                              <Badge bg={game.type === 'streakDuel' ? 'danger' : 'info'}>
                                {game.type === 'streakDuel' ? '7-Day Duel' : 'Consistency Race'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <small style={{ color: '#94a3b8' }}>Progress</small>
                              <small className="fw-bold" style={{ color: '#ffffff' }}>
                                You: {game.progress.you} • Opponent: {game.progress.opponent}
                              </small>
                            </div>
                            <ProgressBar style={{ height: '8px', borderRadius: '4px' }}>
                              <ProgressBar 
                                variant="primary" 
                                now={(game.progress.you / (game.progress.you + game.progress.opponent || 1)) * 100} 
                              />
                            </ProgressBar>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <small className="d-block" style={{ color: '#94a3b8' }}>Prize</small>
                              <div className="d-flex align-items-center">
                                <Star size={12} className="me-1 text-warning" />
                                <small className="fw-bold" style={{ color: '#ffffff' }}>{game.prize.xp} XP</small>
                                <Coin size={12} className="ms-2 me-1 text-warning" />
                                <small className="fw-bold" style={{ color: '#ffffff' }}>{game.prize.coins} Coins</small>
                              </div>
                            </div>
                            <Button 
                              variant={game.status === 'winning' ? 'success' : 'primary'} 
                              size="sm"
                              onClick={() => handleOpenChat({ name: game.opponent.name, avatar: game.opponent.avatar })}
                              style={{ color: '#ffffff' }}
                            >
                              <ChatDots className="me-1" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
          
          {/* Right Column - Friends & Quick Actions */}
          <Col lg={4}>
            {/* Friends List with Status */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: '#ffffff' }}>👥 Your Crew</h5>
                  <div style={{ width: '200px' }}>
                    <InputGroup size="sm">
                      <InputGroup.Text style={{ 
                        background: '#334155', 
                        borderColor: '#475569',
                        color: '#ffffff'
                      }}>
                        <Search />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Search friends..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          background: '#334155',
                          borderColor: '#475569',
                          color: '#ffffff'
                        }}
                      />
                    </InputGroup>
                  </div>
                </div>
                
                {filteredFriends.length === 0 ? (
                  <Alert variant="info" className="text-center py-4" style={{ 
                    background: '#334155',
                    borderColor: '#475569',
                    color: '#ffffff'
                  }}>
                    <PersonPlus size={32} className="mb-3" style={{ color: '#94a3b8' }} />
                    <h5 style={{ color: '#ffffff' }}>No friends found</h5>
                    <p style={{ color: '#94a3b8' }} className="mb-0">
                      Add some friends to start your social journey!
                    </p>
                  </Alert>
                ) : (
                  <div className="friends-list">
                    {filteredFriends.map(friend => {
                      const rank = getFriendRank(friend.streak || 0);
                      return (
                        <div key={friend.id} className="d-flex align-items-center p-3 mb-2 rounded-3"
                          style={{
                            background: '#334155',
                            border: '1px solid #475569',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#475569'}
                          onMouseLeave={e => e.currentTarget.style.background = '#334155'}
                          onClick={() => handleOpenChat(friend)}
                        >
                          <div className="position-relative me-3">
                            <div style={{
                              width: '48px',
                              height: '48px',
                              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '18px'
                            }}>
                              {friend.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {friend.online && (
                              <div 
                                className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                                style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  border: '2px solid #334155' 
                                }}
                              />
                            )}
                          </div>
                          
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="fw-bold" style={{ color: '#ffffff' }}>{friend.name}</div>
                              <Badge bg={rank.color}>
                                {rank.icon} {rank.text}
                              </Badge>
                            </div>
                            <div className="d-flex align-items-center gap-3 mt-1">
                              <small style={{ color: '#94a3b8' }}>
                                <Fire size={12} className="me-1" />
                                {friend.streak || 0} days
                              </small>
                              {friend.habits && (
                                <small style={{ color: '#94a3b8' }}>
                                  {friend.habits[0]} • {friend.habits[1]}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="d-flex gap-2 mt-3">
                  <Button 
                    variant="outline-primary" 
                    className="flex-grow-1"
                    onClick={() => setActiveTab('findFriends')}
                    style={{ color: '#60a5fa', borderColor: '#60a5fa' }}
                  >
                    <PersonPlus className="me-2" />
                    Add More
                  </Button>
                  <Button 
                    variant="outline-success"
                    onClick={() => toast.success("Invite link copied! 📋")}
                    style={{ color: '#34d399', borderColor: '#34d399' }}
                  >
                    <Share />
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg mb-4" style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4" style={{ color: '#10b981' }}>
                  ⚡ Quick Actions
                </h5>
                
                <div className="row g-3">
                  <div className="col-6">
                    <Button 
                      variant="warning" 
                      className="w-100 py-3 d-flex flex-column align-items-center justify-content-center"
                      onClick={() => {
                        const randomFriend = filteredFriends[Math.floor(Math.random() * filteredFriends.length)];
                        if (randomFriend) handleOpenChallengeModal(randomFriend);
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#1e293b'
                      }}
                    >
                      <Trophy size={24} className="mb-2" />
                      <small>Challenge</small>
                    </Button>
                  </div>
                  
                  <div className="col-6">
                    <Button 
                      variant="primary" 
                      className="w-100 py-3 d-flex flex-column align-items-center justify-content-center"
                      onClick={() => handleStartGame(filteredFriends[0], 'streakDuel')}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#ffffff'
                      }}
                    >
                      <Dice5 size={24} className="mb-2" />
                      <small>Play Game</small>
                    </Button>
                  </div>
                  
                  <div className="col-6">
                    <Button 
                      variant="success" 
                      className="w-100 py-3 d-flex flex-column align-items-center justify-content-center"
                      onClick={() => toast.success("Match found! Starting streak duel...")}
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#1e293b'
                      }}
                    >
                      <Lightning size={24} className="mb-2" />
                      <small>Quick Match</small>
                    </Button>
                  </div>
                  
                  <div className="col-6">
                    <Button 
                      variant="info" 
                      className="w-100 py-3 d-flex flex-column align-items-center justify-content-center"
                      onClick={() => setShowChat(true)}
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#ffffff'
                      }}
                    >
                      <ChatDots size={24} className="mb-2" />
                      <small>Group Chat</small>
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            {/* Friend Suggestions */}
            <Card className="border-0 shadow-lg" style={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '20px'
            }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0" style={{ color: '#ffffff' }}>✨ Suggested Friends</h5>
                  <Badge bg="info">{suggestedFriends.length}</Badge>
                </div>
                
                {suggestedFriends.length > 0 ? (
                  <ListGroup variant="flush">
                    {suggestedFriends.map(friend => (
                      <ListGroup.Item 
                        key={friend.id} 
                        className="d-flex align-items-center py-3 px-0 border-0"
                        style={{ background: 'transparent' }}
                      >
                        <div className="d-flex align-items-center flex-grow-1">
                          <div className="me-3">
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 'bold'
                            }}>
                              {friend.avatar}
                            </div>
                          </div>
                          <div>
                            <div className="fw-bold" style={{ color: '#ffffff' }}>{friend.name}</div>
                            <div style={{ color: '#94a3b8' }} className="small">
                              {friend.mutualFriends} mutual friends • {friend.habits?.join(', ')}
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline-primary"
                          onClick={() => handleAddFriend(friend.id)}
                          style={{ color: '#60a5fa', borderColor: '#60a5fa' }}
                        >
                          Add
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-3">
                    <div style={{ color: '#94a3b8' }}>No suggestions available</div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Challenge Modal */}
      <Modal show={showChallengeModal} onHide={() => setShowChallengeModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ 
          background: '#1e293b', 
          borderColor: '#334155',
          color: '#ffffff'
        }}>
          <Modal.Title>
            ⚔️ Challenge {selectedFriend?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1e293b', color: '#ffffff' }}>
          <div className="text-center mb-4">
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              {selectedFriend?.name?.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 className="fw-bold" style={{ color: '#ffffff' }}>Face Off Against {selectedFriend?.name}!</h4>
            <p style={{ color: '#94a3b8' }}>Choose your challenge type and stakes</p>
          </div>
          
          <Tabs
            activeKey={gameType}
            onSelect={(k) => setGameType(k)}
            className="mb-4"
            variant="pills"
          >
            <Tab eventKey="streakDuel" title="🏆 7-Day Duel">
              <div className="p-3 rounded" style={{ background: '#334155' }}>
                <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Longest Streak Challenge</h6>
                <p style={{ color: '#94a3b8' }} className="mb-3">Who can maintain the longest daily streak for 7 days?</p>
                <div className="d-flex justify-content-between mb-2">
                  <small style={{ color: '#94a3b8' }}>Stakes:</small>
                  <small className="fw-bold" style={{ color: '#ffffff' }}>500 XP • 250 Coins</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small style={{ color: '#94a3b8' }}>Duration:</small>
                  <small className="fw-bold" style={{ color: '#ffffff' }}>7 Days</small>
                </div>
              </div>
            </Tab>
            <Tab eventKey="consistencyRace" title="⚡ Consistency Race">
              <div className="p-3 rounded" style={{ background: '#334155' }}>
                <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Daily Consistency Challenge</h6>
                <p style={{ color: '#94a3b8' }} className="mb-3">Who can check in more consistently this week?</p>
                <div className="d-flex justify-content-between mb-2">
                  <small style={{ color: '#94a3b8' }}>Stakes:</small>
                  <small className="fw-bold" style={{ color: '#ffffff' }}>300 XP • 150 Coins</small>
                </div>
                <div className="d-flex justify-content-between">
                  <small style={{ color: '#94a3b8' }}>Duration:</small>
                  <small className="fw-bold" style={{ color: '#ffffff' }}>7 Days</small>
                </div>
              </div>
            </Tab>
          </Tabs>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#ffffff' }}>Trash Talk (Optional)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2}
                placeholder={`Hey ${selectedFriend?.name}, I challenge you to...`}
                style={{ 
                  background: '#334155', 
                  borderColor: '#475569', 
                  color: '#ffffff',
                  '::placeholder': { color: '#94a3b8' }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1e293b', borderColor: '#334155' }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowChallengeModal(false)}
            style={{ background: '#475569', borderColor: '#475569', color: '#ffffff' }}
          >
            Cancel
          </Button>
          <Button 
            variant="warning" 
            onClick={handleSendChallenge}
            style={{ 
              background: 'linear-gradient(135deg, #f59e0b, #f97316)', 
              border: 'none',
              color: '#1e293b'
            }}
          >
            <Trophy className="me-2" />
            Send Challenge
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Chat Modal */}
      <Modal show={showChat} onHide={() => setShowChat(false)} size="lg" centered fullscreen="md-down">
        <Modal.Header closeButton style={{ 
          background: '#1e293b', 
          borderColor: '#334155',
          color: '#ffffff'
        }}>
          <div className="d-flex align-items-center">
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              marginRight: '12px'
            }}>
              {selectedChatFriend?.name?.split(' ').map(n => n[0]).join('') || '👤'}
            </div>
            <div>
              <Modal.Title className="mb-0">
                {selectedChatFriend?.name || 'Group Chat'}
              </Modal.Title>
              <small style={{ color: '#94a3b8' }}>Online • Playing streak duel</small>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body style={{ 
          background: '#1e293b', 
          color: '#ffffff',
          height: '400px',
          overflowY: 'auto',
          padding: '20px'
        }}>
          <div className="chat-messages">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`d-flex mb-3 ${msg.sender === 'you' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div 
                  className="p-3 rounded-3"
                  style={{
                    background: msg.sender === 'you' 
                      ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                      : '#334155',
                    maxWidth: '70%',
                    borderBottomRightRadius: msg.sender === 'you' ? '4px' : '12px',
                    borderBottomLeftRadius: msg.sender === 'you' ? '12px' : '4px'
                  }}
                >
                  <div className="d-flex align-items-center mb-1">
                    {msg.sender === 'friend' && (
                      <div className="fw-bold me-2" style={{ color: '#ffffff' }}>{selectedChatFriend?.name || 'Friend'}</div>
                    )}
                    <small style={{ color: '#94a3b8' }} className="ms-auto">{msg.time}</small>
                  </div>
                  <div style={{ color: '#ffffff' }}>{msg.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ background: '#1e293b', borderColor: '#334155' }}>
          <div className="d-flex flex-grow-1 gap-2">
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{ 
                background: '#334155', 
                borderColor: '#475569', 
                color: '#ffffff',
                '::placeholder': { color: '#94a3b8' }
              }}
            />
            <Button 
              variant="primary" 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              style={{ background: '#3b82f6', borderColor: '#3b82f6' }}
            >
              <Send />
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      
      {/* Game Modal */}
      <Modal show={showGameModal} onHide={() => setShowGameModal(false)} centered>
        <Modal.Header closeButton style={{ 
          background: '#1e293b', 
          borderColor: '#334155',
          color: '#ffffff'
        }}>
          <Modal.Title>🎮 Play Mini-Game</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#1e293b', color: '#ffffff' }}>
          <div className="text-center py-4">
            <Dice5 size={64} className="text-warning mb-4" />
            <h4 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Challenge {selectedFriend?.name}</h4>
            <p style={{ color: '#94a3b8' }} className="mb-4">
              Play a quick mini-game to settle your rivalry!
            </p>
            
            <div className="row g-3">
              <div className="col-6">
                <Button 
                  variant="outline-primary" 
                  className="w-100 py-3"
                  onClick={() => {
                    toast.success("Starting Streak Roulette...");
                    setShowGameModal(false);
                  }}
                  style={{ color: '#60a5fa', borderColor: '#60a5fa' }}
                >
                  🎯 Streak Roulette
                </Button>
              </div>
              <div className="col-6">
                <Button 
                  variant="outline-warning" 
                  className="w-100 py-3"
                  onClick={() => {
                    toast.success("Starting Consistency Check...");
                    setShowGameModal(false);
                  }}
                  style={{ color: '#f59e0b', borderColor: '#f59e0b' }}
                >
                  ⚡ Consistency Check
                </Button>
              </div>
              <div className="col-6">
                <Button 
                  variant="outline-success" 
                  className="w-100 py-3"
                  onClick={() => {
                    toast.success("Starting Habit Bingo...");
                    setShowGameModal(false);
                  }}
                  style={{ color: '#34d399', borderColor: '#34d399' }}
                >
                  🎲 Habit Bingo
                </Button>
              </div>
              <div className="col-6">
                <Button 
                  variant="outline-info" 
                  className="w-100 py-3"
                  onClick={() => {
                    toast.success("Starting Time Trial...");
                    setShowGameModal(false);
                  }}
                  style={{ color: '#06b6d4', borderColor: '#06b6d4' }}
                >
                  ⏱️ Time Trial
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
      {/* Custom Styles */}
      <style jsx>{`
        .change-indicator {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: bold;
          min-width: 36px;
          text-align: center;
        }
        
        .change-indicator.positive {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .change-indicator.negative {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .social-feed-item:hover {
          transform: translateY(-2px);
          transition: transform 0.2s ease;
        }
        
        .friends-list > div:hover {
          transform: translateX(4px);
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: #334155;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default FriendsPage;