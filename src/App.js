import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import StreaksPage from './pages/StreaksPage';
import FriendsPage from './pages/FriendsPage';
import TeamsPage from './pages/TeamsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import PricingPage from './pages/PricingPage';
import NotificationsPage from './pages/NotificationsPage';
import AchievementsPage from './pages/AchievementsPage';
import { StreaksProvider } from '../src/components/context/StreaksContext';
import { FriendsProvider } from '../src/components/context/FriendsContext';
import { TeamsProvider } from '../src/components/context/TeamsContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isDemoMode] = useState(true);
  const [userData, setUserData] = useState({
    name: 'Demo User',
    email: 'demo@lifestreaks.com',
    plan: 'free',
    streaks: 4,
    totalStreakDays: 160,
    consistencyRate: 92
  });

  useEffect(() => {
    // Load demo data on startup
    const savedStreaks = localStorage.getItem('lifeStreaks_demoStreaks');
    const savedFriends = localStorage.getItem('lifeStreaks_demoFriends');
    const savedTeams = localStorage.getItem('lifeStreaks_demoTeams');
    
    if (!savedStreaks) {
      const initialStreaks = [
        { id: 1, name: "Morning Run", description: "30 min daily run", streak: 42, category: "Fitness", lastChecked: "Today", completed: true, bestStreak: 45 },
        { id: 2, name: "Meditation", description: "10 min mindfulness", streak: 28, category: "Wellness", lastChecked: "Today", completed: true, bestStreak: 30 },
        { id: 3, name: "Coding Practice", description: "1 hour programming", streak: 75, category: "Learning", lastChecked: "Yesterday", completed: false, bestStreak: 75 },
        { id: 4, name: "Read Book", description: "30 pages daily", streak: 15, category: "Reading", lastChecked: "Today", completed: true, bestStreak: 20 },
        { id: 5, name: "Water Intake", description: "2 liters daily", streak: 30, category: "Health", lastChecked: "Today", completed: true, bestStreak: 35 },
        { id: 6, name: "Journaling", description: "Evening reflection", streak: 21, category: "Mindfulness", lastChecked: "2 days ago", completed: false, bestStreak: 25 }
      ];
      localStorage.setItem('lifeStreaks_demoStreaks', JSON.stringify(initialStreaks));
    }

    if (!savedFriends) {
      const initialFriends = [
        { id: 1, name: "Alex Johnson", streak: 65, habits: ["Running", "Reading"], status: "active", online: true },
        { id: 2, name: "Sarah Chen", streak: 42, habits: ["Yoga", "Meditation"], status: "active", online: false },
        { id: 3, name: "Marcus Rodriguez", streak: 89, habits: ["Coding", "Guitar"], status: "legend", online: true },
        { id: 4, name: "Emily Brown", streak: 23, habits: ["Writing", "Drawing"], status: "active", online: false },
        { id: 5, name: "David Kim", streak: 105, habits: ["Workout", "Language"], status: "legend", online: true }
      ];
      localStorage.setItem('lifeStreaks_demoFriends', JSON.stringify(initialFriends));
    }

    if (!savedTeams) {
      const initialTeams = [
        { id: 1, name: "Dev Warriors", members: 12, streak: 45, category: "Coding", activeChallenge: true, joined: true },
        { id: 2, name: "Fitness Crew", members: 8, streak: 28, category: "Fitness", activeChallenge: true, joined: false },
        { id: 3, name: "Book Club", members: 15, streak: 60, category: "Reading", activeChallenge: false, joined: true },
        { id: 4, name: "Morning Risers", members: 5, streak: 90, category: "Productivity", activeChallenge: true, joined: true }
      ];
      localStorage.setItem('lifeStreaks_demoTeams', JSON.stringify(initialTeams));
    }
  }, []);

  return (
    <StreaksProvider>
      <FriendsProvider>
        <TeamsProvider>
          <Router>
            <div className="App d-flex flex-column min-vh-100">
              <Toaster position="top-right" />
              <Header userData={userData} isDemoMode={isDemoMode} />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<DashboardPage userData={userData} />} />
                  <Route path="/streaks" element={<StreaksPage />} />
                  <Route path="/friends" element={<FriendsPage />} />
                  <Route path="/teams" element={<TeamsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/settings" element={<SettingsPage userData={userData} setUserData={setUserData} />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/achievements" element={<AchievementsPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </TeamsProvider>
      </FriendsProvider>
    </StreaksProvider>
  );
}

export default App;