import React from "react";

const AboutVisiMisiComponent = () => {
    return (
        <section className="py-16 my-8">
            <div className="container mx-auto text-center">
                <h2 className="text-2xl font-bold text-black">VISI DAN MISI</h2>
                <div className="w-16 h-1 bg-cyan-700 mx-auto my-4"></div>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
                {/* Visi */}
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-black mb-4">Visi</h3>
                    <p className="text-black text-lg leading-relaxed">
                        Menjadi platform resep masakan terlengkap dan terpercaya yang
                        menginspirasi semua orang untuk memasak dengan kreativitas dan cinta.
                    </p>
                </div>
                {/* Misi */}
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-black mb-4">Misi</h3>
                    <ul className="text-black text-lg list-disc list-inside space-y-4 leading-relaxed">
                        <li>
                            Menyediakan resep masakan yang lengkap, praktis, dan mudah dipahami untuk berbagai kebutuhan.
                        </li>
                        <li>
                            Membangun komunitas pecinta masakan yang saling berbagi pengalaman dan inspirasi.
                        </li>
                        <li>
                            Memanfaatkan teknologi untuk memberikan pengalaman pencarian resep yang cepat dan efisien.
                        </li>
                        <li>
                            Mengedukasi pengguna tentang bahan makanan, teknik memasak, dan manfaat gizi dalam setiap hidangan.
                        </li>
                        <li>
                            Menyediakan fitur interaktif seperti video tutorial dan ulasan resep untuk meningkatkan kepercayaan pengguna.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutVisiMisiComponent;
