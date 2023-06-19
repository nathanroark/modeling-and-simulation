// import { VercelLogo } from '@/ui/vercel-logo';
import { NextLogo } from "@/ui/next-logo";
export default function Byline({ className }: { className: string }) {
  return (
    <div
      className={`${className} bg-vc-border-gradient inset-x-0 bottom-3 mx-3 rounded-lg p-px shadow-lg shadow-black/20`}
    >
      <div className="flex flex-col justify-between space-y-2 rounded-lg bg-black p-3.5 lg:px-5 lg:py-3">
        <div className="flex items-center gap-x-1.5">
          <div className="text-sm text-zinc-400">By</div>
          <a href="https://nathanroark.dev" title="Nathan Roark">
            <div className="flex h-7 w-7 flex-row rounded-full border text-zinc-100 hover:text-zinc-50">
              <NextLogo />
            </div>
          </a>
          <div className="text-sm text-zinc-400">Nathan Roark</div>
        </div>

        <div className="text-sm text-zinc-400">
          <a
            className="underline decoration-dotted underline-offset-4 transition-colors hover:text-zinc-300"
            href="https://github.com/nathanroark/modeling-and-simulation"
            target="_blank"
            rel="noreferrer"
          >
            View code
          </a>
        </div>
      </div>
    </div>
  );
}
