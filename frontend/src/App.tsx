import { useState, type JSX } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import ReservationPage from './pages/ReservationPage'
import VehicleFleetPage from './pages/VehicleFleetPage'
import VehicleDetailsPage from './pages/VehicleDetailsPage'
import LoginUser from './components/user/LoginUser'
import UserProfilePage from './pages/UserProfilePage'
import AuthProvider from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App(): JSX.Element {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <AuthProvider>
      <Router>
        <Header onLoginClick={() => setIsLoginOpen(true)} />
        <main className="w-full flex-grow">
          <Routes>
            <Route index element={<Navigate to="/inicio" replace />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/inicio" element={<HomePage />} />
            <Route path="/flota-vehiculos" element={<VehicleFleetPage />} />
            <Route path="/vehiculo/:id" element={<VehicleDetailsPage />} />
            <Route path="/generar-reserva" element={<ReservationPage />} />
            <Route element={<ProtectedRoute redirectTo="/inicio" />}>
            <Route path="/perfil" element={<UserProfilePage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <LoginUser
          onClose={() => setIsLoginOpen(false)}
          isLoginOpen={isLoginOpen}
        />
      </Router>
    </AuthProvider>
  )
}

export default App
