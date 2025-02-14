import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactSuggestionWithMap = () => {
    const [formData, setFormData] = useState({
        email: "",
        nama: "",
        nomer: "",
        saran: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch(
            "http://resepmasakanghilman.my.id/save_saran.php",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            mode : 'cors',
            }
        );

        const result = await response.json();
        // alert(result.message); // Menampilkan alert berdasarkan respons dari server

        if (result.status === "success") {
            setFormData({ email: "", nama: "", nomer: "", saran: "" });

            // Menampilkan notifikasi sukses
            toast.success("Saran berhasil dikirim!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Reload halaman setelah beberapa detik
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Gagal mengirim saran. Coba lagi nanti.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
    };

    return (
        <section className="py-16 bg-black-100 my-8">
        <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
            {/* Form Saran */}
            <div>
                <h1 className="text-xl font-bold text-black mb-4 mt-3">Kontak Saran</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                {/* Input Email */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-black-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-black-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                    Email
                    </label>
                </div>

                {/* Input Nama */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                    type="text"
                    name="nama"
                    id="nama"
                    className="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-black-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={formData.nama}
                    onChange={handleChange}
                    />
                    <label
                    htmlFor="nama"
                    className="peer-focus:font-medium absolute text-sm text-black-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                    Nama
                    </label>
                </div>

                {/* Input Nomor HP */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                    type="text"
                    name="nomer"
                    id="nomer"
                    className="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-black-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={formData.nomer}
                    onChange={handleChange}
                    />
                    <label
                    htmlFor="nomer"
                    className="peer-focus:font-medium absolute text-sm text-black-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                    Nomor HP
                    </label>
                </div>

                {/* Input Saran */}
                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                    name="saran"
                    id="saran"
                    className="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-black-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={formData.saran}
                    onChange={handleChange}
                    />
                    <label
                    htmlFor="saran"
                    className="peer-focus:font-medium absolute text-sm text-black-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                    Saran
                    </label>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                >
                    Kirim Saran
                </button>
                </form>
            </div>

            {/* Kolom Lokasi Maps */}
            <div>
                <h2 className="text-xl font-bold text-black mb-4">Lokasi Toko</h2>
                <div className="flex justify-center items-center">
                <iframe
                    title="Lokasi Toko"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.9156762181326!2d106.82715321530166!3d-6.175392295527204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1f50323e807%3A0xf2b42fca2da24167!2sMonas!5e0!3m2!1sen!2sid!4v1674146088173!5m2!1sen!2sid"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-md"
                ></iframe>
                </div>
            </div>
            </div>

            
        </div>
        </section>
    );
};

export default ContactSuggestionWithMap;
