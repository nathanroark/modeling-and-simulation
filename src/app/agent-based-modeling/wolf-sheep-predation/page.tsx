"use client";

import React, { useRef, useState, useCallback } from "react";
import { WSP_Step } from "./wsp";
import type { WSP_State, agent, cell } from "./types";
import Link from "next/link";
// import { Test_Driver } from "./headless/control";
import { colorOptions, buttonColorVariants } from "@/helpers/TWHelpers";

const twButton =
  "border  lg:font-bold px-2 py-1 lg:px-4 lg:py-2  text-zinc-300 border-zinc-300 bg-zinc-950";

const startButton =
  "border  lg:font-bold  px-2 py-1 lg:px-4 lg:py-2  text-green-500 border-green-500 bg-zinc-950";

const stopButton =
  "border lg:font-bold  px-2 py-1 lg:px-4 lg:py-2 text-red-500 border-red-500  bg-zinc-950";

const cellColor = (cell: string) => {
  if (cell == "dirt") return "bg-stone-600/90";
  if (cell == "grass") return "bg-emerald-400/50";
  if (cell == "sheep") return "bg-gray-400";
  if (cell == "wolf") return "bg-blue-600/75";
  return "";
};

const gridTemplateColumns = (size: number) => {
  console.log("gridTemplateColumns", size);
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

const WSPPage: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState(colorOptions.blue);
  const buttonHover = buttonColorVariants.get(primaryColor);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  const [state, setState] = useState<WSP_State>({
    grid: [],
    clock: 0,
    cells: new Array<Array<cell>>(),
    agents: new Array<agent>(),
    output: new Array<string>(),
    sheep: 0,
    wolves: 0,
    grass: 0,
    dirt: 0,
  });

  runningRef.current = running;
  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setState((s) => WSP_Step(s));
    setTimeout(runSimulation, 100);
  }, []);

  return (
    <section className=" fixed bottom-0 right-0 h-[calc(100vh-3.5rem)] w-full lg:h-screen lg:w-[calc(100vw-18rem)]">
      <div className="flex h-full flex-col items-center justify-center text-sm md:text-lg xl:flex-row">
        <div className=" flex w-fit gap-8  xl:mr-32 xl:w-52 xl:flex-col">
          <div className="flex h-fit w-full gap-2 xl:mb-4 xl:ml-4 xl:flex-col">
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
              className={`${twButton} ${buttonHover}`}
              onClick={() => setState(WSP_Step(state))}
            >
              Step
            </button>
            <button
              className={`${twButton} ${buttonHover}`}
              onClick={() =>
                setState({
                  grid: [],
                  clock: 0,
                  cells: new Array<Array<cell>>(),
                  agents: new Array<agent>(),
                  output: new Array<string>(),
                  sheep: 0,
                  wolves: 0,
                  grass: 0,
                  dirt: 0,
                })
              }
            >
              Clear
            </button>
            <button className={`${buttonHover} ${twButton}`}>
              <Link href={`/agent-based-modeling/wolf-sheep-predation/about`}>
                About{" "}
              </Link>
            </button>
            {/* <button
            className={`${twButton} ${buttonHover}`}
            onClick={() => Test_Driver(30)}
          >
            Run Headless Trials
          </button> */}
          </div>

          <div className="hidden min-w-fit flex-col gap-3 font-bold lg:visible lg:flex">
            <a className="text-blue-500/60">Blue: Wolf</a>
            <a className="text-gray-400">White: Sheep</a>
            <a className="text-emerald-700">Green: Grass</a>
            <a className="text-stone-500">Brown: Dirt</a>
          </div>
          <div className=" pr-2 font-bold text-white sm:w-1/6 xl:w-full  ">
            <div className="flex w-24 justify-between xl:w-full">
              <div>clock</div> <div>{state.clock}</div>
            </div>
            <div className="flex w-24 justify-between xl:w-full">
              <div>wolves </div>
              <div>{state.wolves}</div>
            </div>
            <div className="flex w-24 justify-between xl:w-full">
              <div>sheep</div> <div>{state.sheep}</div>
            </div>
            <div className="flex w-24 justify-between xl:w-full">
              grass <div>{state.grass}</div>
            </div>
            <div className="flex w-24 justify-between xl:w-full">
              dirt <div>{state.dirt}</div>
            </div>
          </div>
        </div>
        <div
          className={`grid h-fit w-fit border border-black ${gridTemplateColumns(
            state.grid.length
          )}`}
        >
          {state.grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                className={`h-3 w-3 border border-black lg:h-4 lg:w-4 xl:h-5 xl:w-5 ${cellColor(
                  state.grid[i][k]
                )}`}
                key={`${i}-${k}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default WSPPage;
