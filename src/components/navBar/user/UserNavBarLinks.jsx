import { AiFillHome } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const UserNavBarLinks = () => {
    return (
        <>
            <NavLink
                to='/home'
                className='flex flex-row items-center gap-3 hover:text-flagstone transition-colors text-xl'
            >
                < AiFillHome size={25} />
                Home
            </NavLink>
            <NavLink
                to=''
                className='flex flex-row items-center gap-3 hover:text-flagstone transition-colors text-xl'
            >
                <IoIosAddCircleOutline size={25} />
                Create
            </NavLink>
            <NavLink
                to=''
                className='flex flex-row items-center gap-3 hover:text-flagstone transition-colors text-xl'
            >
                <IoNotificationsOutline size={25} />
                Notifications
            </NavLink>
            <NavLink
                to='/:username'
                className='flex flex-row items-center gap-3 hover:text-flagstone transition-colors text-xl'
            >
                <img className='w-7 h-7 rounded-full object-cover' src="/default-avatar-v7.png" alt="profile-pic" />
                Profile
            </NavLink>
        </>
    )
}

export default UserNavBarLinks;
