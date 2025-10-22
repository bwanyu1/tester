import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quiz container', () => {
  render(<App />);
  const quizElement = screen.getByText(/回答を送信/i);
  expect(quizElement).toBeInTheDocument();
});
