import React from "react";

const AboutTentangKamiComponent = () => {
    return (
        <div className="my-6 ">
            {/* Section: Deskripsi Singkat */}
            <section className="py-16 ">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-bold text-black">TENTANG KAMI</h2>
                    <div className="w-16 h-1 bg-cyan-700 mx-auto my-4"></div>
                    <p className="text-black max-w-xl mx-auto text-lg">
                        Kami adalah platform yang menyediakan berbagai resep masakan lengkap, mudah diikuti, dan cocok untuk semua kalangan, mulai dari pemula hingga koki profesional.
                    </p>
                    <p className="text-black max-w-xl mx-auto text-lg mt-4">
                        Website ini dirancang untuk menginspirasi dan memudahkan Anda dalam menciptakan hidangan lezat untuk keluarga atau acara spesial. 
                    </p>
                    <p className="text-black max-w-xl mx-auto text-lg">
                        Dengan antarmuka yang sederhana dan fitur lengkap, kami memastikan pengalaman memasak Anda menjadi lebih menyenangkan.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutTentangKamiComponent;
