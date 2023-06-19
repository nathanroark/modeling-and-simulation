export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const projects: { name: string; items: Item[] }[] = [
  {
    name: "Cellular Automata",
    items: [
      {
        name: "Game of Life",
        slug: "cellular-automata/game-of-life",
        description: "Conway's Game of Life",
      },
    ],
  },
  {
    name: "Agent-Based Modeling",
    items: [
      {
        name: "Wolf Sheep Predation",
        slug: "agent-based-modeling/wolf-sheep-predation",
        description: "Wolf Sheep Predation Model",
      },
    ],
  },
];
