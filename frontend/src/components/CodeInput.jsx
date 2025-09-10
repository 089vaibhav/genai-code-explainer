// frontend/src/components/CodeInput.jsx
import React from 'react';

const CodeInput = ({ code, setCode, language, setLanguage, handleSubmit, isLoading }) => {
  const supportedLanguages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Code Editor Area */}
        <div className="md:col-span-3">
          <label htmlFor="code-input" className="block text-sm font-medium text-gray-300 mb-2">
            Your Code
          </label>
          <textarea
            id="code-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code snippet here..."
            className="w-full h-80 p-4 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none"
            spellCheck="false"
            required
          />
        </div>

        {/* Language Selection and Submit Button */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            {isLoading ? 'Analyzing...' : 'Explain Code'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CodeInput;