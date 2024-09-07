import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import OrganizersPage from './components/OrganizersPage';
import HackathonDetails from './components/HackathonDetails';
import EditHackathon from './components/EditHackathon';
import RegisterForHackathon from './components/RegisterForHackathon';
import HackathonForm from './components/HackathonForm';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';

const App = () => {
  const [hackathons, setHackathons] = useState([]);

  return (
    <Router>
      <Header />
      <HomePage />
      <Routes>
        <Route path="/hackathonForm" element={<HackathonForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<HackathonDetails />} />
        <Route
          path="/organizers"
          element={<OrganizersPage hackathons={hackathons} setHackathons={setHackathons} />}
        />
        <Route
          path="/edit-hackathon/:id"
          element={<EditHackathon hackathons={hackathons} setHackathons={setHackathons} />}
        />
        <Route
          path="/hackathonForm"
          element={<HackathonForm hackathons={hackathons} setHackathons={setHackathons} />}
        />
        <Route path="/register" element={<RegisterForHackathon />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
