import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import MatchMode from './pages/MatchMode';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<'home' | 'match'>('home');

  if (!user) {
    return <AuthPage />;
  }

  if (currentPage === 'match') {
    return <MatchMode onBack={() => setCurrentPage('home')} />;
  }

  return <HomePage onStartMatch={() => setCurrentPage('match')} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
