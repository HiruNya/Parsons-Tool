import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  experimentGroup: {
    type: Number,
    default: 0,
  },
  roles: {
    type: [String],
    enum: ['student', 'lecturer', 'researcher'],
    default: ['student'],
    required: true,
  },
  courses: {
    type: [String],
  },
});

export default mongoose.model('User', userSchema);
