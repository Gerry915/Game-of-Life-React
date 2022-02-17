import React, { useCallback, useRef, useState } from "react";
import "./App.css";
import { produce } from "immer";
import { ROWS, COLS, operations } from './Const'
import { createEmptyGrid, createRandomGrid } from './grid'

function App() {

  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);

  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    // Game Logic
    setGrid((grid) => {
      return produce(grid, (gridCopy) => {
        for (let i = 0; i < ROWS; i++) {
          for (let k = 0; k < COLS; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;

              // Boundrary check
              if (newI >= 0 && newI < ROWS && newK >= 0 && newK < COLS) {
                neighbors += grid[newI][newK];
              }
            });

            // Game Rules
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (grid[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 200);
  }, []);

  return (
    <>
      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 12px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              style={{
                width: 10,
                height: 10,
                backgroundColor: grid[i][k] ? "indigo" : "transparent",
                border: "solid 1px black",
                transition: "all .2s ease-out",
              }}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  // gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  // gridCopy[i][k] = 1-grid[i][k]
                  gridCopy[i][k] ^= 1;
                });
                setGrid(newGrid);
              }}
            />
          ))
        )}
      </div>
      <div className="control-group">
        <button
          onClick={() => {
            setRunning((s) => !s);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            setGrid(createRandomGrid());
          }}
          disabled={ runningRef.current ? true : false }
        >
          Populate
        </button>
        <button
          onClick={() => {
            setGrid(createEmptyGrid());
            setRunning(false)
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
}

export default App;
