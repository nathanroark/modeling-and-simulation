'use client';
import reactLogo from './assets/react.svg';
import { ReactIcon } from './icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about',
  },
  '/resume': {
    name: 'resume',
  },
  '/projects': {
    name: 'projects',
  },
  '/uses': {
    name: 'uses',
  },
};

export default function Navbar() {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <aside className="md:w-[200px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 lg:text-4xl xl:text-5xl border-r-2 h-screen">
      <div className=" lg:sticky  lg:top-32 items-center">
        <div className="mb-8 ml-8 ">
          <ReactIcon size={100} className="animate-spin-slow text-cyan-400" />
        </div>
        <div>
          <nav
            className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto w-fit max-w-full scroll-pr-6 md:relative"
            id="nav"
          >
            <div className="flex flex-row md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={`transition-all  sm:hover:text-amber-600 flex align-middle
                    ${isActive ? 'font-bold text-emerald-500' : 'text-zinc-400'}
                    `}
                  >
                    <span className="relative py-[4px] px-[8px] md:py-[10px] md:px-[20px] lg:ml-2">
                      {name}
                      {path === pathname ? (
                        <div className="absolute inset-0 border-2 border-zinc-500 rounded-xl" />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}
