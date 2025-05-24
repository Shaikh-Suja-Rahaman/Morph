from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from torchvision import transforms
from torchvision.models import resnet18
from PIL import Image
import torch
import io
import logging
import json

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Router for prediction-related endpoints
predict_router = APIRouter()

# Model Setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = resnet18(weights=None)
model.fc = torch.nn.Linear(model.fc.in_features, 101)
model.load_state_dict(torch.load("model/resnet18_food101.pth", map_location=device))
model.eval().to(device)

# Loading labels class
with open("model/classes.txt", "r") as f:
    class_names = [line.strip() for line in f]

# Loading nutrition data
try:
    with open("model/food101_nutrition.json", "r") as f:
        nutrition_data = json.load(f)
    logger.info("Nutrition data loaded successfully")
except FileNotFoundError:
    logger.error("Nutrition data file not found")
    raise HTTPException(status_code=500, detail="Nutrition data file not found")

# For image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# POST endpoint for image prediction
@predict_router.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        logger.info(f"Received file: {file.filename}")
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        input_tensor = transform(image).unsqueeze(0).to(device)
        with torch.no_grad():
            outputs = model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1).squeeze()
            predicted_idx = probabilities.argmax().item()
            probability = float(probabilities[predicted_idx])
        food = class_names[predicted_idx]
        nutrition = nutrition_data.get(food, {
            "calories": 200,
            "protein": 5,
            "carbs": 20,
            "fat": 10
        })
        prediction = {
            "food": food,
            "probability": probability,
            "calories": nutrition["calories"],
            "protein": nutrition["protein"],
            "carbs": nutrition["carbs"],
            "fat": nutrition["fat"]
        }
        logger.info(f"Prediction: {prediction}")
        return JSONResponse(content={"predictions": [prediction]})
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Invalid image file: {str(e)}")