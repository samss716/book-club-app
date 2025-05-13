export default function User() {
    return (
      <div className="relative flex flex-col items-center justify-center text-center overflow-hidden px-4">
        <h1 className="text-2xl">User Profile</h1>

        <div className="fixed bottom-25 w-full flex justify-center z-40">
        <div className="flex flex-col gap-4 w-4/5"> {/*wrapper to stack pill buttons*/}
        <button class="flex-1 bg-[#91af9b] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Edit Profile
        </button>

        <button class="flex-1 bg-[#91af9b] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Sign Out
        </button>

        </div>
        </div>
      </div>
    );
  }
