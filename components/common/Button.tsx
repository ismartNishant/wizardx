import React, { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
    return (
        <button className="btn-primary px-6 py-2.5 text-xl bg-lime-400  hover:bg-white hover:text-lime-600 border-2 border-black hover:border-lime-400 rounded-full duration-300 ease-in-out transition-all hover:scale-105 group relative ">
            <span className="relative inline-flex overflow-hidden ">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                    {children}
                </div>
                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 ">
                {children}
                </div>
            </span>
        </button>
    );
};

export default Button;
