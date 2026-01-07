"""
RepNet Model Wrapper
Handles loading and inference with RepNet model
"""

import os
import numpy as np
try:
    import tensorflow as tf
    from tensorflow import keras
    TENSORFLOW_AVAILABLE = True
except ImportError:
    TENSORFLOW_AVAILABLE = False


class RepNetModel:
    """Wrapper for RepNet repetition counting model"""
    
    def __init__(self, model_path: str = None):
        if not TENSORFLOW_AVAILABLE:
            raise ImportError("TensorFlow is not available")
        
        if not model_path or not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        
        try:
            self.model = keras.models.load_model(model_path)
            self.model_loaded = True
        except Exception as e:
            raise RuntimeError(f"Failed to load model: {str(e)}")
    
    def preprocess_video(self, video_path: str) -> np.ndarray:
        """
        Preprocess video for inference
        This is a simplified version - real implementation would:
        - Extract frames
        - Resize to model input size
        - Normalize pixels
        """
        import cv2
        
        cap = cv2.VideoCapture(video_path)
        frames = []
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            
            # Resize to model input (example: 224x224)
            frame = cv2.resize(frame, (224, 224))
            frame = frame.astype(np.float32) / 255.0
            frames.append(frame)
        
        cap.release()
        
        if len(frames) == 0:
            raise ValueError("No frames extracted from video")
        
        # Stack frames (simplified - real RepNet expects specific format)
        return np.array(frames)
    
    def predict(self, video_path: str) -> dict:
        """
        Predict repetitions from video
        Returns: {reps: int, confidence: float, raw: dict}
        """
        try:
            # Preprocess video
            frames = self.preprocess_video(video_path)
            
            # Run inference (simplified - real RepNet has specific input format)
            # This is a placeholder - actual RepNet requires temporal features
            predictions = self.model.predict(frames)
            
            # Extract rep count (simplified)
            # Real RepNet outputs periodicity and counts cycles
            reps = int(np.sum(predictions > 0.5))  # Simplified
            confidence = float(np.mean(predictions))
            
            return {
                "reps": max(1, reps),  # At least 1 rep
                "confidence": min(1.0, max(0.0, confidence)),
                "raw": {
                    "predictions": predictions.tolist(),
                    "frame_count": len(frames)
                }
            }
        except Exception as e:
            raise RuntimeError(f"Inference failed: {str(e)}")
