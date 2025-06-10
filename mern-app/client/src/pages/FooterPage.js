import React from 'react';

export default function FooterPage() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.left}>
          <p>© 2025 Corso Basi Di Dati II - Università Degli Studi di Salerno</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#222',
    color: '#eee',
    padding: '15px 20px',
    position: 'relative',
    bottom: 0,
    width: '100%',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  left: {
    flex: '1 1 200px',
  },
  right: {
    flex: '1 1 200px',
    textAlign: 'right',
  },
  link: {
    color: '#eee',
    textDecoration: 'none',
    marginLeft: '15px',
    transition: 'color 0.3s',
  },
};