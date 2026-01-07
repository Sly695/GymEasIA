"""
Video utility functions for preprocessing
"""

import cv2
import numpy as np
from typing import List, Tuple


def extract_frames(video_path: str, max_frames: int = 300) -> List[np.ndarray]:
    """Extract frames from video"""
    cap = cv2.VideoCapture(video_path)
    frames = []
    
    while cap.isOpened() and len(frames) < max_frames:
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)
    
    cap.release()
    return frames


def resize_frames(frames: List[np.ndarray], size: Tuple[int, int] = (224, 224)) -> np.ndarray:
    """Resize frames to target size"""
    resized = []
    for frame in frames:
        resized_frame = cv2.resize(frame, size)
        resized.append(resized_frame)
    return np.array(resized)


def normalize_frames(frames: np.ndarray) -> np.ndarray:
    """Normalize frames to [0, 1]"""
    return frames.astype(np.float32) / 255.0
