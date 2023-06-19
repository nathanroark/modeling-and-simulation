"use client";

import { projects, type Item } from "@/lib/projects";
import { NextLogo } from "@/ui/next-logo";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";
import Byline from "./byline";

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-zinc-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-zinc-800">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >
          <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
            <NextLogo />
          </div>

          <h3 className="font-semibold tracking-wide text-zinc-400 group-hover:text-zinc-50">
            Modeling & Simulation
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-zinc-100 group-hover:text-zinc-400">
          Menu
        </div>
        {isOpen ? (
          <XMarkIcon className="block w-6 text-zinc-400" />
        ) : (
          <Bars3Icon className="block w-6 text-zinc-400" />
        )}
      </button>

      <div
        className={clsx("overflow-y-auto lg:static lg:block", {
          "fixed inset-x-0 bottom-0 top-14 mt-px bg-black": isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2 py-5">
          {projects.map((section) => {
            return (
              <div key={section.name}>
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400/80">
                  <div>{section.name}</div>
                </div>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <GlobalNavItem key={item.slug} item={item} close={close} />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <Byline className="absolute hidden sm:block" />
      </div>
    </div>
  );
}

function GlobalNavSection({
  name,
  slug,
  close,
}: {
  name: string;
  slug: string;
  close: () => false | void;
}) {
  return (
    <Link onClick={close} href={`/${slug}`} className={" hover:text-zinc-300"}>
      {name}
    </Link>
  );
}

function GlobalNavItem({
  item,
  close,
}: {
  item: Item;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegments();
  const isActive = item.slug === segment[0] + "/" + segment[1];

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        "block rounded-md px-3 py-2 text-sm font-medium hover:text-zinc-300",
        {
          "text-zinc-400 hover:bg-zinc-800": !isActive,
          "text-white": isActive,
        }
      )}
    >
      {item.name}
    </Link>
  );
}
