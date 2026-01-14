import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const TeamsContext = createContext();

export const useTeams = () => useContext(TeamsContext);

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [teamChallenges, setTeamChallenges] = useState([
    { id: 1, name: "30-Day Code Sprint", team: "Dev Warriors", progress: 75, endDate: "2024-12-15", joined: true },
    { id: 2, name: "Fitness Marathon", team: "Fitness Crew", progress: 45, endDate: "2024-12-20", joined: false },
    { id: 3, name: "Reading Challenge", team: "Book Club", progress: 90, endDate: "2024-12-10", joined: true }
  ]);
  const [suggestedTeams, setSuggestedTeams] = useState([
    { id: 1, name: "Remote Workers", members: 150, category: "Productivity", description: "For remote professionals" },
    { id: 2, name: "Language Learners", members: 89, category: "Education", description: "Learn languages together" },
    { id: 3, name: "Meditation Group", members: 45, category: "Wellness", description: "Daily meditation practice" }
  ]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = () => {
    const savedTeams = localStorage.getItem('lifeStreaks_demoTeams');
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams));
    }
  };

  const saveTeams = (newTeams) => {
    setTeams(newTeams);
    localStorage.setItem('lifeStreaks_demoTeams', JSON.stringify(newTeams));
  };

  const joinTeam = (teamId) => {
    const teamToJoin = suggestedTeams.find(t => t.id === teamId) || 
                      teams.find(t => t.id === teamId && !t.joined);
    
    if (teamToJoin) {
      const newTeam = {
        ...teamToJoin,
        joined: true,
        streak: Math.floor(Math.random() * 30) + 1,
        memberCount: teamToJoin.members || teamToJoin.memberCount,
        activeChallenge: Math.random() > 0.5,
        progress: Math.floor(Math.random() * 100)
      };
      
      const updatedTeams = [...teams, newTeam];
      saveTeams(updatedTeams);
      
      if (suggestedTeams.find(t => t.id === teamId)) {
        setSuggestedTeams(prev => prev.filter(t => t.id !== teamId));
      }
      
      toast.success(`Joined "${teamToJoin.name}" team!`);
      return newTeam;
    }
    return null;
  };

  const leaveTeam = (teamId) => {
    const teamToLeave = teams.find(t => t.id === teamId);
    const updatedTeams = teams.map(team => 
      team.id === teamId ? { ...team, joined: false } : team
    );
    saveTeams(updatedTeams);
    
    if (teamToLeave) {
      setSuggestedTeams(prev => [...prev, {
        id: teamToLeave.id,
        name: teamToLeave.name,
        members: teamToLeave.memberCount,
        category: teamToLeave.category,
        description: teamToLeave.description || "Team description"
      }]);
      toast.success(`Left "${teamToLeave.name}" team`);
    }
  };

  const createTeam = (teamData) => {
    const newTeam = {
      ...teamData,
      id: Date.now(),
      joined: true,
      streak: 1,
      memberCount: 1,
      activeChallenge: true,
      progress: 10
    };
    
    const updatedTeams = [...teams, newTeam];
    saveTeams(updatedTeams);
    toast.success(`Created "${teamData.name}" team!`);
    return newTeam;
  };

  const joinChallenge = (challengeId) => {
    const challenge = teamChallenges.find(c => c.id === challengeId);
    if (challenge) {
      const updatedChallenges = teamChallenges.map(c => 
        c.id === challengeId ? { ...c, joined: true, progress: 10 } : c
      );
      setTeamChallenges(updatedChallenges);
      toast.success(`Joined "${challenge.name}" challenge!`);
    }
  };

  const updateChallengeProgress = (challengeId, progress) => {
    const updatedChallenges = teamChallenges.map(c => 
      c.id === challengeId ? { ...c, progress: Math.min(100, c.progress + progress) } : c
    );
    setTeamChallenges(updatedChallenges);
    
    const challenge = updatedChallenges.find(c => c.id === challengeId);
    if (challenge.progress >= 100) {
      toast.success(`🎉 Completed "${challenge.name}" challenge!`);
    }
  };

  const getTeamStats = () => {
    const joinedTeams = teams.filter(t => t.joined);
    return {
      totalTeams: teams.length,
      joinedTeams: joinedTeams.length,
      totalMembers: joinedTeams.reduce((sum, team) => sum + team.memberCount, 0),
      avgStreak: joinedTeams.length > 0 
        ? Math.round(joinedTeams.reduce((sum, team) => sum + team.streak, 0) / joinedTeams.length)
        : 0
    };
  };

  const value = {
    teams,
    teamChallenges,
    suggestedTeams,
    joinTeam,
    leaveTeam,
    createTeam,
    joinChallenge,
    updateChallengeProgress,
    getTeamStats
  };

  return (
    <TeamsContext.Provider value={value}>
      {children}
    </TeamsContext.Provider>
  );
};