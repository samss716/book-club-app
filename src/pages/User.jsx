import { Link } from "react-router-dom";

export default function User() {
  return (

    <div className="flex flex-col items-center justify-between text-center h-[calc(100vh-6rem)] overflow-hidden pt-6 pb-4">
      
    <div className="flex flex-col items-center space-y-2">
    <h1 className="text-2xl">User Profile</h1>


    <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl">
      {/* avatar image */}
      <span>👤</span>
    </div>

    <h2 className="text-xl font-semibold">User Profile</h2>
    <p className="text-sm text-gray-600">Tap to upload a new photo</p>
    </div>

      {/*user option buttons from routing */}
      <div className="flex flex-col gap-5 w-3/5"> {/*wrapper to stack pill buttons
      <Link
        to="/bookshelf"
        className="bg-[#91af9b] hover:bg-[#446850] text-white font-bold py-8 px-4 rounded-full">
      Reading Archive/Bookshelf
      </Link>
      */} 

      <Link
        to="/friends"
        className="bg-[#91af9b] hover:bg-[#446850] text-white font-bold py-8 px-4 rounded-full">
      Friends
      </Link>

      <Link
        to="/manage"
        className="bg-[#91af9b] hover:bg-[#446850] text-white font-bold py-8 px-4 rounded-full">
      Manage Groups
      </Link>
      </div>

      
      <div className="flex flex-col gap-3 w-1/5"> {/*wrapper to stack pill buttons*/}
      
      <Link
        to="/edit"
        className="bg-gray-300 hover:bg-[#446850] text-white font-bold py-2 px-4 rounded-full">
      Edit Profile
      </Link>

      <button className="bg-gray-300 hover:bg-[#446850] text-white font-bold py-2 px-4 rounded-full">
      Sign Out
      </button>

      </div>

      </div>
  );
}