// src/pages/Homepage.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Search, UsersRound } from "lucide-react";
import GroupCarousel from "../components/GroupCarousel";
import CreateGroupButton from "../components/CreateGroupButton";
import { useGroups } from "../context/GroupContext";

const popularBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    color: "#31556b",
    accent: "#d9c18c",
  },
  {
    title: "The Very Secret Society of Irregular Witches",
    author: "Sangu Mandanna",
    color: "#b65f50",
    accent: "#f3d9a1",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    color: "#596d53",
    accent: "#e5cb91",
  },
];

export default function Homepage() {
  const { groups } = useGroups();

  return (
    <div className="bg-[#fbfaf6] text-[#20211f]">
      <section className="bg-[#e6eee6] px-4 sm:px-8">
        <div className="mx-auto flex min-h-[310px] max-w-6xl flex-col items-center justify-center py-6 sm:min-h-[470px] sm:py-10">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#69816e]">
            Find your people. Find your next read.
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl">Your next chapter starts here</h1>
          <GroupCarousel />
          <div className="flex items-center gap-3">
              <CreateGroupButton />
            </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <section aria-labelledby="popular-heading">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#829184]">
                On readers' lists
              </p>
              <h2 id="popular-heading" className="font-serif text-2xl sm:text-3xl">
                Popular right now
              </h2>
              </div>
              <Link to="/discover" className="hidden items-center gap-1 text-sm text-[#66816e] hover:underline sm:flex">
                Explore books <ArrowRight size={16} />
              </Link>
          </div>

          <div className="hide-scrollbar flex gap-4 overflow-x-auto rounded-2xl bg-[#f0f0ee] p-4 sm:gap-6 sm:p-6">
            {popularBooks.map((book) => (
              <article
                key={book.title}
                className="flex min-w-[230px] flex-1 items-center gap-4 rounded-xl bg-white/70 p-3 sm:min-w-[280px] sm:p-4"
              >
                <div
                  aria-hidden="true"
                  className="flex h-32 w-[84px] shrink-0 flex-col justify-between rounded-r-md p-2 text-white shadow-md sm:h-36 sm:w-24"
                  style={{ backgroundColor: book.color, borderLeft: `5px solid ${book.accent}` }}
                >
                  <span className="font-serif text-[10px] leading-tight sm:text-xs">{book.title}</span>
                  <span className="text-[8px] uppercase tracking-wider opacity-80">{book.author}</span>
                </div>
                <div>
                  <h3 className="font-serif text-base leading-snug sm:text-lg">{book.title}</h3>
                  <p className="mt-1 text-sm text-[#767873]">{book.author}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 sm:mt-12" aria-label="Search books">
          <Link
            to="/discover"
            className="mx-auto flex max-w-3xl items-center justify-center gap-3 rounded-xl bg-[#dededc] px-5 py-4 font-medium tracking-wide transition hover:bg-[#d2d4d0] sm:py-5"
          >
            <Search size={22} strokeWidth={1.7} />
            <span>Search books</span>
            <ArrowRight size={18} className="ml-auto" />
          </Link>
        </section>

        <section className="mt-14 sm:mt-20" aria-labelledby="groups-heading">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#829184]">
                Good books, better company
              </p>
              <h2 id="groups-heading" className="font-serif text-2xl sm:text-3xl">
                Featured groups
              </h2>
            </div>
            <Link to="/create" className="hidden items-center gap-1 text-sm text-[#66816e] hover:underline sm:flex">
              Start a group <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {groups.map((group, index) => (
              <article
                key={group.id}
                className="flex items-center gap-4 rounded-2xl border border-[#e9e6de] bg-white/70 p-4 sm:flex-col sm:gap-3 sm:border-0 sm:bg-transparent sm:p-2 sm:text-center"
              >
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#d58378] text-3xl shadow-sm sm:h-32 sm:w-32 sm:text-4xl"
                  aria-hidden="true"
                >
                  {group.members[0] || <UsersRound size={38} />}
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl">{group.name}</h3>
                  <p className="mt-1 text-sm text-[#767873]">
                    {group.members.length + index * 3 + 8} readers sharing their next favorite
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
