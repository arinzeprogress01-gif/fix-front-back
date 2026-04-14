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

    // Generate initials safely from full name
    const initials =
        userData?.fullName
            ?.split(" ")
            ?.map((n) => n[0])
            ?.join("")
            ?.toUpperCase() || "U";

    return (
        <div className="flex h-screen w-full">
            {/* DESKTOP SIDEBAR */}
            <div className="bg-[#EAF3EE] fixed flex-col h-full hidden left-0 lg:flex lg:w-[22%] top-0">
                <Link to="/" className="w-full">
                    <img src={logoImg} alt="logoImg" className="h-30 object-cover w-55" />
                </Link>

                <ul className="flex flex-col items-center mt-2 poppins-font space-y-2.5 text-[#4A5C52]">
                    <li className="font-semibold text-[12.5px] transition-all w-[95%]">
                        <NavLink
                            to="/learners_dashboard"
                            end
                            className={({ isActive }) =>
                                `flex space-x-3 items-center justify-start p-3 ${isActive
                                    ? "text-[#1A7A4A] bg-[#FFFFFF] rounded-xl"
                                    : "text-[#4A5C52]"
                                }`
                            }
                        >
                            <LuLayoutDashboard className="text-[15px]" />
                            <p>Dashboard</p>
                        </NavLink>
                    </li>

                    <li className="font-semibold text-[12.5px] transition-all w-[95%]">
                        <NavLink
                            to="/student-course"
                            className={({ isActive }) =>
                                `flex space-x-3 items-center justify-start p-3 ${isActive
                                    ? "text-[#1A7A4A] bg-[#FFFFFF] rounded-xl"
                                    : "text-[#4A5C52]"
                                }`
                            }
                        >
                            <LuBookOpen className="text-[15px]" />
                            <p>Courses</p>
                        </NavLink>
                    </li>

                    <li className="font-semibold text-[12.5px] transition-all w-[95%]">
                        <NavLink
                            to="/assignment"
                            className={({ isActive }) =>
                                `flex space-x-3 items-center justify-start p-3 ${isActive
                                    ? "text-[#1A7A4A] bg-[#FFFFFF] rounded-xl"
                                    : "text-[#4A5C52]"
                                }`
                            }
                        >
                            <LuClipboardList className="text-[15px]" />
                            <p>Assignments</p>
                        </NavLink>
                    </li>

                    <li className="font-semibold text-[12.5px] transition-all w-[95%]">
                        <NavLink
                            to="/progress"
                            className={({ isActive }) =>
                                `flex space-x-3 items-center justify-start p-3 ${isActive
                                    ? "text-[#1A7A4A] bg-[#FFFFFF] rounded-xl"
                                    : "text-[#4A5C52]"
                                }`
                            }
                        >
                            <LuTrendingUp className="text-[15px]" />
                            <p>Progress</p>
                        </NavLink>
                    </li>

                    <li className="font-semibold mt-64 text-[12.5px] transition-all w-[95%]">
                        <NavLink
                            to="/profile-setting"
                            className={({ isActive }) =>
                                `flex space-x-3 items-center justify-start p-3 ${isActive
                                    ? "text-[#1A7A4A] bg-[#FFFFFF] rounded-xl"
                                    : "text-[#4A5C52]"
                                }`
                            }
                        >
                            <LuSettings className="text-[15px]" />
                            <p>Settings</p>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* MAIN AREA */}
            <div className="flex flex-col h-full lg:ml-[22%] lg:w-[78%] w-full">
                {/* TOP BAR */}
                <div className="bg-white fixed flex h-15 items-center lg:w-[78%] px-2 right-0 space-x-3 top-0 w-full z-10">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer flex h-10 hover:text-[#1A7A4A] items-center justify-center lg:hidden rounded-sm text-[#8A9E95] transition-all w-20"
                    >
                        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                    </button>

                    {/* MOBILE MENU */}
                    {isOpen && (
                        <div className="absolute bg-[#EAF3EE] flex flex-col left-0 lg:hidden shadow-lg top-14 w-full z-50">
                            <ul className="flex flex-col items-center py-4 space-y-2.5 text-[#4A5C52]">
                                {[
                                    { to: "/learners_dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
                                    { to: "/student-course", label: "Courses", icon: <LuBookOpen /> },
                                    { to: "/assignment", label: "Assignments", icon: <LuClipboardList /> },
                                    { to: "/progress", label: "Progress", icon: <LuTrendingUp /> },
                                    { to: "/profile-setting", label: "Settings", icon: <LuSettings /> },
                                ].map((item) => (
                                    <li key={item.to} className="font-semibold text-[12.5px] w-[95%]">
                                        <NavLink
                                            to={item.to}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) =>
                                                `flex space-x-3 items-center justify-start p-3 ${isActive
                                                    ? "text-[#1A7A4A] bg-[#FFFFFF] rounded-xl"
                                                    : ""
                                                }`
                                            }
                                        >
                                            {item.icon}
                                            <p>{item.label}</p>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <h3 className="font-semibold hidden lg:flex ml-4 text-[#1A1A1A] text-lg">
                        {title}
                    </h3>

                    {/* SEARCH */}
                    <div className="bg-[#F4F6F5] border border-[#D8D6EF] flex h-10 items-center px-3 rounded-lg space-x-2 w-150">
                        <FaSearch className="text-[#8F9E95]" />
                        <input
                            type="text"
                            placeholder="Search Courses, assignments..."
                            className="h-full outline-none text-[#8A9E95] text-[13px] w-full"
                        />
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex h-full items-center lg:space-x-3 space-x-1.5">
                        <Link className="flex h-10 hover:bg-[#EAF3EE] items-center justify-center relative rounded-md transition-all w-10">
                            <LuBell className="h-7 p-1 text-[#1A7A4A] w-7" />
                            <div className="absolute bg-[#DC2626] h-2 right-1.5 rounded-full top-[5px] w-2"></div>
                        </Link>

                        <Link
                            to="/user-profile"
                            className="flex h-[85%] items-center lg:space-x-3 lg:w-50 px-2 rounded-lg transition-all"
                        >
                            <p className="bg-[#EAF3EE] flex font-semibold h-9 items-center justify-center rounded-md text-[#1A7A4A] text-[12px] w-9">
                                {initials}
                            </p>

                            <div className="flex-col hidden lg:flex">
                                <p className="font-semibold text-[#191A3B] text-[12px]">
                                    {userData?.fullName}
                                </p>
                                <p className="font-semibold text-[#191A3B] text-[12px]">
                                    {userData?.tfId}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* PAGE CONTENT */}
                <div className="bg-[#F4F5F6] mt-15">{children}</div>
            </div>
        </div>
    );
}