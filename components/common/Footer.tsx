'use client'
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
    const navLinks = ['Home', 'About', 'Services', 'Contact'];

    const mainContainerRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const navItemsRef = useRef<HTMLLIElement[]>([]);

    useGSAP(() => {
        // Create a timeline to manage animations together
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainerRef.current,
                start: 'top-=100 70%', // Start when the top of the footer enters 70% of the viewport height
                end: 'top-=50 75%', // End when the top of the footer reaches 75% of the viewport
                scrub: 2,
                markers: true, // Enable markers for debugging
                toggleActions: 'play none none reverse', // Play the animation on scroll in, reverse when scrolling back
            }
        });

        // Animate the heading text
        tl.from(headingRef.current, {
            x: -300, // Start from 300px to the left
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
        });

        // Animate each nav link
        navItemsRef.current.forEach((item, index) => {
            tl.from(item, {
                opacity: 0,
                y: 50, // Start from 50px below
                duration: 0.5,
                delay: index * 0.2, // Stagger the animation for each item
                ease: 'power2.out',
            });
        });
    }, []);

    return (
        <footer className='px-24 py-10 bg-lime-300 text-black flex items-center justify-between' ref={mainContainerRef}>
            <h1 className='font-bold text-5xl sour-gummy' ref={headingRef}>LOGO</h1>
            <ul className='flex gap-12 items-center'>
                {navLinks.map((link, index) => (
                    <li
                        key={index}
                        className='nav-item text-lg font-semibold'
                        ref={(el) => {
                            if(el) navItemsRef.current[index] = el;
                        }
                    } // Assign each list item to ref
                    >
                        <Link href={`/${link.toLowerCase()}`} className='group relative'>
                            <span className="relative inline-flex overflow-hidden">
                                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                                    {link}
                                </div>
                                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                                    {link}
                                </div>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default Footer;
