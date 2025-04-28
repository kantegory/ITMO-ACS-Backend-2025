import mongoose from 'mongoose';

const userWorkoutProgressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  workout_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
  date: Date,
  status: String,
  notes: String
});

export default mongoose.model('UserWorkoutProgress', userWorkoutProgressSchema);
