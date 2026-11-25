import { Link } from 'react-router-dom';
import { BookOpen, CircleUserRound, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-30 border-b-4 border-[#c9ded0] bg-[#eeece8]/95 px-5 py-3 text-[#20211f] backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link
          to="/"
          className="font-serif text-2xl tracking-[0.08em] sm:text-3xl"
          aria-label="RoundTbl home"
        >
          RoundTbl
        </Link>

        <ul className="flex items-center gap-3 text-xs sm:gap-8 sm:text-sm">
          <li>
            <Link
              to="/discover"
              aria-label="Find a book"
              className="flex items-center gap-1.5 hover:text-[#66816e]"
            >
              <Search size={16} />
              <span className="hidden whitespace-nowrap sm:inline">Find a book</span>
            </Link>
          </li>
          <li>
            <Link
              to="/bookshelf"
              aria-label="Bookshelf"
              className="flex items-center gap-1.5 hover:text-[#66816e]"
            >
              <BookOpen size={16} />
              <span className="hidden whitespace-nowrap sm:inline">Bookshelf</span>
            </Link>
          </li>
          <li>
            <div className="group relative">
              <Link
                to="/user"
                aria-label="Your profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#20211f]/50 transition hover:bg-white/70"
              >
                <CircleUserRound size={28} strokeWidth={1} />
              </Link>
              <div className="invisible absolute right-0 top-full z-40 w-36 translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <Link
                  to="/groups"
                  className="block rounded-lg border border-black/5 bg-[#fbfaf6] px-4 py-3 text-sm shadow-lg hover:bg-[#e6eee6]"
                >
                  My groups
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
