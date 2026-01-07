import path from 'path';
import fs from 'fs';

export const isAIAvailable = (): boolean => {
  const modelPath = process.env.MODEL_PATH || 'backend/ai/model/model.h5';
  const aiEnabled = process.env.AI_ENABLED === 'true';
  
  if (!aiEnabled) {
    return false;
  }

  const fullPath = path.resolve(modelPath);
  return fs.existsSync(fullPath);
};
