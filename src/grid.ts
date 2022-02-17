import { COLS, ROWS } from './Const'

export const createEmptyGrid = () => {
  const grid = [];

  for (let i = 0; i < ROWS; i++) {
    grid.push(Array.from(Array(COLS), () => 0));
  }

  return grid;
};

export const createRandomGrid = () => {
  const grid = [];

  for (let i = 0; i < ROWS; i++) {
    grid.push(Array.from(Array(COLS), () => (Math.random() > 0.7 ? 1 : 0)));
  }

  return grid;
};