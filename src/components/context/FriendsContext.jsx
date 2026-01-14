import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const FriendsContext = createContext();

export const useFriends = () => useContext(FriendsContext);

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, name: "Taylor Swift", mutualFriends: 3, avatar: "TS" },
    { id: 2, name: "John Doe", mutualFriends: 1, avatar: "JD" }
  ]);
  const [suggestedFriends, setSuggestedFriends] = useState([
    { id: 1, name: "Michael Scott", mutualFriends: 5, avatar: "MS", habits: ["Management", "Comedy"] },
    { id: 2, name: "Pam Beesly", mutualFriends: 3, avatar: "PB", habits: ["Art", "Organization"] }
  ]);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = () => {
    const savedFriends = localStorage.getItem('lifeStreaks_demoFriends');
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  };

  const saveFriends = (newFriends) => {
    setFriends(newFriends);
    localStorage.setItem('lifeStreaks_demoFriends', JSON.stringify(newFriends));
  };

  const addFriend = (friendId) => {
    const friendToAdd = suggestedFriends.find(f => f.id === friendId);
    if (friendToAdd) {
      const newFriend = {
        ...friendToAdd,
        id: Date.now(),
        streak: Math.floor(Math.random() * 30) + 1,
        status: 'active',
        online: Math.random() > 0.5
      };
      const updatedFriends = [...friends, newFriend];
      saveFriends(updatedFriends);
      setSuggestedFriends(prev => prev.filter(f => f.id !== friendId));
      toast.success(`Added ${friendToAdd.name} as friend!`);
    }
  };

  const removeFriend = (friendId) => {
    const friendToRemove = friends.find(f => f.id === friendId);
    const updatedFriends = friends.filter(friend => friend.id !== friendId);
    saveFriends(updatedFriends);
    toast.success(`Removed ${friendToRemove.name} from friends`);
  };

  const acceptFriendRequest = (requestId) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      const newFriend = {
        ...request,
        id: Date.now(),
        streak: Math.floor(Math.random() * 30) + 1,
        status: 'active',
        online: true,
        habits: ["New Habit"]
      };
      const updatedFriends = [...friends, newFriend];
      saveFriends(updatedFriends);
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
      toast.success(`Accepted friend request from ${request.name}!`);
    }
  };

  const rejectFriendRequest = (requestId) => {
    const request = friendRequests.find(r => r.id === requestId);
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    toast.success(`Declined friend request from ${request.name}`);
  };

  const sendChallenge = (friendId, challengeType) => {
    const friend = friends.find(f => f.id === friendId);
    toast.success(`Challenge sent to ${friend.name}!`);
    return true;
  };

  const getLeaderboard = () => {
    return [...friends]
      .sort((a, b) => b.streak - a.streak)
      .map((friend, index) => ({
        ...friend,
        rank: index + 1
      }));
  };

  const value = {
    friends,
    friendRequests,
    suggestedFriends,
    addFriend,
    removeFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    sendChallenge,
    getLeaderboard
  };

  return (
    <FriendsContext.Provider value={value}>
      {children}
    </FriendsContext.Provider>
  );
};