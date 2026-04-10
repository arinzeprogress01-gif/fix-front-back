import { Link, NavLink } from "react-router-dom"
import logoImg from "../../../images/logo.png"
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";

import {LuLayoutDashboard, LuClipboardList, LuTrendingUp, LuMessageSquare, LuSettings, LuBell, LuMenu, LuX, LuUpload, LuSquareCheck, LuUsers, LuUser, } from "react-icons/lu";
import { useState } from "react";
export default function SideBar({ children, title }){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            <div className="w-full h-screen flex">
                <div className="lg:w-[22%] h-full hidden lg:flex flex-col bg-[#EAF3EE] fixed left-0 top-0">
                        <Link className="w-full">
                            <img src={logoImg} alt="logoImg" className="w-55 h-30 object-cover" />
                        </Link>
                        <ul className="flex flex-col items-center space-y-2.5 mt-2 text-[#4A5C52] poppins-font normal">
                            <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-sm">
                                <NavLink to="/tutor-dashboard" end className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuLayoutDashboard  className="text-[15px]"/> 
                                    <p>Dashboard</p>
                                </NavLink> 
                            </li>
                            <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-xs">
                                <NavLink to="/create-course" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuUpload  className="text-[15px]"/> 
                                    <p>Create Course</p>
                                </NavLink> 
                            </li>
                            <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-xs">
                                <NavLink to="/submissions" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuSquareCheck  className="text-[15px]"/> 
                                    <p>Submissions</p>
                                </NavLink> 
                            </li>
                            <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-xs">
                                <NavLink to="/interns" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuUsers  className="text-[15px]"/> 
                                    <p>Interns</p>
                                </NavLink> 
                            </li>
                            <li className="mt-65 w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-xs">
                                <NavLink to="/tutor-profileSetting" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                    <LuSettings  className="text-[15px]"/> 
                                    <p>Settings</p>
                                </NavLink> 
                            </li>
                        </ul>
                            
                </div>
                <div className="w-full lg:w-[78%] h-full flex flex-col lg:ml-[22%]">
                    <div className="w-full lg:w-[78%] fixed top-0 right-0 bg-white z-10  h-15 flex px-2 items-center space-x-3">
                        <button onClick={()=> setIsOpen(!isOpen)} className='lg:hidden w-20 rounded-sm h-10 flex items-center justify-center text-[#8A9E95] cursor-pointer hover:text-[#1A7A4A] transition-all'>
                            {isOpen ? <LuX size={24} /> : <LuMenu  size={24}/>}
                        </button>
                        {isOpen && (
                            <div className="lg:hidden flex flex-col absolute w-full h-auto z-50 bg-[#EAF3EE] left-0 top-14.5 shadow-lg">
                                <ul className="flex flex-col items-center space-y-2.5 mt-3 lg:mt-2 mb-5 lg:mb-0 text-[#4A5C52] poppins-font normal">
                                    <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-sm">
                                        <NavLink to="/tutor-dashboard" end className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'text-[#1A7A4A] bg-[#FFFFFF] hover:rounded-xl hover:bg-[#F4F6F5]' : 'text-[#4A5C52]'}`}>
                                            <LuLayoutDashboard  className="text-[15px]"/> 
                                            <p>Dashboard</p>
                                        </NavLink> 
                                    </li>
                                    <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-xs">
                                        <NavLink to="/create-course" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'bg-[#FFFFFF] hover:rounded-lg hover:bg-[#F4F6F5]' : ''}`}>
                                            <LuUpload  className="text-[15px]"/> 
                                            <p>Create Course</p>
                                        </NavLink> 
                                    </li>
                                    <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-xs">
                                        <NavLink to="/submissions" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'bg-[#FFFFFF] hover:rounded-lg hover:bg-[#F4F6F5]' : ''}`}>
                                            <LuSquareCheck  className="text-[15px]"/> 
                                            <p>Submissions</p>
                                        </NavLink> 
                                    </li>
                                    <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-xs">
                                        <NavLink to="/interns" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'bg-[#FFFFFF] hover:rounded-lg hover:bg-[#F4F6F5]' : ''}`}>
                                            <LuUsers  className="text-[15px]"/> 
                                            <p>Interns</p>
                                        </NavLink> 
                                    </li>
                                    <li className="w-[95%] font-semibold text-[12.5px] transition-all hover:bg-[#F4F6F5] hover:shadow-xs">
                                        <NavLink to="/tutor-profileSetting" className={({isActive}) => `flex space-x-3 flex justify-left items-center p-3 ${isActive ? 'bg-[#FFFFFF] hover:rounded-lg hover:bg-[#F4F6F5]' : ''}`}>
                                            <LuSettings  className="text-[15px]"/> 
                                            <p>Settings</p>
                                        </NavLink> 
                                    </li>
                                </ul>
                            </div>
                        )}
                        <h3 className="font-semibold text-[#1A1A1A] text-lg hidden lg:flex ml-4">{title}</h3>
                        <div className="w-150 h-10 border-1 border-[#D8D6EF]  hover:border-1.5 hover:border-[#1A7A4A] bg-[#F4F6F5] rounded-lg flex items-center px-3 space-x-2">
                            <FaSearch  className="text-[#8F9E95]"/>
                            <input type="text" placeholder="Search Courses, assignments..." className="text-[#8A9E95] text-[13px] border-none outline-none w-full h-full"/>
                        </div>
                        <div className="w-35 lg:w-60 h-full flex space-x-1.5 lg:space-x-3 items-center">
                            <Link className="w-10 h-10 relative flex items-center justify-center rounded-md hover:bg-[#EAF3EE] transition-all ">
                                <LuBell  className="w-7 h-7 p-1 text-[#1A7A4A]"/>
                                <div className="absolute w-2 h-2 rounded-full top-[5px] right-1.5 bg-[#DC2626]"></div>
                            </Link>
                            <Link to="/user-profile" className="w-auto lg:w-50 h-[85%] lg:hover:bg-[#EAF3EE] rounded-lg flex lg:space-x-3 items-center px-2 transition-all">
                                <p className="w-7 h-7 p-5 lg:w-9 lg:h-9 items-center flex justify-center rounded-md text-[12px] font-semibold text-[#1A7A4A] bg-[#EAF3EE]">
                                    CN
                                </p>
                                <div className="hidden lg:flex flex-col">
                                    <p className="text-[12px] font-semibold text-[#191A3B]">Chukwuemeka Nwosu</p>
                                    <p className="text-[12px] font-semibold text-[#8A98AB]">TM-L-2024-001</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-15 bg-[#F4F5F6]">
                        {children}
                    </div>
                    
                </div>

            </div>
        </>
    )
}