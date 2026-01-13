// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;