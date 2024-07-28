import React from 'react'
import Logo from '/src/assets/logo.svg?react';
import { AiOutlineCompass } from "react-icons/ai";
import { IoLogOutSharp } from "react-icons/io5";
import { useUserAuth } from '../../contexts/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import UserNavBarLinks from './user/UserNavBarLinks';

const NavBar = () => {
    const { user, logOut, loading } = useUserAuth();
    const navigate = useNavigate();

    const logOutHandler = async () => {
        await logOut();
        navigate('/auth/login');
    }

    return (
        <nav className='flex flex-col justify-between sticky top-0 bg-bright-white shadow-md-nav w-48 h-screen z-50'>
            {loading
                ? null
                : (
                    <>
                        <div>
                            <Logo className="w-28" />
                            <section className='flex flex-col text-lg space-y-6 justify-between m-5'>
                                <NavLink
                                    to='/'
                                    className='flex flex-row items-center gap-3 hover:text-flagstone transition-colors text-xl'
                                >
                                    <AiOutlineCompass size={25} />
                                    Discover
                                </NavLink>
                                {user
                                    ? <UserNavBarLinks />
                                    : (
                                        <>
                                            <NavLink
                                                to='/auth/register'
                                                className='hover:text-flagstone transition-colors text-xl'
                                            >
                                                Register
                                            </NavLink>
                                            <NavLink
                                                to='/auth/login'
                                                className='hover:text-flagstone transition-colors text-xl'
                                            >
                                                Login
                                            </NavLink>
                                        </>
                                    )
                                }
                            </section>
                        </div>
                        {user
                            ? (

                                <button
                                    className='justify-self-end hover:text-flagstone transition-colors text-xl m-5'
                                    onClick={logOutHandler}
                                > <IoLogOutSharp size={35} />
                                </button>
                            )
                            : null
                        }
                    </>
                )
            }
        </nav>
    )
}

export default NavBar;


