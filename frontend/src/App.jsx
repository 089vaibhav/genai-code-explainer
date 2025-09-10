// frontend/src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import CodeInput from './components/CodeInput';
import ExplanationDisplay from './components/ExplanationDisplay';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    setError(null);
    setExplanation(null);

    try {
      // API call to our FastAPI backend
      const response = await axios.post('http://localhost:8000/explain', {
        code,
        language,
      });
      setExplanation(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'An unexpected error occurred.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-cyan-400">
            GenAI Code Explainer
          </h1>
        </nav>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <ExplanationDisplay
          explanation={explanation}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;