import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/Auth';
import CineDetectivePage from './pages/CineDetectivePage';
import MatchMode from './pages/MatchMode';
import AIChatbot from './components/AIChatbot';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<'detective' | 'match'>('detective');

  if (!user) {
    return <AuthPage />;
  }

  if (currentPage === 'match') {
    return (
      <>
        <MatchMode onBack={() => setCurrentPage('detective')} />
        <AIChatbot />
      </>
    );
  }

  return (
    <>
      <CineDetectivePage />
      <AIChatbot />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
