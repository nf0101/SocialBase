import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({}, { strict: false });
export default mongoose.model('Profile', ProfileSchema, 'Profili');
