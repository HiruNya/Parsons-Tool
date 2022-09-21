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
  problemName: String,
  blockState: {
    type: Schema.Types.Mixed,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  totalTime: {
    min: Number,
    sec: Number,
  },
  result: String,
  totalTests: Number,
  passedTests: Number,
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
  group: Number,
  eventDistribution: {
    numEvents: Number,
    numMoved: Number,
    numInputs: Number,
    numSubmission: Number,
    numExecution: Number,
  },
});

export default mongoose.model('DataLog', dataLogSchema);
