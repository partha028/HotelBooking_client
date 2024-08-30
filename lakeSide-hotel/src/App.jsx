import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import AddRoom from './components/room/AddRoom';
import ExistingRooms from './components/room/ExistingRooms';
import EditRoom from './components/room/EditRoom';
import Home from './components/home/Home';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import Checkout from './components/bookings/Checkout';
import BookingSuccess from './components/bookings/BookingSuccess';
import LoginPage from './components/admin/LoginPage';
import SignUpPage from './components/admin/SignUpPage';
import ForgotPassword from './components/admin/ForgotPassword';
import UserProfile from './components/room/UserProfile';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  const hideNavAndFooter = location.pathname === '/' || 
                           location.pathname === '/sign-up' || 
                           location.pathname === '/forgot-password';

  return (
    <main>
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        <Route path="/existing-rooms" element={<ExistingRooms />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/browse-all-rooms/book-room/:roomId" element={<Checkout />} />
        <Route path="/browse-all-rooms" element={<RoomListing />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </main>
  );
}

export default App;
