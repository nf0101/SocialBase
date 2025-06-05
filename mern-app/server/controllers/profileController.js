import Profile from '../models/Profile.js';

// READ profilo
export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().limit(100); // evita overload iniziale
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ error: 'Errore nel recupero dei profili' });
    }
};

// CREATE profilo
export const createProfile = async (req, res) => {
  try {
    const nuovoProfilo = new Profile(req.body);
    const savedProfile = await nuovoProfilo.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ error: 'Errore nella creazione del profilo' });
  }
};

// UPDATE profilo
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const aggiornato = await Profile.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!aggiornato) {
      return res.status(404).json({ error: 'Profilo non trovato' });
    }

    res.status(200).json(aggiornato);
  } catch (error) {
    res.status(400).json({ error: 'Errore durante l\'aggiornamento del profilo' });
  }
};



