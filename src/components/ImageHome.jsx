"use client";

import { Carousel } from "flowbite-react";

export function ImageHomeComponent() {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 pt-0">
            <Carousel slideInterval={5000}>
                <img src="/img1.jpg" alt="..." />
                <img src="/img2.jpg" alt="..." />
                <img src="/img3.jpg" alt="..." />
                <img src="/img4.jpg" alt="..." />
                <img src="/img5.jpg" alt="..." />
            </Carousel>
        </div>
    );
}
