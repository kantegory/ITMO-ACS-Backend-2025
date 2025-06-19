import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: String,
  description: String,
  video_url: String,
  duration_minutes: Number,
  difficulty: String,
  type: String
});

export default mongoose.model('Workout', workoutSchema);
