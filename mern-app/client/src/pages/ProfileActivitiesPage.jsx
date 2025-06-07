import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ActivityCard from "../components/ActivityCard";

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
        <div>
            <h2>Attività di {username || userId}</h2>
            {activities.map((activity) => (
                <ActivityCard key={activity.activity_id} activity={activity} />
            ))}
        </div>
    );
};

export default UserActivitiesPage;
