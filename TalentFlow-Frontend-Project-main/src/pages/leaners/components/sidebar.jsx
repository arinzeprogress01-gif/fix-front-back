import { Link, NavLink } from "react-router-dom"
import logoImg from "../../../images/logo.png"
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

import { LuLayoutDashboard, LuBookOpen, LuClipboardList, LuTrendingUp, LuMessageSquare, LuSettings, LuBell, LuMenu, LuX, } from "react-icons/lu";
import { useState } from "react";
export default function SideBar({ children, title }){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            <div className="flex h-screen w-full">
                <div className="bg-[#EAF3EE] fixed flex-col h-full hidden left-0 lg:flex lg:w-[22%] top-0">
                        <Link className="w-full">
                            <img src={logoImg} alt="logoImg" className="h-30 object-cover w-55" />
                        </Link>
                        <ul className="flex flex-col items-center mt-2 normal poppins-font space-y-2.5 text-[#4A5C52]">
                            <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-sm text-[12.5px] transition-all w-[95%]">
                                <NavLink to="/learners_dashboard" end className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuLayoutDashboard  className="text-[15px]"/> 
                                    <p>Dashboard</p>
                                </NavLink> 
                            </li>
                            <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-xs text-[12.5px] transition-all w-[95%]">
                                <NavLink to="/student-course" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuBookOpen  className="text-[15px]"/> 
                                    <p>Courses</p>
                                </NavLink> 
                            </li>
                            <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-xs text-[12.5px] transition-all w-[95%]">
                                <NavLink to="/assignment" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuClipboardList  className="text-[15px]"/> 
                                    <p>Assignments</p>
                                </NavLink> 
                            </li>
                            <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-xs text-[12.5px] transition-all w-[95%]">
                                <NavLink to="/progress" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuTrendingUp  className="text-[15px]"/> 
                                    <p>Progress</p>
                                </NavLink> 
                            </li>
                            <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-xs mt-65 text-[12.5px] transition-all w-[95%]">
                                <NavLink to="/profile-setting" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuSettings  className="text-[15px]"/> 
                                    <p>Settings</p>
                                </NavLink> 
                            </li>
                        </ul>
                            
                </div>
                <div className="flex flex-col h-full lg:ml-[22%] lg:w-[78%] w-full">
                    <div className="bg-white fixed flex h-15 items-center lg:w-[78%] px-2 right-0 space-x-3 top-0 w-full z-10">
                        <button onClick={()=> setIsOpen(!isOpen)} className='cursor-pointer flex h-10 hover:text-[#1A7A4A] items-center justify-center lg:hidden rounded-sm text-[#8A9E95] transition-all w-20'>
                            {isOpen ? <LuX size={24} /> : <LuMenu  size={24}/>}
                        </button>
                        {isOpen && (
                            <div className="absolute bg-[#EAF3EE] flex flex-col h-auto left-0 lg:hidden shadow-lg top-14.5 w-full z-50">
                                <ul className="flex flex-col items-center lg:mb-0 lg:mt-2 mb-5 mt-3 normal poppins-font space-y-2.5 text-[#4A5C52]">
                                    <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-sm text-[12.5px] transition-all w-[95%]">
                                        <NavLink to="/learners_dashboard" end className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                            <LuLayoutDashboard  className="text-[15px]"/> 
                                            <p>Dashboard</p>
                                        </NavLink> 
                                    </li>
                                    <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-xs text-[12.5px] transition-all w-[95%]">
                                        <NavLink to="/student-course" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'bg-[#FFFFFF] hover:rounded-lg hover:bg-[#F4F6F5]' : ''}`}>
                                            <LuBookOpen  className="text-[15px]"/> 
                                            <p>Courses</p>
                                        </NavLink> 
                                    </li>
                                    <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-xs text-[12.5px] transition-all w-[95%]">
                                        <NavLink to="/assignment" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'bg-[#FFFFFF] hover:rounded-lg hover:bg-[#F4F6F5]' : ''}`}>
                                            <LuClipboardList  className="text-[15px]"/> 
                                            <p>Assignments</p>
                                        </NavLink> 
                                    </li>
                                    <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-xs text-[12.5px] transition-all w-[95%]">
                                        <NavLink to="/progress" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'bg-[#FFFFFF] hover:rounded-lg hover:bg-[#F4F6F5]' : ''}`}>
                                            <LuTrendingUp  className="text-[15px]"/> 
                                            <p>Progress</p>
                                        </NavLink> 
                                    </li>
                                    <li className="font-semibold hover:bg-[#F4F6F5] hover:shadow-xs text-[12.5px] transition-all w-[95%]">
                                        <NavLink to="/profile-setting" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'bg-[#FFFFFF] hover:rounded-lg hover:bg-[#F4F6F5]' : ''}`}>
                                            <LuSettings  className="text-[15px]"/> 
                                            <p>Settings</p>
                                        </NavLink> 
                                    </li>
                                </ul>
                            </div>
                        )}
                        <h3 className="font-semibold hidden lg:flex ml-4 text-[#1A1A1A] text-lg">{title}</h3>
                        <div className="bg-[#F4F6F5] border-1 border-[#D8D6EF] flex h-10 hover:border-1.5 hover:border-[#1A7A4A] items-center px-3 rounded-lg space-x-2 w-150">
                            <FaSearch  className="text-[#8F9E95]"/>
                            <input type="text" placeholder="Search Courses, assignments..." className="border-none h-full outline-none text-[#8A9E95] text-[13px] w-full"/>
                        </div>
                        <div className="flex h-full items-center lg:space-x-3 lg:w-60 space-x-1.5 w-35">
                            <Link className="flex h-10 hover:bg-[#EAF3EE] items-center justify-center relative rounded-md transition-all w-10">
                                <LuBell  className="h-7 p-1 text-[#1A7A4A] w-7"/>
                                <div className="absolute bg-[#DC2626] h-2 right-1.5 rounded-full top-[5px] w-2"></div>
                            </Link>
                            <Link to="/user-profile" className="flex h-[85%] items-center lg:hover:bg-[#EAF3EE] lg:space-x-3 lg:w-50 px-2 rounded-lg transition-all w-auto">
                                <p className="bg-[#EAF3EE] flex font-semibold h-7 items-center justify-center lg:h-9 lg:w-9 p-5 rounded-md text-[#1A7A4A] text-[12px] w-7">
                                    AO
                                </p>
                                <div className="flex-col hidden lg:flex">
                                    <p className="font-semibold text-[#191A3B] text-[12px]">{userData?.fullName} </p>
                                    <p className="font-semibold text-[#191A3B] text-[12px]">{userData?.tfId}</p>
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