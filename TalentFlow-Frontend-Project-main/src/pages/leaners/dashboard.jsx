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
            <div className="h-auto p-5 w-full">

                {/* HERO */}
                <div className="bg-gradient-to-br from-[#1A7A4A] p-5 rounded-xl to-[#156239] w-full">
                    <h3 className="font-semibold text-2xl text-white">
                        Welcome {userData?.fullName || "Learner"}!
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                        Keep going — you're doing great.
                    </p>

                    <div className="flex justify-between my-4 w-75">
                        <div className="bg-[#4B8966] px-4 py-2 rounded-md">
                            <p className="text-white/80 text-xs">Enrolled</p>
                            <p className="font-bold text-white text-xl">{enrolledCourses}</p>
                        </div>

                        <div className="bg-[#4B8966] px-4 py-2 rounded-md">
                            <p className="text-white/80 text-xs">Progress</p>
                            <p className="font-bold text-white text-xl">{overallProgress}%</p>
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
                        className="border p-2 rounded-md w-full"
                    />
                </div>

                {/* STATS */}
                <div className="gap-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-5">
                    {stats.map((data, index) => (
                        <div key={index} className="bg-white border p-5 rounded-xl">
                            <div className="flex space-x-3">
                                <div className={`w-10 h-10 flex items-center justify-center ${data.style}`}>
                                    {data.icon}
                                </div>
                                <p className="text-[#8A9E95] text-sm">{data.text}</p>
                            </div>
                            <h3 className="font-semibold mt-3 text-3xl">{data.value}</h3>
                        </div>
                    ))}
                </div>

                {/* COURSES */}
                <div className="mt-6">
                    <h3 className="font-semibold text-lg">Continue Learning</h3>

                    <div className="flex flex-col gap-5 lg:flex-row mt-4">
                        {filteredCourses.map((data, index) => (
                            <div key={index} className="bg-white border rounded-xl w-full">
                                <img src={data.image} className="h-40 object-cover w-full" />

                                <div className="p-4">
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-[#8A9E95] text-sm">{data.author}</p>

                                    <div className="bg-[#E8F5EC] h-1.5 mt-3 rounded-full">
                                        <div style={{ width: "0%" }} className="bg-[#1A7A4A] h-full" />
                                    </div>

                                    <p className="text-[#8A9E95] text-sm">0%</p>

                                    <button
                                        onClick={() => handleEnroll(data.title)}
                                        className="bg-[#1A7A4A] mt-3 py-2 rounded-lg text-white w-full"
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
}       