# 🏦 AI Mortgage Assistant

AI Mortgage Assistant is a smart platform designed to simplify and improve the loan evaluation process by transforming complex mortgage documents into clear, structured insights. Instead of relying on manual review and subjective judgment, the system analyzes uploaded loan files and presents meaningful summaries, highlights risk levels, and categorizes each application as approved, rejected, or requiring further review. This helps loan officers make faster, more accurate decisions while reducing errors and saving time. By centralizing all loan reports and presenting them in an intuitive interface, the platform enhances transparency, efficiency, and consistency in mortgage processing, making the entire workflow smoother and more reliable for financial authorities and decision-makers.

---

**LIVE LINK (https://ai-mortgage-assistant-1.onrender.com)**

---
## 🔧 Tech Stack

### 🎨 Frontend
- React (Create React App)
- Tailwind CSS
- JavaScript

### 🔌 Backend
- FastAPI
- Python
- Groq LLM API
- OCR (OpenCV / PyTesseract)

---

## ✨ Features

- 📤 Upload loan documents (PDF / Image)
- 🤖 AI-powered underwriting summary
- 📊 Automated risk scoring
- ✅ Decision classification (Approved / Needs Review / Rejected)
- 📋 Reports dashboard with filtering
- 🔄 Manual override: Accept / Reject after review
- 📑 Export reports as PDF
- 🔐 Secure document handling

---

## 📁 Project Structure

```
AI-MORTGAGE-ASSISTANT
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Topbar.js
│   │   │   ├── Sidebar.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── UploadLoan.js
│   │   │   ├── Reports.js
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   └── loan_routes.py
│   │   ├── services/
│   │   │   ├── ocr_service.py
│   │   │   └── llm_service.py
│   │   ├── utils/
│   │   │   └── file_handler.py
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 How It Works

1. 📤 User uploads loan document
2. 🔍 Backend extracts text using OCR
3. 🧠 Text is sent to Groq AI for underwriting
4. 📊 Risk score is calculated
5. ⚡ Decision is generated
6. 💾 Report stored locally
7. ✅ User can approve or reject manually

---

## 🧠 AI Decision Logic

| 📊 Risk Score | 🎯 Decision      |
|---------------|------------------|
| 0–40          | ✅ Approved      |
| 41–70         | 🔄 Needs Review  |
| 71–100        | ❌ Rejected      |

---

## 🌟 Key Highlights

✨ **Smart Underwriting** - AI-powered analysis for faster decisions  
🔐 **Secure Processing** - Safe handling of sensitive financial documents  
📈 **Scalable Architecture** - Built for growth with modern tech stack  
⚙️ **Easy Integration** - Simple API endpoints for custom workflows  
🎨 **User-Friendly Dashboard** - Intuitive interface for loan management
