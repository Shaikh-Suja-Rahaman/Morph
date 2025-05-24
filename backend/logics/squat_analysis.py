import math
from datetime import datetime
import logging
import os

# Setup logging
os.makedirs("../logs", exist_ok=True)
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("../logs/pose.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def calculate_angle(a, b, c):
    """
    Calculate angle between three points (a-b-c) using cosine rule.
    Each point is a tuple (x, y).
    """
    ab = (a[0] - b[0], a[1] - b[1])
    cb = (c[0] - b[0], c[1] - b[1])
    
    dot = ab[0] * cb[0] + ab[1] * cb[1]
    mag_ab = math.hypot(*ab)
    mag_cb = math.hypot(*cb)
    
    if mag_ab == 0 or mag_cb == 0:
        logger.warning("Zero magnitude detected in angle calculation")
        return 0.0
    
    angle_rad = math.acos(dot / (mag_ab * mag_cb))
    return math.degrees(angle_rad)

def analyze_squat(keypoints):
    try:
        logger.info(f"Received {len(keypoints)} keypoints for squat analysis")
        # Build a dict for easy access by name
        points = {kp["name"]: (kp["x"], kp["y"]) for kp in keypoints}

        required = ["left_hip", "left_knee", "left_ankle", "right_hip", "right_knee", "right_ankle"]
        if not all(name in points for name in required):
            logger.error("Missing keypoints for squat analysis")
            return {"error": "Missing keypoints for squat analysis."}

        # Calculate angles
        left_angle = calculate_angle(points["left_hip"], points["left_knee"], points["left_ankle"])
        right_angle = calculate_angle(points["right_hip"], points["right_knee"], points["right_ankle"])
        avg_knee_angle = (left_angle + right_angle) / 2

        # Squat classification
        if avg_knee_angle < 100:
            depth = "deep"
        elif avg_knee_angle < 140:
            depth = "medium"
        else:
            depth = "shallow"

        # Feedback
        if avg_knee_angle > 140:
            feedback = "Try to bend your knees more."
        elif avg_knee_angle < 90:
            feedback = "You're going right! — good form!"
        else:
            feedback = "Good squat!"

        result = {
            "knee_angle": round(avg_knee_angle),
            "squat_depth": depth,
            "is_rep": avg_knee_angle < 120,
            "feedback": feedback,
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"Squat analysis result: {result}")
        return result
    except Exception as e:
        logger.error(f"Squat analysis error: {str(e)}")
        return {"error": str(e)}