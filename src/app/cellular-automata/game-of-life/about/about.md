# Game of Life

## Conway’s Life: Specification

- Cell space: Square grid
- Set of states: {live, dead}
- Neighbor relation: Moore neighborhood
- Discrete time:
  - 0 (initial state), 1, 2, 3, ...
  - Each time step is a “generation”
- Local transition function:
  - If cell c live and has exactly 2 or 3 live neighbors at time t,
    then c is live at t + 1.
  - If cell c dead and has exactly 3 live neighbors at time t,
    then c is live at t + 1.
  - Else c is dead at t+1.
