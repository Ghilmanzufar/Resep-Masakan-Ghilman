import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CardProfileComponent() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        nama: "",
        nomer: "",
        email: "",
        photo: null,
    });
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser) {
            setUser(loggedUser);
            setEditedUser({
                nama: loggedUser.nama,
                nomer: loggedUser.nomer,
                email: loggedUser.email,
                photo: loggedUser.photoUrl || null,
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
            email: user.email,
            photo: user.photoUrl || null,
        });
    };

    const handleSaveClick = async () => {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("nama", editedUser.nama);
        formData.append("nomer", editedUser.nomer);
        formData.append("email", editedUser.email);
        if (editedUser.photo) {
            formData.append("photo", editedUser.photo);
        }

        const response = await fetch("https://resepmasakanghilman.my.id/update_user.php", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        if (data.status === "success") {
            const updatedUser = { ...user, ...editedUser, photoUrl: data.photoUrl };
            localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsEditing(false);
            setShowAlert(true);
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
                <div className="fixed top-3 w-1/3 rounded-lg p-4 text-green-800 border-t-4 border-green-300 bg-green-50 z-10" role="alert">
                    <p className="text-sm font-medium">Profil berhasil diperbarui!</p>
                </div>
            )}

            <div className="bg-white shadow rounded-lg border w-full max-w-md">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">Profil Pengguna</h3>
                    <p className="mt-1 text-sm text-gray-500">Informasi Pengguna</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5">
                    <dl>
                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Nama</dt>
                            <dd className="text-sm text-gray-900">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.nama}
                                        onChange={(e) => setEditedUser({ ...editedUser, nama: e.target.value })}
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                ) : (
                                    user.nama
                                )}
                            </dd>
                        </div>
                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Nomor HP</dt>
                            <dd className="text-sm text-gray-900">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedUser.nomer}
                                        onChange={(e) => setEditedUser({ ...editedUser, nomer: e.target.value })}
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                ) : (
                                    user.nomer
                                )}
                            </dd>
                        </div>
                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                            <dd className="text-sm text-gray-900">
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editedUser.email}
                                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                ) : (
                                    user.email
                                )}
                            </dd>
                        </div>
                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Foto Profil</dt>
                            <dd className="text-sm text-gray-900">
                                {isEditing ? (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setEditedUser({ ...editedUser, photo: e.target.files[0] })}
                                        className="border border-gray-300 rounded-md p-1"
                                    />
                                ) : user.photoUrl ? (
                                    <img
                                        src={user.photoUrl}
                                        alt="Foto Profil"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <p>Belum ada foto</p>
                                )}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 flex justify-between">
                    <button onClick={() => navigate(-1)} className="bg-gray-500 px-4 py-2 text-white rounded-lg">
                        Kembali
                    </button>
                    {isEditing ? (
                        <div className="flex space-x-2">
                            <button onClick={handleSaveClick} className="bg-blue-500 px-4 py-2 text-white rounded-lg">
                                Simpan
                            </button>
                            <button onClick={handleCancelClick} className="bg-red-500 px-4 py-2 text-white rounded-lg">
                                Batal
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleEditClick} className="bg-red-500 px-4 py-2 text-white rounded-lg">
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
