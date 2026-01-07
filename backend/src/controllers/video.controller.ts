import { Response } from 'express';
import Video from '../models/Video.model';
import { AuthRequest } from '../middlewares/auth.middleware';
import { processVideo } from '../services/video.service';

export const uploadController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
      return;
    }

    const video = await Video.create({
      userId: req.userId!,
      filename: req.file.filename,
      path: req.file.path
    });

    // Process video asynchronously
    processVideo(video._id.toString()).catch(console.error);

    res.status(201).json({
      success: true,
      data: {
        video: {
          id: video._id,
          filename: video.filename,
          status: video.status,
          createdAt: video.createdAt
        }
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

export const getVideosController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const videos = await Video.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('-path');

    res.json({
      success: true,
      data: { videos },
      error: null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getVideoController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      userId: req.userId
    }).select('-path');

    if (!video) {
      res.status(404).json({
        success: false,
        error: 'Video not found'
      });
      return;
    }

    res.json({
      success: true,
      data: { video },
      error: null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const processVideoController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!video) {
      res.status(404).json({
        success: false,
        error: 'Video not found'
      });
      return;
    }

    // Process video asynchronously
    processVideo(video._id.toString()).catch(console.error);

    res.json({
      success: true,
      data: { message: 'Video processing started' },
      error: null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
