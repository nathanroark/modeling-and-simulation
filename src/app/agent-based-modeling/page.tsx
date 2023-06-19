import { Item, projects } from "@/lib/projects";
import Link from "next/link";

const ProjectLink = (item: Item) => {
  return (
    <Link
      href={`/${item.slug}`}
      key={item.name}
      className="button relative inline-flex min-h-[32px] min-w-[120px] py-[3rem]"
    >
      <span className="button-background absolute inset-[1px] rounded-lg "></span>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded bg-black font-medium  ">
        <div className="text-xl">{item.name}</div>
        {item.description ? (
          <div className="text-base text-zinc-400">{item.description}</div>
        ) : null}
      </div>
    </Link>
  );
};
export default function Home() {
  return (
    <section className="fixed bottom-0 right-0 h-[calc(100vh-3.5rem)] w-full lg:h-screen lg:w-[calc(100vw-18rem)]">
      <div className="space-y-8 p-4 lg:p-16">
        <h1 className="text-2xl font-medium text-zinc-300 lg:text-4xl">
          Agent-Based Modeling
        </h1>
        <div className="space-y-10 text-white">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {projects.map((section) => {
              return section.name === "Agent-Based Modeling" ? (
                section.items.map((item: Item) => {
                  return (
                    <ProjectLink key={section.name + item.name} {...item} />
                  );
                })
              ) : (
                <> </>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
