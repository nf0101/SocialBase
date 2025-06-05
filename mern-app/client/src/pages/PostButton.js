import React from 'react';
import axios from 'axios';

function PostButton() {
  const handleClick = async () => {
    try {
      const res = await axios.post('/api/profiles', {
        nome: 'Lorenzo',
        email: 'Lorenzo@Insigne.com',
        ruolo: 'Forza Napoli'
      });
      console.log('✅ Profilo creato:', res.data);
      alert('✅ POST fatta! Guarda la console!');
    } catch (err) {
      console.error('❌ Errore POST:', err);
      alert('❌ POST fallita. Guarda la console.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <button 
        onClick={handleClick}
        style={{ fontSize: '24px', padding: '20px', background: 'tomato', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        🔘 PULSANTINO
      </button>
    </div>
  );
}

export default PostButton;
