import React, { useEffect, useState } from 'react';
import PostButton from './pages/PostButton'; 
import axios from 'axios';
import ProfilesPage from './pages/ProfilesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProfileActivitiesPage from "./pages/ProfileActivitiesPage";

function App() {
  const [dbStatus, setDbStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/db-status')
        .then(res => {
          setDbStatus(res.data.message);
        })
        .catch(err => {
          setError('❌ Errore durante la connessione al DB');
        });
  }, []);

  return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        {dbStatus && <p style={{ color: 'green' }}>{dbStatus}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <PostButton />
          <Router>
              <nav>
                  <Link to="/profiles">Profili</Link> |
                  <Link to="/activities">Attività</Link>
              </nav>

              <Routes>

                  <Route path="/profiles" element={<ProfilesPage />} />
                  <Route path="/activities" element={<ActivitiesPage />} />
                  <Route path="/profile/:userId/activities" element={<ProfileActivitiesPage />} />

              </Routes>
          </Router>
      </div>

      
  );
}

export default App;
