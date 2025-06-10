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
      const idProfilo = '68418119dddf75bb651bb533'; 
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

  const handleCreateActivity = async () => {
    try {
      const res = await axios.post('/api/activities/create', {
        nome: 'Lezione di React',
        descrizione: 'Introduzione ai componenti funzionali',
        data: new Date()
      });
      console.log('✅ Attività creata:', res.data);
      alert('✅ Attività creata! Guarda la console!');
    } catch (err) {
      console.error('❌ Errore creazione attività:', err);
      alert('❌ POST attività fallita. Guarda la console.');
    }
  };

  const handleUpdateActivity = async () => {
    try {
      const idAttivita = '684181e0dddf75bb651bb538';
      const res = await axios.put(`/api/activities/update/${idAttivita}`, {
        nome: 'Lezione aggiornata di React',
        descrizione: 'Hooks e gestione stato',
        data: new Date()
      });
      console.log('🛠️ Attività aggiornata:', res.data);
      alert('🛠️ PUT attività fatta! Guarda la console!');
    } catch (err) {
      console.error('❌ Errore aggiornamento attività:', err);
      alert('❌ PUT attività fallita. Guarda la console.');
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const idProfilo = '68418119dddf75bb651bb533'; // Cambia con l'ID reale
      const res = await axios.delete(`/api/profiles/delete/${idProfilo}`);
      console.log('🗑️ Profilo eliminato:', res.data);
      alert('🗑️ DELETE profilo fatta! Guarda la console!');
    } catch (err) {
      console.error('❌ Errore DELETE profilo:', err);
      alert('❌ DELETE profilo fallita. Guarda la console.');
    }
  };

  const handleDeleteActivity = async () => {
    try {
      const idAttivita = '684181e0dddf75bb651bb538'; // Cambia con l'ID reale
      const res = await axios.delete(`/api/activities/delete/${idAttivita}`);
      console.log('🗑️ Attività eliminata:', res.data);
      alert('🗑️ DELETE attività fatta! Guarda la console!');
    } catch (err) {
      console.error('❌ Errore DELETE attività:', err);
      alert('❌ DELETE attività fallita. Guarda la console.');
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
        CREATE PROFILO 
      </button>

      <button
        onClick={handleUpdate}
        style={{
          fontSize: '20px',
          padding: '16px',
          background: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginRight: '10px'
        }}
      >
        AGGIORNA PROFILO
      </button>

      <button
        onClick={handleCreateActivity}
        style={{
          fontSize: '20px',
          padding: '16px',
          background: 'orange',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginRight: '10px'
        }}
      >
        CREATE ATTIVITA'
      </button>

      <button
        onClick={handleUpdateActivity}
        style={{
          fontSize: '20px',
          padding: '16px',
          background: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginRight: '10px'
        }}
      >
        AGGIORNA ATTIVITA'
      </button>

      <button
        onClick={handleDeleteProfile}
        style={{
          fontSize: '20px',
          padding: '16px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginTop: '20px',
          marginRight: '10px'
        }}
      >
        ELIMINA PROFILO
      </button>

      <button
        onClick={handleDeleteActivity}
        style={{
          fontSize: '20px',
          padding: '16px',
          background: 'purple',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          marginTop: '20px'
        }}
      >
        ELIMINA ATTIVITA'
      </button>
    </div>
  );
}

export default PostButton;