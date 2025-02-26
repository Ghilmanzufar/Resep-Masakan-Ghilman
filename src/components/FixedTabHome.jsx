import { useState } from "react";
import { Tabs } from "flowbite-react";
import { CardHomeComponent } from "./CardHome";

export function FixedTabHomeComponent() {
    const [searchQuery, setSearchQuery] = useState("");

    // Fungsi untuk menangani perubahan pencarian
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="bg-cyan-500 px-4 py-2">
        {/* Wrapper untuk input pencarian di atas Tabs */}
        <div className="flex justify-center mb-4">
            <div className="flex items-center w-full max-w-md">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 rounded-l-lg border border-gray-300 focus:outline-none"
                placeholder="Cari resep..."
            />
            <button
                onClick={() => setSearchQuery("")} // Reset search query on click
                className="p-2 bg-cyan-700 text-white rounded-r-lg font-medium hover:bg-cyan-800 focus:outline-none"
            >
                Cari
            </button>
            </div>
        </div>

        {/* Tabs Container */}
        <Tabs aria-label="Default tabs" variant="default">
            <Tabs.Item active title="Resep Masakan Terbaru">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                {/* Mengirimkan searchQuery ke CardHomeComponent */}
                <CardHomeComponent type="terbaru" searchQuery={searchQuery} />
            </div>
            </Tabs.Item>
            <Tabs.Item title="Resep Masakan Populer">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                {/* Mengirimkan searchQuery ke CardHomeComponent */}
                <CardHomeComponent type="populer" searchQuery={searchQuery} />
            </div>
            </Tabs.Item>
        </Tabs>
        </div>
    );
}
