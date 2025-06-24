import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  category: String,
  date: Date
});

export default mongoose.model('BlogPost', blogPostSchema);
