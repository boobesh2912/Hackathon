from flask import Flask, request, jsonify
from flask_cors import CORS
from config import get_gemini_response

# Initialize Flask App
app = Flask(__name__)
# Enable CORS for frontend-backend communication
CORS(app)

# --- Routes ---

@app.route("/", methods=["GET"])
def home():
    """A simple route to confirm the backend is live."""
    return jsonify({"message": "SkillSwap Backend is Live 🔥"}), 200

@app.route("/api/get-matches", methods=["POST"])
def get_matches():
    """
    This is a placeholder for the AI matchmaking feature.
    In a real application, this would take a user's 'learnSkills'
    and return a list of matched users.
    """
    data = request.get_json()
    learn_skills = data.get("learnSkills", [])

    if not learn_skills:
        return jsonify({"error": "No skills provided to match"}), 400

    # For now, we'll return a mock response.
    # In the future, this will use the Gemini API.
    print(f"Received request to match skills: {learn_skills}")

    # Create a prompt for Gemini
    prompt = f"""
    A user wants to learn the following skills: {', '.join(learn_skills)}.
    Based on a pool of users, suggest 3 fictional user profiles who would be a great match to teach these skills.
    For each user, provide:
    - A realistic name.
    - A list of 2-3 skills they can teach.
    - A 1-sentence bio.
    Return the response as a JSON array.
    """

    # For this example, we will use a hardcoded response
    # to avoid making an actual API call during this setup.
    # To enable live API calls, you would uncomment the next line.
    # ai_response = get_gemini_response(prompt)

    mock_ai_response = [
        {
            "name": "Aditya Sharma",
            "skills": ["React", "JavaScript", "Node.js"],
            "bio": "Full-stack developer with 5 years of experience building web apps."
        },
        {
            "name": "Priya Singh",
            "skills": ["Python", "AI/ML", "Data Science"],
            "bio": "Data scientist passionate about making AI accessible to everyone."
        }
    ]


    return jsonify({
        "message": "Successfully found matches!",
        "matches": mock_ai_response
    }), 200

# To run the backend server
if __name__ == "__main__":
    # Use debug=True for development, which enables auto-reloading
    app.run(debug=True, port=5001)