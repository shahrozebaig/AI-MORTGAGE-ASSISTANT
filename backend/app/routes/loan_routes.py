from fastapi import APIRouter, UploadFile, File
from app.services.ocr_service import extract_text
from app.services.llm_service import analyze_loan
from app.utils.file_handler import save_file
import os

router = APIRouter()

MAX_CHARS = 12000

@router.post("/analyze-loan/")
async def analyze_loan_file(file: UploadFile = File(...)):
    try:
        file_path = save_file(file)

        extracted_text = extract_text(file_path)
        if len(extracted_text) > MAX_CHARS:
            extracted_text = extracted_text[:MAX_CHARS]

        ai_response = analyze_loan(extracted_text)

        filename = os.path.basename(file_path)

        # ✅ RETURN CLEAN URL PATH (NOT FULL URL)
        file_url = f"/uploads/{filename}"

        return {
            "result": ai_response,
            "file_url": file_url
        }

    except Exception as e:
        print("Loan Analysis Error:", str(e))
        return {"result": "Error analyzing loan document."}
