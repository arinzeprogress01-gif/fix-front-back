import { useEffect, useState } from "react";
import SideBar from "./components/sidebar";
import image1 from '../../images/cos1.jpg';
import image2 from '../../images/cos2.jpg';
import { motion } from "framer-motion";
import { LuBookOpen, LuClock, LuCircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonHoverEffects } from "./components/effect";
import axios from "axios";

export default function Learners_Dashboard() {
    const [progressData, setProgressData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [search, setSearch] = useState(""); // ✅ SEARCH ADDED

    const token = localStorage.getItem("token");

    useEffect(() => {
        document.title = "Learners Dashboard";

        const fetchData = async () => {
            try {
                const [progressRes, userRes] = await Promise.all([
                    axios.get("https://talentflowbackend.onrender.com/api/progress", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("https://talentflowbackend.onrender.com/api/user/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setProgressData(progressRes.data.data);
                setUserData(userRes.data.data);

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        if (token) fetchData();
    }, [token]);

    if (!progressData || !userData) {
        return (
            <SideBar title="Dashboard" userData={userData}>
                <div className="p-5">Loading dashboard...</div>
            </SideBar>
        );
    }

    // ✅ BACKEND TRUTH ONLY
    const enrolledCourses = progressData?.courses?.length || 0;
    const overallProgress = progressData?.overallStats?.completionPercentage || 0;

    // ✅ ENROLL (FRONTEND ONLY - NO API)
    const handleEnroll = (courseTitle) => {
        const updated = {
            ...progressData,
            courses: [
                ...(progressData.courses || []),
                { title: courseTitle, progress: 0 }
            ]
        };

        setProgressData(updated);
    };

    const course = [
        {
            image: image1,
            title: 'Introduction to Web Development',
            author: 'Chukwuemeka Nwosu',
            percent: 0
        },
        {
            image: image2,
            title: 'UI/UX Design Principles',
            author: 'Amina Bello',
            percent: 0
        }
    ];

    // ✅ SEARCH FILTER
    const filteredCourses = course.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        {
            icon: <LuBookOpen />,
            text: 'Active Courses',
            value: enrolledCourses,
            style: 'bg-[#E8F5EC] text-[#1A7A4A]'
        },
        {
            icon: <LuClock />,
            text: 'Pending Assignments',
            value: progressData?.pendingAssignments || 0,
            style: 'bg-[#E8F0FB] text-[#2563EB]'
        },
        {
            icon: <LuCircleCheck />,
            text: 'Completed Courses',
            value: progressData?.completedCourses || 0,
            style: 'bg-[#E8F5EC] text-[#1A7A4A]'
        }
    ];

    return (
        <SideBar
            title={`Welcome, ${userData?.fullName || "Learner"}`}
            userData={userData}
        >
            <div className="w-full h-auto p-5">

                {/* HERO */}
                <div className="w-full rounded-xl p-5 bg-gradient-to-br from-[#1A7A4A] to-[#156239]">
                    <h3 className="text-2xl text-white font-semibold">
                        Welcome {userData?.fullName || "Learner"}!
                    </h3>

                    <p className="text-white/80 mt-2 text-sm">
                        Keep going — you're doing great.
                    </p>

                    <div className="flex w-75 my-4 justify-between">
                        <div className="bg-[#4B8966] px-4 py-2 rounded-md">
                            <p className="text-white/80 text-xs">Enrolled</p>
                            <p className="text-white font-bold text-xl">{enrolledCourses}</p>
                        </div>

                        <div className="bg-[#4B8966] px-4 py-2 rounded-md">
                            <p className="text-white/80 text-xs">Progress</p>
                            <p className="text-white font-bold text-xl">{overallProgress}%</p>
                        </div>
                    </div>
                </div>

                {/* SEARCH */}
                <div className="mt-5">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {stats.map((data, index) => (
                        <div key={index} className="p-5 bg-white border rounded-xl">
                            <div className="flex space-x-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${data.style}`}>
                                    {data.icon}
                                </div>
                                <p className="text-sm text-[#8A9E95]">{data.text}</p>
                            </div>
                            <h3 className="mt-3 text-3xl font-semibold">{data.value}</h3>
                        </div>
                    ))}
                </div>

                {/* COURSES */}
                <div className="mt-6">
                    <h3 className="font-semibold text-lg">Continue Learning</h3>

                    <div className="flex flex-col lg:flex-row gap-5 mt-4">
                        {filteredCourses.map((data, index) => (
                            <div key={index} className="bg-white border rounded-xl w-full">
                                <img src={data.image} className="h-40 w-full object-cover" />

                                <div className="p-4">
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-sm text-[#8A9E95]">{data.author}</p>

                                    <div className="mt-3 bg-[#E8F5EC] h-1.5 rounded-full">
                                        <div style={{ width: "0%" }} className="h-full bg-[#1A7A4A]" />
                                    </div>

                                    <p className="text-sm text-[#8A9E95]">0%</p>

                                    <button
                                        onClick={() => handleEnroll(data.title)}
                                        className="mt-3 w-full bg-[#1A7A4A] text-white py-2 rounded-lg"
                                    >
                                        Enroll / Continue
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </SideBar>
    );
}        };

        if (token) fetchData();
    }, [token]);

    if (!progressData || !userData) {
        return (
            <SideBar title="Dashboard" userData={userData}>
                <div className="p-5">Loading dashboard...</div>
            </SideBar>
        );
    }

    // ✅ BACKEND TRUTH ONLY
    const enrolledCourses = progressData?.courses?.length || 0;
    const overallProgress = progressData?.overallStats?.completionPercentage || 0;

    const activity = [
        {
            tits: 'Completed Lessons',
            title: 'Javascript Basics',
            time: '2 hours ago',
            style: '#1A7A4A'
        }
    ];

    const course = [
        {
            image: image1,
            title: 'Introduction to Web Development',
            author: 'Chukwuemeka Nwosu',
            percent: 0   // ✅ FIXED AS REQUESTED
        },
        {
            image: image2,
            title: 'UI/UX Design Principles',
            author: 'Amina Bello',
            percent: 0   // ✅ FIXED AS REQUESTED
        }
    ];

    const stats = [
        {
            icon: <LuBookOpen />,
            text: 'Active Courses',
            value: enrolledCourses,
            style: 'bg-[#E8F5EC] text-[#1A7A4A]'
        },
        {
            icon: <LuClock />,
            text: 'Pending Assignments',
            value: progressData?.pendingAssignments || 0,
            style: 'bg-[#E8F0FB] text-[#2563EB]'
        },
        {
            icon: <LuCircleCheck />,
            text: 'Completed Courses',
            value: progressData?.completedCourses || 0,
            style: 'bg-[#E8F5EC] text-[#1A7A4A]'
        }
    ];

    return (
        <SideBar
            title={`Welcome, ${userData?.fullName || "Learner"}`}
            userData={userData}
        >
            <div className="w-full h-auto p-5">

                {/* HERO */}
                <div className="w-full rounded-xl p-5 bg-gradient-to-br from-[#1A7A4A] to-[#156239]">
                    <h3 className="text-2xl text-white font-semibold">
                        Welcome {userData?.fullName || "Learner"}!
                    </h3>

                    <p className="text-white/80 mt-2 text-sm">
                        Keep going — you're doing great.
                    </p>

                    {/* ONLY BACKEND VALUES */}
                    <div className="flex w-75 my-4 justify-between">
                        <div className="bg-[#4B8966] px-4 py-2 rounded-md">
                            <p className="text-white/80 text-xs">Enrolled</p>
                            <p className="text-white font-bold text-xl">{enrolledCourses}</p>
                        </div>

                        <div className="bg-[#4B8966] px-4 py-2 rounded-md">
                            <p className="text-white/80 text-xs">Progress</p>
                            <p className="text-white font-bold text-xl">{overallProgress}%</p>
                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    {stats.map((data, index) => (
                        <div key={index} className="p-5 bg-white border rounded-xl">
                            <div className="flex space-x-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${data.style}`}>
                                    {data.icon}
                                </div>
                                <p className="text-sm text-[#8A9E95]">{data.text}</p>
                            </div>
                            <h3 className="mt-3 text-3xl font-semibold">{data.value}</h3>
                        </div>
                    ))}
                </div>

                {/* COURSES (STATIC OK) */}
                <div className="mt-6">
                    <h3 className="font-semibold text-lg">Continue Learning</h3>

                    <div className="flex flex-col lg:flex-row gap-5 mt-4">
                        {course.map((data, index) => (
                            <div key={index} className="bg-white border rounded-xl w-full">
                                <img src={data.image} className="h-40 w-full object-cover" />

                                <div className="p-4">
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-sm text-[#8A9E95]">{data.author}</p>

                                    {/* FIXED = 0 */}
                                    <div className="mt-3 bg-[#E8F5EC] h-1.5 rounded-full">
                                        <div style={{ width: "0%" }} className="h-full bg-[#1A7A4A]" />
                                    </div>

                                    <p className="text-sm text-[#8A9E95]">0%</p>

                                    <button className="mt-3 w-full bg-[#1A7A4A] text-white py-2 rounded-lg">
                                        Continue Learning
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </SideBar>
    );
}
