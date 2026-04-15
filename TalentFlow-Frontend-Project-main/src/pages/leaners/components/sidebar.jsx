import { Link, NavLink } from "react-router-dom";
import logoImg from "../../../images/logo.png";
import { FaSearch } from "react-icons/fa";

import {
    LuLayoutDashboard,
    LuBookOpen,
    LuClipboardList,
    LuTrendingUp,
    LuSettings,
    LuBell,
    LuMenu,
    LuX,
} from "react-icons/lu";

import { useState } from "react";

export default function SideBar({ children, title, userData }) {
    const [isOpen, setIsOpen] = useState(false);

    // ✅ SAFE INITIALS (prevents "U" bug caused by undefined userData)
    const initials = userData?.fullName
        ? userData.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "U";

    // ✅ FIX: unified reference number (backend now sends referenceNumber)
    const referenceNumber =
        userData?.referenceNumber ||
        (userData?.role === "learner"
            ? userData?.learnerRef
            : userData?.tutorRef) ||
        "";

    return (
        <div className="w-full h-screen flex">

            {/* SIDEBAR */}
            <div className="lg:w-[22%] h-full hidden lg:flex flex-col bg-[#EAF3EE] fixed left-0 top-0">
                <Link className="w-full">
                    <img
                        src={logoImg}
                        alt="logoImg"
                        className="w-55 h-30 object-cover"
                    />
                </Link>

                <ul className="flex flex-col items-center space-y-2.5 mt-2 text-[#4A5C52]">

                    <li className="w-[95%] font-semibold text-[12.5px]">
                        <NavLink to="/learners_dashboard" end>
                            <LuLayoutDashboard />
                            <p>Dashboard</p>
                        </NavLink>
                    </li>

                    <li className="w-[95%] font-semibold text-[12.5px]">
                        <NavLink to="/student-course">
                            <LuBookOpen />
                            <p>Courses</p>
                        </NavLink>
                    </li>

                    <li className="w-[95%] font-semibold text-[12.5px]">
                        <NavLink to="/assignment">
                            <LuClipboardList />
                            <p>Assignments</p>
                        </NavLink>
                    </li>

                    <li className="w-[95%] font-semibold text-[12.5px]">
                        <NavLink to="/progress">
                            <LuTrendingUp />
                            <p>Progress</p>
                        </NavLink>
                    </li>

                    <li className="mt-65 w-[95%] font-semibold text-[12.5px]">
                        <NavLink to="/profile-setting">
                            <LuSettings />
                            <p>Settings</p>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* MAIN */}
            <div className="w-full lg:w-[78%] h-full flex flex-col lg:ml-[22%]">

                {/* TOP BAR */}
                <div className="w-full lg:w-[78%] fixed top-0 right-0 bg-white z-10 h-15 flex px-2 items-center space-x-3">

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden w-20 h-10 flex items-center justify-center text-[#8A9E95]"
                    >
                        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                    </button>

                    <h3 className="hidden lg:flex ml-4 font-semibold text-lg">
                        {title}
                    </h3>

                    {/* SEARCH */}
                    <div className="w-150 h-10 border bg-[#F4F6F5] rounded-lg flex items-center px-3 space-x-2">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent outline-none text-sm"
                        />
                    </div>

                    {/* RIGHT */}
                    <div className="w-35 lg:w-60 flex items-center space-x-3">

                        <Link className="w-10 h-10 flex items-center justify-center relative">
                            <LuBell />
                        </Link>

                        <Link to="/user-profile" className="flex items-center space-x-2">

                            <p className="w-9 h-9 flex items-center justify-center bg-[#EAF3EE] text-[#1A7A4A] font-semibold rounded-md">
                                {initials}
                            </p>

                            <div className="hidden lg:flex flex-col">

                                <p className="text-[12px] font-semibold">
                                    {userData?.fullName || "Loading..."}
                                </p>

                                {/* ✅ FINAL FIX */}
                                <p className="text-[12px] text-[#8A98AB]">
                                    {referenceNumber}
                                </p>

                            </div>

                        </Link>

                    </div>
                </div>

                <div className="mt-15 bg-[#F4F5F6]">
                    {children}
                </div>

            </div>
        </div>
    );
}
