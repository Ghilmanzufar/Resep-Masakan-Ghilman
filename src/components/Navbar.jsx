import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function NavbarComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser) {
            setIsLoggedIn(true);
            setUserName(loggedUser.nama || "Pengguna");
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedUser");
        setIsLoggedIn(false);
        
        // Tampilkan notifikasi logout
        toast.success("Logout berhasil! ✅", { position: "top-center", autoClose: 2000 });

        setTimeout(() => {
            navigate("/");
            window.location.reload();
        }, 2000); // Redirect setelah 2 detik agar notifikasi terlihat
    };

    const goToProfile = () => {
        navigate("/Profile");
    };

    const handleResepTersimpanClick = () => {
        if (isLoggedIn) {
            navigate("/SaveRecipes");
        } else {
            navigate("/FormLogin");
        }
    };

    return (
        <>
            <Navbar fluid rounded className="sticky top-0 bg-cyan-100 shadow-md">
                <NavbarBrand href="/">
                    <div className="flex items-center">
                        <img src="/Logo.svg" alt="Logo" className="mr-2 h-8 w-8" />
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-black">
                            Resep Masakan Ghilman
                        </span>
                    </div>
                </NavbarBrand>
                <div className="flex md:order-2">
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium">Selamat datang, {userName}</span>
                            <Button onClick={goToProfile} gradientMonochrome="cyan">
                                Profile
                            </Button>
                            <Button onClick={handleLogout} gradientMonochrome="cyan">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={() => navigate("/FormLogin")} gradientMonochrome="cyan">
                            Login
                        </Button>
                    )}
                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavbarLink href="/">Resep Masakan</NavbarLink>
                    <NavbarLink href="/SaveRecipes" onClick={(e) => { 
                        e.preventDefault(); 
                        handleResepTersimpanClick();
                    }}>
                        Resep Tersimpan
                    </NavbarLink>
                    <NavbarLink href="/About">Tentang Kami</NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </>
    );
}
