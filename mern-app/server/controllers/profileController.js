import Profile from '../models/Profile.js';

export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().limit(100); // evita overload iniziale
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: 'Errore nel recupero dei profili' });
    }
};

export const createProfile = async (req, res) => {
  try {
    const nuovoProfilo = new Profile(req.body);
    const savedProfile = await nuovoProfilo.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ error: 'Errore nella creazione del profilo' });
  }
};


