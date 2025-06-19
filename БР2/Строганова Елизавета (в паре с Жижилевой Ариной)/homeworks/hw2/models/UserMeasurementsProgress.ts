import mongoose from 'mongoose';

const userMeasurementsProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  weight: Number,
  height: Number,
  date: Date,
  notes: String
});

export default mongoose.model('UserMeasurementsProgress', userMeasurementsProgressSchema);
