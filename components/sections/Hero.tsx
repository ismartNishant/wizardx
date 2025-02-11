'use client'
import React, { useRef } from 'react'
import Button from '../common/Button'
import Image from "next/image";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Hero = () => {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const subHeadingRef = useRef(null);
    const buttonRef = useRef(null);
    const imageRef = useRef(null);

    const brands = [
        { id: 1, src: "/img/brands/amazon.svg", alt: "Brand 1" },
        { id: 2, src: "/img/brands/netflix.svg", alt: "Brand 3" },
        { id: 3, src: "/img/brands/notion.svg", alt: "Brand 4" },
        { id: 4, src: "/img/brands/hubspot.svg", alt: "Brand 5" },
        { id: 5, src: "/img/brands/dribble.svg", alt: "Brand 6" },
        { id: 6, src: "/img/brands/zoom.svg", alt: "Brand 2" },
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'power4.out',
            }
        });

        tl.fromTo(headingRef.current,
            {
                x: -500,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
            }
        )
            .fromTo(subHeadingRef.current,
                {
                    x: -500,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                },
                '-=0.5'
            )
            .fromTo(buttonRef.current,
                {
                    scale: 0,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                },
                '-=0.3'
            )
            .fromTo(imageRef.current,
                {
                    x: 100,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                },
                '-=0.5'
            )
            .fromTo('.brand-image',
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 0.5,
                    stagger: 0.1,
                },
                '-=0.5'
            );
    }, { scope: containerRef });

    return (
        <section ref={containerRef}>
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%] p-20">
                <div className="w-full space-y-3">
                    <h1 ref={headingRef} className="text-7xl font-semibold">
                        Navigating the digital landscape for success
                    </h1>
                    <p ref={subHeadingRef} className="text-neutral-700 text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis
                        beatae minus laudantium blanditiis fugit ratione, laboriosam et
                        veritatis itaque ut, voluptate iusto neque molestias porro unde, autem
                        corporis repellendus!
                    </p>

                    <div ref={buttonRef}>
                        <Button>Book a consultation</Button>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Image
                        ref={imageRef}
                        alt="hero"
                        src="/img/Illustration.svg"
                        width={100}
                        height={100}
                        className="w-full max-w-md h-full"
                    />
                </div>
            </div>
            <div className='flex items-center justify-center gap-16 py-10'>
                {brands.map((brand) => (
                    <Image
                        key={brand.id}
                        src={brand.src}
                        alt={brand.alt}
                        width={100}
                        height={100}
                        className="brand-image w-full max-w-48 cursor-pointer duration-300 ease-in-out transition-all opacity-50 hover:opacity-100 hover:brightness-100 transition-opacity brightness-0"
                    />
                ))}
            </div>
        </section>
    )
}

export default Hero