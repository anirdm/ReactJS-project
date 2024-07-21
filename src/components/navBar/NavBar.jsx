import React from 'react'
import Logo from '/src/assets/logo.svg?react';
import { AiOutlineCompass } from "react-icons/ai";

const NavBar = () => {
    return (
        <nav className='flex flex-col sticky top-0 bg-bright-white shadow-md-nav w-48 h-screen z-50'>
            <Logo className="w-28" />
            <div className='flex flex-col text-lg space-y-6 justify-between m-5'>
                <a href="/" className='flex flex-row items-center gap-1 hover:text-flagstone transition-colors text-xl'>
                    <AiOutlineCompass />
                    Discover
                </a>
                <a href="/auth/register" className='hover:text-flagstone transition-colors text-xl'>
                    Register
                </a>
                <a href="/auth/login" className=' hover:text-flagstone transition-colors text-xl'>
                    Login
                </a>
            </div>
        </nav>
    )
}

export default NavBar;


