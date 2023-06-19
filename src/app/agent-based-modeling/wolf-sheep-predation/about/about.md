<!-- Wolf Sheep Predation Info Page -->

# Wolf Sheep Predation

### [Wolf Sheep Predation](https://ccl.northwestern.edu/netlogo/models/WolfSheepPredation)

### Project Work given from Dr. Mikel D. Petty

#### This model is a predator-prey model, based on the Lotka-Volterra model. It is a classic example of agent-based modeling developed by Craig Reynolds. The model is a simulation of grass, sheep, and wolves in a field. The sheep eat grass and wolves eat sheep. The model shows how populations of sheep and wolves interact with each other, and how the populations interact with the grass. The model is a simulation of a simplified ecosystem, so the interactions are not meant to be realistic, but rather to show how populations are affected by the interactions. The model is a simulation of a simplified ecosystem, so the interactions are not meant to be realistic, but rather to show how populations are affected by the interactions.

## Simuland

- Predator-prey ecosystem
- Wolves eat sheep
- Sheep eat grass, turning grass to dirt
- Grass regrows, after time has passed
- Movement requires energy
- Wolves and sheep starve if they don’t eat enough

## Abstractions and assumptions

- Wolf and sheep locations discretized
- Wolves and sheep move randomly;
  - i.e., wolves don’t pursue sheep, sheep don’t evade wolves
- Wolves and sheep move at same speed
- Sheep and wolves move individually (no flocks or packs)
- Wolves and sheep reproduce by “fission”

<!-- ▪ Wolves and sheep have unlimited lifespans
▪ Wolves and sheep have unlimited energy
▪ Wolves and sheep have unlimited capacity to reproduce
▪ Wolves and sheep have unlimited capacity to eat
▪ Wolves and sheep have unlimited capacity to move -->

## Agents

- Types: {wolf, sheep}
- Attributes (both types): x, y, movement direction, energy

## Environment

- 2D grid of square cells, 50  50
- Grid treated as torus, i.e, right edge adjacent to left edge,
  - top edge adjacent to bottom edge
- Cell states: {grass, dirt}; if dirt, also a regrow counter
- Agents located in cells; multiple agents may be in same cell

## Interactions

- Sheep-Grass: if sheep agent in grass cell, then sheep eats grass;
  - cell becomes dirt cell, sheep gains energy
- Wolf-Sheep: if wolf agent and sheep agent in same cell, the wolf eats sheep; sheep agent removed, wolf gains energy

## Logic overview

1. For each dirt cell, determine if the cell has regrown to grass
2. Move each agent and reduce the moving agent’s energy
3. If any cells contain both wolves and sheep,
   the wolves eat the sheep and gain energy
4. If any grass cells contain sheep,
   the sheep eats the grass and gain energy
   and the cell becomes dirt
5. For each agent,determine if the agent reproduces,
   and if it does, create the offspring agent
6. If any agent has energy ≤0, the agent starves
