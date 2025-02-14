import { Card } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
export function SavedRecipeCard({ recipe, onDelete }) {
    return (
        <Card className="flex flex-col h-full justify-between shadow-lg bg-cyan-100">
            <img src={recipe.gambar} alt={recipe.judul} className="h-48 object-cover rounded-t-lg" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {recipe.judul}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                    {recipe.deskripsi}
                </p>

                {/* ⭐ Menampilkan Rating Bintang */}
                <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                            key={index}
                            className={`w-5 h-5 ${index < Math.round(recipe.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.221 3.736a1 1 0 00.95.69h3.924c.969 0 1.372 1.24.588 1.81l-3.174 2.3a1 1 0 00-.364 1.118l1.221 3.736c.3.921-.755 1.688-1.54 1.118l-3.174-2.3a1 1 0 00-1.176 0l-3.174 2.3c-.784.57-1.838-.197-1.54-1.118l1.221-3.736a1 1 0 00-.364-1.118l-3.174-2.3c-.784-.57-.38-1.81.588-1.81h3.924a1 1 0 00.95-.69l1.221-3.736z" />
                        </svg>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-700">{parseFloat(recipe.rating).toFixed(1)}</span>
                </div>

                {/* Kategori, Tombol "Lihat Detail", dan Delete */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-gray-600">{recipe.kategori}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onDelete(recipe.id)}
                            className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
                        >
                            <FaTrash className="mr-2" /> Hapus
                        </button>
                        <Link to={`/detail/${recipe.id}`} className="text-white bg-cyan-500 hover:bg-cyan-700 font-medium rounded-lg text-sm px-4 py-2">
                            Lihat Detail
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}
