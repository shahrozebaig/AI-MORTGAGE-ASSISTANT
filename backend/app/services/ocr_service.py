import pytesseract
import cv2
from pdf2image import convert_from_path
import os
import tempfile

def extract_text(file_path: str):
    text = ""
    ext = os.path.splitext(file_path)[1].lower()

    try:
        # ✅ PDF handling
        if ext == ".pdf":
            pages = convert_from_path(file_path)
            for page in pages:
                text += pytesseract.image_to_string(page)

        # ✅ Image handling
        else:
            image = cv2.imread(file_path)
            if image is None:
                raise Exception("Invalid image file.")
            text = pytesseract.image_to_string(image)

    except Exception as e:
        # ✅ Fail-safe fallback (critical for Render)
        return f"OCR Failed: {str(e)}"

    return text
