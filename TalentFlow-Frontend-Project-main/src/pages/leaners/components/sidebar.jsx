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
        : userData?.referenceNumber
            ? userData.referenceNumber
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
        <div className="flex h-screen w-full">

            {/* SIDEBAR */}
            <div className="bg-[#EAF3EE] fixed flex-col h-full hidden left-0 lg:flex lg:w-[22%] top-0">
                <Link className="w-full">
                    <img
                        src={logoImg}
                        alt="logoImg"
                        className="h-30 object-cover w-55"
                    />
                </Link>

                <ul className="flex flex-col items-center mt-2 space-y-2.5 text-[#4A5C52]">

                    <li className="font-semibold text-[12.5px] w-[95%]">
                        <NavLink to="/learners_dashboard" end>
                            <LuLayoutDashboard />
                            <p>Dashboard</p>
                        </NavLink>
                    </li>

                    <li className="font-semibold text-[12.5px] w-[95%]">
                        <NavLink to="/student-course">
                            <LuBookOpen />
                            <p>Courses</p>
                        </NavLink>
                    </li>

                    <li className="font-semibold text-[12.5px] w-[95%]">
                        <NavLink to="/assignment">
                            <LuClipboardList />
                            <p>Assignments</p>
                        </NavLink>
                    </li>

                    <li className="font-semibold text-[12.5px] w-[95%]">
                        <NavLink to="/progress">
                            <LuTrendingUp />
                            <p>Progress</p>
                        </NavLink>
                    </li>

                    <li className="font-semibold mt-65 text-[12.5px] w-[95%]">
                        <NavLink to="/profile-setting">
                            <LuSettings />
                            <p>Settings</p>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* MAIN */}
            <div className="flex flex-col h-full lg:ml-[22%] lg:w-[78%] w-full">

                {/* TOP BAR */}
                <div className="bg-white fixed flex h-15 items-center lg:w-[78%] px-2 right-0 space-x-3 top-0 w-full z-10">

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex h-10 items-center justify-center lg:hidden text-[#8A9E95] w-20"
                    >
                        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                    </button>

                    <h3 className="font-semibold hidden lg:flex ml-4 text-lg">
                        {title}
                    </h3>

                    {/* SEARCH */}
                    <div className="bg-[#F4F6F5] border flex h-10 items-center px-3 rounded-lg space-x-2 w-150">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none text-sm w-full"
                        />
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center lg:w-60 space-x-3 w-35">

                        <Link className="flex h-10 items-center justify-center relative w-10">
                            <LuBell />
                        </Link>

                        <Link to="/user-profile" className="flex items-center space-x-2">

                            <p className="bg-[#EAF3EE] flex font-semibold h-9 items-center justify-center rounded-md text-[#1A7A4A] w-9">
                                {initials}
                            </p>

                            <div className="flex-col hidden lg:flex">

                                <p className="font-semibold text-[12px]">
                                    {userData?.fullName || "Loading..."}
                                </p>

                                {/* ✅ FINAL FIX */}
                                <p className="text-[#8A98AB] text-[12px]">
                                    {referenceNumber}
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
    );
}
