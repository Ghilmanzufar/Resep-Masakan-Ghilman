import { NavbarComponent } from '../components/Navbar';
import AboutTentangKamiComponent from '../components/AboutTK';
import {FooterComponent} from '../components/Footer';
import AboutCeritaKamiComponent from '../components/AboutCrt';
import AboutVisiMisiComponent from '../components/AboutVM';
import KontakSaranComponent from '../components/AboutSrn';


const About = () => {
    return(
        <div className='bg-cyan-200 font-nunito'>
            <NavbarComponent/>
                <AboutTentangKamiComponent/>
                <AboutCeritaKamiComponent/>
                <AboutVisiMisiComponent />
                <KontakSaranComponent />
            <FooterComponent/>
        </div>
    )
};

export default About;