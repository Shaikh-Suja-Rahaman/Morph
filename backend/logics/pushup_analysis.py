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

def analyze_pushup(keypoints):
    try:
        logger.info(f"Received {len(keypoints)} keypoints for push-up analysis")
        points = {kp["name"]: (kp["x"], kp["y"]) for kp in keypoints}

        required = [
            "left_shoulder", "left_elbow", "left_wrist",
            "right_shoulder", "right_elbow", "right_wrist"
        ]
        if not all(name in points for name in required):
            logger.error("Missing keypoints for push-up analysis")
            return {"error": "Missing keypoints for push-up analysis."}

        left_elbow_angle = calculate_angle(
            points["left_shoulder"], points["left_elbow"], points["left_wrist"]
        )
        right_elbow_angle = calculate_angle(
            points["right_shoulder"], points["right_elbow"], points["right_wrist"]
        )

        avg_elbow_angle = (left_elbow_angle + right_elbow_angle) / 2

        # Depth classification
        if avg_elbow_angle < 90:
            depth = "deep"
        elif avg_elbow_angle < 140:
            depth = "medium"
        else:
            depth = "shallow"

        # Basic feedback
        if avg_elbow_angle > 140:
            feedback = "Go deeper — bend your elbows more."
        elif avg_elbow_angle < 90:
            feedback = "Great form! Keep it up."
        else:
            feedback = "Good, try to go slightly deeper."

        result = {
            "elbow_angle": round(avg_elbow_angle),
            "pushup_depth": depth,
            "is_rep": avg_elbow_angle < 120,
            "feedback": feedback,
            "timestamp": datetime.utcnow().isoformat()
        }
        logger.info(f"Push-up analysis result: {result}")
        return result
    except Exception as e:
        logger.error(f"Push-up analysis error: {str(e)}")
        return {"error": str(e)}