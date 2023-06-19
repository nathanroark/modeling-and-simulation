import Link from "next/link";

const About = () => {
  return (
    <section className="float-right  w-full p-4  pb-32 pt-16 lg:w-[calc(100vw-18rem)] lg:px-32 lg:pb-64">
      <article className="md:prose-md prose dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <h1>Game of Life</h1>

        <h3>
          <Link href={`/cellular-automata/game-of-life`}>Simulation Link</Link>
        </h3>

        <h3>Conway’s Life: Specification</h3>

        <ul>
          <li>Cell space: Square grid</li>
          <li>Set of states: (live, dead)</li>
          <li>Neighbor relation: Moore neighborhood</li>
          <li>
            Discrete time:
            <ul>
              <li>0 (initial state), 1, 2, 3, ...</li>
              <li>Each time step is a “generation”</li>
            </ul>
          </li>
          <li>
            Local transition function:
            <ul>
              <li>
                If cell c live and has exactly 2 or 3 live neighbors at time t,
                then c is live at t + 1.
              </li>
              <li>
                If cell c dead and has exactly 3 live neighbors at time t, then
                c is live at t + 1.
              </li>
              <li>Else c is dead at t+1.</li>
            </ul>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default About;
