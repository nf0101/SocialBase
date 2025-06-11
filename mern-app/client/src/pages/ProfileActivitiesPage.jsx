import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ActivityCard from "../components/ActivityCard";
import ActivitiesStats from "../components/ActivitiesStats";

const UserActivitiesPage = () => {
    const { userId } = useParams();
    const [activities, setActivities] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await axios.get(`/api/activities/of-profile/${userId}`);
                const data = Array.isArray(res.data) ? res.data : [];
                setActivities(data);
            } catch (error) {
                console.error('Errore durante il fetch delle attività del profilo:', error);
                setActivities([]);
            }
        };

        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/api/profiles/${userId}`);
                setUsername(res.data.username || '');
            } catch (err) {
                console.error("Errore nel fetch del profilo:", err);
            }
        };

        if (userId) {
            fetchActivities();  // ✅ ora funziona perché userId è nel contesto
            fetchProfile();
        }
    }, [userId]);


    return (

        <div style={{ padding: '20px' }}>
            {/* Titolo centrato su riga dedicata */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
                <h2 style={{ margin: 0 }}>
                    Attività di {username || userId}
                </h2>
            </div>

            <div style={{ display: 'flex', gap: 20 }}>
                {/* Colonna attività */}
                <div style={{ flex: 3, maxWidth: '100%', overflowX: 'auto' }}>
                    {activities.map((act) => (
                        <ActivityCard key={act._id} activity={act} />
                    ))}
                </div>

                {/* Colonna statistiche */}

                {activities.length > 0 && (
                    <div style={{ flex: 1.5, minWidth: 340 }}>
                        <ActivitiesStats activities={activities} />   {/* ⇦ prop passata */}
                    </div>
                )}

            </div>
        </div>


    );
};

export default UserActivitiesPage;
