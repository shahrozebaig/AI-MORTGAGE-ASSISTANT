from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ✅ Safe chunking to prevent token overflow
def chunk_text(text, size=4000):
    return [text[i:i+size] for i in range(0, len(text), size)]


def analyze_loan(text: str):
    chunks = chunk_text(text)

    final_response = ""

    for chunk in chunks[:3]:  # ✅ Limit to first 3 chunks for Groq safety
        prompt = f"""
You are an AI Mortgage Underwriting Assistant.

Analyze the following loan data and return:

1. Underwriting Summary
2. Detected Risks
3. Proposed Conditions

Loan Data:
{chunk}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a professional mortgage underwriting AI."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=800  # ✅ Token control
        )

        final_response += response.choices[0].message.content + "\n"

    return final_response.strip()
