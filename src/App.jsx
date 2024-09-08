import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './components/Layout';
import SimpleLayout from './components/SimpleLayout';
import HomePage from './components/HomePage';
import OrganizersPage from './components/OrganizersPage';
import HackathonDetails from './components/HackathonDetails';
import EditHackathon from './components/EditHackathon';
import RegisterForHackathon from './components/RegisterForHackathon';
import HackathonForm from './components/HackathonForm';
import LoginPage from './components/LoginPage';

const App = () => {
  const [hackathons, setHackathons] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/hackathonForm" element={<MainLayout><HackathonForm hackathons={hackathons} setHackathons={setHackathons} /></MainLayout>} />
        <Route path="/login" element={<SimpleLayout><LoginPage /></SimpleLayout>} />
        <Route path="/details" element={<MainLayout><HackathonDetails /></MainLayout>} />
        <Route path="/organizers" element={<MainLayout><OrganizersPage hackathons={hackathons} setHackathons={setHackathons} /></MainLayout>} />
        <Route path="/edit-hackathon/:id" element={<MainLayout><EditHackathon hackathons={hackathons} setHackathons={setHackathons} /></MainLayout>} />
        <Route path="/register" element={<MainLayout><RegisterForHackathon /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
