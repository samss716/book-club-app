import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, CircleUserRound, Send, Settings, Trophy } from "lucide-react";
import { useGroups } from "../context/GroupContext";

const groupUpdates = {
  "Discussion Boards": "What was your favorite moment from this week's chapters?",
  Challenges: "Read 30 pages before our next group meeting.",
  Polls: "Vote for the next book we will read together.",
};

function ReadingTracker({ progress, onProgressChange }) {
  const circumference = 2 * Math.PI * 94;

  return (
    <div className="flex flex-col items-center">
      <div
        role="progressbar"
        aria-label="Book reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="relative flex h-56 w-56 items-center justify-center"
      >
        <svg aria-hidden="true" viewBox="0 0 220 220" className="absolute inset-0 h-full w-full">
          <circle cx="110" cy="110" r="94" fill="none" stroke="#dededc" strokeWidth="9" />
          <circle
            cx="110"
            cy="110"
            r="94"
            fill="none"
            stroke="#4d87ed"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            transform="rotate(-90 110 110)"
          />
        </svg>
        <div className="relative flex h-36 w-24 flex-col justify-between rounded-r-md border-l-[5px] border-[#d9c18c] bg-[#31556b] p-2 text-left text-white shadow-md">
          <span className="font-serif text-xs leading-tight">THE MIDNIGHT LIBRARY</span>
          <span className="text-[8px] uppercase tracking-wider">Matt Haig</span>
        </div>
      </div>
      <label className="mt-3 flex w-56 flex-col gap-1 text-center text-xs uppercase tracking-wider text-[#565a55]">
        Reading progress: {progress}%
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(event) => onProgressChange(Number(event.target.value))}
          aria-label="Adjust reading progress"
          className="w-full accent-[#4d87ed]"
        />
      </label>
    </div>
  );
}

export default function GroupPage() {
  const { groups, activeGroupIndex, switchGroup } = useGroups();
  const [progress, setProgress] = useState(68);
  const [activePanel, setActivePanel] = useState("Discussion Boards");
  const group = groups[activeGroupIndex];

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#fbfaf6] px-4 pb-8 pt-5 text-[#171917] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/edit"
          aria-label="Group settings"
          className="inline-flex rounded-full p-2 transition hover:bg-[#e6eee6]"
        >
          <Settings size={30} strokeWidth={1.7} />
        </Link>

        <section className="grid items-center gap-5 pb-8 pt-2 sm:grid-cols-2 sm:gap-10 sm:px-8 sm:pb-12">
          <ReadingTracker progress={progress} onProgressChange={setProgress} />
          <div className="flex flex-col items-center gap-7">
            <label className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide">
              <span className="sr-only">Choose group</span>
              <select
                value={activeGroupIndex}
                onChange={(event) => switchGroup(Number(event.target.value) - activeGroupIndex)}
                className="max-w-[220px] appearance-none bg-transparent text-center text-lg font-medium uppercase tracking-wide focus:outline-none"
              >
                {groups.map((item, index) => (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} aria-hidden="true" />
            </label>

            <div className="flex w-full max-w-sm justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d58378] text-xl">
                  {group.members.length}
                </div>
                <span className="text-xs uppercase tracking-wide">Members</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d58378] text-white">
                  <Trophy size={25} strokeWidth={1.5} />
                </div>
                <span className="text-xs uppercase tracking-wide">Leaderboard</span>
              </div>
            </div>

            <p className="max-w-xs text-center text-sm text-[#73766f]">
              A cozy corner to read, share ideas, and keep each other turning pages.
            </p>
          </div>
        </section>

        <section className="rounded-t-[2rem] bg-[#f0f0ee] px-4 py-7 sm:px-10 sm:py-9">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium uppercase tracking-wide">Next group meeting</h1>
            <Link
              to="/friends"
              aria-label="Invite friends"
              className="rounded-full border-2 border-[#171917] p-2 transition hover:bg-white"
            >
              <Send size={22} strokeWidth={1.6} />
            </Link>
          </div>
          <div className="mt-3 rounded-3xl bg-[#fbfaf6] px-5 py-3 shadow-md sm:px-7">
            <span className="block text-4xl leading-none">19</span>
            <span className="font-serif text-2xl uppercase">February</span>
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-3">
            {Object.keys(groupUpdates).map((panel) => (
              <button
                key={panel}
                type="button"
                aria-pressed={activePanel === panel}
                onClick={() => setActivePanel(panel)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left transition sm:justify-center ${
                  activePanel === panel ? "bg-white/70" : "hover:bg-white/50"
                }`}
              >
                <span
                  className={`h-8 w-8 shrink-0 rounded-full ${
                    activePanel === panel ? "bg-[#c9ded0]" : "bg-white"
                  }`}
                />
                <span className="text-sm uppercase tracking-wide">{panel}</span>
              </button>
            ))}
          </div>

          <article className="mt-3 min-h-40 rounded-3xl bg-[#fbfaf6] p-5 shadow-md sm:p-7">
            <div className="flex items-center gap-3">
              <CircleUserRound size={38} strokeWidth={1.2} />
              <span className="text-xs uppercase tracking-wide text-[#72756f]">{group.name}</span>
            </div>
            <p className="mt-8 text-center text-sm uppercase tracking-wide">
              {groupUpdates[activePanel]}
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}
