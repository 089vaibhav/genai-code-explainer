// frontend/src/components/ExplanationDisplay.jsx
import React, { useState } from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

const ExplanationDisplay = ({ explanation, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState('summary');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!explanation) return null;

  const tabs = ['summary', 'line_by_line', 'suggested_tests', 'potential_refactors'];
  const tabLabels = {
    summary: 'Summary',
    line_by_line: 'Line-by-Line',
    suggested_tests: 'Suggested Tests',
    potential_refactors: 'Potential Refactors',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'summary':
        return <p className="text-gray-300 leading-relaxed">{explanation.summary}</p>;
      case 'line_by_line':
        return (
          <ul className="space-y-4">
            {explanation.line_by_line.map((item, index) => (
              <li key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <span className="font-mono text-sm text-cyan-400 mr-4">Line {item.line}:</span>
                <span className="text-gray-300">{item.explanation}</span>
              </li>
            ))}
          </ul>
        );
      case 'suggested_tests':
         return (
          <ul className="space-y-4">
            {explanation.suggested_tests.map((item, index) => (
              <li key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <strong className="block text-cyan-400">{item.test_case}</strong>
                <p className="text-gray-300 mt-1">{item.description}</p>
              </li>
            ))}
          </ul>
        );
      case 'potential_refactors':
        return (
          <ul className="space-y-4">
            {explanation.potential_refactors.map((item, index) => (
              <li key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <strong className="block text-cyan-400">{item.area}</strong>
                <p className="text-gray-300 mt-1">{item.suggestion}</p>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
      <div className="border-b border-gray-700 mb-4">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </nav>
      </div>
      <div className="prose prose-invert max-w-none">
        {renderContent()}
      </div>
    </div>
  );
};

export default ExplanationDisplay;