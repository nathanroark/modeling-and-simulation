//------------------------------------------------------------------------------
// Author:  Nathan Roark
// School:  The University of Alabama in Huntsville
// Program: Wolf-Sheep Predation (Program 3)
// Course:  CS 582, Modeling and Simulation 2
// Date:    06 March 2023
//------------------------------------------------------------------------------

import { WSP } from "./wsp";

import type { Results } from "./helpers/Results";
import { saveFile } from "./helpers/FileActions";
import { format_nbr } from "./helpers/Format";
import { mean } from "./helpers/Statistics";

/**
 * Test Driver
 *
 * - Function for testings the Lionfish Culling simulation
 *
 * @param {number} trials - desired number of trials to be ran during the test
 * @param {string?} fileName - (optional) filename for the output file to be name, parameters will be added accordingly. if no filename is given, results from sim will not be saved
 */
export const Test_Driver = async (trials: number, fileName?: string) => {
  let output: string[] = [];
  let cells: string[][][] = [];
  let results_string: string[] = [];
  let outputSet: string[] = [];
  let w_mins: number[] = [];
  let w_maxes: number[] = [];
  let w_means: number[] = [];
  let s_mins: number[] = [];
  let s_maxes: number[] = [];
  let s_means: number[] = [];
  let g_mins: number[] = [];
  let g_maxes: number[] = [];
  let g_means: number[] = [];
  outputSet.push("Wolf-Sheep Predation, trials= " + trials.toString());
  outputSet.push("-----------------------------------------------------------");

  for (let trial = 1; trial <= trials; trial++) {
    const r: Results = await WSP(trial); // run the simulation

    if (trial == 1) {
      outputSet.push(...r.output);
      cells = r.grids;
    }

    w_mins.push(r.w_min);
    w_maxes.push(r.w_max);
    w_means.push(r.w_mean);
    s_mins.push(r.s_min);
    s_maxes.push(r.s_max);
    s_means.push(r.s_mean);
    g_mins.push(r.g_min);
    g_maxes.push(r.g_max);
    g_means.push(r.g_mean);
    results_string.push(
      "trial = " +
        format_nbr(trial, 3) +
        " wolves min, max, mean= " +
        format_nbr(r.w_min, 4, 2) +
        " " +
        format_nbr(r.w_max, 4, 4) +
        " " +
        r.w_mean.toPrecision(4) +
        " sheep min, max, mean= " +
        format_nbr(r.s_min, 4, 2) +
        " " +
        format_nbr(r.s_max, 4, 4) +
        " " +
        r.s_mean.toPrecision(4) +
        " grass min, max, mean= " +
        format_nbr(r.g_min, 4, 2) +
        " " +
        format_nbr(r.g_max, 4, 4) +
        " " +
        r.g_mean.toPrecision(4)
    );
    console.log("Trial " + trial + " complete");
  }

  outputSet.push(
    "-----------------------------------------------------------------------"
  );
  outputSet.push(...results_string);
  outputSet.push("------------------------------------");
  outputSet.push("wolves min min=  " + Math.min(...w_mins).toPrecision(3));
  outputSet.push("wolves max max=  " + Math.max(...w_maxes).toPrecision(4));
  outputSet.push("wolves mean mean= " + mean(w_means).toPrecision(4));
  outputSet.push("sheep min min=  " + Math.min(...s_mins).toPrecision(3));
  outputSet.push("sheep max max=  " + Math.max(...s_maxes).toPrecision(4));
  outputSet.push("sheep mean mean= " + mean(s_means).toPrecision(4));
  outputSet.push("grass min min=  " + Math.min(...g_mins).toPrecision(3));
  outputSet.push("grass max max=  " + Math.max(...g_maxes).toPrecision(4));
  outputSet.push("grass mean mean= " + mean(g_means).toPrecision(4));
  outputSet.push("------------------------------------");
  outputSet.push(
    "-----------------------------------------------------------------------"
  );
  outputSet.push(" ");

  output.push(...outputSet);

  if (fileName) {
    // only write to file if filename is given is parameters
    let output_filename = fileName + ".txt";

    let outputContent = ""; // declare empty string to output to

    output.forEach((e) => (outputContent += e + "\n")); // print the output from all of the tests under the header

    saveFile(outputContent, output_filename); // write content to file
  } else {
    output.forEach((e) => console.log(e));
  }
  return cells;
};
