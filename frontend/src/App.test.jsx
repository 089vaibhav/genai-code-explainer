// frontend/src/App.test.jsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App component', () => {
  it('renders the main heading and initial components correctly', () => {
    // Render the App component
    render(<App />);

    // Check if the main heading is on the screen
    const headingElement = screen.getByText(/GenAI Code Explainer/i);
    expect(headingElement).toBeInTheDocument();

    // Check if the "Explain Code" button is on the screen
    const buttonElement = screen.getByRole('button', { name: /Explain Code/i });
    expect(buttonElement).toBeInTheDocument();
  });
});