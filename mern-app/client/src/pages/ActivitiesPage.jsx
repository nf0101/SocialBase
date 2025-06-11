import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityCard from '../components/ActivityCard';
import ProfileCard from "../components/ProfileCard";
import ProfileStats from "../components/ProfileStats";
import ActivitiesStats from "../components/ActivitiesStats"; // Assicurati che il path sia corretto

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
        <div style={{ width: '100%' }}>

        <h2>Attività</h2>
            <div>
                <button onClick={handlePrev} disabled={page === 1}>⬅️ Indietro</button>
                <span style={{ margin: '0 10px' }}>Pagina {page}</span>
                <button onClick={handleNext}>Avanti ➡️</button>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: '10px',
                justifyContent: 'flex-start',
                width: '100%',
            }}>
                {/* Colonna delle card profilo */}
                <div style={{
                    flex: 3,
                    maxWidth: '800px',
                    overflowX: 'auto',
                    marginLeft : '1px',
                }}>


                    {activities.length === 0 ? (
                        <p>Nessuna attività trovata.</p>
                    ) : (
                        activities.map((activity) => (
                            <ActivityCard key={activity.activity_id} activity={activity} />
                        ))
                    )}
                </div>


                {/* Colonna delle statistiche */}
                <div style={{
                    flex: 1.5,
                    maxWidth: '1200px',
                    position: 'relative',
                    top: '20px',
                    marginLeft: '20px',
                    marginRight: 0,
                    alignSelf: 'flex-start',
                    minWidth: '600px'
                }}>

                    <ActivitiesStats/>
                </div>

            </div>

        </div>
    );
}

export default ActivitiesPage;
