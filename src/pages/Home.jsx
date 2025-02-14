import { useRef } from "react";
import { NavbarComponent } from '../components/Navbar';
import { FooterComponent } from '../components/Footer';
import { ImageHomeComponent } from '../components/ImageHome';
import { FixedTabHomeComponent } from '../components/FixedTabHome';

const Home = () => {
    const fixedTabRef = useRef(null);

    const scrollToFixedTab = () => {
        if (fixedTabRef.current) {
            fixedTabRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div>
            {/* Pastikan `onResepMasakanClick` dikirim ke NavbarComponent */}
            <NavbarComponent onResepMasakanClick={scrollToFixedTab} /> 
            <div>
                <ImageHomeComponent />
            </div>
            <div ref={fixedTabRef}>
                <FixedTabHomeComponent id="resep-section" />
            </div>
            <FooterComponent />
        </div>
    );
};

export default Home;
