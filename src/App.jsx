import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './components/global/Layout';
import HomePage from './components/global/HomePage';
import SimpleLayout from './components/global/SimpleLayout';
import OrganizersPage from './components/organizers/OrganizersPage';
import HackathonDetails from './components/organizers/HackathonDetails';
import EditHackathon from './components/organizers/EditHackathon';
import UserPage from './components/users/UserPage';
import HackathonDetailsForUser from './components/users/HackathonDetailsForUser';
import RegisterForHackathon from './components/users/RegisterForHackathon';
import HackathonForm from './components/organizers/HackathonForm';
import LoginPage from './components/credentials/LoginPage';

const App = () => {
  const [hackathons, setHackathons] = useState([]);

  return (
    <Router>
      <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/" element={<MainLayout><UserPage /></MainLayout>} />
          <Route path="/organizers" element={<MainLayout><OrganizersPage hackathons={hackathons} setHackathons={setHackathons}></OrganizersPage></MainLayout>}/>
           <Route path='/details' element={<HackathonDetails hackathons={hackathons} setHackathons={setHackathons} />} />
        <Route path="/edit-hackathon" element={<EditHackathon hackathons={hackathons} setHackathons={setHackathons} />} />

          <Route path="/hackathonForm" element={<MainLayout><HackathonForm hackathons={hackathons} setHackathons={setHackathons} /></MainLayout>} />
          <Route path="/login" element={<SimpleLayout><LoginPage /></SimpleLayout>} />
          <Route path="/detailsForUser" element={<MainLayout><HackathonDetailsForUser /></MainLayout>} />
          <Route path="/register" element={<MainLayout><RegisterForHackathon /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default App;



         