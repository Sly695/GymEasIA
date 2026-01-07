import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Video from '../models/Video.model';
import InferenceResult from '../models/InferenceResult.model';

export const getInferenceController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const video = await Video.findOne({
      _id: req.params.videoId,
      userId: req.userId
    });

    if (!video) {
      res.status(404).json({
        success: false,
        error: 'Video not found'
      });
      return;
    }

    const inference = await InferenceResult.findOne({ videoId: req.params.videoId });

    if (!inference) {
      res.status(404).json({
        success: false,
        error: 'Inference not found. Video may still be processing.',
        data: {
          status: video.status
        }
      });
      return;
    }

    res.json({
      success: true,
      data: {
        inference: {
          reps: inference.reps,
          confidence: inference.confidence,
          notes: inference.notes,
          raw: inference.raw,
          createdAt: inference.createdAt
        },
        videoStatus: video.status
      },
      error: null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
