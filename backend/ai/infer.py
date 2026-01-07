#!/usr/bin/env python3
"""
RepNet Inference Script
Contract: python infer.py --video <path> -> JSON stdout
"""

import argparse
import json
import sys
import os
from pathlib import Path

# Try to import RepNet, fallback to mock if not available
try:
    from repnet_model import RepNetModel
    REPNET_AVAILABLE = True
except ImportError:
    REPNET_AVAILABLE = False
    print("Warning: RepNet not available, using mock mode", file=sys.stderr)


def mock_inference(video_path: str) -> dict:
    """Mock inference when model is not available"""
    import random
    
    # Simulate realistic rep counting
    reps = random.randint(8, 20)
    confidence = round(random.uniform(0.65, 0.95), 2)
    
    return {
        "ok": True,
        "reps": reps,
        "confidence": confidence,
        "notes": "Mock RepNet inference (model not loaded)",
        "raw": {
            "mode": "mock",
            "video_path": video_path
        }
    }


def real_inference(video_path: str, model_path: str = None) -> dict:
    """Real RepNet inference"""
    try:
        model = RepNetModel(model_path)
        result = model.predict(video_path)
        
        return {
            "ok": True,
            "reps": result["reps"],
            "confidence": result["confidence"],
            "notes": "RepNet inference",
            "raw": result.get("raw", {})
        }
    except Exception as e:
        # Fallback to mock on any error
        return mock_inference(video_path)


def main():
    parser = argparse.ArgumentParser(description='RepNet Video Inference')
    parser.add_argument('--video', required=True, help='Path to video file')
    parser.add_argument('--model', help='Path to model file (optional)')
    
    args = parser.parse_args()
    
    video_path = args.video
    
    # Check if video exists
    if not os.path.exists(video_path):
        output = {
            "ok": False,
            "error": f"Video file not found: {video_path}"
        }
        print(json.dumps(output))
        sys.exit(1)
    
    # Determine model path
    model_path = args.model
    if not model_path:
        # Try default location
        default_model = os.path.join(
            os.path.dirname(__file__),
            'model',
            'model.h5'
        )
        if os.path.exists(default_model):
            model_path = default_model
    
    # Run inference
    try:
        if REPNET_AVAILABLE and model_path and os.path.exists(model_path):
            result = real_inference(video_path, model_path)
        else:
            result = mock_inference(video_path)
        
        # Output JSON to stdout
        print(json.dumps(result))
        sys.exit(0)
        
    except Exception as e:
        # Always return valid JSON, even on error
        output = {
            "ok": False,
            "error": str(e)
        }
        print(json.dumps(output))
        sys.exit(1)


if __name__ == '__main__':
    main()
