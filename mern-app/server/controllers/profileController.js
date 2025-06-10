import Profile from '../models/Profile.js';

// READ profilo
export const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().limit(); // evita overload iniziale
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

// DELETE profilo
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profiloEliminato = await Profile.findByIdAndDelete(id);

    if (!profiloEliminato) {
      return res.status(404).json({ error: 'Profilo non trovato' });
    }

    res.status(200).json({ message: 'Profilo eliminato con successo' });
  } catch (error) {
    res.status(400).json({ error: 'Errore durante l\'eliminazione del profilo' });
  }
};

export const getFilteredProfiles = async (req, res) => {
  try {
    const {
      username,
      email,
      first_name,
      last_name,
      is_private,
      is_verified,
      is_fake,
      has_bio,
      has_website,
      profile_picture,
      profile_banner,
      has_location,
    } = req.query;

    const filter = {};

    if (username) filter.username = { $regex: new RegExp(username, 'i') };
    if (email) filter.email = { $regex: new RegExp(email, 'i') };
    if (first_name) filter.first_name = { $regex: new RegExp(first_name, 'i') };
    if (last_name) filter.last_name = { $regex: new RegExp(last_name, 'i') };

    const booleanFields = {
      is_private,
      is_verified,
      is_fake,
      has_bio,
      has_website,
      profile_picture,
      profile_banner,
      has_location,
    };

    for (const [field, value] of Object.entries(booleanFields)) {
      if (typeof value !== 'undefined' && value !== '') {
        filter[field] = value === 'true' ? 'True' : 'False';
      }
    }

    const profiles = await Profile.find(filter);
    res.json(profiles);

  } catch (error) {
    console.error('Errore nel getFilteredProfiles:', error);
    res.status(500).json({ error: 'Errore nel recupero dei profili filtrati' });
  }
};


export const getPaginatedProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const {
      username,
      email,
      first_name,
      last_name,
      is_private,
      is_verified,
      is_fake,
      has_bio,
      has_website,
      profile_picture,
      profile_banner,
      has_location,
    } = req.query;

    const filter = {};

    if (username) filter.username = { $regex: new RegExp(username, 'i') };
    if (email) filter.email = { $regex: new RegExp(email, 'i') };
    if (first_name) filter.first_name = { $regex: new RegExp(first_name, 'i') };
    if (last_name) filter.last_name = { $regex: new RegExp(last_name, 'i') };

    const booleanFields = {
      is_private,
      is_verified,
      is_fake,
      has_bio,
      has_website,
      profile_picture,
      profile_banner,
      has_location,
    };

    for (const [field, value] of Object.entries(booleanFields)) {
      if (typeof value !== 'undefined' && value !== '') {
        filter[field] = value === 'true' ? 'True' : 'False'; // database usa stringhe
      }
    }

    console.log("Filtro applicato:", filter);

    const total = await Profile.countDocuments(filter);
    const profiles = await Profile.find(filter).skip(skip).limit(limit);

    res.json({
      data: profiles,
      total,
      totalPages: Math.ceil(total / limit),
      page
    });

  } catch (error) {
    console.error('Errore nel getPaginatedProfiles:', error);
    res.status(500).json({ error: error.message });
  }
};



export const searchProfiles = async (req, res) => {
  const { username, email } = req.query;

  let query = {};
  if (username) query.username = { $regex: username, $options: 'i' };
  if (email) query.email = { $regex: email, $options: 'i' };

  try {
    const results = await Profile.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.params.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profilo non trovato' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
