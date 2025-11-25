from fastapi import FastAPI
from app.routes.loan_routes import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(title="AI Mortgage Backend")

# ✅ Absolute path to /uploads folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "uploads"))

# ✅ Ensure uploads folder always exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Properly serve uploaded files (PDF preview support)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ✅ API routes
app.include_router(router)

@app.get("/")
def root():
    return {
        "status": "AI Mortgage Backend Running ✅",
        "uploads_path": UPLOAD_DIR
    }
