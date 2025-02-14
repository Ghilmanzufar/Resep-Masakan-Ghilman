import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Footer } from "flowbite-react";

export function FooterComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        setIsLoggedIn(!!loggedUser); // Jika ada loggedUser, isLoggedIn = true
    }, []);

    const handleResepTersimpanClick = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            navigate("/SaveRecipes");
        } else {
            navigate("/FormLogin");
        }
    };

    return (
        <Footer container className="bg-cyan-100">
            <div className="w-full text-center">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                    <Footer.Brand
                        href="/"
                        src="/Logo.svg"
                        alt="Flowbite Logo"
                        name="Resep Masakan Ghilman"
                    />
                    <Footer.LinkGroup>
                        <Footer.Link href="/" className="text-black">Resep Masakan</Footer.Link>
                        <Footer.Link href="/SaveRecipes" onClick={handleResepTersimpanClick} className="text-black">
                            Resep Tersimpan
                        </Footer.Link>
                        <Footer.Link href="/About" className="text-black">Tentang Kami</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider />
                <Footer.Copyright href="#" className="text-black" by="Resep Makanan Ghilman™" year={2025} />
            </div>
        </Footer>
    );
}
