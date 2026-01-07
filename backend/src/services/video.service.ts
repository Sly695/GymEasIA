import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import Video, { VideoStatus } from '../models/Video.model';
import InferenceResult from '../models/InferenceResult.model';

const execAsync = promisify(exec);

export const processVideo = async (videoId: string): Promise<void> => {
  const video = await Video.findById(videoId);

  if (!video) {
    throw new Error('Video not found');
  }

  // Update status to PROCESSING
  video.status = VideoStatus.PROCESSING;
  await video.save();

  try {
    // Call Python inference script
    const pythonBin = process.env.PYTHON_BIN || 'python3';
    const scriptPath = path.join(__dirname, '../../ai/infer.py');
    const videoPath = path.resolve(video.path);

    const { stdout } = await execAsync(
      `${pythonBin} "${scriptPath}" --video "${videoPath}"`
    );

    const result = JSON.parse(stdout.trim());

    if (!result.ok) {
      throw new Error(result.error || 'Inference failed');
    }

    // Save inference result
    await InferenceResult.findOneAndUpdate(
      { videoId },
      {
        reps: result.reps,
        confidence: result.confidence,
        notes: result.notes,
        raw: result.raw || {}
      },
      { upsert: true, new: true }
    );

    // Update video status
    video.status = VideoStatus.DONE;
    await video.save();
  } catch (error: any) {
    video.status = VideoStatus.FAILED;
    await video.save();

    // If error, create mock result
    const mockResult = {
      reps: 12,
      confidence: 0.78,
      notes: 'Mock RepNet inference (error occurred)',
      raw: {}
    };

    await InferenceResult.findOneAndUpdate(
      { videoId },
      mockResult,
      { upsert: true, new: true }
    );

    console.error('Inference error:', error.message);
  }
};
