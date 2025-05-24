from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from predict import predict_router
from pydantic import BaseModel
from typing import List
from logics.squat_analysis import analyze_squat
from logics.pushup_analysis import analyze_pushup
from logics.plank_analysis import analyze_plank

# Creating FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:8000"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Food Prediction Router
app.include_router(predict_router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Calorie Meter API. Use POST /predict/ to classify food images. Docs: /docs"}

# Input data schemas for pose analysis
class Keypoint(BaseModel):
    x: float
    y: float
    score: float
    name: str

class PoseData(BaseModel):
    keypoints: List[Keypoint]

# Pose analysis endpoints
@app.post("/analyze_squat/")
async def analyze_squat_pose(pose: PoseData):
    keypoints = [kp.dict() for kp in pose.keypoints]
    result = analyze_squat(keypoints)
    return result

@app.post("/analyze_pushup/")
async def analyze_pushup_pose(pose: PoseData):
    keypoints = [kp.dict() for kp in pose.keypoints]
    result = analyze_pushup(keypoints)
    return result

@app.post("/analyze_plank/")
async def analyze_plank_pose(pose: PoseData):
    keypoints = [kp.dict() for kp in pose.keypoints]
    result = analyze_plank(keypoints)
    return result