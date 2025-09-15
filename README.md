GenAI Code Explainer

A full-stack web application that provides beginner-friendly explanations of code snippets using a locally-run Llama 3 model via Ollama and LangChain. The app is built with React (Vite) for the frontend and FastAPI for the backend.

Features - 

1) AI-Powered Explanations: Receive structured, easy-to-understand explanations for your code.

2) Structured Output: Explanations are broken down into four sections:

3) Summary: A high-level overview of what the code does.

4) Line-by-Line: A detailed breakdown of each line of code.

5) Suggested Tests: AI-generated test case suggestions.

6) Potential Refactors: Suggestions for improving code structure or readability.

7) Multiple Languages: Supports Python, JavaScript, and Java.

8) Modern UI: Built with Tailwind CSS, offering a responsive, clean, and dark mode interface.

Tech Stack -

Frontend: React, Vite, Axios, Tailwind CSS

Backend: FastAPI, Uvicorn

AI/LLM: Ollama (Llama 3), LangChain

Testing: Vitest & React Testing Library (Frontend), Pytest (Backend)

Prerequisites - 

Ensure you have the following installed:

Node.js (v18 or higher)

Python (v3.10 or higher)

Ollama

Git



Setup and Installation

Clone the repository:

git clone https://github.com/089vaibhav/genai-code-explainer.git
cd genai-code-explainer


Install and run Ollama with Llama 3:

Follow the official Ollama installation guide
.

Pull the Llama 3 model:

ollama pull llama3:8b-instruct


Ensure that Ollama is running in the background:

ollama serve


Set up the Backend:

Navigate to the backend directory:

cd backend
Create a virtual environment and activate it:

python3 -m venv venv
source venv/bin/activate

Install backend dependencies:
pip install -r requirements.txt


Set up the Frontend:
Navigate to the frontend directory:
cd ../frontend


Install frontend dependencies:

npm install
Running the Application
You need to run both the backend and frontend servers in separate terminal windows.

Start the Backend Server:
Navigate to the backend directory and activate the virtual environment:

cd backend
source venv/bin/activate
Start the FastAPI server: python main.py
The API will be available at: http://localhost:8000.

Start the Frontend Server:

Navigate to the frontend directory: cd frontend

Start the Vite development server: npm run dev
Open your browser and go to: http://localhost:5173.

Running Tests

Backend Tests: 
Navigate to the backend directory and activate the virtual environment: cd backend
source venv/bin/activate
Run the tests: pytest


Frontend Tests:
Navigate to the frontend directory: cd frontend
Run the tests: npm test
