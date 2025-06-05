import React from 'react';
import axios from 'axios';

function PostButton() {
  const handleClick = async () => {
    try {
      const res = await axios.post('/api/profiles/create', {
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

  const handleUpdate = async () => {
    try {
      const idProfilo = '684169617837e998cb1768fd'; 
      const res = await axios.put(`/api/profiles/update/${idProfilo}`, {
        nome: 'Lowrenzo',
        email: 'Lowrenzo@Insignwe',
        ruolo: 'Lettera di licenziamento sotto natale'
      });
      console.log('✏️ Profilo aggiornato:', res.data);
      alert('✏️ PUT fatta! Guarda la console!');
    } catch (err) {
      console.error('❌ Errore PUT:', err);
      alert('❌ PUT fallita. Guarda la console.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <button
        onClick={handleClick}
        style={{
          fontSize: '24px',
          padding: '20px',
          background: 'tomato',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginRight: '10px'
        }}
      >
        🔘 PULSANTINO (POST)
      </button>

      <button
        onClick={handleUpdate}
        style={{
          fontSize: '20px',
          padding: '16px',
          background: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '8px'
        }}
      >
        ✏️ pulsanTINOtino (PUT)
      </button>
    </div>
  );
}

export default PostButton;
