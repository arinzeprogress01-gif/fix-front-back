import { useEffect, useState } from "react";
import SideBar from "./components/sidebar";
import image1 from '../../images/cos1.jpg';
import image2 from '../../images/cos2.jpg';
import { motion } from "framer-motion";
import { LuBookOpen, LuClock, LuCircleCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { buttonHoverEffects } from "./components/effect";
import axios from "axios";

export default function Learners_Dashboard() {
    const [progressData, setProgressData] = useState(null);
    const [search, setSearch] = useState("");
    const [userData, setUserData] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        document.title = "Learners_Dashboard";

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

    const isLoading = !progressData || !userData;

    if (isLoading) {
        return (
            <SideBar title="Dashboard" userData={userData}>
                <div className="p-5">Loading dashboard...</div>
            </SideBar>
        );
    }

    const enrolledCourses = progressData?.courses?.length || 0;
    const overallProgress = progressData?.overallStats?.completionPercentage || 0;

    // ✅ FIXED: Prevent duplication
    const handleEnroll = (courseTitle) => {
        const alreadyExists = progressData.courses?.some(
            (c) => c.title === courseTitle
        );

        if (alreadyExists) return;

        const updated = {
            ...progressData,
            courses: [
                ...(progressData.courses || []),
                { title: courseTitle, progress: 0 }
            ]
        };

        setProgressData(updated);
    };

    const activity = [
        {
            tits: 'Completed Lessons',
            title: 'Javascript Basics',
            time: '2 hours ago',
            style: '[#1A7A4A]'
        },
        {
            tits: 'Submitted Assignments',
            title: 'Calculator Project',
            time: 'Yesterday',
            style: '[#1A7A4A]'
        },
        {
            tits: 'Recieved grade',
            title: '92/100 on UI/UX Assignment',
            time: '2 days ago',
            style: '[#1A7A4A]'
        }
    ];

    const deadlines = [
        {
            title: 'Build a Personal Portfolio Website',
            sub_text: 'Introduction to Web Development',
            due: '4/5/2026',
            status: 'Pending',
            style: 'bg-[#FFF8E6] text-[#D9771C]'
        },
        {
            title: 'Javascript Calculator Project',
            sub_text: 'Introduction to Web Development',
            due: '3/30/2026',
            status: 'Submitted',
            style: 'bg-[#E8F0FB] text-[#2563EB]',
        },
        {
            title: 'Redesign a Mobile App',
            sub_text: 'UI/UX Design Principles',
            due: '4/15/2026',
            status: 'Graded',
            style: 'bg-[#E8F5EC] text-[#1A7A4A]',
        }
    ];

    // ✅ Static Courses
    const staticCourses = [
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

    // ✅ Backend Courses
    const backendCourses = (progressData?.courses || []).map((c) => ({
        title: c.title,
        author: c.instructor || "Instructor",
        percent: c.progress || 0,
        image: image1
    }));

    // ✅ Remove duplicates
    const course = [...staticCourses, ...backendCourses].filter(
        (course, index, self) =>
            index === self.findIndex((c) => c.title === course.title)
    );

    // ✅ Search safe
    const filteredCourses = course.filter((c) =>
        c.title?.toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        {
            icon: <LuBookOpen />,
            text: 'Active Courses',
            value: 2,
            style: 'bg-[#E8F5EC] text-[#1A7A4A]',
        },
        {
            icon: <LuClock />,
            text: 'Pending Assignments',
            value: 1,
            style: 'bg-[#E8F0FB] text-[#2563EB]',
        },
        {
            icon: <LuCircleCheck />,
            text: 'Completed Courses',
            value: 1,
            style: 'bg-[#E8F5EC] text-[#1A7A4A]',
        }
    ];

    return (
        <SideBar title="Dashboard" userData={userData}>
            <div className="h-auto p-5 w-full">

                {/* HEADER */}
                <div className="bg-gradient-to-br flex flex-col from-[#1A7A4A] lg:mt-5 p-5 rounded-xl to-[#156239] w-full">
                    <h3 className="font-semibold lg:text-3xl mt-2 text-2xl text-white">
                        Welcome {userData?.fullName || "Learner"}
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                        You're doing great! Keep up the momentum
                    </p>

                    <div className="flex my-4 space-x-5 w-75">
                        <div className="bg-[#4B8966] px-4 py-2 rounded-md w-1/2">
                            <p className="text-white/80 text-xs">Enrolled</p>
                            <p className="font-bold text-white text-xl">{enrolledCourses}</p>
                        </div>

                        <div className="bg-[#4B8966] px-4 py-2 rounded-md w-1/2">
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
                        className="bg-white border border-[#D8ECDF] p-2 rounded-md w-full"
                    />
                </div>

                {/* STATS */}
                <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2 mt-5">
                    {stats.map((data, index) => (
                        <div key={index} className="bg-white border border-[#D8ECDF] p-5 rounded-xl">
                            <div className="flex space-x-3">
                                <div className={`w-10 h-10 p-2 rounded-md ${data.style}`}>
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
                    <p className="font-semibold text-lg">Continue Learning</p>

                    <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2 mt-5">
                        {filteredCourses.map((data, index) => (
                            <div key={index} className="bg-white border overflow-hidden rounded-xl">

                                <img src={data.image} className="h-40 object-cover w-full" />

                                <div className="p-4">
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-[#8A9E95] text-sm">by {data.author}</p>

                                    <div className="bg-[#E8F5EC] h-1.5 mt-3 rounded">
                                        <div
                                            className="bg-[#1A7A4A] h-full"
                                            style={{ width: `${data.percent}%` }}
                                        />
                                    </div>

                                    <p className="mt-2 text-[#8A9E95] text-sm">
                                        {data.percent || 0}%
                                    </p>

                                    <motion.button
                                        onClick={() => handleEnroll(data.title)}
                                        {...buttonHoverEffects}
                                        className="bg-[#1A7A4A] mt-3 py-2 rounded-lg text-white w-full"
                                    >
                                        Enroll / Continue
                                    </motion.button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </SideBar>
    );
}