import Activity from '../models/Activity.js';
import Profile from "../models/Profile.js";

export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find().limit();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: 'Errore nel recupero delle attività' });
    }


};

//READ attività
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

// CREATE attività
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

// UPDATE attività
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const aggiornata = await Activity.findByIdAndUpdate(id, req.body, { new: true });

    if (!aggiornata) {
      return res.status(404).json({ error: 'Attività non trovata' });
    }

    res.status(200).json(aggiornata);
  } catch (error) {
    res.status(400).json({ error: 'Errore durante l\'aggiornamento dell\'attività' });
  }
};

// DELETE attività
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminata = await Activity.findByIdAndDelete(id);

    if (!eliminata) {
      return res.status(404).json({ error: 'Attività non trovata' });
    }

    res.status(200).json({ message: 'Attività eliminata con successo' });
  } catch (err) {
    res.status(400).json({ error: 'Errore durante l\'eliminazione' });
  }
};

export const getPaginatedActivities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Recupero delle attività
        const activities = await Activity.find().skip(skip).limit(limit).lean();

        // Recupero degli user_id unici
        const userIds = [...new Set(activities.map(a => a.user_id))];

        // Recupero dei profili corrispondenti
        const profiles = await Profile.find({ user_id: { $in: userIds } }, { user_id: 1, username: 1 }).lean();

        const profileMap = Object.fromEntries(profiles.map(p => [p.user_id, p.username]));

        // Enrich ogni attività con lo username
        const enrichedActivities = activities.map(activity => ({
            ...activity,
            username: profileMap[activity.user_id] || 'Sconosciuto'
        }));

        const totalActivities = await Activity.countDocuments();
        const totalPages = Math.ceil(totalActivities / limit);

        res.json({ activities: enrichedActivities, page, totalPages });
    } catch (error) {
        console.error('Errore nel recupero delle attività:', error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};




export const getActivitiesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const activities = await Activity.find({ user_id: userId }).lean();
        const profile = await Profile.findOne({ user_id: userId }).lean();

        const username = profile?.username || 'Sconosciuto';

        const enrichedActivities = activities.map(a => ({
            ...a,
            username
        }));

        res.json(enrichedActivities);
    } catch (error) {
        console.error('Errore nel recupero delle attività per utente:', error);
        res.status(500).json({ message: 'Errore nel server' });
    }
};



