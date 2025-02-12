'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { FaArrowRight } from "react-icons/fa6";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const Services = () => {
    const services = [
        {
            id: 1,
            title: "Search Engine",
            titleSecond: "Optimisation",
            image: "/img/services/seo.svg",
        },
        {
            id: 2,
            title: "Pay-per-click",
            titleSecond: "Advertising",
            image: "/img/services/advertising.svg",
        },
        {
            id: 3,
            title: "Social Media",
            titleSecond: "Marketing",
            image: "/img/services/socialmedia.svg",
        },
        {
            id: 4,
            title: "Email",
            titleSecond: "Marketing",
            image: "/img/services/marketing.svg",
        },
        {
            id: 5,
            title: "Content",
            titleSecond: "Creation",
            image: "/img/services/content.svg",
        },
        {
            id: 6,
            title: "Analytics",
            titleSecond: "& Tracking",
            image: "/img/services/tracking.svg",
        }
    ];

    const getBackgroundColor = (index: number) => {
        switch (index % 3) {
            case 0:
                return 'bg-neutral-100';
            case 1:
                return 'bg-lime-300';
            case 2:
                return 'bg-black text-white';
            default:
                return 'bg-neutral-100';
        }
    };

    const getSpanBackground = (index: number) => {
        switch (index) {
            case 0:
                return 'bg-lime-300';
            case 1:
                return 'bg-white';
            case 2:
                return 'bg-white';
            case 3:
                return 'bg-lime-300';
            case 4:
                return 'bg-white';
            case 5:
                return 'bg-lime-300';
            default:
                return 'bg-lime-300';
        }
    };

    const getIconColor = (index: number) => {
        switch (index) {
            case 0:
                return 'text-lime-400';
            case 1:
                return 'text-lime-400';
            case 2:
                return 'text-black';
            case 3:
                return 'text-lime-400';
            case 4:
                return 'text-lime-400';
            case 5:
                return 'text-black';
            default:
                return 'text-lime-400';
        }
    };

    const mainContainerRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainerRef.current,
                start: "top 70%",
                end: "top 50%",
                scrub: 2,
                toggleActions: "play reverse play reverse",
            },
        });

        tl2.from(headingRef.current, {
            y: -100,
            opacity: 0,
        })
        tl2.from(paragraphRef.current, {
            x: -100,
            opacity: 0,
        },"-=0.5")
        cardRefs.current.forEach((card, index) => {
            if (card) {
                const elements = card.querySelectorAll("h2, img, button");

                gsap.fromTo(
                    card,
                    { x: index % 2 === 0 ? -300 : 300, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            end: "top 50%",
                            scrub: 2,
                            toggleActions: "play none none reverse",
                        },
                         onComplete: () => {
                        gsap.fromTo(
                            elements[0], // Heading (h2)
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                        );

                        gsap.fromTo(
                            elements[1], // Image
                            { scale: 0.8, opacity: 0 },
                            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
                        );

                        gsap.fromTo(
                            elements[2], // Button
                            { x: -20, opacity: 0 },
                            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                        );
                    }
                    }
                );
            }
        });


    }, []);


    return (
        <section ref={mainContainerRef} className="p-24">
            <div className="flex gap-16 items-center">
                <h1 ref={headingRef} className="relative ">
                    <span className="font-bold text-4xl bg-lime-300 rounded-sm px-4 py-1">
                        Services
                    </span>
                </h1>
                <p ref={paragraphRef} className="max-w-md w-full text-lg text-neutral-700 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, numquam nam.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        ref={(el) => {
                            if (el) cardRefs.current[index] = el
                        }
                        }
                        className={`rounded-3xl border-2 border-black shadow-custom ${getBackgroundColor(index)} p-12 flex justify-between items-center `}
                    >
                        <div className="h-full flex flex-col justify-between items-start">
                            <h2 className="text-4xl font-semibold leading-tight text-black">
                                <span className={`rounded-xl px-2 ${getSpanBackground(index)}`}>
                                    {service.title}
                                </span>
                                <br />
                                <span className={`rounded-2xl px-2 ${getSpanBackground(index)}`}>
                                    {service.titleSecond}
                                </span>
                            </h2>
                            <button className="inline-flex gap-4 items-center text-xl font-medium group">
                                <FaArrowRight
                                    className={`-rotate-45 duration-200 ease-in-out transition-all group-hover:rotate-0 text-5xl rounded-full p-2 ${index % 3 === 2 ? "bg-white text-black" : `bg-black ${getIconColor(index)}`}`}
                                />
                                Learn More
                            </button>
                        </div>
                        <Image
                            src={service.image}
                            alt={`${service.title} ${service.titleSecond}`}
                            width={1000}
                            height={1000}
                            className="w-full max-w-64 max-h-48 min-h-48 "
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services;
