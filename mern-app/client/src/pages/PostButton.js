import React, { useState } from 'react';
import axios from 'axios';
import HeaderPage from './HeaderPage';
import FooterPage from './FooterPage';  // import del FooterPage

function CrudPanel({ tipo }) {
  const [createFields, setCreateFields] = useState([{ key: '', value: '' }]);
  const [updateId, setUpdateId] = useState('');
  const [updateKey, setUpdateKey] = useState('');
  const [updateValue, setUpdateValue] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const endpoint = tipo === 'profili' ? '/api/profiles' : '/api/activities';

  const handleCreateChange = (index, field, value) => {
    const updatedFields = [...createFields];
    updatedFields[index][field] = value;
    setCreateFields(updatedFields);
  };

  const addCreateField = () => {
    setCreateFields([...createFields, { key: '', value: '' }]);
  };

  const handleCreate = async () => {
    const payload = {};
    for (const field of createFields) {
      if (field.key) payload[field.key] = field.value;
    }
    try {
      const res = await axios.post(`${endpoint}/create`, payload);
      alert(`✅ ${tipo} creato con successo`);
      console.log('Creato:', res.data);
    } catch (err) {
      alert('❌ Errore nella creazione');
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = { [updateKey]: updateValue };
      const res = await axios.put(`${endpoint}/update/${updateId}`, payload);
      alert(`✏️ ${tipo} aggiornato con successo`);
      console.log('Aggiornato:', res.data);
    } catch (err) {
      alert('❌ Errore aggiornamento');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${endpoint}/delete/${deleteId}`);
      alert(`🗑️ ${tipo} eliminato con successo`);
      console.log('Eliminato:', res.data);
    } catch (err) {
      alert('❌ Errore eliminazione');
      console.error(err);
    }
  };

  // Stili CSS nel componente
  const boxStyle = {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    width: '280px',
    minHeight: '260px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: '20px',
  };

  const inputStyle = {
    padding: '8px 10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    marginBottom: '10px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const buttonStyle = (bgColor) => ({
    backgroundColor: bgColor,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  });

  const fieldRow = {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  };

  return (
    <div style={{ marginBottom: '50px' }}>
      <h2 style={{ textAlign: 'center', fontWeight: '700', color: '#333' }}>{tipo.toUpperCase()}</h2>

      {/* CREATE BOX */}
      <div style={boxStyle}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>CREATE</h3>
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
          {createFields.map((field, index) => (
            <div key={index} style={fieldRow}>
              <input
                placeholder="Campo"
                value={field.key}
                onChange={(e) => handleCreateChange(index, 'key', e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
              <input
                placeholder="Valore"
                value={field.value}
                onChange={(e) => handleCreateChange(index, 'value', e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={addCreateField}
          style={{ ...buttonStyle('#888'), marginBottom: '15px', width: '100%' }}
          type="button"
        >
          ➕ Aggiungi campo
        </button>
        <button onClick={handleCreate} style={buttonStyle('green')} type="button">
          ✅ Crea {tipo}
        </button>
      </div>

      {/* UPDATE BOX */}
      <div style={boxStyle}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>UPDATE</h3>
        <input
          placeholder="ID"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Campo da aggiornare"
          value={updateKey}
          onChange={(e) => setUpdateKey(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Nuovo valore"
          value={updateValue}
          onChange={(e) => setUpdateValue(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleUpdate} style={buttonStyle('blue')} type="button">
          ✏️ Aggiorna {tipo}
        </button>
      </div>

      {/* DELETE BOX */}
      <div style={boxStyle}>
        <h3 style={{ marginBottom: '15px', color: '#555' }}>DELETE</h3>
        <input
          placeholder="ID da eliminare"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleDelete} style={buttonStyle('crimson')} type="button">
          🗑️ Elimina {tipo}
        </button>
      </div>
    </div>
  );
}

export default function CrudPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <HeaderPage />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
          padding: '40px 20px',
          backgroundColor: '#f9f9f9',
          flexGrow: 1,
          boxSizing: 'border-box',
        }}
      >
        <CrudPanel tipo="profili" />
        <CrudPanel tipo="attività" />
      </div>
      <FooterPage />  {/* inserito FooterPage */}
    </div>
  );
}
