import Profile from '../models/Profile.js';

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().limit(100); // evita overload iniziale
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: 'Errore nel recupero dei profili' });
    }
};
