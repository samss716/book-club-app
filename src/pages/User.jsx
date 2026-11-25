import { Link } from "react-router-dom";
import { CircleUserRound, Cog } from "lucide-react";

export default function User() {
  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#f0f0ee] px-4 pb-8 pt-5">
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-t-2xl bg-[#fbfaf6] px-5 pb-10 pt-5 text-center sm:px-12">
        <Link
          to="/edit"
          aria-label="Profile settings"
          className="mb-4 self-start rounded-full p-2 text-[#20211f] transition hover:bg-[#e6eee6]"
        >
          <Cog size={34} strokeWidth={1.8} />
        </Link>

        <CircleUserRound
          aria-label="Profile avatar"
          role="img"
          size={172}
          strokeWidth={0.7}
          className="text-[#111]"
        />
        <h1 className="mt-4 text-3xl font-medium tracking-wide">Reader Name</h1>
        <p className="mt-5 w-full max-w-[310px] rounded-full bg-[#dededc] px-5 py-2 text-lg font-medium tracking-wider">
          CURRENT READ
        </p>

        <div className="mt-8 grid w-full max-w-[350px] grid-cols-[1fr_1fr_1fr] items-center">
          <div className="flex justify-center">
            <div className="flex h-[68px] w-[68px] flex-col items-center justify-center rounded-full border-[5px] border-[#9bcdb1] text-[#81c69c]">
              <span className="text-[9px] uppercase tracking-widest">Level</span>
              <span className="text-2xl font-semibold leading-none">1</span>
            </div>
          </div>
          <Link to="/bookshelf" className="border-x border-[#20211f] px-2 py-1 hover:bg-[#f3f1ec]">
            <span className="block text-2xl">5</span>
            <span className="text-sm uppercase tracking-wide">Books</span>
            <span className="block text-xs uppercase tracking-wide">Read</span>
          </Link>
          <Link to="/manage" className="px-2 py-1 hover:bg-[#f3f1ec]">
            <span className="block text-2xl">3</span>
            <span className="text-sm uppercase tracking-wide">Groups</span>
            <span className="block text-xs uppercase tracking-wide">Joined</span>
          </Link>
        </div>

        <div className="mt-12 flex w-full max-w-[310px] flex-col gap-4">
          <Link
            to="/bookshelf"
            className="rounded-[2rem] bg-[#dededc] px-5 py-6 text-xl tracking-wide transition hover:bg-[#d2d4d0]"
          >
            Reading Archive
          </Link>
          <Link
            to="/friends"
            className="rounded-[2rem] bg-[#dededc] px-5 py-6 text-xl tracking-wide transition hover:bg-[#d2d4d0]"
          >
            Your Friends
          </Link>
          <Link
            to="/manage"
            className="rounded-[2rem] bg-[#dededc] px-5 py-6 text-xl tracking-wide transition hover:bg-[#d2d4d0]"
          >
            Manage Groups
          </Link>
        </div>

        <div className="mt-12 flex w-full max-w-[380px] flex-col gap-3">
          <Link
            to="/edit"
            className="rounded-full bg-[#c9ded0] px-5 py-2 text-lg tracking-wide transition hover:bg-[#b6d2c0]"
          >
            Edit Profile
          </Link>
          <button
            type="button"
            className="rounded-full bg-[#c9ded0] px-5 py-2 text-lg tracking-wide transition hover:bg-[#b6d2c0]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
