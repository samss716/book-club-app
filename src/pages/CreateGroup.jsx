
export default function CreateGroup() {
    return (
      <div className="flex flex-col items-center justify-between text-center h-[calc(100vh-6rem)] overflow-hidden pt-6 pb-4">
      
      <div className="flex flex-col items-center space-y-2">
      <h1 className="text-2xl">Create a new group</h1>

      <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl">
        {/* avatar image */}
      <span>👤</span>
      </div>

      <h2 className="text-xl font-semibold">Group Name</h2>
    <p className="text-sm pb-8 text-gray-600">Enter group description</p>
    
    <textarea
          className="w-72 h-24 border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-green-900 focus:ring-1 resize-none"
          placeholder="text..."
        />

    </div>

    </div>
    );
  }