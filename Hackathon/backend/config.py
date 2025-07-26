# pyright: reportPrivateImportUsage=false
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from a .env file
load_dotenv()

# --- Gemini API Configuration ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    # This provides a clearer error if the API key is missing.
    raise ValueError("Missing GEMINI_API_KEY in the .env file. Please add it.")

# Configure the generative AI library with your API key
genai.configure(api_key=GEMINI_API_KEY)

def get_gemini_response(prompt: str) -> str:
    """
    Sends a prompt to the Gemini API and returns the text response.

    Args:
        prompt: The input text to send to the model.

    Returns:
        The generated text from the model or an error message.
    """
    try:
        # Initialize the specific model you want to use
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        
        # Generate content based on the prompt
        response = model.generate_content(prompt)
        
        return response.text
    except Exception as e:
        # Provides more specific feedback on API errors
        print(f"Gemini API Error: {e}")
        return "⚠️ Error: Couldn't fetch response from Gemini."