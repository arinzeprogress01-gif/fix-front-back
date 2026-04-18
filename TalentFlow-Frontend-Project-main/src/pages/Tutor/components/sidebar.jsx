import { Link, NavLink } from "react-router-dom"
import logoImg from "../../../images/logos.png"
import { FaSearch } from "react-icons/fa";

import { LuLayoutDashboard, LuSquareCheck, LuUsers, LuSettings, LuBell, LuMenu, LuX, LuUpload } from "react-icons/lu";
import { useState } from "react";

export default function SideBar({ children, title, userData }) {  // ✅ added userData
    const [isOpen, setIsOpen] = useState(false);

    // ✅ GET USER DETAILS SAFELY
    const fullName = userData?.fullName || "User Name";
    const trn = userData?.trn || "TRN-000";
    const initials = fullName
        ?.split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

    // ✅ LOGOUT FUNCTION
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <>
            <div className="flex h-screen w-full">
                <div className="bg-[#EAF3EE] fixed flex-col h-full hidden left-0 lg:flex lg:w-[22%] top-0">
                    <Link className="w-full">
                        <img src={logoImg} alt="logoImg" className="h-30 object-cover w-55" />
                    </Link>

                    <ul className="flex flex-col items-center mt-2 normal poppins-font space-y-2.5 text-[#4A5C52]">

                        <li className="font-semibold text-[12.5px] w-[95%]">
                            <NavLink to="/tutor-dashboard" end className={({ isActive }) =>
                                `flex space-x-3 items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-white' : ''}`}>
                                <LuLayoutDashboard />
                                <p>Dashboard</p>
                            </NavLink>
                        </li>

                        <li className="font-semibold text-[12.5px] w-[95%]">
                            <NavLink to="/create-course" className={({ isActive }) =>
                                `flex space-x-3 items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-white' : ''}`}>
                                <LuUpload />
                                <p>Create Course</p>
                            </NavLink>
                        </li>

                        <li className="font-semibold text-[12.5px] w-[95%]">
                            <NavLink to="/submissions" className={({ isActive }) =>
                                `flex space-x-3 items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-white' : ''}`}>
                                <LuSquareCheck />
                                <p>Submissions</p>
                            </NavLink>
                        </li>

                        <li className="font-semibold text-[12.5px] w-[95%]">
                            <NavLink to="/interns" className={({ isActive }) =>
                                `flex space-x-3 items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-white' : ''}`}>
                                <LuUsers />
                                <p>Interns</p>
                            </NavLink>
                        </li>

                        {/* ✅ SETTINGS + LOGOUT */}
                        <li className="font-semibold mt-65 text-[12.5px] w-[95%]">
                            <NavLink to="/tutor-profileSetting" className={({ isActive }) =>
                                `flex space-x-3 items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-white' : ''}`}>
                                <LuSettings />
                                <p>Settings</p>
                            </NavLink>
                        </li>

                        {/* ✅ LOGOUT BUTTON */}
                        <li className="cursor-pointer font-semibold text-[12.5px] w-[95%]">
                            <button onClick={handleLogout} className="flex hover:bg-white items-center p-3 space-x-3 text-left w-full">
                                <LuX />
                                <p>Logout</p>
                            </button>
                        </li>

                    </ul>
                </div>

                <div className="flex flex-col h-full lg:ml-[22%] lg:w-[78%] w-full">
                    <div className="bg-white fixed flex h-15 items-center lg:w-[78%] px-2 right-0 space-x-3 top-0 w-full z-10">

                        <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden'>
                            {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                        </button>

                        <h3 className="font-semibold hidden lg:flex ml-4 text-[#1A1A1A] text-lg">
                            {title}
                        </h3>

                        <div className="bg-[#F4F6F5] border flex h-10 items-center px-3 rounded-lg space-x-2 w-150">
                            <FaSearch />
                            <input placeholder="Search..." className="bg-transparent outline-none w-full" />
                        </div>

                        {/* ✅ USER INFO (DYNAMIC NOW) */}
                        <div className="flex h-full items-center lg:w-60 space-x-3 w-35">

                            <Link className="flex h-10 hover:bg-[#EAF3EE] items-center justify-center relative rounded-md w-10">
                                <LuBell className="text-[#1A7A4A]" />
                                <div className="absolute bg-[#DC2626] h-2 right-1.5 rounded-full top-[5px] w-2"></div>
                            </Link>

                            <Link to="/user-profile" className="flex items-center px-2">

                                <p className="bg-[#EAF3EE] flex font-semibold h-9 items-center justify-center rounded-md text-[#1A7A4A] text-[12px] w-9">
                                    {initials}   {/* ✅ dynamic initials */}
                                </p>

                                <div className="flex-col hidden lg:flex ml-2">
                                    <p className="font-semibold text-[#191A3B] text-[12px]">
                                        {fullName}   {/* ✅ dynamic name */}
                                    </p>
                                    <p className="text-[#8A98AB] text-[12px]">
                                        {trn}        {/* ✅ dynamic TRN */}
                                    </p>
                                </div>

                            </Link>
                        </div>
                    </div>

                    <div className="bg-[#F4F5F6] mt-15">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}