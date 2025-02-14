import React from "react";

const AboutCeritaKamiComponent = () => {
    return (
        <section className="py-16 my-8">
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-black">CERITA KAMI</h2>
                    <div className="w-16 h-1 bg-cyan-700 mx-auto my-8"></div>
                    <p className="text-black max-w-2xl mx-auto text-lg">
                        Platform ini lahir dari rasa cinta kami terhadap dunia kuliner. Kami percaya bahwa memasak adalah seni yang mampu menyatukan keluarga dan teman melalui hidangan lezat.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Teks */}
                    <div>
                        <p className="text-black text-lg my-4">
                            Awalnya, kami hanya berbagi resep di kalangan kecil. Namun, dengan antusiasme masyarakat terhadap resep yang kami bagikan, kami memutuskan untuk mengembangkan website ini.
                        </p>
                        <p className="text-black text-lg">
                            Kami berkomitmen untuk terus menghadirkan konten berkualitas, mulai dari resep sederhana hingga teknik memasak yang kompleks. Semua untuk membantu Anda menciptakan masakan terbaik.
                        </p>
                    </div>
                    {/* Gambar */}
                    <div>
                        <img
                            src="./about.jpg"
                            alt="Cerita Kami"
                            className="rounded-lg shadow-lg mx-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCeritaKamiComponent;
