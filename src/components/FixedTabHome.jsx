import { useState } from "react";
import { Tabs } from "flowbite-react";
import { CardHomeComponent } from './CardHome';

export function FixedTabHomeComponent() {
    const [searchQuery, setSearchQuery] = useState("");

    // Fungsi untuk menangani perubahan pencarian
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="pl-2 pt-1 bg-cyan-500">
            {/* Wrapper untuk input pencarian di atas Tabs */}
            <div className="flex justify-end mb-4 pr-4"> {/* Tambahkan padding kanan */}
                <div className="flex items-center"> {/* Tambahkan space antar elemen */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="p-2 rounded-l-lg border border-gray-300 focus:outline-none"
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
                    <div className="flex flex-wrap gap-4">
                        {/* Mengirimkan searchQuery ke CardHomeComponent */}
                        <CardHomeComponent type="terbaru" searchQuery={searchQuery} />
                    </div>
                </Tabs.Item>
                <Tabs.Item title="Resep Masakan Populer">
                    <div className="flex flex-wrap gap-4">
                        {/* Mengirimkan searchQuery ke CardHomeComponent */}
                        <CardHomeComponent type="populer" searchQuery={searchQuery} />
                    </div>
                </Tabs.Item>
            </Tabs>
        </div>
    );
}