import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CardProfileComponent() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        nama: "",
        nomer: "",
        photo: null,
    });
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser) {
            setUser(loggedUser);
            console.log("User Data:", loggedUser);
            setEditedUser({
                nama: loggedUser.nama,
                nomer: loggedUser.nomer,
                photo: loggedUser.photo || null,
            });
        } else {
            navigate("/");
        }
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedUser({
            nama: user.nama,
            nomer: user.nomer,
            photo: user.photo || null,
        });
    };

    const handleSaveClick = async () => {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("nama", editedUser.nama);
        formData.append("nomer", editedUser.nomer);
        if (editedUser.photo) {
            formData.append("photo", editedUser.photo);
        }

        const response = await fetch("https://resepmasakanghilman.my.id/update_user.php", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        if (data.status === "success") {
            const updatedUser = { ...user, ...editedUser };
            localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsEditing(false);
            setShowAlert(true);
            console.log("Response dari server:", data);
            setTimeout(() => setShowAlert(false), 5000);
        } else {
            console.error("Update failed:", data.message);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-cyan-900">
            {showAlert && (
                <div
                    id="alert-border-3"
                    className="fixed top-3 w-1/3 rounded-lg flex items-center p-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800 z-10"
                    role="alert"
                >
                    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <p className="ms-3 text-sm font-medium">Profil berhasil diperbarui!</p>
                </div>
            )}

            <div className="bg-white overflow-hidden shadow rounded-lg border w-full max-w-md">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profil Pengguna</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Informasi Pengguna</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nama</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.nama}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, nama: e.target.value })
                                        }
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                ) : (
                                    user.nama
                                )}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Alamat Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nomor HP</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.nomer}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, nomer: e.target.value })
                                        }
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                ) : (
                                    user.nomer
                                )}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Photo Profil</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditing ? (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, photo: e.target.files[0] })
                                        }
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                ) : user.photo ? (
                                    <img
                                        src={user.photo}
                                        alt="Foto Profil"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <p>Belum ada photo</p>
                                )}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-between">
                    {isEditing ? (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSaveClick}
                                className="rounded-lg bg-blue-500 px-4 py-2 text-white text-sm font-medium"
                            >
                                Simpan
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white text-sm font-medium"
                            >
                                Batal
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleEditClick}
                                className="rounded-lg bg-red-500 px-4 py-2 text-white text-sm font-medium"
                            >
                                Edit
                            </button>
                            <button onClick={() => navigate("/")} 
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white text-sm font-medium hover:bg-red-500">
                                Kembali
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}