import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  difficulty: String,
  tags: [String],
  variations: [String],
  language: String,
  author: {
    type: String,
    default: 'Anonymous',
  },
  problem: {
    blocks: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
          correctIndentation: {
            type: Number,
            default: 0,
          },
          fadedIndices: {
            type: [Number],
          },
          answers: {
            type: [String],
          },
        },
      ],
      required: true,
    },
    solution: {
      type: [String],
      required: true,
    },
    tests: [
      {
        name: {
          type: String,
          default: 'Test Case',
        },
        isHidden: {
          type: Boolean,
          default: false,
        },
        inputs: {
          type: [String],
        },
        outputs: {
          type: [String],
        },
        timeout: {
          type: Number,
          default: 3000,
        },
      },
    ],
  },
});

export default mongoose.model('ParsonsProblem', problemSchema);
