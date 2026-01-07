import mongoose, { Document, Schema } from 'mongoose';

export enum VideoStatus {
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  FAILED = 'FAILED'
}

export interface IVideo extends Document {
  userId: mongoose.Types.ObjectId;
  filename: string;
  path: string;
  status: VideoStatus;
  createdAt: Date;
}

const VideoSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(VideoStatus),
    default: VideoStatus.UPLOADED
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IVideo>('Video', VideoSchema);
