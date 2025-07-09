

export default function Bookshelf() {
  return (
    <div className="p-4 h-full">

      <div className="flex h-[calc(100vh-8rem)] border rounded-lg overflow-hidden shadow-sm">
      {/* creating left sidebar */}
        <aside className="w-1/4 min-w-[180px] bg-[#f2f2f2] p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">My List</h2>
          <button className="w-full bg-[#91af9b] hover:bg-[#446850] text-white py-2 px-3 rounded-md mb-2">
            + Create New List 
          </button> {/*later implementing map?*/}
        </aside>

      {/* right sidebar */}
        <section className="flex-1 p-6 space-y-6 overflow-hidden">
        {/* creating wishlish sect */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Wishlist</h2>
          <div className="flex gap-20 overflow-x-auto scrollbar-hide">
            {/* placeholders - will use map ig so */}
            {[...Array(3)].map((_, i)=> (
            <div
              key={`wishlist-${i}`}
              className="w-40 h-60 bg-gray-200 flex items-center justify-center rounded-md shrink-0"
              >
              Book {i+1}
            </div>
          ))}
          </div>
        </div>

        {/* Archive */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Archive</h2>
          <div className="flex gap-20 overflow-x-auto scrollbar-hide">
          {[...Array(3)].map((_, i) => (
        <div
          key={`archive-${i}`}
          className="w-40 h-60 bg-gray-300 flex items-center justify-center rounded-md shrink-0"
          >
          Book {i+1}
          </div>
          ))}
          </div>
        </div>
      </section>
    </div>
  </div>
  );
}