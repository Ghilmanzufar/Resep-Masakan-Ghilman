import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Untuk mengambil parameter dari URL
import { NavbarComponent } from '../components/Navbar';
import { FooterComponent } from '../components/Footer';
import "react-toastify/dist/ReactToastify.css";

export default function RecipeDetail() {
    const { id } = useParams(); // Tangkap ID dari URL
    const [bahan, setBahan] = useState([]);
    const [langkah, setLangkah] = useState([]);
    const [resep, setResep] = useState(null);

    useEffect(() => {
        fetch(`http://localhost/Project_resep_Masakan/be_resep/detail_resep.php?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Data yang diterima:", data);
                setBahan(data.bahan || []);
                setLangkah(data.langkah || []);
                setResep(data.resep || {});
            })
            .catch((error) => console.error("Error:", error));
    }, [id]);

    if (!resep) {
        return <p className="text-center py-8">Memuat data...</p>;
    }

    console.log("Resep yang digunakan:", resep); 
    
    return (
        <div className="">
            <NavbarComponent />
            <div className="container mx-auto px-4 py-8 ">
                <div className="flex flex-col md:flex-row items-center gap-6 ">
                    <img src={resep.gambar} alt={resep.judul} className="rounded-lg w-3/4 md:w-1/2 shadow-lg mt-4" />
                    <div className="text-left mx-4 md:text-center md:pl-8">
                        <h1 className="text-2xl font-bold">{resep.judul}</h1>
                        <p className="text-gray-600 mt-2">{resep.deskripsi}</p>

                        <div className="mt-4 text-gray-700">
                            <p><strong>Kategori:</strong> {resep.kategori}</p>
                            <p><strong>Waktu:</strong> {resep.durasi_masak} menit</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-6 rounded-lg shadow-lg bg-cyan-200">
                    <h2 className="text-xl font-semibold">Bahan-Bahan</h2>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        {bahan.map((item, index) => (
                            <li key={index}>
                                {item.bahan} - {item.jumlah}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 p-6 my-4 bg-cyan-200 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Langkah-Langkah</h2>
                    <ol className="list-decimal list-inside text-gray-700 mt-2">
                        {langkah.map((step, index) => (
                            <li key={index}>{step.langkah}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
}