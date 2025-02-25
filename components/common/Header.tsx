'use client'
import Link from 'next/link';
import React, { useRef } from 'react';
import Button from './Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const navLinks = ['Home', 'About', 'Services', 'Contact'];
    const headerRef = useRef(null);

    const animConfig = {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        duration: 0.6,
        ease: 'power4.out'
    };

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set('.logo', { ...animConfig.initial, y: -100 });
            gsap.set('.nav-item', animConfig.initial);
            gsap.set('.cta-button', { scale: 0, opacity: 0 });

            // Animate elements
            const tl = gsap.timeline({
                defaults: {
                    duration: animConfig.duration,
                    ease: animConfig.ease
                },
                delay: 0.1
            });

            tl.to('.logo', animConfig.animate)
              .to('.nav-item', {
                  ...animConfig.animate,
                  stagger: 0.1
              }, '-=0.5')
              .to('.cta-button', {
                  scale: 1,
                  opacity: 1
              }, '-=0.3');

            // Scroll shadow animation
            ScrollTrigger.create({
                start: 'top top',
                onUpdate: () => {
                    const scrollY = window.scrollY;
                    if (scrollY > 0) {
                        gsap.to(headerRef.current, {
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                            backdropFilter: 'blur(5px)',
                            backgroundColor: 'rgba(248, 250, 252, 0.8)',
                            duration: 0.3
                        });
                    } else {
                        gsap.to(headerRef.current, {
                            boxShadow: 'none',
                            backdropFilter: 'none',
                            backgroundColor: 'rgb(248, 250, 252)',
                            duration: 0.3
                        });
                    }
                }
            });
        }, headerRef);

        return () => ctx.revert();
    }, { scope: headerRef });

    return (
        <header 
            ref={headerRef} 
            className='w-full py-4 px-20 sticky top-0 bg-slate-50 z-50 transition-all duration-300'
        >
            <nav className='flex items-center justify-between'>
                <h1 className='logo font-bold text-5xl sour-gummy opacity-0'>LOGO</h1>
                <ul className='flex gap-12 items-center'>
                    {navLinks.map((link, index) => (
                        <li key={index} className='nav-item text-lg font-semibold opacity-0'>
                            <Link href={`/${link.toLowerCase()}`} className='group relative'>
                                <span className="relative inline-flex overflow-hidden">
                                    <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                                        {link}
                                    </div>
                                    <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 text-lime-500">
                                        {link}
                                    </div>
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li className='cta-button opacity-0'>
                        <Button>Request a Demo</Button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;