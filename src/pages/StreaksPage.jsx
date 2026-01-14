import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge, Alert, InputGroup } from 'react-bootstrap';
import { Plus, Fire, CalendarCheck, Trash, ArrowRepeat, Search, Filter, SortDown } from 'react-bootstrap-icons';
import { useStreaks } from '../components/context/StreaksContext';
import DemoBanner from '../components/Common/DemoBanner';
import StreakCard from '../components/Dashboard/StreakCard';
import toast from 'react-hot-toast';

const StreaksPage = () => {
  const { streaks, addStreak, deleteStreak, resetStreak, getStreakStats } = useStreaks();
  
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Fitness');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('streak');
  
  const stats = getStreakStats();
  
  const categories = ["All", "Fitness", "Wellness", "Learning", "Reading", "Health", "Mindfulness", "Productivity", "Social", "Creative"];

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      addStreak({
        name: newHabit,
        description: newDescription || "New habit to track daily",
        category: selectedCategory
      });
      setNewHabit('');
      setNewDescription('');
      setSelectedCategory('Fitness');
      setShowModal(false);
    } else {
      toast.error("Please enter a habit name");
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" streak?`)) {
      deleteStreak(id);
    }
  };

  const handleReset = (id, name) => {
    if (window.confirm(`Reset "${name}" streak to 0?`)) {
      resetStreak(id);
    }
  };

  const handleQuickAdd = (habitName, category) => {
    addStreak({
      name: habitName,
      description: `Daily ${habitName.toLowerCase()} practice`,
      category: category
    });
  };

  const filteredStreaks = streaks.filter(streak => {
    const matchesSearch = streak.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         streak.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || streak.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'streak': return b.streak - a.streak;
      case 'name': return a.name.localeCompare(b.name);
      case 'recent': return new Date(b.createdAt) - new Date(a.createdAt);
      default: return b.streak - a.streak;
    }
  });

  const quickHabits = [
    { name: "Morning Meditation", category: "Wellness" },
    { name: "Evening Walk", category: "Fitness" },
    { name: "Read 20 Pages", category: "Reading" },
    { name: "Drink Water", category: "Health" },
    { name: "Learn Spanish", category: "Learning" },
    { name: "Journal Writing", category: "Creative" }
  ];

  const getCategoryStats = () => {
    const stats = {};
    streaks.forEach(streak => {
      stats[streak.category] = (stats[streak.category] || 0) + 1;
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <Container className="py-4">
      <DemoBanner />
      
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold">My Streaks</h1>
              <p className="text-muted">
                {stats.totalStreaks} streaks • {stats.totalStreakDays} total days • {stats.consistencyRate}% consistency
              </p>
            </div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <Plus className="me-2" />
              Add New Habit
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-3">
                  <InputGroup style={{ width: '300px' }}>
                    <InputGroup.Text>
                      <Search />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search habits..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  
                  <Form.Select 
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ width: '150px' }}
                  >
                    <option value="All">All Categories</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                  
                  <Form.Select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ width: '150px' }}
                  >
                    <option value="streak">Sort by Streak</option>
                    <option value="name">Sort by Name</option>
                    <option value="recent">Sort by Recent</option>
                  </Form.Select>
                </div>
                
                <div className="text-muted">
                  Showing {filteredStreaks.length} of {streaks.length} streaks
                </div>
              </div>
              
              {filteredStreaks.length === 0 ? (
                <Alert variant="info" className="text-center py-5">
                  <Fire size={48} className="mb-3 text-muted" />
                  <h4>No streaks found</h4>
                  <p className="text-muted">
                    {searchTerm ? 'Try a different search term' : 'Start your first streak!'}
                  </p>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Create Your First Streak
                  </Button>
                </Alert>
              ) : (
                <Row>
                  {filteredStreaks.map(streak => (
                    <Col md={6} lg={4} key={streak.id} className="mb-4">
                      <StreakCard streak={streak} />
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Quick Add</Card.Title>
              <p className="text-muted small mb-3">Start a popular habit with one click:</p>
              
              <div className="d-flex flex-wrap gap-2">
                {quickHabits.map((habit, index) => (
                  <Button
                    key={index}
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => handleQuickAdd(habit.name, habit.category)}
                  >
                    + {habit.name}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Category Breakdown</Card.Title>
              
              <div className="mb-3">
                {Object.entries(categoryStats).map(([category, count]) => (
                  <div key={category} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle me-2" 
                        style={{ 
                          width: '12px', 
                          height: '12px', 
                          backgroundColor: getCategoryColor(category) 
                        }}
                      />
                      <span>{category}</span>
                    </div>
                    <Badge bg="light" text="dark">{count}</Badge>
                  </div>
                ))}
              </div>
              
              {/* <ProgressBar>
                {Object.entries(categoryStats).map(([category, count], index) => (
                  <ProgressBar 
                    key={category}
                    now={(count / streaks.length) * 100}
                    variant={getCategoryVariant(category)}
                    label={`${Math.round((count / streaks.length) * 100)}%`}
                  />
                ))}
              </ProgressBar> */}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Streak Tips</Card.Title>
              
              <div className="alert alert-success">
                <strong>✅ Start small</strong> - Begin with just 5 minutes daily
              </div>
              
              <div className="alert alert-info">
                <strong>🕒 Be consistent</strong> - Same time each day works best
              </div>
              
              <div className="alert alert-warning">
                <strong>📱 Use reminders</strong> - Set notifications for check-ins
              </div>
              
              <div className="alert alert-primary">
                <strong>👥 Get social</strong> - Share with friends for accountability
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Habit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Habit Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Morning Meditation"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                autoFocus
              />
              <Form.Text className="text-muted">
                Make it specific and actionable
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your habit and why it's important..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Daily Goal</Form.Label>
                  <Form.Select defaultValue="15">
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="custom">Custom</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Set daily reminder"
                defaultChecked
              />
              <Form.Text className="text-muted">
                We'll remind you to check in each day
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddHabit}>
            Create Habit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

// Helper functions
const getCategoryColor = (category) => {
  const colors = {
    'Fitness': '#4CAF50',
    'Wellness': '#2196F3',
    'Learning': '#FF9800',
    'Reading': '#9C27B0',
    'Health': '#F44336',
    'Mindfulness': '#00BCD4',
    'Productivity': '#3F51B5',
    'Social': '#E91E63',
    'Creative': '#8BC34A'
  };
  return colors[category] || '#607D8B';
};

const getCategoryVariant = (category) => {
  const variants = {
    'Fitness': 'success',
    'Wellness': 'info',
    'Learning': 'warning',
    'Reading': 'primary',
    'Health': 'danger',
    'Mindfulness': 'info',
    'Productivity': 'primary',
    'Social': 'danger',
    'Creative': 'success'
  };
  return variants[category] || 'secondary';
};

export default StreaksPage;