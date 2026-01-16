import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, Row, Col, Card, Button, Form, Modal, Badge, Alert, InputGroup, 
  ProgressBar, Dropdown,
  ListGroup,Spinner
} from 'react-bootstrap';
import { 
  Plus, Fire, Trash, ArrowRepeat, Search, 
  Star, Lightning, Trophy, Clock, CheckCircle, GraphUp, Bell,  Download, 
  BarChart, People,  
   ThreeDots, Grid3x3, ListUl, 
   X, Pencil, Tag, 
   Rocket, Chat,
  Gift,  VolumeUp, 
 Magic, Coin, Gem,
  ChatSquare
} from 'react-bootstrap-icons';
import { useStreaks } from '../components/context/StreaksContext';
import DemoBanner from '../components/Common/DemoBanner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Howl } from 'howler';
import Particles from "react-tsparticles";
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';

// Sound effects
const successSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'],
  volume: 0.3
});

const clickSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'],
  volume: 0.2
});

const checkInSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'],
  volume: 0.3
});

const StreaksPage = () => {
  const { streaks, addStreak, deleteStreak, resetStreak, getStreakStats, checkStreak, archiveStreak, updateStreak } = useStreaks();
  const navigate = useNavigate();
  
  // State Management
  const [showModal, setShowModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showQuestModal, setShowQuestModal] = useState(false);
  const [showChallengesModal, setShowChallengesModal] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [showStreakPrediction, setShowStreakPrediction] = useState(false);
  
  const [newHabit, setNewHabit] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Fitness');
  const [dailyGoal, setDailyGoal] = useState('15');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('streak');
  const [viewMode, setViewMode] = useState('grid');
  const [showArchived, setShowArchived] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedStreak, setSelectedStreak] = useState(null);
  const [importData, setImportData] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [showCompletedToday, setShowCompletedToday] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(250);
  const [userCoins, setUserCoins] = useState(1500);
  const [userGems, setUserGems] = useState(50);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [aiMessage, setAiMessage] = useState('');
  const [showFireworks, setShowFireworks] = useState(false);
  const [showStreakAnimation, setShowStreakAnimation] = useState(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState(null);
  const [showDailyTip, setShowDailyTip] = useState(true);
  const [activeQuest, setActiveQuest] = useState(null);
  const [challengeProgress, setChallengeProgress] = useState(40);
  const [communityActivity, setCommunityActivity] = useState([
    { user: "Alex", action: "achieved a 100-day streak!", streak: "Meditation", time: "2 min ago", avatar: "👨" },
    { user: "Sarah", action: "completed the Morning Challenge", streak: "Workout", time: "15 min ago", avatar: "👩" },
    { user: "Mike", action: "earned the Fire Master badge", streak: "Reading", time: "1 hour ago", avatar: "🧔" },
    { user: "Team Alpha", action: "reached level 10 together!", streak: "Group Challenge", time: "3 hours ago", avatar: "👥" }
  ]);
  const [streakPrediction, setStreakPrediction] = useState(85);
  
  const stats = getStreakStats ? getStreakStats() : { longestStreak: 0 };
  
  // Background music
  const backgroundMusic = new Howl({
    src: ['https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3'],
    volume: 0.1,
    loop: true
  });

  // Categories with enhanced data
  const categories = [
    { 
      name: "Fitness", 
      icon: "💪", 
      color: "#4CAF50", 
      bgColor: "rgba(76, 175, 80, 0.1)",
      gradient: "linear-gradient(135deg, #4CAF50, #81C784)",
      emoji: "🏋️"
    },
    { 
      name: "Wellness", 
      icon: "🌿", 
      color: "#2196F3", 
      bgColor: "rgba(33, 150, 243, 0.1)",
      gradient: "linear-gradient(135deg, #2196F3, #64B5F6)",
      emoji: "🧘"
    },
    { 
      name: "Learning", 
      icon: "📚", 
      color: "#FF9800", 
      bgColor: "rgba(255, 152, 0, 0.1)",
      gradient: "linear-gradient(135deg, #FF9800, #FFB74D)",
      emoji: "🎓"
    },
    { 
      name: "Reading", 
      icon: "📖", 
      color: "#9C27B0", 
      bgColor: "rgba(156, 39, 176, 0.1)",
      gradient: "linear-gradient(135deg, #9C27B0, #BA68C8)",
      emoji: "📚"
    },
    { 
      name: "Health", 
      icon: "❤️", 
      color: "#F44336", 
      bgColor: "rgba(244, 67, 54, 0.1)",
      gradient: "linear-gradient(135deg, #F44336, #E57373)",
      emoji: "🏥"
    },
    { 
      name: "Mindfulness", 
      icon: "🧘", 
      color: "#00BCD4", 
      bgColor: "rgba(0, 188, 212, 0.1)",
      gradient: "linear-gradient(135deg, #00BCD4, #4DD0E1)",
      emoji: "🌅"
    },
    { 
      name: "Productivity", 
      icon: "⚡", 
      color: "#3F51B5", 
      bgColor: "rgba(63, 81, 181, 0.1)",
      gradient: "linear-gradient(135deg, #3F51B5, #7986CB)",
      emoji: "🚀"
    },
    { 
      name: "Social", 
      icon: "👥", 
      color: "#E91E63", 
      bgColor: "rgba(233, 30, 99, 0.1)",
      gradient: "linear-gradient(135deg, #E91E63, #F06292)",
      emoji: "👥"
    },
    { 
      name: "Creative", 
      icon: "🎨", 
      color: "#8BC34A", 
      bgColor: "rgba(139, 195, 74, 0.1)",
      gradient: "linear-gradient(135deg, #8BC34A, #AED581)",
      emoji: "🎨"
    },
    { 
      name: "Financial", 
      icon: "💰", 
      color: "#795548", 
      bgColor: "rgba(121, 85, 72, 0.1)",
      gradient: "linear-gradient(135deg, #795548, #A1887F)",
      emoji: "💰"
    },
    { 
      name: "Relationship", 
      icon: "💝", 
      color: "#FF5722", 
      bgColor: "rgba(255, 87, 34, 0.1)",
      gradient: "linear-gradient(135deg, #FF5722, #FF8A65)",
      emoji: "💑"
    }
  ];

  // Difficulty levels
  const difficultyLevels = [
    { 
      level: 'Easy', 
      icon: '🥱', 
      color: '#10B981', 
      goal: '15', 
      desc: '5-15 minutes daily',
      xp: 10,
      coins: 5
    },
    { 
      level: 'Medium', 
      icon: '💪', 
      color: '#3B82F6', 
      goal: '30', 
      desc: '15-30 minutes daily',
      xp: 25,
      coins: 15
    },
    { 
      level: 'Hard', 
      icon: '🔥', 
      color: '#F59E0B', 
      goal: '60', 
      desc: '30-60 minutes daily',
      xp: 50,
      coins: 30
    },
    { 
      level: 'Extreme', 
      icon: '🚀', 
      color: '#EF4444', 
      goal: '90', 
      desc: '60+ minutes daily',
      xp: 100,
      coins: 60
    }
  ];

  // Tags
  const tags = [
    'morning', 'evening', 'daily', 'weekly', 'health', 'fitness', 
    'learning', 'work', 'personal', 'challenge', 'beginner', 'advanced',
    'fun', 'serious', 'team', 'solo', 'family', 'workout', 'meditation',
    'productivity', 'creativity', 'social', 'financial', 'spiritual'
  ];

  // Quests
  const dailyQuests = [
    { id: 1, title: "Check-in 3 Streaks", reward: "50 Coins", progress: 2, total: 3, icon: "🔥" },
    { id: 2, title: "7-Day Streak Chain", reward: "1 Gem", progress: 5, total: 7, icon: "⛓️" },
    { id: 3, title: "Complete All Streaks", reward: "100 XP", progress: 4, total: 5, icon: "🎯" },
    { id: 4, title: "Invite a Friend", reward: "200 Coins", progress: 0, total: 1, icon: "👥" },
    { id: 5, title: "Morning Routine", reward: "75 XP", progress: 1, total: 3, icon: "🌅" }
  ];

  // Challenges
  const weeklyChallenges = [
    { id: 1, title: "30-Day Marathon", description: "Maintain a streak for 30 days straight", participants: 1245, prize: "Legendary Badge", icon: "🏃‍♂️" },
    { id: 2, title: "Habit Master", description: "Complete 10 different habits this week", participants: 892, prize: "500 Coins", icon: "👑" },
    { id: 3, title: "Early Bird", description: "Check-in before 7 AM for 7 days", participants: 567, prize: "Dawn Breaker Title", icon: "🐦" },
    { id: 4, title: "Community Hero", description: "Help 5 friends with their streaks", participants: 321, prize: "Helper Badge", icon: "🦸‍♂️" }
  ];

  // Rewards
  const availableRewards = [
    { id: 1, name: "Fire Avatar", cost: 500, icon: "🔥", type: "avatar" },
    { id: 2, name: "Golden Frame", cost: 1000, icon: "🖼️", type: "frame" },
    { id: 3, name: "Streak Booster", cost: 200, icon: "⚡", type: "booster" },
    { id: 4, name: "Custom Theme", cost: 750, icon: "🎨", type: "theme" },
    { id: 5, name: "AI Assistant", cost: 1500, icon: "🤖", type: "assistant" }
  ];

  // Quick habits with more data
  const quickHabits = [
    { name: "Morning Meditation", category: "Mindfulness", difficulty: "Easy", emoji: "🧘‍♂️", time: "07:00", xp: 15 },
    { name: "Evening Walk", category: "Fitness", difficulty: "Easy", emoji: "🚶‍♂️", time: "18:00", xp: 10 },
    { name: "Read 20 Pages", category: "Reading", difficulty: "Medium", emoji: "📖", time: "21:00", xp: 25 },
    { name: "Drink 2L Water", category: "Health", difficulty: "Easy", emoji: "💧", time: "All day", xp: 10 },
    { name: "Learn Spanish", category: "Learning", difficulty: "Hard", emoji: "🇪🇸", time: "19:00", xp: 50 },
    { name: "Journal Writing", category: "Creative", difficulty: "Medium", emoji: "📝", time: "20:00", xp: 25 },
    { name: "Digital Detox", category: "Productivity", difficulty: "Hard", emoji: "📵", time: "22:00", xp: 40 },
    { name: "Gratitude Practice", category: "Wellness", difficulty: "Easy", emoji: "🙏", time: "08:00", xp: 15 },
    { name: "Full Workout", category: "Fitness", difficulty: "Medium", emoji: "🏋️‍♂️", time: "17:00", xp: 30 },
    { name: "Call Family", category: "Social", difficulty: "Easy", emoji: "👨‍👩‍👧‍👦", time: "20:00", xp: 20 }
  ];

  // Use Effects
  useEffect(() => {
    // Play background music if enabled
    if (musicEnabled) {
      backgroundMusic.play();
    } else {
      backgroundMusic.stop();
    }

    // Initialize AI message
    setAiMessage(getRandomAIMessage());

    // Simulate community activity updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const actions = ["started a new streak", "reached a milestone", "joined a challenge", "earned a badge"];
        const users = ["Alex", "Sarah", "Mike", "Emma", "John", "Lisa"];
        const newActivity = {
          user: users[Math.floor(Math.random() * users.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          streak: quickHabits[Math.floor(Math.random() * quickHabits.length)].name,
          time: "Just now",
          avatar: "👤"
        };
        setCommunityActivity(prev => [newActivity, ...prev.slice(0, 4)]);
      }
    }, 30000);

    return () => {
      backgroundMusic.stop();
      clearInterval(interval);
    };
  }, [musicEnabled]);

  // Sound effects
  const playSound = (sound) => {
    if (soundEnabled) {
      sound.play();
    }
  };

  // AI Messages
  const getRandomAIMessage = () => {
    const messages = [
      "I see you're building great habits! Keep going!",
      "Your consistency is inspiring! 🔥",
      "Ready to tackle today's challenges?",
      "You're on fire! 3 days in a row!",
      "Need help optimizing your routine?",
      "Great progress this week! 🎯",
      "I predict you'll reach your goals!",
      "Your dedication is remarkable! 💪"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Handle adding habit with enhanced features
  const handleAddHabit = () => {
    if (!newHabit.trim()) {
      toast.error('Please enter a habit name');
      return;
    }

    setIsLoading(true);
    playSound(clickSound);

    setTimeout(() => {
      const difficulty = getDifficultyLevel(dailyGoal);
      const difficultyData = difficultyLevels.find(d => d.level === difficulty);
      
      const newStreak = {
        id: Date.now().toString(),
        name: newHabit,
        description: newDescription || `Daily ${newHabit.toLowerCase()} practice`,
        category: selectedCategory,
        dailyGoal: parseInt(dailyGoal),
        difficulty: difficulty,
        createdAt: new Date().toISOString(),
        tags: [...selectedTags, selectedCategory.toLowerCase(), 'new'],
        streak: 0,
        longestStreak: 0,
        missedDays: 0,
        lastCheckIn: null,
        archived: false,
        reminderTime: reminderTime,
        color: getCategoryColor(selectedCategory),
        xp: difficultyData?.xp || 10,
        coins: difficultyData?.coins || 5,
        createdAtTimestamp: Date.now()
      };
      
      addStreak(newStreak);
      
      // Award XP and Coins
      setUserXP(prev => prev + (difficultyData?.xp || 10));
      setUserCoins(prev => prev + (difficultyData?.coins || 5));
      
      // Level up check
      if (userXP + (difficultyData?.xp || 10) >= userLevel * 100) {
        setUserLevel(prev => prev + 1);
        setAchievementUnlocked({ title: "Level Up!", description: `Reached Level ${userLevel + 1}` });
        setTimeout(() => setAchievementUnlocked(null), 3000);
      }
      
      // Show celebration
      setShowConfetti(true);
      setShowFireworks(true);
      playSound(successSound);
      
      toast.success(
        <div className="d-flex align-items-center">
          <VolumeUp className="me-2 text-warning" />
          <div>
            <strong className="d-block" style={{ color: '#ffffff' }}>{newHabit}</strong>
            <small style={{ color: '#d1d5db' }}>+{difficultyData?.xp || 10} XP • +{difficultyData?.coins || 5} Coins</small>
          </div>
        </div>,
        { duration: 3000 }
      );
      
      // Reset form
      setNewHabit('');
      setNewDescription('');
      setSelectedCategory('Fitness');
      setDailyGoal('15');
      setSelectedTags([]);
      setShowModal(false);
      setIsLoading(false);
      
      setTimeout(() => {
        setShowConfetti(false);
        setShowFireworks(false);
      }, 3000);
    }, 500);
  };

  const handleEditStreak = (streak) => {
    setSelectedStreak(streak);
    setNewHabit(streak.name);
    setNewDescription(streak.description);
    setSelectedCategory(streak.category);
    setDailyGoal(streak.dailyGoal?.toString() || '15');
    setSelectedTags(streak.tags || []);
    setShowEditModal(true);
  };

  const handleUpdateStreak = () => {
    if (!selectedStreak) return;
    
    const updatedStreak = {
      ...selectedStreak,
      name: newHabit,
      description: newDescription,
      category: selectedCategory,
      dailyGoal: parseInt(dailyGoal),
      difficulty: getDifficultyLevel(dailyGoal),
      tags: selectedTags,
      reminderTime: reminderTime
    };
    
    updateStreak(selectedStreak.id, updatedStreak);
    toast.success(`${newHabit} updated successfully!`);
    setShowEditModal(false);
    resetForm();
  };

  const handleDeleteStreak = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      if (typeof deleteStreak === 'function') {
        deleteStreak(id);
        toast.error(`"${name}" deleted`);
      }
    }
  };

  const handleResetStreak = (id, name) => {
    if (window.confirm(`Reset "${name}" streak to 0?`)) {
      if (typeof resetStreak === 'function') {
        resetStreak(id);
        toast.warning(`"${name}" reset to 0`);
      }
    }
  };

  const handleArchiveStreak = (id, name) => {
    if (typeof archiveStreak === 'function') {
      archiveStreak(id);
      toast.info(`${name} ${streaks.find(s => s.id === id)?.archived ? 'unarchived' : 'archived'}`);
    }
  };

  // Enhanced check-in with rewards
  const handleCheckIn = (id) => {
    const streak = streaks.find(s => s.id === id);
    if (!streak) return;
    
    playSound(checkInSound);
    
    // Create check-in animation
    setShowStreakAnimation(true);
    setTimeout(() => setShowStreakAnimation(false), 1000);
    
    // Award rewards
    const xpReward = streak.xp || 10;
    const coinReward = streak.coins || 5;
    
    setUserXP(prev => prev + xpReward);
    setUserCoins(prev => prev + coinReward);
    setDailyStreak(prev => prev + 1);
    
    // Check for achievements
    const newStreakCount = streak.streak + 1;
    if (newStreakCount % 7 === 0) {
      setAchievementUnlocked({ 
        title: "Weekly Warrior!",
        description: `${newStreakCount}-day streak maintained`
      });
      setTimeout(() => setAchievementUnlocked(null), 3000);
    }
    
    if (newStreakCount % 30 === 0) {
      setUserGems(prev => prev + 1);
      setAchievementUnlocked({ 
        title: "Monthly Master!",
        description: "Earned 1 Gem"
      });
    }
    
    toast.success(
      <div className="d-flex align-items-center">
        <Fire className="me-2 text-warning" />
        <div>
          <strong className="d-block" style={{ color: '#ffffff' }}>Day {newStreakCount} Complete! 🎉</strong>
          <small style={{ color: '#d1d5db' }}>+{xpReward} XP • +{coinReward} Coins</small>
        </div>
      </div>,
      { duration: 2000 }
    );
    
    // Update streak in context
    if (typeof checkStreak === 'function') {
      checkStreak(id);
    }
  };

  // Bulk check-in with enhanced feedback
  const handleBulkCheckIn = () => {
    const dueStreaks = streaks.filter(s => {
      const lastCheckIn = s.lastCheckIn ? new Date(s.lastCheckIn) : null;
      const today = new Date();
      return !s.archived && (!lastCheckIn || lastCheckIn.toDateString() !== today.toDateString());
    });
    
    if (dueStreaks.length === 0) {
      toast.info("All streaks already checked in today! 🎯");
      return;
    }
    
    dueStreaks.forEach(streak => {
      handleCheckIn(streak.id);
    });
    
    setShowConfetti(true);
    playSound(successSound);
    
    toast.success(
      <div className="d-flex align-items-center">
        <CheckCircle className="me-2 text-success" />
        <div>
          <strong className="d-block" style={{ color: '#ffffff' }}>Bulk check-in complete!</strong>
          <small style={{ color: '#d1d5db' }}>{dueStreaks.length} streaks updated • +{dueStreaks.length * 10} XP</small>
        </div>
      </div>
    );
    
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Quick add with rewards
  const handleQuickAdd = (habitName, category, difficulty = 'Medium') => {
    setIsLoading(true);
    playSound(clickSound);
    
    setTimeout(() => {
      const difficultyData = difficultyLevels.find(d => d.level === difficulty);
      const newStreak = {
        id: Date.now().toString(),
        name: habitName,
        description: `Daily ${habitName.toLowerCase()} practice for better ${category.toLowerCase()}`,
        category: category,
        dailyGoal: getGoalFromDifficulty(difficulty),
        difficulty: difficulty,
        tags: [category.toLowerCase(), 'quick-start', difficulty.toLowerCase()],
        streak: 0,
        longestStreak: 0,
        missedDays: 0,
        lastCheckIn: null,
        archived: false,
        reminderTime: '09:00',
        color: getCategoryColor(category),
        xp: difficultyData?.xp || 10,
        coins: difficultyData?.coins || 5
      };
      
      addStreak(newStreak);
      
      // Award XP and Coins
      setUserXP(prev => prev + (difficultyData?.xp || 10));
      setUserCoins(prev => prev + (difficultyData?.coins || 5));
      
      toast.success(
        <div className="d-flex align-items-center">
          <Rocket className="me-2 text-warning" />
          <div>
            <strong className="d-block" style={{ color: '#ffffff' }}>{habitName}</strong>
            <small style={{ color: '#d1d5db' }}>+{difficultyData?.xp || 10} XP • +{difficultyData?.coins || 5} Coins</small>
          </div>
        </div>
      );
      
      setIsLoading(false);
    }, 300);
  };

  // Helper functions
  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color : '#607D8B';
  };

  const getCategoryGradient = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.gradient : 'linear-gradient(135deg, #607D8B, #78909C)';
  };

  const getCategoryEmoji = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.emoji : '📌';
  };

  const getDifficultyLevel = (goal) => {
    const goalNum = parseInt(goal);
    if (goalNum <= 15) return 'Easy';
    if (goalNum <= 30) return 'Medium';
    if (goalNum <= 60) return 'Hard';
    return 'Extreme';
  };

  const getGoalFromDifficulty = (difficulty) => {
    const level = difficultyLevels.find(d => d.level === difficulty);
    return level ? level.goal : '30';
  };

  const getDifficultyIcon = (difficulty) => {
    const level = difficultyLevels.find(d => d.level === difficulty);
    return level ? level.icon : '💪';
  };

  const getDifficultyColor = (difficulty) => {
    const level = difficultyLevels.find(d => d.level === difficulty);
    return level ? level.color : '#3B82F6';
  };

  const resetForm = () => {
    setNewHabit('');
    setNewDescription('');
    setSelectedCategory('Fitness');
    setDailyGoal('15');
    setSelectedTags([]);
    setSelectedStreak(null);
  };

  // Filter and sort streaks
  const filteredStreaks = streaks
    ?.filter(streak => {
      if (activeTab === 'active') return !streak.archived;
      if (activeTab === 'archived') return streak.archived;
      if (activeTab === 'completed') {
        const lastCheckIn = streak.lastCheckIn ? new Date(streak.lastCheckIn) : null;
        const today = new Date();
        return !streak.archived && lastCheckIn && lastCheckIn.toDateString() === today.toDateString();
      }
      return true;
    })
    .filter(streak => {
      const matchesSearch = streak.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           streak.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (streak.tags && streak.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory = filterCategory === 'All' || streak.category === filterCategory;
      const matchesTags = selectedTags.length === 0 || 
                         (streak.tags && selectedTags.every(tag => streak.tags.includes(tag)));
      return matchesSearch && matchesCategory && matchesTags;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'streak': return b.streak - a.streak;
        case 'name': return a.name.localeCompare(b.name);
        case 'recent': return new Date(b.createdAt) - new Date(a.createdAt);
        case 'difficulty': return getDifficultyValue(b.difficulty) - getDifficultyValue(a.difficulty);
        case 'completion': 
          const aRate = a.streak / (a.streak + (a.missedDays || 0)) || 0;
          const bRate = b.streak / (b.streak + (b.missedDays || 0)) || 0;
          return bRate - aRate;
        case 'reward': return (b.xp || 0) - (a.xp || 0);
        default: return b.streak - a.streak;
      }
    }) || [];

  const streaksDueToday = streaks?.filter(streak => {
    const lastCheckIn = streak.lastCheckIn ? new Date(streak.lastCheckIn) : null;
    const today = new Date();
    return !streak.archived && (!lastCheckIn || lastCheckIn.toDateString() !== today.toDateString());
  }) || [];

  const streaksCompletedToday = streaks?.filter(streak => {
    const lastCheckIn = streak.lastCheckIn ? new Date(streak.lastCheckIn) : null;
    const today = new Date();
    return !streak.archived && lastCheckIn && lastCheckIn.toDateString() === today.toDateString();
  }) || [];

  const completionRate = streaks?.length > 0 
    ? Math.round((streaksCompletedToday.length / streaks.filter(s => !s.archived).length) * 100)
    : 0;

  const getDifficultyValue = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 1;
      case 'Medium': return 2;
      case 'Hard': return 3;
      case 'Extreme': return 4;
      default: return 2;
    }
  };

  const calculateProgressPercentage = (streak) => {
    if (!streak.longestStreak || streak.longestStreak === 0) return 0;
    return Math.round((streak.streak / streak.longestStreak) * 100);
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Claim reward
  const claimReward = (reward) => {
    if (userCoins >= reward.cost) {
      setUserCoins(prev => prev - reward.cost);
      toast.success(
        <div className="d-flex align-items-center">
          <Gift className="me-2 text-success" />
          <div>
            <strong className="d-block" style={{ color: '#ffffff' }}>{reward.name} Unlocked!</strong>
            <small style={{ color: '#d1d5db' }}>-{reward.cost} Coins</small>
          </div>
        </div>
      );
      playSound(successSound);
    } else {
      toast.error("Not enough coins! Keep building streaks!");
    }
  };

  // Close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    resetForm();
  };

  return (
    <>
      {/* Confetti */}
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Fireworks */}
      {showFireworks && (
        <div className="fireworks-overlay">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="firework" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }} />
          ))}
        </div>
      )}
      
      {/* Particles Background */}
      {particlesEnabled && (
        <Particles
          className="particles-background"
          params={{
            particles: {
              number: { value: 50, density: { enable: true, value_area: 800 } },
              color: { value: "#3b82f6" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 150, color: "#8b5cf6", opacity: 0.2, width: 1 },
              move: { enable: true, speed: 2, direction: "none", random: true }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
              }
            }
          }}
        />
      )}
      
      {/* Achievement Toast */}
      {achievementUnlocked && (
        <div className="achievement-toast">
          <div className="achievement-content">
            <Trophy className="text-warning me-2" size={24} />
            <div>
              <strong className="d-block" style={{ color: '#000000' }}>{achievementUnlocked.title}</strong>
              <small style={{ color: '#374151' }}>{achievementUnlocked.description}</small>
            </div>
          </div>
        </div>
      )}
      
      {/* Streak Animation */}
      {showStreakAnimation && (
        <div className="streak-animation">
          <div className="fire-trail" />
          <Fire size={48} className="fire-icon" />
        </div>
      )}

      <Container fluid className="py-4 px-3 px-md-4 px-lg-5" style={{ 
        background: darkMode 
          ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)' 
          : 'linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 50%, #d4e4ff 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden'
      }}>
        {/* Demo Banner */}
        <DemoBanner />
        
        {/* Floating Action Buttons */}
        <div className="floating-actions">
          <Button 
            variant="primary"
            className="floating-btn main-floating"
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              border: 'none',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)'
            }}
          >
            <Plus size={24} />
          </Button>
          
          <Button 
            variant="warning"
            className="floating-btn"
            onClick={() => setShowAIAssistant(true)}
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              border: 'none',
              width: '50px',
              height: '50px',
              borderRadius: '50%'
            }}
          >
            <Magic size={20} />
          </Button>
          
          <Button 
            variant="success"
            className="floating-btn"
            onClick={() => setShowDailyChallenge(true)}
            style={{
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              border: 'none',
              width: '50px',
              height: '50px',
              borderRadius: '50%'
            }}
          >
            <Rocket size={20} />
          </Button>
        </div>

        {/* User Profile Bar */}
        <Card className="mb-4 border-0 shadow-lg user-profile-bar" style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          <Card.Body className="p-3">
            <Row className="align-items-center">
              <Col xs="auto">
                <div className="user-avatar" style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <ChatSquare className="text-warning" size={24} />
                  <div className="level-badge">Lv.{userLevel}</div>
                </div>
              </Col>
              
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: '#ffffff' }}>Streak Master</h5>
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center">
                        <Fire className="text-warning me-1" />
                        <small style={{ color: '#d1d5db' }}>{dailyStreak} days</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <Rocket className="text-success me-1" />
                        <small style={{ color: '#d1d5db' }}>{completionRate}% rate</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex gap-3">
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: '#f59e0b', fontSize: '1.2rem' }}>
                        <Coin className="me-1" />
                        {userCoins}
                      </div>
                      <small style={{ color: '#d1d5db' }}>Coins</small>
                    </div>
                    
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: '#8b5cf6', fontSize: '1.2rem' }}>
                        <Gem className="me-1" />
                        {userGems}
                      </div>
                      <small style={{ color: '#d1d5db' }}>Gems</small>
                    </div>
                    
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: '#10b981', fontSize: '1.2rem' }}>
                        <Star className="me-1" />
                        {userXP}
                      </div>
                      <small style={{ color: '#d1d5db' }}>XP</small>
                    </div>
                  </div>
                </div>
                
                {/* XP Progress Bar */}
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-1">
                    <small style={{ color: '#d1d5db' }}>Level Progress</small>
                    <small className="fw-bold" style={{ color: '#3b82f6' }}>
                      {userXP % 100}/100 XP
                    </small>
                  </div>
                  <ProgressBar 
                    now={userXP % 100}
                    style={{ 
                      height: '8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <ProgressBar 
                      variant="primary"
                      style={{
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        borderRadius: '4px'
                      }}
                    />
                  </ProgressBar>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Main Content */}
        <Row className="g-4">
          {/* Left Sidebar */}
          <Col lg={3} className="d-none d-lg-block">
            {/* Quick Stats */}
            <Card className="mb-4 border-0 shadow-lg" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <Card.Body>
                <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>
                  <BarChart className="me-2" />
                  Quick Stats
                </h6>
                
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 py-2 px-0" style={{ background: 'transparent' }}>
                    <div className="d-flex align-items-center">
                      <div className="stat-icon me-3" style={{
                        width: '36px',
                        height: '36px',
                        background: 'rgba(59, 130, 246, 0.2)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Fire size={16} className="text-primary" />
                      </div>
                      <div>
                        <div style={{ color: '#d1d5db' }} className="small">Active Streaks</div>
                        <div className="fw-bold" style={{ color: '#ffffff' }}>
                          <CountUp end={streaks?.filter(s => !s.archived).length || 0} duration={1} />
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 py-2 px-0" style={{ background: 'transparent' }}>
                    <div className="d-flex align-items-center">
                      <div className="stat-icon me-3" style={{
                        width: '36px',
                        height: '36px',
                        background: 'rgba(16, 185, 129, 0.2)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CheckCircle size={16} className="text-success" />
                      </div>
                      <div>
                        <div style={{ color: '#d1d5db' }} className="small">Completed Today</div>
                        <div className="fw-bold" style={{ color: '#ffffff' }}>
                          <CountUp end={streaksCompletedToday.length} duration={1} />
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 py-2 px-0" style={{ background: 'transparent' }}>
                    <div className="d-flex align-items-center">
                      <div className="stat-icon me-3" style={{
                        width: '36px',
                        height: '36px',
                        background: 'rgba(245, 158, 11, 0.2)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Trophy size={16} className="text-warning" />
                      </div>
                      <div>
                        <div style={{ color: '#d1d5db' }} className="small">Longest Streak</div>
                        <div className="fw-bold" style={{ color: '#ffffff' }}>
                          <CountUp end={stats.longestStreak || 0} duration={1} />
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 py-2 px-0" style={{ background: 'transparent' }}>
                    <div className="d-flex align-items-center">
                      <div className="stat-icon me-3" style={{
                        width: '36px',
                        height: '36px',
                        background: 'rgba(139, 92, 246, 0.2)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Rocket size={16} className="text-purple" />
                      </div>
                      <div>
                        <div style={{ color: '#d1d5db' }} className="small">Success Rate</div>
                        <div className="fw-bold" style={{ color: '#ffffff' }}>
                          <CountUp end={completionRate} suffix="%" duration={1} />
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Daily Quests */}
            <Card className="mb-4 border-0 shadow-lg" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0" style={{ color: '#ffffff' }}>
                    <Rocket className="me-2" />
                    Daily Quests
                  </h6>
                  <Button 
                    variant="link" 
                    className="p-0"
                    onClick={() => setShowQuestModal(true)}
                    style={{ color: '#3b82f6' }}
                  >
                    View All
                  </Button>
                </div>
                
                {dailyQuests.slice(0, 3).map((quest) => (
                  <div key={quest.id} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="d-flex align-items-center">
                        <span className="me-2">{quest.icon}</span>
                        <small style={{ color: '#ffffff' }}>{quest.title}</small>
                      </div>
                      <Badge bg="warning">{quest.reward}</Badge>
                    </div>
                    <ProgressBar 
                      now={(quest.progress / quest.total) * 100}
                      style={{ 
                        height: '6px',
                        borderRadius: '3px',
                        background: 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <ProgressBar 
                        variant="warning"
                        style={{ borderRadius: '3px' }}
                      />
                    </ProgressBar>
                  </div>
                ))}
                
                <Button 
                  variant="outline-warning" 
                  size="sm"
                  className="w-100 mt-2"
                  onClick={() => setShowQuestModal(true)}
                >
                  Complete Quests
                </Button>
              </Card.Body>
            </Card>

            {/* Community Activity */}
            <Card className="border-0 shadow-lg" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0" style={{ color: '#ffffff' }}>
                    <People className="me-2" />
                    Community
                  </h6>
                  <Button 
                    variant="link" 
                    className="p-0"
                    onClick={() => setShowCommunityModal(true)}
                    style={{ color: '#3b82f6' }}
                  >
                    Join
                  </Button>
                </div>
                
                <div className="community-feed">
                  {communityActivity.map((activity, index) => (
                    <div key={index} className="d-flex align-items-start mb-3">
                      <div className="me-2">
                        <div style={{
                          width: '32px',
                          height: '32px',
                          background: 'rgba(59, 130, 246, 0.2)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {activity.avatar}
                        </div>
                      </div>
                      <div>
                        <small style={{ color: '#ffffff' }}>
                          <strong>{activity.user}</strong> {activity.action}
                        </small>
                        <small className="d-block" style={{ color: '#d1d5db' }}>{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="w-100"
                  onClick={() => setShowCommunityModal(true)}
                >
                  Join Community Chat
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content Area */}
          <Col lg={6}>
            {/* Hero Section with AI Assistant */}
            <Card className="mb-4 border-0 shadow-lg hero-card" style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              overflow: 'hidden'
            }}>
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col md={8}>
                    <div className="d-flex align-items-center mb-3">
                      <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        animation: 'pulse 2s infinite'
                      }}>
                        <Fire size={32} className="text-white" />
                      </div>
                      <div>
                        <h1 className="fw-bold mb-1" style={{ 
                          color: '#ffffff',
                          fontSize: '2rem'
                        }}>
                          <TypeAnimation
                            sequence={[
                              'Build Better Habits',
                              2000,
                              'Achieve Your Goals',
                              2000,
                              'Master Your Routine',
                              2000,
                              'Transform Your Life',
                              2000
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                          />
                        </h1>
                        <p style={{ color: '#d1d5db' }} className="mb-0">
                          Track • Improve • Succeed
                        </p>
                      </div>
                    </div>
                    
                    {/* AI Assistant */}
                    <div className="ai-assistant mb-3">
                      <div className="d-flex align-items-center">
                        <div className="ai-avatar me-3">
                          <Magic className="text-primary" />
                        </div>
                        <div className="ai-message flex-grow-1">
                          <div className="speech-bubble">
                            <p className="mb-0" style={{ color: '#1e293b' }}>
                              {aiMessage}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="link" 
                          className="p-0"
                          onClick={() => setAiMessage(getRandomAIMessage())}
                        >
                          <RefreshIcon />
                        </Button>
                      </div>
                    </div>
                  </Col>
                  
                  <Col md={4}>
                    <div className="d-flex flex-column gap-3">
                      <Button 
                        variant="primary" 
                        className="fw-bold py-3"
                        onClick={() => setShowModal(true)}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                          border: 'none',
                          borderRadius: '15px',
                          fontSize: '1rem',
                          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                          color: '#ffffff'
                        }}
                      >
                        <Plus className="me-2" />
                        New Habit
                      </Button>
                      
                      {streaksDueToday.length > 0 && (
                        <Button 
                          variant="warning" 
                          className="fw-bold py-3"
                          onClick={handleBulkCheckIn}
                          style={{
                            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                            border: 'none',
                            borderRadius: '15px',
                            fontSize: '1rem',
                            color: '#000000'
                          }}
                        >
                          <Lightning className="me-2" />
                          Quick Check-in ({streaksDueToday.length})
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline-light" 
                        className="fw-bold py-2"
                        onClick={() => setShowChallengesModal(true)}
                        style={{ color: '#ffffff' }}
                      >
                        <Trophy className="me-2" />
                        Join Challenge
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Control Bar */}
            <Card className="mb-4 border-0 shadow-sm" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px'
            }}>
              <Card.Body className="p-3">
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  {/* Tabs */}
                  <div className="d-flex gap-2">
                    <Button
                      variant={activeTab === 'active' ? 'primary' : 'outline-light'}
                      size="sm"
                      onClick={() => {
                        setActiveTab('active');
                        playSound(clickSound);
                      }}
                      className="rounded-pill"
                      style={{ color: activeTab === 'active' ? '#ffffff' : '#d1d5db' }}
                    >
                      <Fire size={14} className="me-1" />
                      Active ({streaks?.filter(s => !s.archived).length || 0})
                    </Button>
                    <Button
                      variant={activeTab === 'completed' ? 'success' : 'outline-light'}
                      size="sm"
                      onClick={() => {
                        setActiveTab('completed');
                        playSound(clickSound);
                      }}
                      className="rounded-pill"
                      style={{ color: activeTab === 'completed' ? '#ffffff' : '#d1d5db' }}
                    >
                      <CheckCircle size={14} className="me-1" />
                      Today ({streaksCompletedToday.length})
                    </Button>
                    <Button
                      variant={activeTab === 'archived' ? 'secondary' : 'outline-light'}
                      size="sm"
                      onClick={() => {
                        setActiveTab('archived');
                        playSound(clickSound);
                      }}
                      className="rounded-pill"
                      style={{ color: activeTab === 'archived' ? '#ffffff' : '#d1d5db' }}
                    >
                      <ArchiveIcon size={14} className="me-1" />
                      Archived
                    </Button>
                  </div>

                  {/* Search */}
                  <div className="flex-grow-1" style={{ maxWidth: '300px' }}>
                    <InputGroup size="sm">
                      <InputGroup.Text style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRight: 'none',
                        color: '#d1d5db'
                      }}>
                        <Search size={14} />
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Search habits..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderLeft: 'none',
                          color: '#ffffff'
                        }}
                      />
                    </InputGroup>
                  </div>

                  {/* View Toggle */}
                  <div className="view-toggle">
                    <Button
                      variant={viewMode === 'grid' ? 'primary' : 'outline-light'}
                      size="sm"
                      onClick={() => {
                        setViewMode('grid');
                        playSound(clickSound);
                      }}
                      style={{ color: viewMode === 'grid' ? '#ffffff' : '#d1d5db' }}
                    >
                      <Grid3x3 size={14} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'primary' : 'outline-light'}
                      size="sm"
                      onClick={() => {
                        setViewMode('list');
                        playSound(clickSound);
                      }}
                      style={{ color: viewMode === 'list' ? '#ffffff' : '#d1d5db' }}
                    >
                      <ListUl size={14} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Streaks Display */}
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p style={{ color: '#d1d5db' }} className="mt-3">Loading your streaks...</p>
              </div>
            ) : filteredStreaks.length === 0 ? (
              <Card className="border-0 shadow-lg text-center py-5" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px'
              }}>
                <Card.Body>
                  <div className="empty-state-icon mb-4">
                    <Fire size={64} style={{ 
                      color: '#475569',
                      opacity: 0.5
                    }} />
                  </div>
                  <h4 className="mb-3" style={{ color: '#ffffff' }}>
                    {searchTerm || filterCategory !== 'All' || selectedTags.length > 0 
                      ? 'No streaks match your filters' 
                      : 'Start Your Journey!'}
                  </h4>
                  <p style={{ color: '#d1d5db' }} className="mb-4">
                    {searchTerm || filterCategory !== 'All' || selectedTags.length > 0
                      ? 'Try adjusting your search or filters'
                      : 'Build your first habit and earn rewards!'}
                  </p>
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => {
                      setShowModal(true);
                      setSearchTerm('');
                      setFilterCategory('All');
                      setSelectedTags([]);
                    }}
                    className="px-5 py-3"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      border: 'none',
                      borderRadius: '15px',
                      color: '#ffffff'
                    }}
                  >
                    <Plus className="me-2" />
                    Create Your First Streak
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? 'row g-4' : 'd-flex flex-column gap-3'}>
                {filteredStreaks.map((streak) => (
                  <StreakCard 
                    key={streak.id} 
                    streak={streak} 
                    viewMode={viewMode}
                    onCheckIn={handleCheckIn}
                    darkMode={darkMode}
                    categories={categories}
                    difficultyLevels={difficultyLevels}
                    getCategoryColor={getCategoryColor}
                    getCategoryGradient={getCategoryGradient}
                    getCategoryEmoji={getCategoryEmoji}
                    getDifficultyIcon={getDifficultyIcon}
                    getDifficultyColor={getDifficultyColor}
                    calculateProgressPercentage={calculateProgressPercentage}
                    onEdit={() => handleEditStreak(streak)}
                    onDelete={() => handleDeleteStreak(streak.id, streak.name)}
                    onArchive={() => handleArchiveStreak(streak.id, streak.name)}
                    onReset={() => handleResetStreak(streak.id, streak.name)}
                  />
                ))}
              </div>
            )}
          </Col>

          {/* Right Sidebar */}
          <Col lg={3} className="d-none d-lg-block">
            {/* Quick Add */}
            <Card className="mb-4 border-0 shadow-lg" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px'
            }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                      <Rocket className="me-2 text-warning" />
                      Quick Start
                    </h6>
                    <small style={{ color: '#d1d5db' }}>Popular habits</small>
                  </div>
                  <Badge bg="warning">+XP</Badge>
                </div>
                
                <div className="row g-2">
                  {quickHabits.map((habit, index) => (
                    <div key={index} className="col-6">
                      <QuickHabitCard 
                        habit={habit}
                        onClick={() => handleQuickAdd(habit.name, habit.category, habit.difficulty)}
                        getCategoryColor={getCategoryColor}
                        darkMode={darkMode}
                      />
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Weekly Challenge */}
            <Card className="mb-4 border-0 shadow-lg" style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="challenge-badge me-3">
                    <Trophy className="text-warning" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                      Weekly Challenge
                    </h6>
                    <small style={{ color: '#d1d5db' }}>Ends in 2 days</small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small style={{ color: '#d1d5db' }}>Progress</small>
                    <small className="fw-bold" style={{ color: '#ffffff' }}>
                      {challengeProgress}%
                    </small>
                  </div>
                  <ProgressBar 
                    now={challengeProgress}
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
                
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="d-block" style={{ color: '#d1d5db' }}>Prize Pool</small>
                    <div className="d-flex align-items-center">
                      <Coin className="me-1" style={{ color: '#f59e0b' }} />
                      <strong style={{ color: '#ffffff' }}>5,000</strong>
                    </div>
                  </div>
                  <Button 
                    variant="warning" 
                    size="sm"
                    onClick={() => setShowChallengesModal(true)}
                    style={{ color: '#000000' }}
                  >
                    Join Now
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Streak Prediction */}
            <Card className="mb-4 border-0 shadow-lg" style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '20px'
            }}>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="prediction-icon me-3">
                    <GraphUp className="text-primary" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#ffffff' }}>
                      Streak Prediction
                    </h6>
                    <small style={{ color: '#d1d5db' }}>AI-powered insights</small>
                  </div>
                </div>
                
                <div className="text-center py-3">
                  <div className="prediction-value mb-2">
                    <span className="display-4 fw-bold" style={{ 
                      color: streakPrediction > 80 ? '#10b981' : streakPrediction > 60 ? '#f59e0b' : '#ef4444'
                    }}>
                      {streakPrediction}%
                    </span>
                  </div>
                  <p style={{ color: '#d1d5db' }} className="mb-3">
                    Chance of maintaining your current streak this week
                  </p>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => setShowStreakPrediction(true)}
                    style={{ color: '#3b82f6', borderColor: '#3b82f6' }}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Daily Tip */}
            {showDailyTip && (
              <Card className="border-0 shadow-lg" style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '20px'
              }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold mb-0" style={{ color: '#ffffff' }}>
                      <Lightning className="me-2" />
                      Daily Tip
                    </h6>
                    <Button 
                      variant="link" 
                      className="p-0"
                      onClick={() => setShowDailyTip(false)}
                    >
                      <X size={16} style={{ color: '#d1d5db' }} />
                    </Button>
                  </div>
                  <p className="mb-0" style={{ color: '#ffffff' }}>
                    <strong>Pro Tip:</strong> Checking in at the same time each day increases consistency by 40%!
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      {/* All Modals */}
      <CreateStreakModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        newHabit={newHabit}
        setNewHabit={setNewHabit}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        dailyGoal={dailyGoal}
        setDailyGoal={setDailyGoal}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        tags={tags}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
        categories={categories}
        difficultyLevels={difficultyLevels}
        isLoading={isLoading}
        handleAddHabit={handleAddHabit}
        darkMode={darkMode}
      />

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={closeEditModal} size="lg" centered>
        <Modal.Header closeButton style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          borderColor: darkMode ? '#334155' : '#dee2e6',
          color: darkMode ? '#ffffff' : '#000000'
        }}>
          <Modal.Title style={{ color: darkMode ? '#ffffff' : '#000000' }}>
            <Pencil className="me-2" />
            Edit Streak
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000'
        }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: darkMode ? '#ffffff' : '#000000' }}>Habit Name *</Form.Label>
              <Form.Control
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter habit name"
                style={{
                  background: darkMode ? '#334155' : '#f8f9fa',
                  borderColor: darkMode ? '#475569' : '#ced4da',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label style={{ color: darkMode ? '#ffffff' : '#000000' }}>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter description"
                style={{
                  background: darkMode ? '#334155' : '#f8f9fa',
                  borderColor: darkMode ? '#475569' : '#ced4da',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
            </Form.Group>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label style={{ color: darkMode ? '#ffffff' : '#000000' }}>Category</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "primary" : "outline-secondary"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.name)}
                        style={{
                          borderColor: selectedCategory === category.name ? category.color : undefined,
                          background: selectedCategory === category.name ? category.color : undefined,
                          color: selectedCategory === category.name ? '#ffffff' : (darkMode ? '#ffffff' : '#000000')
                        }}
                      >
                        {category.icon} {category.name}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label style={{ color: darkMode ? '#ffffff' : '#000000' }}>Daily Goal (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(e.target.value)}
                    min="1"
                    max="240"
                    style={{
                      background: darkMode ? '#334155' : '#f8f9fa',
                      borderColor: darkMode ? '#475569' : '#ced4da',
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label style={{ color: darkMode ? '#ffffff' : '#000000' }}>Tags</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    bg={selectedTags.includes(tag) ? "primary" : (darkMode ? "secondary" : "light")}
                    text={selectedTags.includes(tag) ? "white" : (darkMode ? "light" : "dark")}
                    className="px-3 py-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label style={{ color: darkMode ? '#ffffff' : '#000000' }}>Daily Reminder Time</Form.Label>
              <Form.Control
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                style={{
                  background: darkMode ? '#334155' : '#f8f9fa',
                  borderColor: darkMode ? '#475569' : '#ced4da',
                  color: darkMode ? '#ffffff' : '#000000'
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          borderColor: darkMode ? '#334155' : '#dee2e6'
        }}>
          <Button 
            variant="secondary" 
            onClick={closeEditModal}
            style={{
              background: darkMode ? '#475569' : '#6c757d',
              borderColor: darkMode ? '#475569' : '#6c757d',
              color: '#ffffff'
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpdateStreak}
            style={{
              background: darkMode ? '#3b82f6' : '#0d6efd',
              borderColor: darkMode ? '#3b82f6' : '#0d6efd',
              color: '#ffffff'
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <SettingsModal 
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
        particlesEnabled={particlesEnabled}
        setParticlesEnabled={setParticlesEnabled}
      />

      <QuestsModal 
        show={showQuestModal}
        onHide={() => setShowQuestModal(false)}
        quests={dailyQuests}
        userCoins={userCoins}
      />

      <ChallengesModal 
        show={showChallengesModal}
        onHide={() => setShowChallengesModal(false)}
        challenges={weeklyChallenges}
      />

      <RewardsModal 
        show={showRewardsModal}
        onHide={() => setShowRewardsModal(false)}
        rewards={availableRewards}
        userCoins={userCoins}
        claimReward={claimReward}
      />

      <CommunityModal 
        show={showCommunityModal}
        onHide={() => setShowCommunityModal(false)}
        activity={communityActivity}
      />

      <AIAssistantModal 
        show={showAIAssistant}
        onHide={() => setShowAIAssistant(false)}
        message={aiMessage}
        setMessage={setAiMessage}
        getRandomMessage={getRandomAIMessage}
      />

      <DailyChallengeModal 
        show={showDailyChallenge}
        onHide={() => setShowDailyChallenge(false)}
      />

      <StreakPredictionModal 
        show={showStreakPrediction}
        onHide={() => setShowStreakPrediction(false)}
        prediction={streakPrediction}
        darkMode={darkMode}
      />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        
        @keyframes streak-animation {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes firework {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, -100px); opacity: 0; }
        }
        
        .floating-actions {
          position: fixed;
          bottom: 30px;
          right: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 1000;
        }
        
        .floating-btn {
          animation: float 3s ease-in-out infinite;
        }
        
        .main-floating {
          animation-delay: 0.5s;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }
        
        .achievement-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
          z-index: 1100;
          animation: slideInRight 0.5s ease;
        }
        
        .achievement-content {
          display: flex;
          align-items: center;
        }
        
        .streak-animation {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1200;
          animation: streak-animation 1s ease;
        }
        
        .fire-trail {
          position: absolute;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, transparent 70%);
          border-radius: 50%;
        }
        
        .fire-icon {
          color: #f59e0b;
          filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.8));
        }
        
        .fireworks-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 999;
        }
        
        .firework {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #f59e0b;
          border-radius: 50%;
          animation: firework 1s ease-out forwards;
        }
        
        .user-profile-bar {
          animation: glow 2s infinite;
        }
        
        .level-badge {
          position: absolute;
          bottom: -5px;
          right: -5px;
          background: #f59e0b;
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: bold;
        }
        
        .ai-assistant {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 15px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }
        
        .ai-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .speech-bubble {
          position: relative;
          background: white;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .speech-bubble:before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-right: 10px solid white;
        }
        
        .particles-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        
        .challenge-badge, .prediction-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .quick-habit-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .quick-habit-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        
        .stat-icon {
          width: 36px;
          height: 36px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 10px;
          display: flex;
          alignItems: center;
          justifyContent: center;
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .floating-actions {
            bottom: 20px;
            right: 20px;
          }
          
          .main-floating {
            width: 50px;
            height: 50px;
          }
          
          .hero-card h1 {
            font-size: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .user-profile-bar {
            margin-top: 1rem;
          }
          
          .ai-assistant {
            margin-bottom: 1rem;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
        
        /* Selection */
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: #e2e8f0;
        }
        
        /* Focus styles */
        *:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

// Helper Icons
const RefreshIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M23 4v6h-6"/>
    <path d="M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);

const ArchiveIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="2" y="4" width="20" height="5" rx="1"/>
    <path d="M4 9v9.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V9"/>
    <path d="M10 13h4"/>
  </svg>
);

const Target = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

// Streak Card Component
const StreakCard = ({ 
  streak, 
  viewMode, 
  onCheckIn, 
  darkMode, 
  categories, 
  difficultyLevels,
  getCategoryColor,
  getCategoryGradient,
  getCategoryEmoji,
  getDifficultyIcon,
  getDifficultyColor,
  calculateProgressPercentage,
  onEdit,
  onDelete,
  onArchive,
  onReset
}) => {
  const [showActions, setShowActions] = useState(false);
  
  const category = categories.find(c => c.name === streak.category);
  const difficulty = difficultyLevels.find(d => d.level === streak.difficulty);
  
  if (viewMode === 'list') {
    return (
      <Card className="mb-3 border-0 shadow-sm streak-card-list" style={{
        background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        transition: 'all 0.3s ease'
      }}>
        <Card.Body className="p-3">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <div style={{
                width: '50px',
                height: '50px',
                background: getCategoryGradient(streak.category),
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px'
              }}>
                {getCategoryEmoji(streak.category)}
              </div>
            </div>
            
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                    {streak.name}
                  </h6>
                  <div className="d-flex align-items-center gap-2">
                    <Badge bg={getCategoryColor(streak.category)}>
                      {streak.category}
                    </Badge>
                    <Badge bg={getDifficultyColor(streak.difficulty)}>
                      {getDifficultyIcon(streak.difficulty)} {streak.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="d-flex align-items-center gap-2">
                  <div className="text-center me-3">
                    <div className="h4 fw-bold mb-0" style={{ color: getCategoryColor(streak.category) }}>
                      {streak.streak}
                    </div>
                    <small style={{ color: darkMode ? '#d1d5db' : '#6c757d' }}>Days</small>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => onCheckIn(streak.id)}
                  >
                    <CheckCircle size={14} />
                  </Button>
                  
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="p-0">
                      <ThreeDots size={20} color={darkMode ? "#94a3b8" : "#6c757d"} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{
                      background: darkMode ? '#1e293b' : '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: darkMode ? '#ffffff' : '#000000'
                    }}>
                      <Dropdown.Item onClick={onEdit} style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                        <Pencil size={14} className="me-2" />
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => onArchive(streak.id, streak.name)} style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                        <ArchiveIcon size={14} className="me-2" />
                        Archive
                      </Dropdown.Item>
                      <Dropdown.Item onClick={onReset} style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                        <ArrowRepeat size={14} className="me-2" />
                        Reset
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={onDelete} className="text-danger">
                        <Trash size={14} className="me-2" />
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
  
  return (
    <div className="col-md-6 col-xl-4">
      <Card className="h-100 border-0 shadow-lg streak-card-grid" style={{
        background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}>
        {/* Card Header */}
        <div className="position-relative">
          <div style={{
            height: '6px',
            background: getCategoryGradient(streak.category),
            borderRadius: '20px 20px 0 0'
          }} />
          
          <div className="position-absolute top-0 end-0 m-3">
            <Dropdown>
              <Dropdown.Toggle variant="link" className="p-0">
                <ThreeDots size={20} color={darkMode ? "#94a3b8" : "#6c757d"} />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{
                background: darkMode ? '#1e293b' : '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: darkMode ? '#ffffff' : '#000000'
              }}>
                <Dropdown.Item onClick={() => onCheckIn(streak.id)} style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                  <CheckCircle size={14} className="me-2" />
                  Check In
                </Dropdown.Item>
                <Dropdown.Item onClick={onEdit} style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                  <Pencil size={14} className="me-2" />
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onArchive(streak.id, streak.name)} style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                  <ArchiveIcon size={14} className="me-2" />
                  Archive
                </Dropdown.Item>
                <Dropdown.Item onClick={onReset} style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                  <ArrowRepeat size={14} className="me-2" />
                  Reset
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onDelete} className="text-danger">
                  <Trash size={14} className="me-2" />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Card.Body className="p-4">
          {/* Streak Info */}
          <div className="d-flex align-items-start mb-4">
            <div className="me-3">
              <div style={{
                width: '60px',
                height: '60px',
                background: getCategoryGradient(streak.category),
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '28px',
                boxShadow: `0 8px 20px ${getCategoryColor(streak.category)}40`
              }}>
                {getCategoryEmoji(streak.category)}
              </div>
            </div>
            <div className="flex-grow-1">
              <h5 className="fw-bold mb-2" style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                {streak.name}
              </h5>
              <p className="small mb-3" style={{ color: darkMode ? '#d1d5db' : '#6c757d' }}>{streak.description}</p>
              
              {/* Rewards */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <Badge bg="warning" className="d-flex align-items-center">
                  <Star size={10} className="me-1" />
                  +{streak.xp || 10} XP
                </Badge>
                <Badge bg={darkMode ? "light" : "secondary"} text={darkMode ? "dark" : "white"} className="d-flex align-items-center">
                  <Coin size={10} className="me-1" />
                  +{streak.coins || 5} Coins
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row g-3 mb-4">
            <div className="col-4 text-center">
              <div className="h3 fw-bold mb-1" style={{ color: getCategoryColor(streak.category) }}>
                {streak.streak}
              </div>
              <small style={{ color: darkMode ? '#d1d5db' : '#6c757d' }}>Current</small>
            </div>
            <div className="col-4 text-center">
              <div className="h3 fw-bold mb-1" style={{ color: darkMode ? '#94a3b8' : '#6c757d' }}>
                {streak.longestStreak || 0}
              </div>
              <small style={{ color: darkMode ? '#d1d5db' : '#6c757d' }}>Record</small>
            </div>
            <div className="col-4 text-center">
              <div className="h3 fw-bold mb-1" style={{ color: getDifficultyColor(streak.difficulty) }}>
                {getDifficultyIcon(streak.difficulty)}
              </div>
              <small style={{ color: darkMode ? '#d1d5db' : '#6c757d' }}>{streak.difficulty}</small>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small style={{ color: darkMode ? '#d1d5db' : '#6c757d' }}>Progress</small>
              <small className="fw-bold" style={{ color: getCategoryColor(streak.category) }}>
                {calculateProgressPercentage(streak)}%
              </small>
            </div>
            <ProgressBar 
              now={calculateProgressPercentage(streak)}
              style={{ 
                height: '10px',
                borderRadius: '5px',
                background: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#e9ecef'
              }}
            >
              <ProgressBar 
                variant="custom"
                style={{
                  background: getCategoryGradient(streak.category),
                  borderRadius: '5px'
                }}
              />
            </ProgressBar>
          </div>

          {/* Action Button */}
          <Button 
            variant="primary" 
            className="w-100 py-3 fw-bold"
            onClick={() => onCheckIn(streak.id)}
            style={{
              background: getCategoryGradient(streak.category),
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              color: '#ffffff'
            }}
          >
            <CheckCircle className="me-2" size={18} />
            Check In Now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

// Quick Habit Card Component
const QuickHabitCard = ({ habit, onClick, getCategoryColor, darkMode }) => {
  return (
    <div 
      className="quick-habit-card"
      onClick={onClick}
    >
      <div className="text-center mb-3">
        <span style={{ fontSize: '28px' }}>{habit.emoji}</span>
      </div>
      <h6 className="text-center mb-2" style={{ 
        fontSize: '0.9rem',
        color: darkMode ? '#ffffff' : '#000000'
      }}>
        {habit.name}
      </h6>
      <div className="text-center mb-2">
        <Badge 
          bg={getCategoryColor(habit.category)}
          style={{ 
            fontSize: '0.75rem',
            padding: '0.3rem 0.6rem'
          }}
        >
          {habit.category}
        </Badge>
      </div>
      <div className="text-center">
        <small style={{ color: darkMode ? '#d1d5db' : '#6c757d' }}>
          <Clock size={12} className="me-1" />
          {habit.time}
        </small>
      </div>
    </div>
  );
};

// Create Streak Modal
const CreateStreakModal = ({ 
  show, onHide, newHabit, setNewHabit, newDescription, setNewDescription,
  selectedCategory, setSelectedCategory, dailyGoal, setDailyGoal, selectedTags,
  toggleTag, tags, reminderTime, setReminderTime, categories, difficultyLevels,
  isLoading, handleAddHabit, darkMode 
}) => (
  <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
    <Modal.Header closeButton style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      borderColor: darkMode ? '#334155' : '#e2e8f0',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px'
    }}>
      <Modal.Title style={{ color: darkMode ? '#ffffff' : '#1e293b' }}>
        <Plus className="me-2" />
        Create New Streak
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      padding: '2rem'
    }}>
      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p style={{ color: darkMode ? '#d1d5db' : '#6c757d' }} className="mt-3">Creating your streak...</p>
        </div>
      ) : (
        <Form>
          <Form.Group className="mb-4">
            <Form.Label style={{ color: darkMode ? '#ffffff' : '#1e293b' }}>
              <Fire className="me-2" /> Habit Name *
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Morning Meditation, Evening Walk, Read Book"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              autoFocus
              style={{
                background: darkMode ? '#334155' : '#f8fafc',
                borderColor: darkMode ? '#475569' : '#e2e8f0',
                color: darkMode ? '#ffffff' : '#1e293b',
                padding: '0.75rem',
                borderRadius: '8px'
              }}
            />
            <Form.Text style={{ color: darkMode ? '#d1d5db' : '#64748b' }}>
              Make it specific and actionable
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label style={{ color: darkMode ? '#ffffff' : '#1e293b' }}>
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Describe your habit and why it's important..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              style={{
                background: darkMode ? '#334155' : '#f8fafc',
                borderColor: darkMode ? '#475569' : '#e2e8f0',
                color: darkMode ? '#ffffff' : '#1e293b',
                borderRadius: '8px'
              }}
            />
          </Form.Group>
          
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label style={{ color: darkMode ? '#ffffff' : '#1e293b' }}>
                  <Bell className="me-2" /> Category
                </Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "primary" : "outline-secondary"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.name)}
                      style={{
                        borderRadius: '20px',
                        borderColor: selectedCategory === category.name ? category.color : undefined,
                        background: selectedCategory === category.name ? category.color : undefined,
                        color: selectedCategory === category.name ? '#ffffff' : (darkMode ? '#ffffff' : '#000000')
                      }}
                    >
                      <span className="me-1">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label style={{ color: darkMode ? '#ffffff' : '#1e293b' }}>
                  <Clock className="me-2" /> Daily Goal
                </Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {difficultyLevels.map((level) => (
                    <Button
                      key={level.level}
                      variant={dailyGoal === level.goal ? "primary" : "outline-secondary"}
                      size="sm"
                      onClick={() => setDailyGoal(level.goal)}
                      style={{
                        borderRadius: '20px',
                        borderColor: dailyGoal === level.goal ? level.color : undefined,
                        background: dailyGoal === level.goal ? level.color : undefined,
                        color: dailyGoal === level.goal ? '#ffffff' : (darkMode ? '#ffffff' : '#000000')
                      }}
                    >
                      {level.icon} {level.level} ({level.goal} min)
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-4">
            <Form.Label style={{ color: darkMode ? '#ffffff' : '#1e293b' }}>
              <Tag className="me-2" /> Tags
            </Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  bg={selectedTags.includes(tag) ? "primary" : (darkMode ? "secondary" : "light")}
                  text={selectedTags.includes(tag) ? "white" : (darkMode ? "light" : "dark")}
                  className="px-3 py-2"
                  style={{ 
                    cursor: 'pointer',
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                  }}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label style={{ color: darkMode ? '#ffffff' : '#1e293b' }}>
              <Bell className="me-2" /> Daily Reminder
            </Form.Label>
            <Form.Control
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              style={{
                background: darkMode ? '#334155' : '#f8fafc',
                borderColor: darkMode ? '#475569' : '#e2e8f0',
                color: darkMode ? '#ffffff' : '#1e293b',
                borderRadius: '8px',
                maxWidth: '200px'
              }}
            />
            <Form.Text style={{ color: darkMode ? '#d1d5db' : '#64748b' }}>
              We'll remind you to check in each day
            </Form.Text>
          </Form.Group>
        </Form>
      )}
    </Modal.Body>
    <Modal.Footer style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      borderColor: darkMode ? '#334155' : '#e2e8f0',
      borderBottomLeftRadius: '16px',
      borderBottomRightRadius: '16px'
    }}>
      <Button 
        variant={darkMode ? "outline-light" : "outline-secondary"} 
        onClick={onHide}
        disabled={isLoading}
        style={{ color: darkMode ? '#ffffff' : '#000000' }}
      >
        Cancel
      </Button>
      <Button 
        variant="primary" 
        onClick={handleAddHabit}
        disabled={!newHabit.trim() || isLoading}
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          border: 'none',
          padding: '0.5rem 2rem',
          color: '#ffffff'
        }}
      >
        {isLoading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Creating...
          </>
        ) : (
          <>
            <Plus className="me-2" />
            Create Streak
          </>
        )}
      </Button>
    </Modal.Footer>
  </Modal>
);

// Settings Modal
const SettingsModal = ({ 
  show, onHide, darkMode, setDarkMode, soundEnabled, setSoundEnabled,
  musicEnabled, setMusicEnabled, particlesEnabled, setParticlesEnabled 
}) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      borderColor: darkMode ? '#334155' : '#dee2e6',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      <Modal.Title style={{ color: darkMode ? '#ffffff' : '#000000' }}>
        ⚙️ Settings
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      <div className="mb-4">
        <h6 className="fw-bold mb-3" style={{ color: darkMode ? '#ffffff' : '#000000' }}>Appearance</h6>
        <Form.Check
          type="switch"
          id="dark-mode-switch"
          label="Dark Mode"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
          style={{ color: darkMode ? '#ffffff' : '#000000' }}
        />
      </div>
      
      <div className="mb-4">
        <h6 className="fw-bold mb-3" style={{ color: darkMode ? '#ffffff' : '#000000' }}>Sound & Effects</h6>
        <Form.Check
          type="switch"
          id="sound-switch"
          label="Sound Effects"
          checked={soundEnabled}
          onChange={(e) => setSoundEnabled(e.target.checked)}
          className="mb-2"
          style={{ color: darkMode ? '#ffffff' : '#000000' }}
        />
        <Form.Check
          type="switch"
          id="music-switch"
          label="Background Music"
          checked={musicEnabled}
          onChange={(e) => setMusicEnabled(e.target.checked)}
          className="mb-2"
          style={{ color: darkMode ? '#ffffff' : '#000000' }}
        />
        <Form.Check
          type="switch"
          id="particles-switch"
          label="Particle Effects"
          checked={particlesEnabled}
          onChange={(e) => setParticlesEnabled(e.target.checked)}
          style={{ color: darkMode ? '#ffffff' : '#000000' }}
        />
      </div>
      
      <div>
        <h6 className="fw-bold mb-3" style={{ color: darkMode ? '#ffffff' : '#000000' }}>Data</h6>
        <Button 
          variant="outline-primary" 
          className="w-100 mb-2"
          style={{ color: darkMode ? '#3b82f6' : '#0d6efd', borderColor: darkMode ? '#3b82f6' : '#0d6efd' }}
        >
          <Download className="me-2" />
          Export Data
        </Button>
        <Button 
          variant="outline-secondary" 
          className="w-100"
          style={{ color: darkMode ? '#d1d5db' : '#6c757d', borderColor: darkMode ? '#6b7280' : '#6c757d' }}
        >
          <Trash className="me-2" />
          Clear All Data
        </Button>
      </div>
    </Modal.Body>
    <Modal.Footer style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      borderColor: darkMode ? '#334155' : '#dee2e6'
    }}>
      <Button 
        variant="secondary" 
        onClick={onHide}
        style={{
          background: darkMode ? '#475569' : '#6c757d',
          borderColor: darkMode ? '#475569' : '#6c757d',
          color: '#ffffff'
        }}
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// Quests Modal
const QuestsModal = ({ show, onHide, quests, userCoins }) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>
        🎯 Daily Quests
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row className="g-3">
        {quests.map((quest) => (
          <Col md={6} key={quest.id}>
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <span className="me-2" style={{ fontSize: '24px' }}>{quest.icon}</span>
                  <div>
                    <h6 className="fw-bold mb-1">{quest.title}</h6>
                    <Badge bg="warning">{quest.reward}</Badge>
                  </div>
                </div>
                <ProgressBar 
                  now={(quest.progress / quest.total) * 100}
                  label={`${quest.progress}/${quest.total}`}
                  className="mb-3"
                />
                <Button variant="primary" size="sm" className="w-100">
                  Claim Reward
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// Challenges Modal
const ChallengesModal = ({ show, onHide, challenges }) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>
        🏆 Weekly Challenges
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row className="g-3">
        {challenges.map((challenge) => (
          <Col md={6} key={challenge.id}>
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <span className="me-2" style={{ fontSize: '24px' }}>{challenge.icon}</span>
                  <div>
                    <h6 className="fw-bold mb-1">{challenge.title}</h6>
                    <p className="small mb-0">{challenge.description}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small>{challenge.participants} participants</small>
                  </div>
                  <Badge bg="warning">{challenge.prize}</Badge>
                </div>
                <Button variant="primary" size="sm" className="w-100 mt-3">
                  Join Challenge
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// Rewards Modal
const RewardsModal = ({ show, onHide, rewards, userCoins, claimReward }) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>
        🎁 Rewards Shop
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h6 className="fw-bold mb-1">Your Balance</h6>
          <div className="d-flex align-items-center">
            <Coin className="me-2 text-warning" />
            <span className="h4 fw-bold">{userCoins} Coins</span>
          </div>
        </div>
      </div>
      
      <Row className="g-3">
        {rewards.map((reward) => (
          <Col md={6} key={reward.id}>
            <Card className="h-100">
              <Card.Body className="text-center">
                <div className="mb-3">
                  <span style={{ fontSize: '32px' }}>{reward.icon}</span>
                </div>
                <h6 className="fw-bold mb-2">{reward.name}</h6>
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <Coin className="me-2 text-warning" />
                  <span className="h5 fw-bold">{reward.cost}</span>
                </div>
                <Button 
                  variant={userCoins >= reward.cost ? "warning" : "secondary"}
                  size="sm"
                  className="w-100"
                  onClick={() => claimReward(reward)}
                  disabled={userCoins < reward.cost}
                >
                  {userCoins >= reward.cost ? 'Purchase' : 'Need More Coins'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// Community Modal
const CommunityModal = ({ show, onHide, activity }) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>
        👥 Community
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h6 className="fw-bold mb-3">Live Activity</h6>
      <div className="community-feed">
        {activity.map((item, index) => (
          <div key={index} className="d-flex align-items-center mb-3 p-3 rounded" 
            style={{ background: 'rgba(0,0,0,0.05)' }}>
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
                {item.avatar}
              </div>
            </div>
            <div>
              <p className="mb-1">
                <strong>{item.user}</strong> {item.action} <em>{item.streak}</em>
              </p>
              <small>{item.time}</small>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <h6 className="fw-bold mb-3">Join the Conversation</h6>
        <InputGroup>
          <Form.Control placeholder="Type your message..." />
          <Button variant="primary">
            <Chat className="me-2" />
            Send
          </Button>
        </InputGroup>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// AI Assistant Modal
const AIAssistantModal = ({ show, onHide, message, setMessage, getRandomMessage }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>
        🤖 AI Assistant
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="text-center mb-4">
        <div className="ai-avatar-large mx-auto mb-3">
          <Magic size={48} className="text-primary" />
        </div>
        <h5 className="fw-bold mb-3">Your Personal Habit Coach</h5>
      </div>
      
      <div className="ai-chat">
        <div className="speech-bubble ai-message p-3 mb-3">
          <p className="mb-0">{message}</p>
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline-primary"
            className="me-2"
            onClick={() => setMessage(getRandomMessage())}
          >
            New Tip
          </Button>
          <Button variant="primary">
            Ask AI
          </Button>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// Daily Challenge Modal
const DailyChallengeModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>
        🎯 Daily Challenge
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      <div className="challenge-icon mb-4">
        <Target size={64} className="text-warning" />
      </div>
      <h4 className="fw-bold mb-3">Complete 5 Streaks Today!</h4>
      <p className="mb-4">
        Check in 5 different streaks today to earn bonus rewards
      </p>
      <div className="d-flex justify-content-center gap-3 mb-4">
        <div className="text-center">
          <div className="h3 fw-bold text-primary">150</div>
          <small>XP Reward</small>
        </div>
        <div className="text-center">
          <div className="h3 fw-bold text-warning">75</div>
          <small>Coins</small>
        </div>
        <div className="text-center">
          <div className="h3 fw-bold text-success">1</div>
          <small>Gem</small>
        </div>
      </div>
      <Button variant="warning" size="lg" className="w-100">
        Accept Challenge
      </Button>
    </Modal.Body>
  </Modal>
);

// Streak Prediction Modal
const StreakPredictionModal = ({ show, onHide, prediction, darkMode }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      borderColor: darkMode ? '#334155' : '#dee2e6',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      <Modal.Title style={{ color: darkMode ? '#ffffff' : '#000000' }}>
        📊 Streak Prediction
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center" style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      <div className="prediction-circle mx-auto mb-4" style={{
        width: '150px',
        height: '150px',
        background: `conic-gradient(${prediction > 80 ? '#10b981' : prediction > 60 ? '#f59e0b' : '#ef4444'} ${prediction}%, #e5e7eb 0%)`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: darkMode ? '#1e293b' : '#ffffff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span className="display-4 fw-bold" style={{ 
            color: prediction > 80 ? '#10b981' : prediction > 60 ? '#f59e0b' : '#ef4444'
          }}>
            {prediction}%
          </span>
        </div>
      </div>
      
      <h5 className="fw-bold mb-3" style={{ color: darkMode ? '#ffffff' : '#000000' }}>Success Probability</h5>
      <p className="mb-4" style={{ color: darkMode ? '#d1d5db' : '#6c757d' }}>
        Based on your past consistency, you have a <strong style={{ color: prediction > 80 ? '#10b981' : prediction > 60 ? '#f59e0b' : '#ef4444' }}>{prediction}%</strong> chance of 
        maintaining your current streak this week.
      </p>
      
      {prediction > 80 && (
        <Alert variant="success">
          🎉 Excellent! You're on track for success!
        </Alert>
      )}
      {prediction > 60 && prediction <= 80 && (
        <Alert variant="warning">
          📈 Good progress! Keep up the consistency!
        </Alert>
      )}
      {prediction <= 60 && (
        <Alert variant="danger">
          ⚠️ Needs attention! Try checking in at consistent times.
        </Alert>
      )}
    </Modal.Body>
    <Modal.Footer style={{ 
      background: darkMode ? '#1e293b' : '#ffffff',
      borderColor: darkMode ? '#334155' : '#dee2e6'
    }}>
      <Button 
        variant="secondary" 
        onClick={onHide}
        style={{
          background: darkMode ? '#475569' : '#6c757d',
          borderColor: darkMode ? '#475569' : '#6c757d',
          color: '#ffffff'
        }}
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default StreaksPage;