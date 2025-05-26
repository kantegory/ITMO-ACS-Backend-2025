import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  registration_date: Date,
  age: Number,
  gender: String,
  weight: Number,
  height: Number,
  workoutPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' }]
});

export default mongoose.model('User', userSchema);
