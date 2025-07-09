

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
                <section className="flex-1 p-6">
                    <h1 className="text-xl font-bold mb-4">Bookshelf (wishlist or archive?)</h1>
            </section>
            </div>

            </div>
    );
  }
  