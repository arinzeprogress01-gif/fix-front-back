import { useEffect, useState } from "react";
import SideBar from "./components/sidebar";
import { LuUsers, LuAward, LuActivity, LuBookOpen, LuPlus, LuSquareCheck, LuUser, LuTrendingUp, LuCircleAlert } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import image1 from '../../images/cos1.jpg'
import image2 from '../../images/cos2.jpg'
import { motion } from "framer-motion";
import { buttonHoverEffects } from "../leaners/components/effect";
import axios from "axios";

export default function Tutor_Dashboard() {

    const [userData, setUserData] = useState(null); // ✅ ADDED
    const token = localStorage.getItem("token");   // ✅ ADDED

    useEffect(() => {
        document.title = 'TalentFlow - Tutor_Dashboard'
    }, []);

    // ✅ FETCH USER (ONLY ADDITION)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "https://talentflowbackend.onrender.com/api/user/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUserData(res.data.data);

            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };

        if (token) fetchUser();
    }, [token]);

    const stats = [
        {
            icon: <LuBookOpen size={15} />,
            title: 'My Courses',
            value: 2,
            background: '[#E8F5EC] ',
            color: '[#1A7A4A]'
        },
        {
            icon: <LuUsers />,
            title: 'Active Interns',
            value: 28,
            background: '[#E8F0FB]',
            color: '[#2563EB]'
        },
        {
            icon: <LuSquareCheck />,
            title: 'Pending Submissions',
            value: '1',
            background: '[#FFF8E6]',
            color: '[#D9771C]',
        },
        {
            icon: <LuTrendingUp />,
            title: 'Avg Completion',
            value: '73%',
            background: '[#E8F5EC] ',
            color: '[#1A7A4A]'
        },
    ];

    const course = [
        {
            image: image1,
            title: 'Introduction to Web Development',
            percent: 78,
            modules: 4
        },
        {
            image: image2,
            title: 'Mobile App Development',
            percent: 68,
            modules: 6
        },
    ];

    const data = [
        {
            text: 'Active Courses',
            value: 2
        },
        {
            text: 'Total Interns',
            value: 28
        },
    ];

    return (
        <SideBar title="Dashboard" userData={userData}> {/* ✅ ADDED */}
            <div className="h-auto p-5 w-full">
                <div className="bg-gradient-to-r flex flex-col from-[#1A7748] h-auto mt-5 p-5 rounded-xl to-[#15663C] w-full">

                    {/* ✅ FIXED (User.fullName → userData?.fullName) */}
                    <h3 className="font-semibold md:text-3xl text-2xl text-normal text-white">
                        Welcome, {userData?.fullName || "Tutor"}
                    </h3>

                    <p className="mt-2 text-sm text-white/90">You're guiding  73% average completion rate </p>

                    <div className="flex items-center justify-between my-4 w-65">
                        {data.map((details, index) => (
                            <div key={index} className="bg-[#4B8966] px-5 py-2 rounded-md">
                                <h3 className="font-semibold text-[#DCE8E1] text-[13px] text-white/80">
                                    {details.text}
                                </h3>
                                <p className="font-bold leading-normal text-3xl text-white">
                                    {details.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex md:flex-row md:py-5 md:space-x-5 md:space-y-0 mt-5 py-3 space-y-5 w-full">
                    <Link
                        to="/create-course"
                        className="bg-white border-1 border-[#D8D6EF] flex group hover:border-1 hover:border-[#1A7A4A] md:w-1/2 p-5 rounded-lg space-x-3 transition-all w-full">
                        <div className="bg-[#E8F5EC] flex group-hover:bg-[#1A7A4A] h-12 items-center justify-center rounded-lg w-12">
                            <LuPlus className="group-hover:text-white h-6 text-[#1A7A4A] w-6" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold mb-1 text-[#1A1A1A] text-lg">Create New Course</h3>
                            <p className="text-[#8A9E95] text-sm">Build and upload a new course</p>
                        </div>
                    </Link>

                    <Link
                        to="/submissions"
                        className="bg-white border-1 border-[#D8D6EF] flex group hover:border-1 hover:border-[#1A7A4A] md:w-1/2 p-5 rounded-lg space-x-3 transition-all w-full">
                        <div className="bg-[#E8F0FB] flex group-hover:bg-[#2563eb] h-12 items-center justify-center rounded-lg w-12">
                            <LuSquareCheck className="group-hover:text-white h-6 text-[#2563eb] w-6" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold mb-1 text-[#1A1A1A] text-lg">Review Submissions</h3>
                            <p className="text-[#8A9E95] text-sm">1 Pending review</p>
                        </div>
                    </Link>
                </div>

                <div className="gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mt-2 py-5 sm:grid-cols-1 w-full">
                    {stats.map((data, index) => (
                        <div key={index} className="bg-white border-1 border-[#D8ECDF] flex flex-col p-5 rounded-xl">
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 p-2 rounded-md flex items-center justify-center bg-${data.background} text-${data.color}`}>
                                    {data.icon}
                                </div>
                                <p className="text-[#8A9E95] text-sm">{data.title}</p>
                            </div>
                            <h3 className="font-semibold mt-4 text-3xl">
                                {data.value}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col mt-2 py-2 w-full">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-lg">My Courses</p>
                        <Link className="font-semibold lg:text-sm text-[#1A7A4A] text-[13px]"> View all courses</Link>
                    </div>

                    <div className="flex flex-col lg:flex lg:flex-row lg:space-x-5 lg:space-y-0 mt-5 py-3 space-y-5">
                        {course.map((data, index) => (
                            <div key={index} className="border-1 border-[#D8ECDF] flex flex-col group lg:w-1/2 overflow-hidden rounded-xl w-full">
                                <img src={data.image} alt="CourseImage" className="duration-300 group-hover:scale-105 h-40 object-cover rounded-t-xl transition-all w-full" />
                                <div className="bg-white flex flex-col px-4 py-3 rounded-b-xl w-full">
                                    <h3 className="font-semibold group-hover:text-[#1A7A4A] my-3 text-md">{data.title}</h3>
                                    <div className="flex items-center justify-between text-sm">
                                        <p className="text-[#8A9E95]">{data.modules} modules</p>
                                        <h3 className="font-medium text-[#1A7A4A]">{data.percent}% completion</h3>
                                    </div>
                                    <div className="flex mb-2 mt-5 space-x-5">
                                        <motion.button {...buttonHoverEffects} className="bg-[#1A7A4A] border cursor-pointer duration-200 font-semibold hover:bg-[#156239] py-2.5 rounded-lg text-sm text-white transition-all w-1/2">
                                            <Link to="/student-course">View Content</Link>
                                        </motion.button>
                                        <motion.button {...buttonHoverEffects} className="border border-2 border-[#1A7A4A] cursor-pointer duration-200 font-semibold hover:bg-[#E8F5EC] py-2.5 rounded-lg text-[#1A7A4A] text-sm transition-all w-1/2">
                                            <Link to="/student-course">Add Content</Link>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SideBar>
    )
}