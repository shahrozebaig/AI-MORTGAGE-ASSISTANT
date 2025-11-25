import pytesseract
import cv2
from pdf2image import convert_from_path
import os

# Tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# YOUR POPPLER PATH
POPPLER_PATH = r"C:\Users\shahr\Downloads\Release-25.11.0-0\poppler-25.11.0\Library\bin"

def extract_text(file_path: str):
    text = ""
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        pages = convert_from_path(file_path, poppler_path=POPPLER_PATH)
        for page in pages:
            text += pytesseract.image_to_string(page)
    else:
        image = cv2.imread(file_path)
        if image is None:
            raise Exception("Invalid image file.")
        text = pytesseract.image_to_string(image)

    return text
