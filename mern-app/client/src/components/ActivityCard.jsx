import React from 'react';

const ActivityCard = ({ activity }) => {
    const likes = activity.likes?.$numberInt || activity.likes;
    const comments = activity.comments?.$numberInt || activity.comments;
    const shares = activity.shares?.$numberInt || activity.shares;
    const characterCount = activity.character_count?.$numberInt || activity.character_count;
    const hashtagCount = activity.hashtag_count?.$numberInt || activity.hashtag_count;
    const mentionCount = activity.mention_count?.$numberInt || activity.mention_count;
    const containsUrl = activity.contains_url?.$numberInt || activity.contains_url;
    const isWeekend = activity.is_weekend?.$numberInt || activity.is_weekend;
    const hourOfDay = activity.hour_of_day?.$numberInt || activity.hour_of_day;
    const dayOfWeek = activity.day_of_week?.$numberInt || activity.day_of_week;

    const username = activity.username || 'N/D'; // fallback se manca

    return (

        <div style={styles.card}>
            <div style={styles.headerRow}>
                <div style={styles.headerColumnLeft}>
                    <strong>📝 ID:</strong> {activity.activity_id}
                </div>
                <div style={styles.headerColumnCenter}>
                    <strong>👤 Username:</strong> {activity.username || 'N/D'}
                </div>
                <div style={styles.headerColumnRight}>
                    <strong>🕒 Timestamp:</strong> {activity.timestamp}
                </div>
            </div>



            <p><strong>✏️ Contenuto:</strong> {activity.content}</p>

            <div style={styles.metricsRow}>
                <div style={styles.column}>
                    <p>📍 <strong>Città del post:</strong> {activity.post_city}</p>
                    <p>🖥️ <strong>Dispositivo:</strong> {activity.device} ({activity.platform})</p>
                    <p>👍 <strong>Mi piace:</strong> {likes}</p>
                    <p>💬 <strong>Commenti:</strong> {comments}</p>
                    <p>🔁 <strong>Condivisioni:</strong> {shares}</p>
                    <p>📅 <strong>Giorno settimana:</strong> {dayOfWeek}</p>
                </div>
                <div style={styles.column}>
                    <p>🗺️ <strong>Regione del post:</strong> {activity.post_region}</p>
                    <p>🧠 <strong>Lingua:</strong> {activity.language}</p>
                    <p>⏰ <strong>Ora del giorno:</strong> {hourOfDay}</p>
                    <p>🎉 <strong>Weekend:</strong> {isWeekend === "1" || isWeekend === 1 ? "Sì" : "No"}</p>
                    <p>🔠 <strong>Caratteri:</strong> {characterCount}</p>
                    <p>🏷️ <strong>Hashtag:</strong> {hashtagCount}</p>
                </div>
                <div style={styles.column}>
                    <p>🌍 <strong>Paese del post:</strong> {activity.post_country}</p>
                    <p>👾 <strong>Tipo contenuto:</strong> {activity.content_type}</p>
                    <p>👥 <strong>Menzioni:</strong> {mentionCount}</p>
                    <p>🔗 <strong>URL incluso:</strong> {containsUrl === "1" || containsUrl === 1 ? "Sì" : "No"}</p>
                    <p>🖼️ <strong>Media presente:</strong> {activity.has_media === 'True' ? 'Sì' : 'No'}</p>
                    <p>📷 <strong>Tipo media:</strong> {activity.media_type}</p>
                </div>
            </div>

            <p><strong>🤖 Attività falsa:</strong> {activity.is_fake === 'True' ? 'Sì' : 'No'}</p>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '16px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        maxWidth: '1000px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        fontSize: '14px',
        textAlign: 'center'
    },
    headerColumnLeft: {
        flex: 1,
        textAlign: 'left'
    },
    headerColumnCenter: {
        flex: 1,
        textAlign: 'center'
    },
    headerColumnRight: {
        flex: 1,
        textAlign: 'right'
    },

    metricsRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        gap: '30px',
        fontSize: '14px',
        alignItems: 'flex-start'
    },
    column: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        minWidth: '200px'
    }
};

export default ActivityCard;
