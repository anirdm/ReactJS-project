import { AiFillHome } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../../../contexts/AuthContext";

const UserNavBarLinks = () => {
    const { user, loading } = useUserAuth();

    return (
        <>
            <NavLink
                to='/post/create'
                className='flex flex-row items-center gap-3 hover:text-flagstone transition-colors text-xl'
            >
                <IoIosAddCircleOutline className='sm:w-6 sm:h-6 w-8 h-8' />
                <p className='hidden sm:block'>Create</p>
            </NavLink>
            <NavLink
                to={`/${user.username}`}
                className='flex flex-row items-center gap-3 hover:text-flagstone transition-colors text-xl'
            >
                <img className='w-8 h-8 rounded-full object-cover' src={`${user.profilePicURL}`} alt="profile-pic" />
                <p className='hidden sm:block'>Profile</p>
            </NavLink>
        </>
    )
}

export default UserNavBarLinks;
