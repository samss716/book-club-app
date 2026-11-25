import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Check,
  Link2,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { useGroups } from "../context/GroupContext";

const suggestedGenres = ["Fiction", "Sci-Fi & Fantasy", "Speculative", "Non-Fiction"];
const inputClass =
  "w-full rounded-md border border-[#b9c9c1] bg-white px-3 py-2 text-sm text-[#20211f] outline-none transition focus:border-[#315e50] focus:ring-1 focus:ring-[#315e50]";
const labelClass = "mb-1.5 block text-sm font-semibold text-[#252824]";

function CoverPicker({ cover, onCoverChange }) {
  const fileInput = useRef(null);
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Choose an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onCoverChange(reader.result);
        setError("");
      }
    };
    reader.onerror = () => setError("We couldn't read that image. Please try another.");
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        aria-label="Change group cover"
        className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#315e50] text-white transition hover:ring-4 hover:ring-[#dce8df]"
      >
        {cover ? (
          <img src={cover} alt="" className="h-full w-full object-cover" />
        ) : (
          <BookOpen size={30} strokeWidth={1.6} />
        )}
        <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#fbfaf6] bg-[#70478a]">
          <Pencil size={12} />
        </span>
      </button>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Choose a group cover image"
      />
      <span className="mt-1.5 text-xs text-[#557766]">Change club cover</span>
      {error && <p role="alert" className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}

export default function CreateGroup() {
  const navigate = useNavigate();
  const { createGroup } = useGroups();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [genres, setGenres] = useState(["Fiction", "Sci-Fi & Fantasy", "Speculative"]);
  const [newGenre, setNewGenre] = useState("");
  const [meetingFormat, setMeetingFormat] = useState("Hybrid (In-person & Virtual)");
  const [readingPace, setReadingPace] = useState("Monthly (1 book / month)");
  const [schedule, setSchedule] = useState("");
  const [location, setLocation] = useState("");
  const [currentBook, setCurrentBook] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const [memberCap, setMemberCap] = useState("15");
  const [email, setEmail] = useState("");
  const [invitees, setInvitees] = useState([]);
  const [inviteError, setInviteError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  function toggleGenre(genre) {
    setGenres((current) =>
      current.includes(genre)
        ? current.filter((item) => item !== genre)
        : [...current, genre]
    );
  }

  function addGenre(event) {
    event.preventDefault();
    const tag = newGenre.trim();
    if (tag && !genres.some((item) => item.toLowerCase() === tag.toLowerCase())) {
      setGenres((current) => [...current, tag]);
    }
    setNewGenre("");
  }

  function addInvitee(event) {
    event.preventDefault();
    const address = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setInviteError("Enter a valid email address.");
      return;
    }
    if (invitees.includes(address)) {
      setInviteError("That person is already on the invite list.");
      return;
    }
    setInvitees((current) => [...current, address]);
    setEmail("");
    setInviteError("");
  }

  async function copyInviteLink() {
    const link = `${window.location.origin}/groups?invite=${encodeURIComponent(name.trim())}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopyMessage("Invite link copied");
    } catch {
      setCopyMessage("Copying isn't available in this browser.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCreateGroup() {
    createGroup({
      name: name.trim(),
      description: description.trim(),
      cover,
      genres,
      meetingFormat,
      readingPace,
      schedule: schedule.trim(),
      location: location.trim(),
      currentBook: currentBook.trim(),
      privacy,
      memberCap: Number(memberCap),
      invitees,
    });
    navigate("/groups");
  }

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#fbfaf6] px-4 py-6 text-[#20211f] sm:px-8 sm:py-10">
      <main className="mx-auto max-w-3xl">
        <div className="mb-5 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-[#72766f]">
          <span>Step {step} of 2</span>
          <span>{step === 1 ? "Group basics" : "Group details"}</span>
        </div>
        <div
          className="mb-7 h-2.5 overflow-hidden rounded-full bg-[#dededc]"
          role="progressbar"
          aria-label="Group creation progress"
          aria-valuemin={1}
          aria-valuemax={2}
          aria-valuenow={step}
        >
          <div
            className={`h-full rounded-full bg-[#315e50] transition-all duration-300 ${
              step === 1 ? "w-1/2" : "w-full"
            }`}
          />
        </div>

        <header className="mb-7 text-center">
          <h1 className="font-serif text-2xl font-semibold sm:text-3xl">Create a new group</h1>
          <p className="mt-1 text-sm text-[#777a74]">
            Set up your book club details, reading cadence, and invite members
          </p>
        </header>

        <div className="space-y-7">
          <CoverPicker cover={cover} onCoverChange={setCover} />

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-7" aria-label="Group basics">
              <div>
                <label htmlFor="group-name" className={labelClass}>Group Name <span aria-hidden="true">*</span></label>
                <input
                  id="group-name"
                  className={inputClass}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Midnight Sci-Fi Readers"
                  maxLength={60}
                  required
                  autoFocus
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="group-description" className="text-sm font-semibold">Group Description</label>
                  <span className="text-xs text-[#777a74]">{description.length} / 300</span>
                </div>
                <textarea
                  id="group-description"
                  className={`${inputClass} min-h-28 resize-y`}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="What will your group read and talk about?"
                  maxLength={300}
                />
              </div>
              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="rounded-md border border-[#b9c9c1] bg-white px-5 py-2.5 text-sm font-medium hover:bg-[#f1f4f0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#315e50] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#264b40]"
                >
                  Next
                </button>
              </div>
            </form>
          ) : (
            <section className="space-y-6" aria-label="Group details">
              <div>
                <span className={labelClass}>Genres &amp; Focus</span>
                <div className="flex flex-wrap items-center gap-2">
                  {suggestedGenres.map((genre) => {
                    const selected = genres.includes(genre);
                    return (
                      <button
                        key={genre}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleGenre(genre)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition ${
                          selected
                            ? "border-[#315e50] bg-[#315e50] text-white"
                            : "border-[#c9d2cc] bg-white hover:bg-[#edf2ee]"
                        }`}
                      >
                        {genre}
                      </button>
                    );
                  })}
                  {genres.filter((genre) => !suggestedGenres.includes(genre)).map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className="flex items-center gap-1 rounded-full border border-[#315e50] bg-[#315e50] px-3 py-1.5 text-xs text-white"
                    >
                      {genre}<X size={12} />
                    </button>
                  ))}
                  <form onSubmit={addGenre} className="flex">
                    <label className="sr-only" htmlFor="new-genre">Add a genre tag</label>
                    <input
                      id="new-genre"
                      value={newGenre}
                      onChange={(event) => setNewGenre(event.target.value)}
                      placeholder="+ Add tag"
                      className="w-24 rounded-full border border-dashed border-[#8da598] bg-transparent px-3 py-1.5 text-xs outline-none focus:border-[#315e50]"
                      maxLength={24}
                    />
                  </form>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="meeting-format" className={labelClass}>Meeting Format</label>
                  <select id="meeting-format" className={inputClass} value={meetingFormat} onChange={(event) => setMeetingFormat(event.target.value)}>
                    <option>Hybrid (In-person &amp; Virtual)</option>
                    <option>In-person</option>
                    <option>Virtual</option>
                </select>
                </div>
                <div>
                  <label htmlFor="reading-pace" className={labelClass}>Reading Pace</label>
                  <select id="reading-pace" className={inputClass} value={readingPace} onChange={(event) => setReadingPace(event.target.value)}>
                    <option>Monthly (1 book / month)</option>
                    <option>Every two weeks</option>
                    <option>Every two months</option>
                    <option>At our own pace</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="meeting-schedule" className={labelClass}>Meeting Schedule</label>
                  <input id="meeting-schedule" className={inputClass} value={schedule} onChange={(event) => setSchedule(event.target.value)} placeholder="e.g. Last Sunday · 4:00 PM" />
                </div>
                <div>
                  <label htmlFor="meeting-location" className={labelClass}>Location or Video Link</label>
                  <input id="meeting-location" className={inputClass} value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Where will you meet?" />
                </div>
              </div>

              <div>
                <label htmlFor="current-book" className={labelClass}>First / Current Book <span className="font-normal text-[#777a74]">(Optional)</span></label>
                <div className="relative">
                  <BookOpen size={16} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#557766]" />
                  <input id="current-book" className={`${inputClass} pl-9 pr-9`} value={currentBook} onChange={(event) => setCurrentBook(event.target.value)} placeholder="Add your first read" />
                  {currentBook && (
                    <button type="button" aria-label="Remove current book" onClick={() => setCurrentBook("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777a74] hover:text-[#20211f]">
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
                <fieldset>
                  <legend className={labelClass}>Group Privacy</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {["Public", "Private (Invite)"].map((option) => (
                      <label key={option} className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs ${privacy === option ? "border-[#557766] bg-[#eaf0eb]" : "border-[#c9d2cc] bg-white"}`}>
                        <input type="radio" name="privacy" value={option} checked={privacy === option} onChange={() => setPrivacy(option)} className="accent-[#315e50]" />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="member-cap" className={labelClass}>Member Cap</label>
                  <select id="member-cap" className={inputClass} value={memberCap} onChange={(event) => setMemberCap(event.target.value)}>
                    {["5", "10", "15", "20", "30", "50"].map((count) => <option key={count} value={count}>{count} members</option>)}
                  </select>
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label htmlFor="invite-email" className="text-sm font-semibold">Add Members</label>
                  <button type="button" onClick={copyInviteLink} className="flex shrink-0 items-center gap-1 text-xs text-[#557766] hover:underline">
                    <Link2 size={13} /> Copy invite link
                  </button>
                </div>
                <form onSubmit={addInvitee} className="flex gap-2">
                  <input
                    id="invite-email"
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    aria-describedby={inviteError ? "invite-error" : undefined}
                  />
                  <button type="submit" className="flex shrink-0 items-center gap-1 rounded-md border border-[#8da598] bg-[#edf3ef] px-3 text-sm font-medium text-[#315e50] hover:bg-[#e1ebe4]">
                    <Plus size={16} /> Invite
                  </button>
                </form>
                {inviteError && <p id="invite-error" role="alert" className="mt-1 text-xs text-red-700">{inviteError}</p>}
                {copyMessage && <p role="status" className="mt-1 text-xs text-[#557766]">{copyMessage}</p>}
                {invitees.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2" aria-label="Invited members">
                    {invitees.map((invitee) => (
                      <li key={invitee} className="flex items-center gap-1 rounded-full bg-[#edf0ed] px-2.5 py-1 text-xs">
                        <span className="max-w-48 truncate">{invitee}</span>
                        <button type="button" aria-label={`Remove ${invitee}`} onClick={() => setInvitees((current) => current.filter((item) => item !== invitee))} className="text-[#777a74] hover:text-[#20211f]">
                          <X size={13} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-xs text-[#777a74]">
                  {invitees.length} invited · You will be assigned as Group Admin
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#e7e5df] pt-5">
                <button type="button" onClick={() => setStep(1)} className="rounded-md border border-[#b9c9c1] bg-white px-5 py-2.5 text-sm font-medium hover:bg-[#f1f4f0]">
                  Back
                </button>
                <button type="button" onClick={() => navigate("/")} className="rounded-md border border-[#b9c9c1] bg-white px-5 py-2.5 text-sm font-medium hover:bg-[#f1f4f0]">
                  Cancel
                </button>
                <button type="button" onClick={handleCreateGroup} className="flex items-center gap-2 rounded-md bg-[#315e50] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#264b40]">
                  <Check size={16} /> Create Group
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
