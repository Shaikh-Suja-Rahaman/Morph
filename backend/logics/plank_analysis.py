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
    ab = (a[0] - b[0], a[1] - b[1])
    cb = (c[0] - b[0], c[1] - b[1])
    dot = ab[0] * cb[0] + ab[1] * cb[1]
    mag_ab = math.hypot(*ab)
    mag_cb = math.hypot(*cb)
    if mag_ab == 0 or mag_cb == 0:
        logger.warning("Zero magnitude detected in angle calculation")
        return 0.0
    return math.degrees(math.acos(dot / (mag_ab * mag_cb)))

def analyze_plank(keypoints):
    try:
        logger.info(f"Received {len(keypoints)} keypoints for plank analysis")
        points = {kp["name"]: (kp["x"], kp["y"]) for kp in keypoints}

        required = [
            "left_shoulder", "left_hip", "left_ankle",
            "right_shoulder", "right_hip", "right_ankle"
        ]
        if not all(name in points for name in required):
            logger.error("Missing keypoints for plank analysis")
            return {"error": "Missing keypoints for plank analysis."}

        left_body_angle = calculate_angle(
            points["left_shoulder"], points["left_hip"], points["left_ankle"]
        )
        right_body_angle = calculate_angle(
            points["right_shoulder"], points["right_hip"], points["right_ankle"]
        )

        avg_body_angle = (left_body_angle + right_body_angle) / 2

        if abs(avg_body_angle - 180) < 15:
            form = "perfect"
            feedback = "Perfect form — nice straight line!"
        elif abs(avg_body_angle - 180) < 30:
            form = "good"
            feedback = "Good form, just tighten your core a bit."
        else:
            form = "poor"
            feedback = "Sagging or raised hips — align your body."

        result = {
            "body_angle": round(avg_body_angle),
            "form_quality": form,
            "feedback": feedback,
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"Plank analysis result: {result}")
        return result
    except Exception as e:
        logger.error(f"Plank analysis error: {str(e)}")
        return {"error": str(e)}