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

export const createActivity = async (req, res) => {
  try {
    const nuovaAttivita = new Activity(req.body);
    const savedActivity = await nuovaAttivita.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    console.error('Errore nella creazione:', error);
    res.status(400).json({ error: 'Errore nella creazione dell\'attività' });
  }
};