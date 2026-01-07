import mongoose, { Document, Schema } from 'mongoose';

export interface IInferenceResult extends Document {
  videoId: mongoose.Types.ObjectId;
  reps: number;
  confidence: number;
  notes: string;
  raw: Record<string, any>;
  createdAt: Date;
}

const InferenceResultSchema: Schema = new Schema({
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
    unique: true
  },
  reps: {
    type: Number,
    required: true
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  notes: {
    type: String,
    default: ''
  },
  raw: {
    type: Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IInferenceResult>('InferenceResult', InferenceResultSchema);
