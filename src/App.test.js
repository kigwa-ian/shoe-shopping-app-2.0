import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders SignUp component', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const signUpElement = screen.getByText(/Sign Up/i);
  expect(signUpElement).toBeInTheDocument();
});
