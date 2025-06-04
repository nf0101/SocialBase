import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
    user_id: { type: String, ref: 'Profile' }, // questo basta per usare populate()
}, { strict: false });

export default mongoose.model('Activity', ActivitySchema, 'Attività');
