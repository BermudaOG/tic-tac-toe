import React from 'react';
import { render } from '@testing-library/react';
import Game from './App';

test('renders the Tic-Tac-Toe game', () => {
  const { getByText } = render(<Game />);
  const playerXTurn = getByText(/Next Player: Player X/i);
  expect(playerXTurn).toBeInTheDocument();
});
