import React from 'react';

export default function Header() {
  return (
    <header
      style={{
        padding: '20px 40px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '40px',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ margin: 0, fontWeight: '700', fontSize: '2rem', color: '#222' }}>
        SocialControl - Pannello CRUD
      </h1>
      <p style={{ margin: '8px 0 0', fontSize: '1rem', color: '#666' }}>
        Gestisci profili e attività dei social in modo semplice e veloce
      </p>
    </header>
  );
}
