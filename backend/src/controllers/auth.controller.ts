import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { register, login } from '../services/auth.service';
import { authenticate, AuthRequest } from '../middlewares/auth.middleware';
import User from '../models/User.model';

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
      return;
    }

    const result = await register(req.body);

    res.status(201).json({
      success: true,
      data: result,
      error: null
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
      return;
    }

    const result = await login(req.body);

    res.json({
      success: true,
      data: result,
      error: null
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
};

export const meController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash');

    res.json({
      success: true,
      data: {
        user: {
          id: user?._id,
          email: user?.email,
          username: user?.username
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
