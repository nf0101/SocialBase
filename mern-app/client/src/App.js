// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HeaderPage           from './components/HeaderPage';
import FooterPage           from './components/FooterPage';
import PostButton           from './pages/PostButton';
import ProfilesPage         from './pages/ProfilesPage';
import ActivitiesPage       from './pages/ActivitiesPage';
import ProfileActivitiesPage from './pages/ProfileActivitiesPage';

function App() {
    const [dbStatus, setDbStatus] = useState('');
    const [error,    setError]    = useState('');

    useEffect(() => {
        axios.get('/api/db-status')
            .then(res => setDbStatus(res.data.message))
            .catch(()  => setError('❌ Errore durante la connessione al DB'));
    }, []);

    return (
        <Router>
            {/* Wrapper a colonna: header | main (flex‑1) | footer */}
            <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
                <HeaderPage />

                <main style={{ flex:1, textAlign:'center', marginTop:60 }}>
                    <h1>Stato della Connessione al Database</h1>
                    {dbStatus && <p style={{ color:'green' }}>{dbStatus}</p>}
                    {error    && <p style={{ color:'red'   }}>{error}</p>}

                    <h1>Testa la POST al DB</h1>
                    <PostButton />

                    <Routes>
                        <Route path="/profiles"                 element={<ProfilesPage />} />
                        <Route path="/activities"               element={<ActivitiesPage />} />
                        <Route path="/profile/:userId/activities" element={<ProfileActivitiesPage />} />
                    </Routes>
                </main>

                <FooterPage />
            </div>
        </Router>
    );
}

export default App;
