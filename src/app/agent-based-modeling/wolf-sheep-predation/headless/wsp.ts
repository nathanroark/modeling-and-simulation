//------------------------------------------------------------------------------
// Author:  Nathan Roark
// School:  The University of Alabama in Huntsville
// Program: Wolf-Sheep Predation (Program 3)
// Course:  CS 582, Modeling and Simulation 2
// Date:    06 March 2023
//------------------------------------------------------------------------------

import { Results } from "./helpers/Results";
import { sample } from "./helpers/Statistics";

// Execution constants parameters, simulation parameters, global constants, and global variables

const stop_no_agents = true; // Stop simulation if no live agents (wolves or sheep)?

const end_time = 2000;
const cells_x = 50;
const cells_y = 50;

const init_wolves = 50; // Number of wolves at start;
const init_sheep = 100; // Number of sheep at start;
const init_prob_grass = 0.5; // Probability cell is initially grass;
const init_energy_wolves = 40; // Max initial energy for each wolf;
const init_energy_sheep = 8; // Max initial energy for each sheep;
const move_loss = 1; // Cost for move, wolf and sheep;
const eat_gain_wolf = 20; // Wolf gain for eating sheep;
const eat_gain_sheep = 4; // Sheep gain for eating grass;
const repro_prob_wolf = 0.05; // Probability wolf reproduces;
const repro_prob_sheep = 0.04; // Probability sheep reproduces;
const regrow_time_grass = 30; // Time steps required to regrow grass;

const move_x = [1, 1, 0, -1, -1, -1, 0, 1]; // Change to x coordinate for each move direction
const move_y = [0, 1, 1, 1, 0, -1, -1, -1]; // Change to y coordinate for each move direction
const direction_left = [1, 2, 3, 4, 5, 6, 7, 0]; // New direction when turning left for each move directiolet
const direction_right = [7, 0, 1, 2, 3, 4, 5, 6]; // New direction when turning right for each move directilet

type agent = {
  type: "wolf" | "sheep"; // possible types of agents
  x: number; // x location
  y: number; // y location
  direction: number; // direction of travel
  energy: number; // energy remaining until death
};
type terrain = "grass" | "dirt"; // possible states of the terrain
type cell = {
  x: number; // x location
  y: number; // y location
  terrain: terrain; // possible terrain states
  regrow: number; // time left until regrown if terrain is dirt
};

/**
 * Get Agents
 * - get indexes of agents of a specific type that are in a cell
 *
 * @param type - type of agent to look for
 * @param x - x location of cell
 * @param y - y location opf
 * @param agents - array of all agents in the simulation
 * @returns - an array of agents corresponding to the specified cell
 */
const GetAgents = (
  type: "wolf" | "sheep",
  x: number,
  y: number,
  agents: agent[]
) => {
  let agent_indexes: number[] = [];
  if (agents.length > 0) {
    for (let i = 0; i < agents.length; i++) {
      let agent = agents[i];
      if (agent.type == type && agent.x == x && agent.y == y) {
        agent_indexes.push(i);
      }
    }
  }
  return agent_indexes;
};

/**
 * Wolf Sheep Predation
 *  - wolf sheep predation model simulation using agent based simulation
 *
 * @param trial - the trial number of this is getting ran in the test
 * @returns - Results of the simulation trial along with a grid of each clock of the sim
 */
export const WSP = async (trial: number) => {
  // Utility functions
  //----------------------------------------------------------------------
  const AgentInCell = (x: number, y: number) => {
    if (agents.length > 0) {
      for (let i = 0; i < agents.length; i++) {
        if (agents[i].x == x && agents[i].y == y) {
          return true;
        }
      }
    }
    return false;
  };

  const GetAgentInCell = (x: number, y: number) => {
    if (agents.length > 0) {
      for (let i = 0; i < agents.length; i++) {
        if (agents[i].x == x && agents[i].y == y) {
          return agents[i].type;
        }
      }
    }
    return "ERROR"; // notify of an error without throwing an exception
  };
  //----------------------------------------------------------------------

  // Initialize state.
  let saved_states: string[] = [];
  let clock = 0;
  let cells = new Array<Array<cell>>();
  let agents: agent[] = [];
  let w_min = 99999;
  let w_max = 0;
  let w_total = 0;
  let s_min = 99999;
  let s_max = 0;
  let s_total = 0;
  let g_min = 99999;
  let g_max = 0;
  let g_total = 0;
  let output: string[] = [];
  let grids: string[][][] = [];

  let cur_wolves = 0;
  let cur_sheep = 0;
  let cur_grass = 0;
  let w_extinct_turn = 0; // track the turn that wolves went extinct
  let s_extinct_turn = 0; // track the turn that sheep went extinct

  // Stochastic Initialization
  //-------------------------------------------------------------
  // Initialize terrain.
  for (let i = 0; i < cells_x; i++) {
    let row: cell[] = new Array<cell>();
    for (let j = 0; j < cells_y; j++) {
      if (Math.random() < init_prob_grass) {
        row.push({ terrain: "grass", regrow: 0, x: i, y: j }); // Cell initially grass ...
      } else {
        // Cell initially dirt ...
        row.push({
          terrain: "dirt",
          regrow: sample(regrow_time_grass, 1)[0] - 1,
          x: i,
          y: j,
        });
      }
    }
    cells.push(row);
  }

  // Initialize agents.
  let i = 0;
  while (i < init_wolves + init_sheep) {
    let x = sample(cells_x, 1)[0] - 1;
    let y = sample(cells_y, 1)[0] - 1;
    let type: "wolf" | "sheep" = i < init_wolves ? "wolf" : "sheep";
    let agent: agent = {
      type: type,
      x: x,
      y: y,
      direction: sample(8, 1)[0] - 1,
      energy:
        type == "wolf"
          ? sample(init_energy_wolves, 1)[0]
          : sample(init_energy_sheep, 1)[0],
    };
    if (!AgentInCell(agent.x, agent.y)) {
      agents.push(agent);
      i += 1;
    }
  }
  //-------------------------------------------------------------

  /**
   * Generate Output
   * - generate text output of the grid in it's current state
   *
   * @returns array of strings containing each row of the table in txt format
   */
  const GenerateOutput = () => {
    for (let i = 0; i < cells_x; i++) {
      let stringRow: string = "";
      for (let j = 0; j < cells_y; j++) {
        if (cells[i][j].terrain == "grass") {
          cur_grass += 1;
          if (AgentInCell(i, j)) {
            if (GetAgentInCell(i, j) == "wolf") stringRow += "W";
            else stringRow += "S";
          } else stringRow += "≈";
        } else {
          if (AgentInCell(i, j)) {
            if (GetAgentInCell(i, j) == "wolf") stringRow += "W";
            else stringRow += "S";
          } else stringRow += "-";
        }
      }
      if (stringRow.length > 50)
        throw "stringRow too long: " + stringRow.length;
      saved_states.push(stringRow);
    }
    let clockLine = "clock= " + clock.toString();
    let output: string[] = [];
    output.push(clockLine);
    saved_states.forEach((v, i) => {
      let lineNumber = "";
      if (i < 9) lineNumber += " ";
      lineNumber += (i + 1).toString() + " ";
      let line = lineNumber + v;
      output.push(line);
    });
    output.push(
      "----------------------------------------------------------------"
    );
    return output;
  };

  // Record initial state
  if (trial == 1 && clock == 0) {
    output.push(...GenerateOutput());
    let grid: string[][] = [];
    for (let i = 0; i < cells_x; i++) {
      let gridRow: string[] = [];
      for (let j = 0; j < cells_y; j++) {
        if (AgentInCell(i, j)) {
          if (GetAgentInCell(i, j) == "wolf") gridRow.push("wolf");
          else gridRow.push("sheep");
        } else if (cells[i][j].terrain == "grass") {
          gridRow.push("grass");
        } else if (cells[i][j].terrain == "dirt") {
          gridRow.push("dirt");
        }
      }
      grid.push(gridRow);
    }
    grids.push(grid);
  }

  // Run main loop of the simulation
  while (clock < end_time && (agents.length >= 0 || !stop_no_agents)) {
    clock += 1;

    // Grass regrows?
    // Dirt cells become grass after a fixed time.
    for (let i = 0; i < cells_x; i++) {
      for (let j = 0; j < cells_y; j++) {
        if (cells[i][j].terrain == "dirt") {
          cells[i][j].regrow -= 1; // decrement time to regrow by one clock
          if (cells[i][j].regrow == 0) {
            // if the grass regrow timer is up
            cells[i][j].terrain = "grass";
          }
        }
      }
    }

    // Move each agent and reduce the agent's energy for the movement.
    // For movement the terrain cell grid is treated as a torus,
    // i.e., cells on the right edge are adjacent to cells on the left edge,
    // and cells on the bottom are adjacent to cells on the top.
    if (agents.length > 0) {
      for (let i = 0; i < agents.length; i++) {
        let agent = agents[i]; // Retrieve agent from agents list
        let roll_d = Math.random();
        let next_d =
          roll_d < 0.2
            ? direction_left[agent.direction]
            : roll_d < 0.8
            ? agent.direction
            : direction_right[agent.direction];
        agent.direction = next_d; // Randomly choose agent's movement direction
        agent.x = agent.x + move_x[agent.direction]; // Change agent's x coordinate for move
        agent.y = agent.y + move_y[agent.direction]; // Change agent's y coordinate for move
        if (agent.x >= cells_x) {
          agent.x = 0;
        } // Move off right edge onto left edge
        if (agent.x < 0) {
          agent.x += cells_x - 1;
        } // Move off left edge onto right edge
        if (agent.y >= cells_y) {
          agent.y = 0;
        } // Move off top edge onto bottom edge
        if (agent.y < 0) {
          agent.y += cells_y - 1;
        } // Move off bottom edge onto top edge
        agent.energy = agent.energy - move_loss; // Reduce agent's energy by cost of movement
        agents[i] = agent; // Update agent
      }
    }

    // Wolves eat sheep?
    // If a wolf and a sheep are in the same cell, the wolf eats the sheep.
    // If there are multiple wolves, the wolf that eats is chosen randomly.
    // If there are multiple sheep, the sheep that is eaten is chosen randomly.
    // The eating continues as long as there are any sheep in the cell; a wolf may eat multiple sheep.
    for (let i = 0; i < cells_x; i++) {
      for (let j = 0; j < cells_y; j++) {
        let wolves_in_cell = GetAgents("wolf", i, j, agents); // shallow copy (getting references to original agents)
        let sheep_in_cell = GetAgents("sheep", i, j, agents); // shallow copy (getting references to original agents)
        while (wolves_in_cell.length > 0 && sheep_in_cell.length > 0) {
          let wolf = sample(wolves_in_cell)[0]; // Randomly select wolf from those in cell
          let sheep = sample(sheep_in_cell)[0]; // Randomly select sheep from those in cell
          agents[wolf].energy += eat_gain_wolf; // Add energy to wolf
          agents.splice(sheep, 1); // Remove sheep from agents list}
          wolves_in_cell = GetAgents("wolf", i, j, agents); // shallow copy (getting references to original agents)
          sheep_in_cell = GetAgents("sheep", i, j, agents); // shallow copy (getting references to original agents)
        }
      }
    }

    // Sheep eat grass?
    // If there is a sheep in a grass cell, the sheep eats the grass and the cell is changed to dirt.
    // Only one sheep may eat the grass in a cell.
    // If there are multiple sheep, the one that eats is chosen randomly.
    for (let i = 0; i < cells_x; i++) {
      for (let j = 0; j < cells_y; j++) {
        let sheep_in_cell = GetAgents("sheep", i, j, agents); // shallow copy (getting references to original agents)
        if (sheep_in_cell.length == 0) continue;
        let sheep = sample(sheep_in_cell)[0]; // Randomly select sheep from those in cell
        let s: agent = agents[sheep];
        if (cells[s.x][s.y].terrain == "grass") {
          // At least one sheep in a grass cell
          agents[sheep].energy += eat_gain_sheep; // Randomly select sheep from those in cell
          cells[s.x][s.y].terrain = "dirt"; // Change grass to dirt
          cells[s.x][s.y].regrow = regrow_time_grass; // Set regrow counter
        }
      }
    }

    // Agents reproduce?
    // Agents reproduce by fission and randomly, with given probability.
    // Offspring agents are "clones", i.e., copies of the "parent" agent,
    // except that a random movement direction is assigned to the offspring agent
    // and the parent's energy is split between parent and offspring agents.
    // Offspring agents start in the same cell as their parent agent.
    if (agents.length > 0) {
      for (let i = 0; i < agents.length; i++) {
        let a: agent = agents[i]; // Retrieve agent from agents list
        let repro_prob = a.type == "wolf" ? repro_prob_wolf : repro_prob_sheep;
        if (Math.random() < repro_prob) {
          let agent: agent = {
            type: a.type,
            x: a.x,
            y: a.y,
            direction: sample(8, 1)[0] - 1,
            energy: Math.floor(a.energy / 2),
          };
          agents.push(agent);
          agents[i].energy = Math.ceil(a.energy / 2); // Agent looses
        }
      }
    }

    // Agents starve?
    // Any agent with energy <= 0 starves and is removed from the simulation.
    if (agents.length > 0) {
      let removeValFromIndex: number[] = [];
      for (let i = 0; i < agents.length; i++) {
        if (agents[i].energy <= 0) {
          removeValFromIndex.push(i);
        }
      }
      for (const i of removeValFromIndex.reverse()) {
        agents.splice(i, 1);
      }
    }

    // Calculate statistics
    // --------------------------------------------
    // reset counters
    cur_wolves = 0;
    cur_sheep = 0;
    cur_grass = 0;
    saved_states = [];

    // record desired states for output
    if (trial == 1 && clock <= 10) {
      output.push(...GenerateOutput());
      let grid: string[][] = [];
      for (let i = 0; i < cells_x; i++) {
        let gridRow: string[] = [];
        for (let j = 0; j < cells_y; j++) {
          if (AgentInCell(i, j)) {
            if (GetAgentInCell(i, j) == "wolf") gridRow.push("wolf");
            else gridRow.push("sheep");
          } else if (cells[i][j].terrain == "grass") {
            gridRow.push("grass");
          } else if (cells[i][j].terrain == "dirt") {
            gridRow.push("dirt");
          }
        }
        grid.push(gridRow);
      }
      grids.push(grid);
    } else {
      for (let i = 0; i < cells_x; i++) {
        for (let j = 0; j < cells_y; j++) {
          if (cells[i][j].terrain == "grass") {
            cur_grass += 1;
          }
        }
      }
    }

    for (let i = 0; i < agents.length; i++) {
      if (agents[i].type == "wolf") cur_wolves += 1;
      else if (agents[i].type == "sheep") cur_sheep += 1;
    }

    // determine results
    if (cur_grass < g_min) g_min = cur_grass;
    if (cur_grass > g_max) g_max = cur_grass;
    g_total += cur_grass;
    if (cur_sheep < s_min) s_min = cur_sheep;
    if (cur_sheep > s_max) s_max = cur_sheep;
    s_total += cur_sheep;
    if (cur_wolves < w_min) w_min = cur_wolves;
    if (cur_wolves > w_max) w_max = cur_wolves;
    w_total += cur_wolves;

    if (cur_wolves == 0 && w_extinct_turn == 0) w_extinct_turn = clock;
    if (cur_sheep == 0 && s_extinct_turn == 0) s_extinct_turn = clock;
  }

  let results: Results = {
    w_min: w_min,
    w_max: w_max,
    w_mean: w_total / clock,
    s_min: s_min,
    s_max: s_max,
    s_mean: s_total / clock,
    g_min: g_min,
    g_max: g_max,
    g_mean: g_total / clock,
    output: output,
    grids: grids,
  };
  return results;
};
