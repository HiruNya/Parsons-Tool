import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dataLogSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  initialProblem: {
    type: String,
    required: true,
  },
  blockState: {
    type: Schema.Types.Mixed,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  dataEvents: {
    type: [
      {
        eventType: {
          type: String,
          enum: ['BLOCK_DRAG', 'INPUT', 'SUBMISSION', 'EXECUTION'],
          required: true,
        },
        timestamp: {
          type: Date,
          required: true,
        },
        blockId: {
          type: String,
        },
        eventMsg: {
          type: String,
          required: true,
        },
        context: {
          type: Schema.Types.Mixed,
        },
        submissionState: {
          type: Schema.Types.Mixed,
        },
      },
    ],
  },
});

export default mongoose.model('DataLog', dataLogSchema);
