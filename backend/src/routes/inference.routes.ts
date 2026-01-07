import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { getInferenceController } from '../controllers/inference.controller';

const router = Router();

router.use(authenticate);

router.get('/:videoId', getInferenceController);

export default router;
