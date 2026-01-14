import React from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Table, Badge } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage = () => {
  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', streaks: 4, checkins: 3 },
    { day: 'Tue', streaks: 6, checkins: 5 },
    { day: 'Wed', streaks: 7, checkins: 6 },
    { day: 'Thu', streaks: 5, checkins: 4 },
    { day: 'Fri', streaks: 8, checkins: 7 },
    { day: 'Sat', streaks: 9, checkins: 8 },
    { day: 'Sun', streaks: 7, checkins: 6 },
  ];

  const habitDistribution = [
    { name: 'Fitness', value: 35, color: '#4CAF50' },
    { name: 'Learning', value: 25, color: '#2196F3' },
    { name: 'Wellness', value: 20, color: '#FF9800' },
    { name: 'Productivity', value: 15, color: '#9C27B0' },
    { name: 'Other', value: 5, color: '#607D8B' },
  ];

  const streakHistory = [
    { month: 'Jan', streaks: 12 },
    { month: 'Feb', streaks: 18 },
    { month: 'Mar', streaks: 15 },
    { month: 'Apr', streaks: 22 },
    { month: 'May', streaks: 25 },
    { month: 'Jun', streaks: 30 },
  ];

  const performanceStats = [
    { metric: 'Best Streak', value: '75 days', change: '+5%' },
    { metric: 'Consistency Rate', value: '92%', change: '+3%' },
    { metric: 'Weekly Activity', value: '85%', change: '+8%' },
    { metric: 'Friend Engagement', value: '78%', change: '+12%' },
  ];

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Analytics</h1>
          <p className="text-muted">Track your progress and insights</p>
        </Col>
      </Row>

      <Row className="mb-4">
        {performanceStats.map((stat, index) => (
          <Col md={3} key={index} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div className="h4 fw-bold">{stat.value}</div>
                <Card.Title className="text-muted small">{stat.metric}</Card.Title>
                <Badge bg={stat.change.startsWith('+') ? 'success' : 'danger'}>
                  {stat.change} from last month
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Tabs defaultActiveKey="overview" className="mb-4">
        <Tab eventKey="overview" title="Overview">
          <Row className="mb-4">
            <Col md={8}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="fw-bold mb-4">Weekly Performance</Card.Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="streaks" fill="#4CAF50" name="Streaks Maintained" />
                      <Bar dataKey="checkins" fill="#2196F3" name="Daily Check-ins" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="fw-bold mb-4">Habit Distribution</Card.Title>
                  <ResponsiveContainer width="100%" height={300}>
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
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="trends" title="Trends">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Streak Growth Over Time</Card.Title>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={streakHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="streaks" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="insights" title="Insights">
          <Row>
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="fw-bold mb-4">Best Performing Days</Card.Title>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Success Rate</th>
                        <th>Avg. Streaks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Saturday</td>
                        <td>94%</td>
                        <td>8.7</td>
                      </tr>
                      <tr>
                        <td>Friday</td>
                        <td>89%</td>
                        <td>7.9</td>
                      </tr>
                      <tr>
                        <td>Wednesday</td>
                        <td>87%</td>
                        <td>7.5</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="fw-bold mb-4">Recommendations</Card.Title>
                  <div className="alert alert-success">
                    <strong>✅ Keep it up!</strong> Your morning routine streak is your strongest habit.
                  </div>
                  <div className="alert alert-warning">
                    <strong>⚠️ Need attention:</strong> Weekend consistency drops by 25%. Try setting weekend reminders.
                  </div>
                  <div className="alert alert-info">
                    <strong>💡 Pro tip:</strong> You perform 40% better when doing habits with friends. Invite more friends!
                  </div>
                  <div className="alert alert-primary">
                    <strong>🎯 Next goal:</strong> Reach 100-day streak on coding practice. You're 25 days away!
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AnalyticsPage;