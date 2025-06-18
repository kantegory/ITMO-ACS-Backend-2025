import mongoose from 'mongoose';

const workoutPlanSchema = new mongoose.Schema({
  title: String,
  description: String,
  level: String,
  duration_weeks: Number
});

export default mongoose.model('WorkoutPlan', workoutPlanSchema);
