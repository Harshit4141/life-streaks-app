import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge, Alert, InputGroup, ProgressBar, Dropdown, Tabs, Tab, Tooltip, OverlayTrigger, Accordion, ListGroup, Nav, Spinner } from 'react-bootstrap';
import { 
  Plus, 
  Fire, 
  CalendarCheck, 
  Trash, 
  ArrowRepeat, 
  Search, 
  Filter, 
  SortDown, 
  Star, 
  Lightning,
  Trophy, 
  Clock, 
  CheckCircle, 
  GraphUp, 
  Bell, 
  Share, 
  Download, 
  BarChart, 
  ChevronRight, 
  Calendar,
  CalendarEvent,
  People,
  Award,
  Heart,
  Moon,
  Sun,
  ArrowUp,
  ArrowDown,
  InfoCircle,
  ThreeDots,
  Grid3x3,
  ListUl,
  Play,
  Pause,
  Eye,
  EyeSlash,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  GraphUpArrow,
  Bullseye,
  CheckSquare,
  Square,
  ClockHistory,
  StarFill,
  ArrowRightCircle,
  Check2,
  X,
  PlusCircle,
  ChevronUp,
  Pencil,
  Tag,
  CalendarPlus,
  Timer,
  HeartFill,
  ShieldCheck
} from 'react-bootstrap-icons';
import { useStreaks } from '../components/context/StreaksContext';
import DemoBanner from '../components/Common/DemoBanner';
import StreakCard from '../components/Dashboard/StreakCard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const StreaksPage = () => {
  const { streaks, addStreak, deleteStreak, resetStreak, getStreakStats, checkStreak, archiveStreak, updateStreak } = useStreaks();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
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
  const [autoCheckIn, setAutoCheckIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reminderTime, setReminderTime] = useState('09:00');
  
  const stats = getStreakStats();
  
  const categories = [
    { name: "Fitness", icon: "💪", color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.1)" },
    { name: "Wellness", icon: "🌿", color: "#2196F3", bgColor: "rgba(33, 150, 243, 0.1)" },
    { name: "Learning", icon: "📚", color: "#FF9800", bgColor: "rgba(255, 152, 0, 0.1)" },
    { name: "Reading", icon: "📖", color: "#9C27B0", bgColor: "rgba(156, 39, 176, 0.1)" },
    { name: "Health", icon: "❤️", color: "#F44336", bgColor: "rgba(244, 67, 54, 0.1)" },
    { name: "Mindfulness", icon: "🧘", color: "#00BCD4", bgColor: "rgba(0, 188, 212, 0.1)" },
    { name: "Productivity", icon: "⚡", color: "#3F51B5", bgColor: "rgba(63, 81, 181, 0.1)" },
    { name: "Social", icon: "👥", color: "#E91E63", bgColor: "rgba(233, 30, 99, 0.1)" },
    { name: "Creative", icon: "🎨", color: "#8BC34A", bgColor: "rgba(139, 195, 74, 0.1)" },
    { name: "Financial", icon: "💰", color: "#795548", bgColor: "rgba(121, 85, 72, 0.1)" },
    { name: "Relationship", icon: "💝", color: "#FF5722", bgColor: "rgba(255, 87, 34, 0.1)" }
  ];

  const difficultyLevels = [
    { level: 'Easy', icon: '🥱', color: '#10B981', goal: '15', desc: '5-15 minutes daily' },
    { level: 'Medium', icon: '💪', color: '#3B82F6', goal: '30', desc: '15-30 minutes daily' },
    { level: 'Hard', icon: '🔥', color: '#F59E0B', goal: '60', desc: '30-60 minutes daily' },
    { level: 'Extreme', icon: '🚀', color: '#EF4444', goal: '90', desc: '60+ minutes daily' }
  ];

  const tags = [
    'morning', 'evening', 'daily', 'weekly', 'health', 'fitness', 
    'learning', 'work', 'personal', 'challenge', 'beginner', 'advanced'
  ];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddHabit = () => {
    if (!newHabit.trim()) {
      toast.error('Please enter a habit name');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const newStreak = {
        id: Date.now().toString(),
        name: newHabit,
        description: newDescription || `Daily ${newHabit.toLowerCase()} practice`,
        category: selectedCategory,
        dailyGoal: parseInt(dailyGoal),
        difficulty: getDifficultyLevel(dailyGoal),
        createdAt: new Date().toISOString(),
        tags: [...selectedTags, selectedCategory.toLowerCase(), 'new'],
        streak: 0,
        longestStreak: 0,
        missedDays: 0,
        lastCheckIn: null,
        archived: false,
        reminderTime: reminderTime,
        color: getCategoryColor(selectedCategory)
      };
      
      addStreak(newStreak);
      
      // Show celebration
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      toast.success(
        <div className="d-flex align-items-center">
          <div className="me-2">
            <Fire className="text-warning" />
          </div>
          <div>
            <strong>{newHabit}</strong> streak created! 🔥
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
    }, 500);
  };

  const handleCheckIn = (id) => {
    // Find the streak
    const streak = streaks.find(s => s.id === id);
    if (!streak) return;
    
    // Create a checkStreak function if it doesn't exist
    if (typeof checkStreak === 'function') {
      checkStreak(id);
    } else {
      // Manual check-in logic
      const updatedStreaks = streaks.map(s => {
        if (s.id === id) {
          const newStreak = s.streak + 1;
          const today = new Date().toISOString().split('T')[0];
          const lastCheckInDate = s.lastCheckIn ? new Date(s.lastCheckIn).toISOString().split('T')[0] : null;
          
          // Only increment if not checked in today
          if (lastCheckInDate !== today) {
            return {
              ...s,
              streak: newStreak,
              longestStreak: Math.max(s.longestStreak, newStreak),
              lastCheckIn: new Date().toISOString(),
              missedDays: s.missedDays // Keep missed days as is
            };
          }
        }
        return s;
      });
      
      // Update streaks in context
      if (typeof updateStreak === 'function') {
        const updatedStreak = updatedStreaks.find(s => s.id === id);
        if (updatedStreak) {
          updateStreak(id, updatedStreak);
        }
      }
    }
    
    toast.success(
      <div className="d-flex align-items-center">
        <CheckCircle className="me-2 text-success" />
        <div>
          <strong>Checked in!</strong> Keep the streak alive! 🔥
        </div>
      </div>,
      { duration: 2000 }
    );
    
    // Trigger small celebration for milestone
    const streakObj = streaks.find(s => s.id === id);
    if (streakObj && (streakObj.streak + 1) % 7 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      toast.success(`🎉 ${streakObj.streak + 1}-day streak milestone! Amazing work!`);
    }
  };

  const handleBulkCheckIn = () => {
    const dueStreaks = streaks.filter(s => {
      const lastCheckIn = s.lastCheckIn ? new Date(s.lastCheckIn) : null;
      const today = new Date();
      return !s.archived && (!lastCheckIn || lastCheckIn.toDateString() !== today.toDateString());
    });
    
    dueStreaks.forEach(streak => {
      handleCheckIn(streak.id);
    });
    
    toast.success(
      <div className="d-flex align-items-center">
        <CheckCircle className="me-2 text-success" />
        <div>
          <strong>Bulk check-in complete!</strong> {dueStreaks.length} streaks updated
        </div>
      </div>
    );
  };

  const handleQuickAdd = (habitName, category, difficulty = 'Medium') => {
    setIsLoading(true);
    
    setTimeout(() => {
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
        color: getCategoryColor(category)
      };
      
      addStreak(newStreak);
      
      toast.success(
        <div className="d-flex align-items-center">
          <Heart className="me-2 text-warning" />
          <div>
            <strong>{habitName}</strong> streak started!
          </div>
        </div>
      );
      
      setIsLoading(false);
    }, 300);
  };

  const handleEditStreak = (streak) => {
    setSelectedStreak(streak);
    setNewHabit(streak.name);
    setNewDescription(streak.description);
    setSelectedCategory(streak.category);
    setDailyGoal(streak.dailyGoal.toString());
    setSelectedTags(streak.tags || []);
    setShowEditModal(true);
  };

  const handleUpdateStreak = () => {
    if (!newHabit.trim() || !selectedStreak) return;
    
    const updatedStreak = {
      ...selectedStreak,
      name: newHabit,
      description: newDescription,
      category: selectedCategory,
      dailyGoal: parseInt(dailyGoal),
      difficulty: getDifficultyLevel(dailyGoal),
      tags: selectedTags,
      color: getCategoryColor(selectedCategory)
    };
    
    if (typeof updateStreak === 'function') {
      updateStreak(selectedStreak.id, updatedStreak);
      toast.success('Streak updated successfully!');
      setShowEditModal(false);
      setSelectedStreak(null);
    }
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

  const filteredStreaks = streaks
    .filter(streak => {
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
        default: return b.streak - a.streak;
      }
    });

  const quickHabits = [
    { name: "Morning Meditation", category: "Mindfulness", difficulty: "Easy", emoji: "🧘‍♂️", time: "07:00" },
    { name: "Evening Walk", category: "Fitness", difficulty: "Easy", emoji: "🚶‍♂️", time: "18:00" },
    { name: "Read 20 Pages", category: "Reading", difficulty: "Medium", emoji: "📖", time: "21:00" },
    { name: "Drink 2L Water", category: "Health", difficulty: "Easy", emoji: "💧", time: "All day" },
    { name: "Learn Spanish", category: "Learning", difficulty: "Hard", emoji: "🇪🇸", time: "19:00" },
    { name: "Journal Writing", category: "Creative", difficulty: "Medium", emoji: "📝", time: "20:00" },
    { name: "Digital Detox", category: "Productivity", difficulty: "Hard", emoji: "📵", time: "22:00" },
    { name: "Gratitude Practice", category: "Wellness", difficulty: "Easy", emoji: "🙏", time: "08:00" },
    { name: "Full Workout", category: "Fitness", difficulty: "Medium", emoji: "🏋️‍♂️", time: "17:00" },
    { name: "Call Family", category: "Social", difficulty: "Easy", emoji: "👨‍👩‍👧‍👦", time: "20:00" }
  ];

  const streaksDueToday = streaks.filter(streak => {
    const lastCheckIn = streak.lastCheckIn ? new Date(streak.lastCheckIn) : null;
    const today = new Date();
    return !streak.archived && (!lastCheckIn || lastCheckIn.toDateString() !== today.toDateString());
  });

  const streaksCompletedToday = streaks.filter(streak => {
    const lastCheckIn = streak.lastCheckIn ? new Date(streak.lastCheckIn) : null;
    const today = new Date();
    return !streak.archived && lastCheckIn && lastCheckIn.toDateString() === today.toDateString();
  });

  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color : '#607D8B';
  };

  const getCategoryBgColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.bgColor : 'rgba(96, 125, 139, 0.1)';
  };

  const getCategoryIcon = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.icon : '📌';
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

  const getDifficultyValue = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 1;
      case 'Medium': return 2;
      case 'Hard': return 3;
      case 'Extreme': return 4;
      default: return 2;
    }
  };

  const getDifficultyIcon = (difficulty) => {
    const level = difficultyLevels.find(d => d.level === difficulty);
    return level ? level.icon : '💪';
  };

  const getDifficultyColor = (difficulty) => {
    const level = difficultyLevels.find(d => d.level === difficulty);
    return level ? level.color : '#3B82F6';
  };

  const totalStreakDays = streaks.reduce((sum, streak) => sum + streak.streak, 0);
  const completionRate = streaks.length > 0 
    ? Math.round((streaksCompletedToday.length / streaks.filter(s => !s.archived).length) * 100)
    : 0;

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

  return (
    <>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <Container fluid className="py-4 px-3 px-md-4 px-lg-5" style={{ 
        background: darkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden'
      }}>
        {/* Background Pattern */}
        <div className="background-pattern" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: darkMode 
            ? 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.02) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.02) 0%, transparent 50%)',
          zIndex: 0
        }} />

        <DemoBanner />
        
        {/* Main Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Header */}
          <Row className="mb-4">
            <Col>
              <Card className="border-0 shadow-lg" style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                borderRadius: '24px',
                border: darkMode 
                  ? '1px solid rgba(255, 255, 255, 0.1)' 
                  : '1px solid rgba(203, 213, 225, 0.3)',
                backdropFilter: 'blur(20px)',
                overflow: 'hidden'
              }}>
                <Card.Body className="p-4 p-md-5">
                  <Row className="align-items-center">
                    <Col lg={8}>
                      <div className="d-flex align-items-center mb-4">
                        <div style={{
                          width: '64px',
                          height: '64px',
                          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem',
                          boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)'
                        }}>
                          <Fire size={28} className="text-white" />
                        </div>
                        <div>
                          <h1 className="fw-bold display-6 mb-2" style={{ 
                            color: darkMode ? '#e2e8f0' : '#1e293b'
                          }}>
                            Streak Dashboard
                          </h1>
                          <p className="text-muted mb-0">
                            Build habits that last • {streaks.filter(s => !s.archived).length} active streaks
                          </p>
                        </div>
                      </div>
                      
                      {/* Stats Grid */}
                      <Row className="g-3">
                        <Col xs={6} md={3}>
                          <div className="text-center p-3 rounded-3" style={{
                            background: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                            border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'}`
                          }}>
                            <div className="h3 fw-bold mb-1" style={{ color: '#3b82f6' }}>
                              {streaks.filter(s => !s.archived).length}
                            </div>
                            <small className="text-muted">Active</small>
                          </div>
                        </Col>
                        
                        <Col xs={6} md={3}>
                          <div className="text-center p-3 rounded-3" style={{
                            background: darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)',
                            border: `1px solid ${darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'}`
                          }}>
                            <div className="h3 fw-bold mb-1" style={{ color: '#10b981' }}>
                              {streaksCompletedToday.length}
                            </div>
                            <small className="text-muted">Today</small>
                          </div>
                        </Col>
                        
                        <Col xs={6} md={3}>
                          <div className="text-center p-3 rounded-3" style={{
                            background: darkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
                            border: `1px solid ${darkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)'}`
                          }}>
                            <div className="h3 fw-bold mb-1" style={{ color: '#f59e0b' }}>
                              {stats.longestStreak || 0}
                            </div>
                            <small className="text-muted">Record</small>
                          </div>
                        </Col>
                        
                        <Col xs={6} md={3}>
                          <div className="text-center p-3 rounded-3" style={{
                            background: darkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)',
                            border: `1px solid ${darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)'}`
                          }}>
                            <div className="h3 fw-bold mb-1" style={{ color: '#8b5cf6' }}>
                              {completionRate}%
                            </div>
                            <small className="text-muted">Rate</small>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    
                    <Col lg={4} className="mt-4 mt-lg-0">
                      <div className="d-flex flex-column gap-3">
                        <Button 
                          variant="primary" 
                          className="py-3 fw-bold"
                          onClick={() => setShowModal(true)}
                          style={{
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
                          }}
                        >
                          <Plus className="me-2" />
                          Create New Streak
                        </Button>
                        
                        {streaksDueToday.length > 0 && (
                          <Button 
                            variant="warning" 
                            className="py-3 fw-bold"
                            onClick={handleBulkCheckIn}
                            style={{
                              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '1rem'
                            }}
                          >
                            <CheckCircle className="me-2" />
                            Quick Check-in ({streaksDueToday.length})
                          </Button>
                        )}
                        
                        <div className="d-flex gap-2">
                          <Button 
                            variant={darkMode ? "outline-light" : "outline-secondary"}
                            className="flex-grow-1"
                            onClick={() => setShowStatsModal(true)}
                          >
                            <BarChart className="me-2" />
                            Stats
                          </Button>
                          <Button 
                            variant={darkMode ? "outline-light" : "outline-secondary"}
                            className="flex-grow-1"
                            onClick={() => setShowSettingsModal(true)}
                          >
                            <GearIcon className="me-2" />
                            Settings
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Main Content Area */}
          <Row className="g-4">
            <Col xl={8}>
              {/* Control Bar */}
              <Card className="border-0 shadow-sm mb-4" style={{
                background: darkMode ? '#1e293b' : '#ffffff',
                border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                borderRadius: '16px'
              }}>
                <Card.Body className="p-3">
                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    {/* Tabs */}
                    <div className="d-flex gap-2">
                      <Button
                        variant={activeTab === 'active' ? 'primary' : (darkMode ? 'outline-light' : 'outline-secondary')}
                        size="sm"
                        onClick={() => setActiveTab('active')}
                        style={{ borderRadius: '8px' }}
                      >
                        <Fire size={14} className="me-1" />
                        Active ({streaks.filter(s => !s.archived).length})
                      </Button>
                      <Button
                        variant={activeTab === 'completed' ? 'success' : (darkMode ? 'outline-light' : 'outline-secondary')}
                        size="sm"
                        onClick={() => setActiveTab('completed')}
                        style={{ borderRadius: '8px' }}
                      >
                        <CheckCircle size={14} className="me-1" />
                        Today ({streaksCompletedToday.length})
                      </Button>
                      <Button
                        variant={activeTab === 'archived' ? 'secondary' : (darkMode ? 'outline-light' : 'outline-secondary')}
                        size="sm"
                        onClick={() => setActiveTab('archived')}
                        style={{ borderRadius: '8px' }}
                      >
                        <Bookmark size={14} className="me-1" />
                        Archived ({streaks.filter(s => s.archived).length})
                      </Button>
                    </div>

                    {/* Search */}
                    <div className="flex-grow-1" style={{ maxWidth: '300px' }}>
                      <InputGroup size="sm">
                        <InputGroup.Text style={{
                          background: darkMode ? '#334155' : '#f1f5f9',
                          border: darkMode ? '1px solid #475569' : '1px solid #e2e8f0',
                          borderRight: 'none'
                        }}>
                          <Search size={14} />
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Search habits..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            background: darkMode ? '#334155' : '#f1f5f9',
                            border: darkMode ? '1px solid #475569' : '1px solid #e2e8f0',
                            borderLeft: 'none',
                            color: darkMode ? '#e2e8f0' : '#1e293b'
                          }}
                        />
                      </InputGroup>
                    </div>

                    {/* View Toggle */}
                    <div className="d-flex gap-2">
                      <Button
                        variant={viewMode === 'grid' ? 'primary' : (darkMode ? 'outline-light' : 'outline-secondary')}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        style={{ borderRadius: '6px' }}
                      >
                        <Grid3x3 size={14} />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'primary' : (darkMode ? 'outline-light' : 'outline-secondary')}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        style={{ borderRadius: '6px' }}
                      >
                        <ListUl size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Filter Row */}
                  <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top" style={{ 
                    borderColor: darkMode ? '#334155' : '#e2e8f0' 
                  }}>
                    {/* Category Filter */}
                    <Dropdown>
                      <Dropdown.Toggle variant={darkMode ? "outline-light" : "outline-secondary"} size="sm">
                        <Filter size={14} className="me-1" />
                        {filterCategory === 'All' ? 'All Categories' : filterCategory}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{
                        background: darkMode ? '#1e293b' : '#ffffff',
                        border: darkMode ? '1px solid #475569' : '1px solid #e2e8f0'
                      }}>
                        <Dropdown.Item onClick={() => setFilterCategory('All')}>
                          All Categories
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        {categories.map((cat, index) => (
                          <Dropdown.Item 
                            key={index}
                            onClick={() => setFilterCategory(cat.name)}
                            className="d-flex align-items-center"
                          >
                            <span className="me-2">{cat.icon}</span>
                            {cat.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* Sort Dropdown */}
                    <Dropdown>
                      <Dropdown.Toggle variant={darkMode ? "outline-light" : "outline-secondary"} size="sm">
                        <SortDown size={14} className="me-1" />
                        Sort
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{
                        background: darkMode ? '#1e293b' : '#ffffff',
                        border: darkMode ? '1px solid #475569' : '1px solid #e2e8f0'
                      }}>
                        <Dropdown.Item onClick={() => setSortBy('streak')}>
                          Streak Length
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy('name')}>
                          Name A-Z
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy('recent')}>
                          Recently Added
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy('difficulty')}>
                          Difficulty
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy('completion')}>
                          Completion Rate
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    {/* Tags Filter */}
                    {selectedTags.length > 0 && (
                      <div className="d-flex align-items-center gap-1">
                        <small className="text-muted">Tags:</small>
                        {selectedTags.map(tag => (
                          <Badge 
                            key={tag}
                            bg="primary"
                            className="d-flex align-items-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                            <X size={10} className="ms-1" />
                          </Badge>
                        ))}
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0"
                          onClick={() => setSelectedTags([])}
                        >
                          Clear
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>

              {/* Streaks Display */}
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-3 text-muted">Loading your streaks...</p>
                </div>
              ) : filteredStreaks.length === 0 ? (
                <Card className="border-0 shadow-sm text-center py-5" style={{
                  background: darkMode ? '#1e293b' : '#ffffff',
                  border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                  borderRadius: '16px'
                }}>
                  <Card.Body>
                    <Fire size={64} className="mb-4" style={{ 
                      color: darkMode ? '#475569' : '#cbd5e1',
                      opacity: 0.5
                    }} />
                    <h4 className="mb-3" style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                      {searchTerm || filterCategory !== 'All' || selectedTags.length > 0 
                        ? 'No streaks match your filters' 
                        : 'No streaks yet!'}
                    </h4>
                    <p className="text-muted mb-4">
                      {searchTerm || filterCategory !== 'All' || selectedTags.length > 0
                        ? 'Try adjusting your search or filters'
                        : 'Start building your habits journey today'}
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        setShowModal(true);
                        setSearchTerm('');
                        setFilterCategory('All');
                        setSelectedTags([]);
                      }}
                      className="px-4"
                    >
                      <Plus className="me-2" />
                      Create Your First Streak
                    </Button>
                  </Card.Body>
                </Card>
              ) : (
                <div className={viewMode === 'grid' ? 'row g-4' : 'd-flex flex-column gap-3'}>
                  {filteredStreaks.map((streak) => (
                    <div key={streak.id} className={viewMode === 'grid' ? 'col-md-6 col-lg-4' : ''}>
                      <Card className="h-100 border-0 shadow-sm" style={{
                        background: darkMode ? '#1e293b' : '#ffffff',
                        border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease'
                      }}>
                        {/* Card Header */}
                        <div className="position-relative">
                          <div style={{
                            height: '4px',
                            background: `linear-gradient(90deg, ${getCategoryColor(streak.category)}, ${getCategoryColor(streak.category)}80)`,
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px'
                          }} />
                          
                          <div className="position-absolute top-0 end-0 m-3">
                            <Dropdown>
                              <Dropdown.Toggle variant="link" className="p-0">
                                <ThreeDots size={20} color={darkMode ? '#94a3b8' : '#64748b'} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu style={{
                                background: darkMode ? '#1e293b' : '#ffffff',
                                border: darkMode ? '1px solid #475569' : '1px solid #e2e8f0',
                                borderRadius: '8px',
                                zIndex: 1000
                              }}>
                                <Dropdown.Item onClick={() => handleCheckIn(streak.id)}>
                                  <CheckCircle className="me-2" size={14} />
                                  Check In
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleEditStreak(streak)}>
                                  <Pencil className="me-2" size={14} />
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleArchiveStreak(streak.id, streak.name)}>
                                  <Bookmark className="me-2" size={14} />
                                  {streak.archived ? 'Unarchive' : 'Archive'}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleResetStreak(streak.id, streak.name)}>
                                  <ArrowRepeat className="me-2" size={14} />
                                  Reset
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item 
                                  className="text-danger"
                                  onClick={() => handleDeleteStreak(streak.id, streak.name)}
                                >
                                  <Trash className="me-2" size={14} />
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>

                        <Card.Body className="p-4">
                          {/* Streak Info */}
                          <div className="d-flex align-items-start mb-3">
                            <div className="me-3">
                              <div style={{
                                width: '48px',
                                height: '48px',
                                background: getCategoryBgColor(streak.category),
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: getCategoryColor(streak.category),
                                fontSize: '24px'
                              }}>
                                {getCategoryIcon(streak.category)}
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h5 className="fw-bold mb-1" style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                                    {streak.name}
                                    {streak.archived && (
                                      <Badge bg="secondary" className="ms-2" pill>Archived</Badge>
                                    )}
                                  </h5>
                                  <p className="small text-muted mb-2">{streak.description}</p>
                                </div>
                              </div>
                              
                              {/* Tags */}
                              {streak.tags && streak.tags.length > 0 && (
                                <div className="d-flex flex-wrap gap-1 mb-3">
                                  {streak.tags.slice(0, 3).map((tag, index) => (
                                    <Badge 
                                      key={index}
                                      bg="light"
                                      text="dark"
                                      className="px-2 py-1"
                                      style={{ 
                                        fontSize: '0.75rem',
                                        cursor: 'pointer',
                                        background: darkMode ? '#334155' : '#f1f5f9'
                                      }}
                                      onClick={() => toggleTag(tag)}
                                    >
                                      <Tag size={10} className="me-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                  {streak.tags.length > 3 && (
                                    <Badge bg="light" text="dark" className="px-2 py-1" style={{ fontSize: '0.75rem' }}>
                                      +{streak.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Stats Row */}
                          <div className="row g-3 mb-4">
                            <div className="col-4 text-center">
                              <div className="h3 fw-bold mb-1" style={{ color: getCategoryColor(streak.category) }}>
                                {streak.streak}
                              </div>
                              <small className="text-muted">Current</small>
                            </div>
                            <div className="col-4 text-center">
                              <div className="h3 fw-bold mb-1" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                                {streak.longestStreak || 0}
                              </div>
                              <small className="text-muted">Record</small>
                            </div>
                            <div className="col-4 text-center">
                              <div className="h3 fw-bold mb-1" style={{ color: getDifficultyColor(streak.difficulty) }}>
                                {getDifficultyIcon(streak.difficulty)}
                              </div>
                              <small className="text-muted">{streak.difficulty}</small>
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <small className="text-muted">Progress</small>
                              <small className="fw-bold" style={{ color: getCategoryColor(streak.category) }}>
                                {calculateProgressPercentage(streak)}%
                              </small>
                            </div>
                            <ProgressBar 
                              now={calculateProgressPercentage(streak)}
                              style={{ 
                                height: '8px',
                                borderRadius: '4px',
                                background: darkMode ? '#334155' : '#f1f5f9'
                              }}
                            >
                              <ProgressBar 
                                variant="custom"
                                style={{
                                  background: `linear-gradient(90deg, ${getCategoryColor(streak.category)}, ${getCategoryColor(streak.category)}80)`,
                                  borderRadius: '4px'
                                }}
                              />
                            </ProgressBar>
                          </div>

                          {/* Action Buttons */}
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <small className="text-muted d-block">Daily Goal</small>
                              <span className="fw-bold">{streak.dailyGoal || 15} min</span>
                            </div>
                            
                            <div className="d-flex gap-2">
                              {streak.lastCheckIn && 
                                new Date(streak.lastCheckIn).toDateString() === new Date().toDateString() ? (
                                <Badge bg="success" className="px-3 py-2">
                                  <CheckCircle className="me-1" size={14} />
                                  Checked In
                                </Badge>
                              ) : (
                                <Button 
                                  variant="primary" 
                                  size="sm"
                                  onClick={() => handleCheckIn(streak.id)}
                                  style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.5rem 1rem'
                                  }}
                                >
                                  <CheckCircle className="me-1" size={14} />
                                  Check In
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card.Body>

                        {/* Card Footer */}
                        <div style={{
                          background: darkMode ? '#0f172a' : '#f8fafc',
                          padding: '1rem 1.5rem',
                          borderBottomLeftRadius: '16px',
                          borderBottomRightRadius: '16px',
                          borderTop: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`
                        }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              Started {new Date(streak.createdAt).toLocaleDateString()}
                            </small>
                            {streak.reminderTime && (
                              <small className="text-muted">
                                <Bell size={12} className="me-1" />
                                {streak.reminderTime}
                              </small>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </Col>

            {/* Sidebar */}
            <Col xl={4}>
              {/* Quick Habits */}
              <Card className="mb-4 border-0 shadow-sm" style={{
                background: darkMode ? '#1e293b' : '#ffffff',
                border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                borderRadius: '16px'
              }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                        <Heart className="me-2 text-warning" />
                        Quick Start
                      </h6>
                      <small className="text-muted">Popular habits to start</small>
                    </div>
                  </div>
                  
                  <div className="row g-2">
                    {quickHabits.map((habit, index) => (
                      <div key={index} className="col-6">
                        <div 
                          className="p-3 rounded-3 cursor-pointer"
                          onClick={() => handleQuickAdd(habit.name, habit.category, habit.difficulty)}
                          style={{
                            background: darkMode ? '#0f172a' : '#f8fafc',
                            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = getCategoryColor(habit.category);
                            e.currentTarget.style.boxShadow = `0 4px 12px ${getCategoryColor(habit.category)}20`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = darkMode ? '#334155' : '#e2e8f0';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div className="text-center mb-2">
                            <span style={{ fontSize: '24px' }}>{habit.emoji}</span>
                          </div>
                          <h6 className="text-center mb-2" style={{ 
                            fontSize: '0.85rem',
                            color: darkMode ? '#e2e8f0' : '#1e293b'
                          }}>
                            {habit.name}
                          </h6>
                          <div className="text-center">
                            <Badge 
                              bg={getCategoryColor(habit.category)}
                              style={{ 
                                fontSize: '0.7rem',
                                padding: '0.25rem 0.5rem'
                              }}
                            >
                              {habit.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Today's Progress */}
              <Card className="mb-4 border-0 shadow-sm" style={{
                background: 'linear-gradient(135deg, #3b82f610 0%, #8b5cf610 100%)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px'
              }}>
                <Card.Body>
                  <h6 className="fw-bold mb-4" style={{ color: '#1e40af' }}>
                    <CalendarEvent className="me-2" />
                    Today's Progress
                  </h6>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ color: '#1e293b' }}>Daily Completion</span>
                      <span className="fw-bold" style={{ color: '#1e40af' }}>{completionRate}%</span>
                    </div>
                    <ProgressBar 
                      now={completionRate}
                      style={{ 
                        height: '10px', 
                        borderRadius: '5px',
                        background: 'rgba(59, 130, 246, 0.1)'
                      }}
                    >
                      <ProgressBar 
                        variant="primary"
                        style={{
                          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                          borderRadius: '5px'
                        }}
                      />
                    </ProgressBar>
                  </div>
                  
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="text-center p-3 rounded-3" style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                      }}>
                        <div className="h4 fw-bold mb-1" style={{ color: '#dc2626' }}>
                          {streaksDueToday.length}
                        </div>
                        <small className="text-muted">Pending</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-3 rounded-3" style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                      }}>
                        <div className="h4 fw-bold mb-1" style={{ color: '#059669' }}>
                          {streaksCompletedToday.length}
                        </div>
                        <small className="text-muted">Completed</small>
                      </div>
                    </div>
                  </div>
                  
                  {streaksDueToday.length > 0 && (
                    <Button 
                      variant="primary" 
                      className="w-100 mt-3"
                      onClick={handleBulkCheckIn}
                      size="sm"
                    >
                      <CheckCircle className="me-2" />
                      Check-in All Pending
                    </Button>
                  )}
                </Card.Body>
              </Card>

              {/* Category Breakdown */}
              <Card className="mb-4 border-0 shadow-sm" style={{
                background: darkMode ? '#1e293b' : '#ffffff',
                border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                borderRadius: '16px'
              }}>
                <Card.Body>
                  <h6 className="fw-bold mb-4" style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                    <PieChartIcon className="me-2" />
                    Categories
                  </h6>
                  
                  <div className="category-list">
                    {categories.map((category) => {
                      const count = streaks.filter(s => s.category === category.name && !s.archived).length;
                      if (count === 0) return null;
                      
                      return (
                        <div key={category.name} className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <div className="me-2" style={{ fontSize: '20px' }}>
                              {category.icon}
                            </div>
                            <span style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                              {category.name}
                            </span>
                          </div>
                          <Badge bg={category.color}>{count}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>

              {/* Motivational Quote */}
              <Card className="border-0 shadow-sm" style={{
                background: 'linear-gradient(135deg, #f59e0b10 0%, #f9731610 100%)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                borderRadius: '16px'
              }}>
                <Card.Body className="text-center">
                  <div className="mb-3">
                    <Fire size={32} className="text-warning" />
                  </div>
                  <h5 className="fw-bold mb-3" style={{ color: '#d97706' }}>
                    "The secret of getting ahead is getting started."
                  </h5>
                  <p className="text-muted mb-0">- Mark Twain</p>
                  <div className="mt-4">
                    <Button 
                      variant="outline-warning"
                      size="sm"
                      onClick={() => navigate('/motivation')}
                    >
                      More Inspiration
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Create Streak Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton style={{ 
          background: darkMode ? '#1e293b' : '#ffffff',
          borderColor: darkMode ? '#334155' : '#e2e8f0',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px'
        }}>
          <Modal.Title style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
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
              <p className="mt-3 text-muted">Creating your streak...</p>
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-4">
                <Form.Label style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
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
                    color: darkMode ? '#e2e8f0' : '#1e293b',
                    padding: '0.75rem',
                    borderRadius: '8px'
                  }}
                />
                <Form.Text style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                  Make it specific and actionable
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
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
                    color: darkMode ? '#e2e8f0' : '#1e293b',
                    borderRadius: '8px'
                  }}
                />
              </Form.Group>
              
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
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
                            background: selectedCategory === category.name ? category.color : undefined
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
                    <Form.Label style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
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
                            background: dailyGoal === level.goal ? level.color : undefined
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
                <Form.Label style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                  <Tag className="me-2" /> Tags
                </Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      bg={selectedTags.includes(tag) ? "primary" : "light"}
                      text={selectedTags.includes(tag) ? "white" : "dark"}
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
                <Form.Label style={{ color: darkMode ? '#e2e8f0' : '#1e293b' }}>
                  <Bell className="me-2" /> Daily Reminder
                </Form.Label>
                <Form.Control
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  style={{
                    background: darkMode ? '#334155' : '#f8fafc',
                    borderColor: darkMode ? '#475569' : '#e2e8f0',
                    color: darkMode ? '#e2e8f0' : '#1e293b',
                    borderRadius: '8px',
                    maxWidth: '200px'
                  }}
                />
                <Form.Text style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
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
            onClick={() => setShowModal(false)}
            disabled={isLoading}
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
              padding: '0.5rem 2rem'
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

      {/* Settings Modal */}
      <SettingsModal 
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        autoCheckIn={autoCheckIn}
        setAutoCheckIn={setAutoCheckIn}
      />

      {/* Edit Modal */}
      <EditModal 
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        streak={selectedStreak}
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
        darkMode={darkMode}
        categories={categories}
        difficultyLevels={difficultyLevels}
        onUpdate={handleUpdateStreak}
      />

      {/* Stats Modal */}
      <StatsModal 
        show={showStatsModal}
        onHide={() => setShowStatsModal(false)}
        stats={stats}
        streaks={streaks}
        categories={categories}
        darkMode={darkMode}
      />

      <style jsx>{`
        .category-badge {
          transition: transform 0.2s ease;
        }
        
        .category-badge:hover {
          transform: scale(1.05);
        }
        
        .streak-card {
          transition: all 0.3s ease;
        }
        
        .streak-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease;
        }
        
        .progress-bar-custom {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#1e293b' : '#f1f5f9'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#475569' : '#cbd5e1'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#64748b' : '#94a3b8'};
        }
        
        /* Selection colors */
        ::selection {
          background: ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'};
          color: ${darkMode ? '#e2e8f0' : '#1e293b'};
        }
        
        /* Focus styles */
        *:focus {
          outline: 2px solid ${darkMode ? '#3b82f6' : '#3b82f6'};
          outline-offset: 2px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .display-6 {
            font-size: 1.75rem;
          }
          
          .stat-card {
            padding: 0.75rem;
          }
          
          .quick-habit-card {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
};

// Helper Components
const GearIcon = (props) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    {...props}
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);

const PieChartIcon = (props) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    {...props}
  >
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

// Settings Modal Component
const SettingsModal = ({ show, onHide, darkMode, setDarkMode, autoCheckIn, setAutoCheckIn }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>
        <GearIcon className="me-2" />
        Settings
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="mb-4">
        <h6 className="fw-bold mb-3">Appearance</h6>
        <Form.Check
          type="switch"
          id="dark-mode-switch"
          label="Dark Mode"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
      </div>
      
      <div className="mb-4">
        <h6 className="fw-bold mb-3">Notifications</h6>
        <Form.Check
          type="switch"
          id="auto-checkin-switch"
          label="Auto-check-in reminders"
          checked={autoCheckIn}
          onChange={(e) => setAutoCheckIn(e.target.checked)}
        />
        <Form.Text className="text-muted">
          Get daily reminders to check in your streaks
        </Form.Text>
      </div>
      
      <div>
        <h6 className="fw-bold mb-3">Data</h6>
        <Button variant="outline-primary" className="w-100 mb-2">
          <Download className="me-2" />
          Export Data
        </Button>
        <Button variant="outline-secondary" className="w-100">
          <Trash className="me-2" />
          Clear All Data
        </Button>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

// Edit Modal Component
const EditModal = ({ 
  show, onHide, streak, newHabit, setNewHabit, newDescription, setNewDescription,
  selectedCategory, setSelectedCategory, dailyGoal, setDailyGoal, selectedTags,
  toggleTag, tags, darkMode, categories, difficultyLevels, onUpdate 
}) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>
        <Pencil className="me-2" />
        Edit Streak
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {streak ? (
        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Habit Name *</Form.Label>
            <Form.Control
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Enter habit name"
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe your habit"
            />
          </Form.Group>
          
          <Row className="mb-4">
            <Col md={6}>
              <Form.Label>Category</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "primary" : "outline-secondary"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.icon} {category.name}
                  </Button>
                ))}
              </div>
            </Col>
            
            <Col md={6}>
              <Form.Label>Daily Goal</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {difficultyLevels.map((level) => (
                  <Button
                    key={level.level}
                    variant={dailyGoal === level.goal ? "primary" : "outline-secondary"}
                    size="sm"
                    onClick={() => setDailyGoal(level.goal)}
                  >
                    {level.icon} {level.level}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
          
          <Form.Group className="mb-4">
            <Form.Label>Tags</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  bg={selectedTags.includes(tag) ? "primary" : "light"}
                  text={selectedTags.includes(tag) ? "white" : "dark"}
                  className="px-3 py-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </Form.Group>
        </Form>
      ) : (
        <div className="text-center py-4">
          <p>No streak selected</p>
        </div>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onUpdate} disabled={!newHabit.trim()}>
        Update Streak
      </Button>
    </Modal.Footer>
  </Modal>
);

// Stats Modal Component
const StatsModal = ({ show, onHide, stats, streaks, categories, darkMode }) => {
  const activeStreaks = streaks.filter(s => !s.archived);
  const completedToday = streaks.filter(s => 
    s.lastCheckIn && new Date(s.lastCheckIn).toDateString() === new Date().toDateString()
  );
  
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <BarChart className="me-2" />
          Streak Statistics
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          <Col md={6}>
            <Card className="h-100">
              <Card.Body>
                <h6 className="fw-bold mb-3">📊 Overview</h6>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Streaks</span>
                    <span className="fw-bold">{streaks.length}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Active Streaks</span>
                    <span className="fw-bold">{activeStreaks.length}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Completed Today</span>
                    <span className="fw-bold">{completedToday.length}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Total Days</span>
                    <span className="fw-bold">{stats.totalStreakDays || 0}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="h-100">
              <Card.Body>
                <h6 className="fw-bold mb-3">🔥 Streak Records</h6>
                <div className="text-center py-3">
                  <Trophy size={48} className="text-warning mb-3" />
                  <h4>Longest Streak</h4>
                  <div className="display-3 fw-bold text-primary">{stats.longestStreak || 0}</div>
                  <p className="text-muted">days</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={12}>
            <Card>
              <Card.Body>
                <h6 className="fw-bold mb-3">📈 Category Distribution</h6>
                <div className="row">
                  {categories.map((category) => {
                    const count = streaks.filter(s => s.category === category.name).length;
                    const percentage = streaks.length > 0 ? (count / streaks.length) * 100 : 0;
                    
                    return count > 0 && (
                      <div key={category.name} className="col-6 col-md-4 mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div 
                              className="me-2"
                              style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: category.color
                              }}
                            />
                            <span>{category.name}</span>
                          </div>
                          <span className="fw-bold">{count}</span>
                        </div>
                        <ProgressBar 
                          now={percentage}
                          className="mt-1"
                          style={{ height: '6px' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StreaksPage;