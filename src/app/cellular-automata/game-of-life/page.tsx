"use client";
import React, { useState, useCallback, useRef } from "react";
import { produce } from "immer";
import Link from "next/link";
const colorOptions = {
  red: "red",
  orange: "orange",
  amber: "amber",
  yellow: "yellow",
  lime: "lime",
  green: "green",
  emerald: "emerald",
  teal: "teal",
  cyan: "cyan",
  sky: "sky",
  blue: "blue",
  indigo: "indigo",
  violet: "violet",
  purple: "purple",
  fuchsia: "fuchsia",
  pink: "pink",
  rose: "rose",
};

const buttonColorVariants = new Map<string, string>([
  ["red", "hover:border-red-300"],
  ["orange", "hover:border-orange-300"],
  ["amber", "hover:border-amber-400 hover:text-amber-400"],
  ["yellow", "hover:border-yellow-300"],
  ["lime", "hover:border-lime-300"],
  ["green", "hover:border-green-400 hover:text-green-400"],
  ["emerald", "hover:border-emerald-300"],
  ["teal", "hover:border-teal-300"],
  ["cyan", "hover:border-cyan-300"],
  ["sky", "hover:border-sky-300 hover:text-sky-300"],
  ["blue", "hover:border-blue-400 hover:text-blue-400"],
  ["indigo", "hover:border-indigo-300 hover:text-indigo-300"],
  ["violet", "hover:border-violet-300 hover:text-violet-300"],
  ["purple", "hover:border-purple-300 hover:text-purple-300"],
  ["fuchsia", "hover:border-fuchsia-300   hover:text-fuchsia-300"],
  ["pink", "hover:border-pink-300"],
  ["rose", "hover:border-rose-300"],
]);

const cellColorVariants = new Map<string, string>([
  ["red", "bg-red-500"],
  ["orange", "bg-orange-500"],
  ["amber", "bg-amber-400"],
  ["yellow", "bg-yellow-400"],
  ["lime", "bg-lime-400"],
  ["green", "bg-green-400"],
  ["emerald", "bg-emerald-400"],
  ["teal", "bg-teal-400"],
  ["cyan", "bg-cyan-400"],
  ["sky", "bg-sky-400"],
  ["blue", "bg-blue-400"],
  ["indigo", "bg-indigo-400"],
  ["violet", "bg-violet-400"],
  ["purple", "bg-purple-400"],
  ["fuchsia", "bg-fuchsia-400"],
  ["pink", "bg-pink-400"],
  ["rose", "bg-rose-400"],
]);

const twButton =
  "border  lg:font-bold px-2 py-1 lg:px-4 lg:py-2 font-bold text-zinc-300 border-zinc-300 bg-zinc-950";

const startButton =
  "border  lg:font-bold  px-2 py-1 lg:px-4 lg:py-2 font-bold text-green-500 border-green-500 bg-zinc-950";

const stopButton =
  "border lg:font-bold  px-2 py-1 lg:px-4 lg:py-2 font-bold text-red-500 border-red-500  bg-zinc-950";

const numRows = 40;
const numCols = 40;
const gridTemplateColumns = (size: number) => {
  if (size === 20) return "grid-cols-20";
  if (size === 30) return "grid-cols-30";
  if (size === 36) return "grid-cols-36";
  if (size === 40) return "grid-cols-40";
  if (size === 50) return "grid-cols-50";
  if (size === 60) return "grid-cols-60";
  if (size === 70) return "grid-cols-70";
  if (size === 80) return "grid-cols-80";
  if (size === 90) return "grid-cols-90";
  if (size === 100) return "grid-cols-100";
  if (size === 110) return "grid-cols-110";
  if (size === 120) return "grid-cols-120";
  return "";
};
const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const GameOfLife: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState(colorOptions.indigo);
  const [partyMode, setPartyMode] = useState(true);
  const buttonHover = buttonColorVariants.get(primaryColor);

  function getRandomValue(collection: Map<string, string>) {
    let values = Array.from(collection.values());
    return values[Math.floor(Math.random() * values.length)];
  }

  const cellColor = (alive: number) => {
    if (partyMode)
      return alive ? getRandomValue(cellColorVariants) : "bg-black";
    return alive ? cellColorVariants.get(primaryColor) : "bg-black";
  };

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy: number[][]) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <section className="fixed bottom-0 right-0 h-[calc(100vh-3.5rem)] w-full lg:h-screen lg:w-[calc(100vw-18rem)]">
      <div className="flex h-full w-full items-center justify-center bg-black">
        <div className="flex flex-col xl:flex-row ">
          <div className="flex w-fit flex-row justify-center gap-2 pb-4 xl:flex-col xl:pr-8">
            <button
              className={running ? stopButton : startButton}
              onClick={() => {
                setRunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSimulation();
                }
              }}
            >
              {running ? "stop" : "start"}
            </button>
            <button
              className={`${buttonHover} ${twButton} `}
              onClick={() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                  rows.push(
                    Array.from(Array(numCols), () =>
                      Math.random() > 0.7 ? 1 : 0
                    )
                  );
                }
                setGrid(rows);
              }}
            >
              random
            </button>
            <button
              className={`${buttonHover} ${twButton}`}
              onClick={() => {
                setGrid(generateEmptyGrid());
              }}
            >
              clear
            </button>
            <button
              className={`${buttonHover} ${twButton}`}
              onClick={() => {
                setPartyMode(!partyMode);
              }}
            >
              {partyMode ? "normal mode" : "party mode"}
            </button>
            <button className={`${buttonHover} ${twButton}`}>
              <Link href={`/cellular-automata/game-of-life/about`}>About </Link>
            </button>
          </div>
          <div
            className={`${gridTemplateColumns(
              numCols
            )} float-right grid w-fit border  border-zinc-700 bg-black`}
          >
            {grid.map((rows, i) =>
              rows.map((_, k) => (
                <div
                  key={`${i}-${k}`}
                  onClick={() => {
                    const newGrid = produce(grid, (gridCopy: number[][]) => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}
                  className={`${cellColor(grid[i][k])}
                h-3 w-3 border border-zinc-800 lg:h-4 lg:w-4 xl:h-5 xl:w-5 `}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameOfLife;
