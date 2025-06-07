import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityCard from '../components/ActivityCard'; // Assicurati che il path sia corretto

function ActivitiesPage() {
    const [activities, setActivities] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchActivities();
    }, [page]);

    const fetchActivities = async () => {
        try {
            const res = await axios.get(`/api/activities/paginated?page=${page}`);
            setActivities(res.data.activities);
        } catch (error) {
            console.error('Errore durante il fetch delle attività:', error);
        }
    };

    const handleNext = () => setPage(prev => prev + 1);
    const handlePrev = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
            <h2>Attività</h2>
            <div>
                <button onClick={handlePrev} disabled={page === 1}>⬅️ Indietro</button>
                <span style={{ margin: '0 10px' }}>Pagina {page}</span>
                <button onClick={handleNext}>Avanti ➡️</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {activities.length === 0 ? (
                    <p>Nessuna attività trovata.</p>
                ) : (
                    activities.map((activity) => (
                        <ActivityCard key={activity.activity_id} activity={activity} />
                    ))
                )}
            </div>
        </div>
    );
}

export default ActivitiesPage;
