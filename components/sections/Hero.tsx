'use client'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../common/Button'
import Image from "next/image"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    // Add state to control initial render
    const [isClient, setIsClient] = useState(false)
    // ... existing refs

    // Handle client-side mounting
    useEffect(() => {
        setIsClient(true)
    }, [])
    
    const containerRef = useRef(null)
    const headingRef = useRef(null)
    const subHeadingRef = useRef(null)
    const buttonRef = useRef(null)
    const imageRef = useRef(null)
    const brandsContainerRef = useRef<HTMLDivElement>(null)

    const brands = [
        { id: 1, src: "/img/brands/amazon.svg", alt: "Brand 1" },
        { id: 2, src: "/img/brands/netflix.svg", alt: "Brand 2" },
        { id: 3, src: "/img/brands/notion.svg", alt: "Brand 3" },
        { id: 4, src: "/img/brands/hubspot.svg", alt: "Brand 4" },
        { id: 5, src: "/img/brands/dribble.svg", alt: "Brand 5" },
        { id: 6, src: "/img/brands/zoom.svg", alt: "Brand 6" },
    ]

    useGSAP(() => {
        if (!isClient) return;

        const ctx = gsap.context(() => {
            // Hero section animations
            const heroTl = gsap.timeline({
                defaults: {
                    duration: 0.5,
                    ease: 'power4.out',
                }
            });

            // Hero animations sequence
            heroTl.from(headingRef.current,
                { x: -100, opacity: 0 },
            )
                .from(subHeadingRef.current,
                    { x: -100, opacity: 0 },
                    '-=0.2'
                )
                .from(buttonRef.current,
                    { scale: 0, opacity: 0 },
                    '-=0.2'
                )
                .from(imageRef.current,
                    { x: 100, opacity: 0 },
                    '-=0.5'
                );

            // Brands entrance animation
            const brandsTl = gsap.timeline({
                scrollTrigger: {
                    trigger: brandsContainerRef.current,
                    start: "top bottom-=150",
                    end: "bottom top+=150",
                    markers: true,
                    toggleActions: "play pause resume reverse",
                    onUpdate: (self) => {
                        // Update marquee direction based on scroll
                        if (marqueeAnim) {
                            marqueeAnim.timeScale(self.direction);
                        }
                    }
                }
            });

            // Brands entrance animation
            brandsTl.fromTo('.brand-image',
                { y: 50 },
                {
                    y: 0,
                    stagger: 0.1,
                    duration: 0.5
                }
            );

            // Create marquee animation
            const marqueeAnim = gsap.to(brandsContainerRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 15,
                ease: 'none',
            });

            // Handle hover pause/resume
            const handleMouseEnter = () => marqueeAnim.pause();
            const handleMouseLeave = () => marqueeAnim.resume();

            // Add hover listeners
            if (brandsContainerRef.current) {
                brandsContainerRef.current.addEventListener('mouseenter', handleMouseEnter);
                brandsContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
            }

            return () => {
                // Cleanup event listeners
                if (brandsContainerRef.current) {
                    brandsContainerRef.current.removeEventListener('mouseenter', handleMouseEnter);
                    brandsContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
                }
                // Cleanup GSAP animations
                ctx.revert();
            };
        }, containerRef);
    }, [isClient]);
    
    const initialClasses = !isClient ? 'opacity-0' : '';

    return (
        <section ref={containerRef} className={`overflow-hidden ${initialClasses}`}>
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%] p-20">
                <div className="w-full space-y-3">
                    <h1 ref={headingRef} className="text-7xl font-semibold">
                        Navigating the digital landscape for success
                    </h1>
                    <p ref={subHeadingRef} className="text-neutral-700 text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facilis
                        beatae minus laudantium blanditiis fugit ratione, laboriosam et
                        veritatis itaque ut, voluptate iusto neque molestias porro unde.
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
            <div className="relative overflow-hidden w-full py-10">
                <div
                    ref={brandsContainerRef}
                    className="flex items-center gap-16 whitespace-nowrap"
                >
                    {[...brands, ...brands].map((brand, index) => (
                        <Image
                            key={`${brand.id}-${index}`}
                            src={brand.src}
                            alt={brand.alt}
                            width={100}
                            height={100}
                            className="brand-image w-56 h-20 cursor-pointer brightness-0 hover:brightness-100 opacity-55 hover:opacity-100"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero