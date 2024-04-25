import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import LogoHeader from './LogoHeader';
import MenuAvatar from './MenuAvatar';

function NavBarMobile() {
    const [cookie, setCookie, removeCookie] = useCookies(['userInfo']);
    const navigate = useNavigate();

    async function handleLogout() {
        removeCookie('userInfo', { path: '/' });
        navigate("/");
    }
    return (
        <div className="sm:hidden flex justify-between items-center w-full bg-neutral bg-opacity-50 backdrop-blur-[10px] z-10 fixed top-0 left-0 px-4 pt-4 pb-2">

            {/* Avatar Component */}
            <MenuAvatar />

            {/* Burger Menu => On click, the dropdown appears */}
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content m-0 z-[1] shadow bg-base-100 w-56 absolute min-h-screen -top-4 -right-4 border-l border-primary">

                    {/* Logo */}
                    <LogoHeader widthValue={"100%"} color={"#292524"} />

                    {/* Navigation Menu */}
                    <li className="pt-6">
                        <Link to="/" className="text-base-content text-lg font-semibold">
                            My Songs
                        </Link>
                    </li>
                    <li className="pt-2">
                        <Link to="/add-a-song" className="text-base-content text-lg font-semibold">
                            Add a Song
                        </Link>
                    </li>
                    <li className="pt-2">
                        <Link to="/profile" className="text-base-content text-lg font-semibold">
                            My Profile
                        </Link>
                    </li>
                    <li className="pt-2">
                        <button
                            className="text-base-content text-lg font-semibold"
                            type="button"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBarMobile;