import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileCard = ({ profile }) => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const [edit,   setEdit]   = useState(false);  // 🆕 form inline
    const [field,  setField]  = useState('');     // 🆕 nome campo
    const [value,  setValue]  = useState('');     // 🆕 nuovo valore
    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <div style={{
            ...styles.card,
            width: expanded ? '600px' : '300px',
            overflow: expanded ? 'visible' : 'hidden',
            transition: 'height 0.3s ease'
        }}>


        <div style={styles.header}>
                <h3>
                    👤 <strong>{profile.username}</strong>
                </h3>
                <button onClick={toggleExpanded} style={styles.toggleBtn}>
                    {expanded ? '🔼' : '🔽'}
                </button>
            </div>

            {expanded && (
                <>
                    <div style={styles.grid}>
                        <div style={styles.column}>
                            <p>🆔 <strong>ID:</strong> {profile.user_id}</p>
                            <p>🙍 <strong>Nome completo:</strong> {profile.full_name}</p>
                            <p>🧑 <strong>Nome:</strong> {profile.first_name}</p>
                            <p>👨‍💼 <strong>Cognome:</strong> {profile.last_name}</p>
                            <p>📧 <strong>Email:</strong> {profile.email}</p>
                            <p>📅 <strong>Data creazione:</strong> {profile.creation_date}</p>
                            <p>📆 <strong>Età account:</strong> {profile.account_age_days?.$numberInt || profile.account_age_days} giorni</p>
                            <p>📊 <strong>Completezza profilo:</strong> {parseFloat(profile.profile_completeness?.$numberDouble || profile.profile_completeness).toFixed(2)}%</p>
                            <p>🗣️ <strong>Lingua preferita:</strong> {profile.language_preference}</p>
                            <p>👥 <strong>Tipo account:</strong> {profile.account_type}</p>
                            <p>🤖 <strong>Account falso:</strong> {profile.is_fake === 'True' ? 'Sì' : 'No'}</p>
                        </div>

                        <div style={styles.column}>
                            <p>🌍 <strong>Paese:</strong> {profile.home_country}</p>
                            <p>🗺️ <strong>Regione:</strong> {profile.home_region}</p>
                            <p>🏙️ <strong>Città:</strong> {profile.home_city}</p>
                            <p>👥 <strong>Follower:</strong> {profile.followers_count?.$numberInt || profile.followers_count}</p>
                            <p>➡️ <strong>Seguiti:</strong> {profile.following_count?.$numberInt || profile.following_count}</p>
                            <p>📝 <strong>Post:</strong> {profile.posts_count?.$numberInt || profile.posts_count}</p>
                            <p>🔒 <strong>Privato:</strong> {profile.is_private === 'True' ? 'Sì' : 'No'}</p>
                            <p>✅ <strong>Verificato:</strong> {profile.is_verified === 'True' ? 'Sì' : 'No'}</p>
                            <p>📝 <strong>Ha biografia:</strong> {profile.has_bio === 'True' ? 'Sì' : 'No'}</p>
                            <p>🔗 <strong>Ha sito web:</strong> {profile.has_website === 'True' ? 'Sì' : 'No'}</p>
                            <p>📍 <strong>Ha localizzazione:</strong> {profile.has_location === 'True' ? 'Sì' : 'No'}</p>
                        </div>
                    </div>

                    <div style={styles.footer}>
                        <p>🖼️ <strong>Immagine profilo:</strong> {profile.profile_picture === 'True' ? 'Presente' : 'Assente'}</p>
                        <p>🖼️ <strong>Banner profilo:</strong> {profile.profile_banner === 'True' ? 'Presente' : 'Assente'}</p>
                    </div>

                    <div style={styles.actions}>
                        <button onClick={() => navigate(`/profile/${profile.user_id}/activities`)}>
                            📄 Vedi attività
                        </button>

                        {/* --- AZIONI (delete / update) --- */}
                        <div style={{ marginTop: 10 }}>
                            {/* DELETE profilo */}
                            <button
                                onClick={async () => {
                                    if (!window.confirm('Eliminare questo profilo?')) return;
                                    try {
                                        await axios.delete(`/api/profiles/delete/${profile._id}`);
                                        alert('🗑️ Profilo eliminato');
                                    } catch (err) {
                                        console.error(err);
                                        alert('❌ Errore eliminazione');
                                    }
                                }}
                                style={{ background: 'crimson', color: '#fff', marginRight: 8 }}
                            >
                                🗑️
                            </button>

                            {/* TOGGLE mini-form UPDATE */}
                            <button onClick={() => setEdit(!edit)}>✏️</button>
                        </div>

                        {/* --- MINI-FORM UPDATE (compare solo se edit === true) --- */}
                        {edit && (
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    await axios.put(`/api/profiles/update/${profile._id}`, { [field]: value });
                                    alert('✏️ Profilo aggiornato');
                                    setEdit(false);
                                }}
                                style={{ marginTop: 10 }}
                            >
                                {/* menu campo */}
                                <select
                                    value={field}
                                    onChange={(e) => setField(e.target.value)}
                                    style={{ marginRight: 6 }}
                                    required
                                >
                                    <option value="">— seleziona campo —</option>
                                    <option value="username">username</option>
                                    <option value="email">email</option>
                                    <option value="full_name">full_name</option>
                                    <option value="first_name">first_name</option>
                                    <option value="last_name">last_name</option>
                                    <option value="creation_date">creation_date</option>
                                    <option value="account_age_days">account_age_days</option>
                                    <option value="profile_completeness">profile_completeness</option>
                                    <option value="home_country">home_country</option>
                                    <option value="home_region">home_region</option>
                                    <option value="home_city">home_city</option>
                                    <option value="followers_count">followers_count</option>
                                    <option value="following_count">following_count</option>
                                    <option value="posts_count">posts_count</option>
                                    <option value="is_private">is_private</option>
                                    <option value="is_verified">is_verified</option>
                                    <option value="profile_picture">profile_picture</option>
                                    <option value="profile_banner">profile_banner</option>
                                    <option value="has_bio">has_bio</option>
                                    <option value="has_website">has_website</option>
                                    <option value="has_location">has_location</option>
                                    <option value="account_type">account_type</option>
                                    <option value="is_fake">is_fake</option>
                                    <option value="language_preference">language_preference</option>
                                </select>

                                {/* nuovo valore */}
                                <input
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Nuovo valore"
                                    required
                                />

                                <button type="submit" style={{ marginLeft: 6, background: 'blue', color: '#fff' }}>
                                    Salva
                                </button>
                            </form>
                        )}


                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        transition: 'width 0.3s ease',
        width: '100%', // lasciare gestione al contenitore
        maxWidth: '800px' // larghezza massima leggibile
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px', // 👈 più piccolo
        minHeight: '36px', // 👈 compatta la riga chiusa
        padding: '2px 0',  // 👈 meno spazio verticale
    },
    toggleBtn: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer'
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
        marginTop: '10px'
    },
    column: {
        flex: 1
    },
    footer: {
        marginTop: '10px',
        fontStyle: 'italic',
    },
    actions: {
        marginTop: '10px',
        textAlign: 'center',
    }
};


export default ProfileCard;
