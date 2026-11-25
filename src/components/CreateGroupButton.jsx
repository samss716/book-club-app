import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function CreateGroupButton() {
  return (
    <Link
      to="/create"
      aria-label="Create a group"
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#9bd64f] text-white shadow-md transition hover:bg-[#84c33b]"
    >
      <Plus size={38} strokeWidth={1.6} />
    </Link>
  );
}
