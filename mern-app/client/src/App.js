import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <h1>Stato della Connessione al Database</h1>
        {dbStatus && <p style={{ color: 'green' }}>{dbStatus}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
}

export default App;
