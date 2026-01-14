import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const StreaksContext = createContext();

export const useStreaks = () => useContext(StreaksContext);

export const StreaksProvider = ({ children }) => {
  const [streaks, setStreaks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStreaks();
  }, []);

  const loadStreaks = () => {
    const savedStreaks = localStorage.getItem('lifeStreaks_demoStreaks');
    if (savedStreaks) {
      setStreaks(JSON.parse(savedStreaks));
    }
    setIsLoading(false);
  };

  const saveStreaks = (newStreaks) => {
    setStreaks(newStreaks);
    localStorage.setItem('lifeStreaks_demoStreaks', JSON.stringify(newStreaks));
  };

  const addStreak = (streak) => {
    const newStreak = {
      ...streak,
      id: Date.now(),
      streak: 0,
      lastChecked: "Never",
      completed: false,
      bestStreak: 0,
      createdAt: new Date().toISOString()
    };
    const updatedStreaks = [...streaks, newStreak];
    saveStreaks(updatedStreaks);
    toast.success(`Started "${streak.name}" streak!`);
    return newStreak;
  };

  const checkInStreak = (streakId) => {
    const updatedStreaks = streaks.map(streak => {
      if (streak.id === streakId) {
        const isAlreadyChecked = streak.lastChecked === "Today";
        if (!isAlreadyChecked) {
          const newStreak = streak.streak + 1;
          const newBestStreak = Math.max(streak.bestStreak, newStreak);
          toast.success(`✅ Checked in for "${streak.name}"! Streak: ${newStreak} days`);
          return {
            ...streak,
            streak: newStreak,
            bestStreak: newBestStreak,
            lastChecked: "Today",
            completed: true
          };
        }
      }
      return streak;
    });
    saveStreaks(updatedStreaks);
  };

  const updateStreak = (streakId, updates) => {
    const updatedStreaks = streaks.map(streak =>
      streak.id === streakId ? { ...streak, ...updates } : streak
    );
    saveStreaks(updatedStreaks);
    toast.success("Streak updated!");
  };

  const deleteStreak = (streakId) => {
    const streakToDelete = streaks.find(s => s.id === streakId);
    const updatedStreaks = streaks.filter(streak => streak.id !== streakId);
    saveStreaks(updatedStreaks);
    toast.success(`Deleted "${streakToDelete.name}" streak`);
  };

  const resetStreak = (streakId) => {
    const updatedStreaks = streaks.map(streak => 
      streak.id === streakId 
        ? { ...streak, streak: 0, lastChecked: "Never", completed: false }
        : streak
    );
    saveStreaks(updatedStreaks);
    toast.success("Streak reset to 0");
  };

  const getTotalStreakDays = () => {
    return streaks.reduce((total, streak) => total + streak.streak, 0);
  };

  const getActiveStreaksCount = () => {
    return streaks.filter(s => s.lastChecked === "Today").length;
  };

  const getLongestStreak = () => {
    return Math.max(...streaks.map(s => s.streak), 0);
  };

  const getConsistencyRate = () => {
    const activeStreaks = streaks.filter(s => s.streak > 0);
    if (activeStreaks.length === 0) return 0;
    const totalPossible = activeStreaks.length * 7; // Assuming 7 days
    const actualCheckins = activeStreaks.reduce((sum, s) => sum + Math.min(s.streak, 7), 0);
    return Math.round((actualCheckins / totalPossible) * 100);
  };

  const getStreakStats = () => {
    return {
      totalStreaks: streaks.length,
      totalStreakDays: getTotalStreakDays(),
      activeStreaks: getActiveStreaksCount(),
      longestStreak: getLongestStreak(),
      consistencyRate: getConsistencyRate()
    };
  };

  const value = {
    streaks,
    isLoading,
    addStreak,
    checkInStreak,
    updateStreak,
    deleteStreak,
    resetStreak,
    getStreakStats,
    loadStreaks
  };

  return (
    <StreaksContext.Provider value={value}>
      {children}
    </StreaksContext.Provider>
  );
};