import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../utils/upload.util';
import {
  uploadController,
  getVideosController,
  getVideoController,
  processVideoController
} from '../controllers/video.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/upload', upload.single('video'), uploadController);
router.get('/', getVideosController);
router.get('/:id', getVideoController);
router.post('/:id/process', processVideoController);

export default router;
