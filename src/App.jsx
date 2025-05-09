// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Shop from  './pages/Shop';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/shop" element={<Shop />} />
          <Route path = "/profile" element={<Profile />} />
          {/* Other routes will be added later */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;