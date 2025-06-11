import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const { pathname } = useLocation();

    /* ——— container con sfondo nero e testo bianco ——— */
    const base = {
        padding: '20px 40px',
        background: '#000',   // sfondo
        color: '#fff',        // <<< QUI: proprietà corretta, testo bianco
        boxShadow: '0 2px 8px rgba(0,0,0,.15)',
        marginBottom: 40,
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    /* pillole di navigazione */
    const pill = {
        padding: '10px 26px',
        margin: '0 10px',
        borderRadius: 9999,
        fontSize: '1rem',
        fontWeight: 600,
        textDecoration: 'none',
        border: '2px solid #4e8cff',
        transition: 'all .2s ease',
        display: 'inline-block',
    };

    const pillStyle = (active) => ({
        ...pill,
        background: active
            ? 'linear-gradient(135deg, #6c63ff 0%, #4e8cff 100%)'
            : 'transparent',
        color: active ? '#fff' : '#4e8cff',
    });

    return (
        <header style={base}>
            {/* niente colore locale: eredita il bianco dal container */}
            <h1 style={{ margin: 0, fontWeight: 700, fontSize: '2rem' }}>
                SocialControl – Pannello CRUD
            </h1>

            <p style={{ margin: '8px 0 22px', fontSize: '1rem', opacity: .85 }}>
                Gestisci profili e attività dei social in modo semplice e veloce
            </p>

            <nav>
                <Link
                    to="/profiles"
                    style={pillStyle(pathname.startsWith('/profiles'))}
                >
                    Profili
                </Link>
                <Link
                    to="/activities"
                    style={pillStyle(pathname.startsWith('/activities'))}
                >
                    Attività
                </Link>
            </nav>
        </header>
    );
}
