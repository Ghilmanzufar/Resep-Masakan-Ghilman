import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/Navbar";
import { FooterComponent } from "../components/Footer";
import { SavedRecipeCard } from "../components/SavedRecipeCard";
import emptyImage from "../assets/Keranjang.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser) {
            fetchSavedRecipes(loggedUser.id);
        }
    }, []);

    const fetchSavedRecipes = (userId) => {
        fetch(`http://resepmasakanghilman.my.id/read_save_resep.php?user_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log("Resep Tersimpan dari API: ", data);
                setSavedRecipes(data);
            })
            .catch(error => console.error("Error fetching saved recipes:", error));
    };

    const handleDelete = (recipeId) => {
        fetch("http://resepmasakanghilman.my.id/delete_save_resep.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resep_id: recipeId }),
        })
            .then(response => response.json())
            .then(data => {
                toast.success("Resep berhasil dihapus! 🗑️", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                setSavedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
            })
            .catch(error => console.error("Error deleting recipe:", error));
    };

    const handleViewDetail = (recipeId) => {
        navigate(`/resep/${recipeId}`);
    };

    return (
        <div className="bg-cyan-500">
            <NavbarComponent />
            <div className="container mx-auto p-4 mt-16">
                <h1 className="text-2xl font-bold text-center mb-4">Resep Tersimpan</h1>
                {savedRecipes.length === 0 ? (
                    <div className="text-center">
                        <img src={emptyImage} alt="Kosong" className="mx-auto w-64" />
                        <p className="text-gray-600 mt-4">Belum ada resep yang tersimpan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                        {savedRecipes.map((recipe) => (
                            <SavedRecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onViewDetail={handleViewDetail}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
            <FooterComponent />
        </div>
    );
};

export default SavedRecipes;
