import Activity from '../models/Activity.js';

export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find().limit(100);
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: 'Errore nel recupero delle attività' });
    }


};

export const getActivitiesWithProfiles = async (req, res) => {
    try {
        const results = await Activity.aggregate([
            {
                $lookup: {
                    from: 'Profili',          // nome esatto della collection su Atlas
                    localField: 'user_id',    // campo in Attività
                    foreignField: 'user_id',  // campo in Profili
                    as: 'profile'             // risultato: campo aggiunto con dati del profilo
                }
            },
            {
                $unwind: '$profile'         // rimuove array e "appiattisce" il profilo
            },

            {
                $limit: 10
            }
        ]);

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};