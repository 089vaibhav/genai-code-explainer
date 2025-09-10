GenAI Code Explainer
A full-stack web application that uses a locally-run Llama 3 model via Ollama and LangChain to provide beginner-friendly explanations of code snippets. Built with React (Vite) and FastAPI.

Note: You can replace the link above by taking a screenshot of your app, uploading it to a service like Imgur, and pasting the new URL.

✨ Features
AI-Powered Explanations: Get structured, easy-to-understand explanations for your code.

Structured Output: Explanations are broken down into four tabs:

Summary: A high-level overview of the code's function.

Line-by-Line: A detailed breakdown of what each line does.

Suggested Tests: AI-generated ideas for test cases.

Potential Refactors: Suggestions for improving the code's structure or readability.

Multiple Languages: Supports Python, JavaScript, and Java out of the box.

Local First: Runs entirely on your local machine with Ollama. No API keys or internet connection needed for the AI core.

Modern UI: Built with Tailwind CSS, featuring a responsive design and a clean, dark mode interface.

💻 Tech Stack
Frontend: React, Vite, Axios, Tailwind CSS

Backend: FastAPI (Python), Uvicorn

AI/LLM: Ollama (running Llama 3), LangChain

Testing: Vitest & React Testing Library (Frontend), Pytest (Backend)

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher)

Python (v3.10 or higher)

Ollama

Git

🚀 Setup and Installation
Clone the repository:

git clone [https://github.com/YOUR-USERNAME/genai-code-explainer.git](https://github.com/YOUR-USERNAME/genai-code-explainer.git)
cd genai-code-explainer

Install and run Ollama with Llama 3:

Follow the official Ollama installation guide.

Pull the Llama 3 model (this may take some time):

ollama pull llama3:8b-instruct

Ensure the Ollama application is running in the background. You can start it with ollama serve.

Set up the Backend:

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Set up the Frontend:

cd ../frontend
npm install

▶️ Running the Application
You need to run both the backend and frontend servers in separate terminal windows.

Start the Backend Server:

Navigate to the backend directory and activate the virtual environment.

Run the FastAPI server:

python main.py

The API will be available at http://localhost:8000.

Start the Frontend Server:

Navigate to the frontend directory.

Run the Vite development server:

npm run dev

Open your browser and go to http://localhost:5173.

✅ Running Tests
Backend Tests:

cd backend
source venv/bin/activate
pytest

Frontend Tests:

cd frontend
npm test
