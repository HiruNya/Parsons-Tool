import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  groupNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  problems: {
    type: [String],
    default: [],
  },
});

export default mongoose.model('Course', courseSchema);
