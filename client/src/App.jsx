// ============================================================
// GlobeTrek Planner — Root App
// ============================================================
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import TripPlannerPage from './pages/TripPlannerPage'
import DestinationsPage from './pages/DestinationsPage'
import SavedTripsPage from './pages/SavedTripsPage'
import TripDetailPage from './pages/TripDetailPage'
import ItineraryPage from './pages/ItineraryPage'

// Layout
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner full />
  if (!user) return <Navigate to="/login" replace />
  return children
}

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner full />
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: 'DM Sans, sans-serif',
                borderRadius: '12px',
                padding: '14px 18px',
              },
            }}
          />
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

            {/* Protected — wrapped in Layout (navbar + sidebar) */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="plan" element={<TripPlannerPage />} />
              <Route path="plan/:id" element={<TripPlannerPage />} />
              <Route path="destinations" element={<DestinationsPage />} />
              <Route path="trips" element={<SavedTripsPage />} />
              <Route path="trips/:id" element={<TripDetailPage />} />
              <Route path="trips/:id/itinerary" element={<ItineraryPage />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
