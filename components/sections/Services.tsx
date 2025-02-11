import React from 'react'
import Image from 'next/image'
import { FaArrowRight } from "react-icons/fa6";

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

    return (
        <section className='p-24'>
            <div className='flex gap-16 items-center'>
                <h1 className='relative'>
                    <span className='font-bold text-4xl bg-lime-300 rounded-sm px-4 py-1'>Services</span>
                </h1>
                <p className='max-w-md w-full text-lg text-neutral-700'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, numquam nam. Fugiat esse itaque minima.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-16'>
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className={`rounded-3xl border-2 border-black shadow-custom ${getBackgroundColor(index)} p-12 flex justify-between items-center`}
                    >
                        <div className='h-full flex flex-col justify-between items-start'>
                            <h2 className='text-4xl font-semibold leading-tight text-black'>
                                <span className={`rounded-xl px-2 ${getSpanBackground(index)}`}>
                                    {service.title}
                                </span>
                                <br />
                                <span className={`rounded-2xl px-2 ${getSpanBackground(index)}`}>
                                    {service.titleSecond}
                                </span>
                            </h2>
                            <button className='inline-flex gap-4 items-center text-xl font-medium group'>
                                <FaArrowRight 
                                    className={`-rotate-45 duration-200 ease-in-out transition-all group-hover:rotate-0 text-5xl rounded-full p-2 ${
                                        index % 3 === 2 ? 'bg-white text-black' : `bg-black ${getIconColor(index)}`
                                    }`}
                                />
                                Learn More
                            </button>
                        </div>
                        <Image
                            src={service.image}
                            alt={`${service.title} ${service.titleSecond}`}
                            width={1000}
                            height={1000}
                            className="w-full max-w-64 max-h-48 min-h-48"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services