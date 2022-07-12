import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  experimentGroup: {
    type: Number,
    default: 0,
  },
  courses: {
    type: [String],
  },
});

export default mongoose.model('User', userSchema);
