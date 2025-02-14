import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"; // Gunakan Link untuk navigasi yang lebih optimal

export function CardHomeComponent({ type, searchQuery }) {
    const [resepData, setResepData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser) {
            setIsLoggedIn(true);
            setUserId(loggedUser.id); // Ambil user_id dari local storage
        }
    }, []);

    useEffect(() => {
        fetch("https://resepmasakanghilman.my.id/read_resep.php")
            .then((response) => response.json())
            .then((data) => {
                if (type === "populer") {
                    data.sort((a, b) => b.rating - a.rating);
                }
                if (searchQuery) {
                    data = data.filter((resep) =>
                        resep.judul.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }
                setResepData(data);
            })
            .catch((error) => console.error("Error:", error));
    }, [type, searchQuery]);

    const saveRecipe = (resepId) => {
        if (!isLoggedIn) {
            window.location.href = "/FormLogin"; // Redirect ke halaman login jika belum login
            return;
        }
    
        fetch("https://resepmasakanghilman.my.id/save_resep.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, resep_id: resepId }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Resep berhasil disimpan! ✅", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else {
                    toast.error("Gagal menyimpan resep! ❌", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Terjadi kesalahan saat menyimpan resep!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };    

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resepData.map((resep) => (
                <Card key={resep.id} className="flex flex-col h-full justify-between" imgAlt={resep.judul} imgSrc={resep.gambar}>
                    <Link to={`/detail/${resep.id}`}>
                        <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {resep.judul}
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                            {resep.deskripsi}
                        </p>
                    </Link>
                    <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                            key={index}
                            className={`w-5 h-5 ${index < Math.round(resep.rating) ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.221 3.736a1 1 0 00.95.69h3.924c.969 0 1.372 1.24.588 1.81l-3.174 2.3a1 1 0 00-.364 1.118l1.221 3.736c.3.921-.755 1.688-1.54 1.118l-3.174-2.3a1 1 0 00-1.176 0l-3.174 2.3c-.784.57-1.838-.197-1.54-1.118l1.221-3.736a1 1 0 00-.364-1.118l-3.174-2.3c-.784-.57-.38-1.81.588-1.81h3.924a1 1 0 00.95-.69l1.221-3.736z" />
                        </svg>
                    ))} 
                    <span className="ml-3 rounded bg-cyan-100 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                            {parseFloat(resep.rating).toFixed(1)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {resep.kategori}
                        </span>
                        <button
                            onClick={() => saveRecipe(resep.id)}
                            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Save
                        </button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
