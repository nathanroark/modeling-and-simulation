import { projects } from "@/lib/projects";
import Link from "next/link";

export default function Page() {
  return (
    <section className="fixed bottom-0 right-0 h-[calc(100vh-3.5rem)] w-full lg:h-screen lg:w-[calc(100vw-18rem)]">
      <div className="px-4 pt-8 lg:p-16 lg:pt-4">
        <h1 className="text-xl font-medium text-zinc-300 lg:text-3xl">
          Projects
        </h1>
        <div className="space-y-10 text-white">
          {projects.map((section) => {
            return (
              <div key={section.name} className="space-y-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 lg:text-lg">
                  {section.name}
                </div>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                  {section.items.map((item) => {
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
                            <div className="text-base text-zinc-400">
                              {item.description}
                            </div>
                          ) : null}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
