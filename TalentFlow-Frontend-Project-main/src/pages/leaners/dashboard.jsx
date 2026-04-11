import { useEffect, useState } from "react"
import SideBar from "./components/sidebar";
import image1 from '../../images/cos1.jpg'
import image2 from '../../images/cos2.jpg'
import { motion } from "framer-motion";
import { LuBookOpen, LuClock, LuCircleCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { buttonHoverEffects } from "./components/effect";
import axios from "axios";

export default function Learners_Dashboard() {

    const [progressData, setProgressData] = useState(null);

    const token = localStorage.getItem("token");

    const userName = progressData?.user?.fullName || "Learner";

    useEffect(() => {
        document.title = 'Learners_Dashboard'

        const fetchProgress = async () => {
            try {
                const res = await axios.get("/api/progress", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProgressData(res.data.data);

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        if (token) fetchProgress();

    }, [token]);

    // 🔥 LOADING STATE FIX (ADDED)
    if (!progressData && token) {
        return (
            <SideBar title="Dashboard">
                <div className="p-5">Loading dashboard...</div>
            </SideBar>
        );
    }

    // ✅ REAL VALUES FROM BACKEND
    const enrolledCourses = progressData?.courses?.length || 0;
    const overallProgress = progressData?.overallStats?.completionPercentage || 0;

    const activity = [
        {
            title: 'Completed Lessons',
            title: 'Javascript Basics',
            time: '2 hours ago',
        },
        {
            title: 'Submitted Assignments',
            title: 'Calculator Project',
            time: 'Yesterday',
        },
        {
            title: 'Received grade',
            title: '92/100 on UI/UX Assignment',
            time: '2 days ago',
        }
    ]

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
            status: 'Pending',
            style: 'bg-[#FFF8E6] text-[#D9771C]',
        },
        {
            title: 'Redesign a Mobile App',
            sub_text: 'UI/UX Design Principles',
            due: '4/15/2026',
            status: 'Pending',
            style: 'bg-[#FFF8E6] text-[#D9771C]',
        }
    ]

    const course = [
        {
            image: image1,
            title: 'Introduction to Web Development',
            author: 'Chukwuemeka Nwosu',
            percent: 65
        },
        {
            image: image2,
            title: 'UI/UX Design Principles',
            author: 'Amina Bello',
            percent: 30
        },
    ]

    const data = [
        {
            title: 'Enrolled Courses',
            value: enrolledCourses // ✅ backend
        },
        {
            title: 'Overall Progress',
            value: `${overallProgress}%` // ✅ backend
        }
    ];

    const stats = [
        {
            icon: <LuBookOpen />,
            text: 'Active Courses',
            value: enrolledCourses,
            style: 'bg-[#E8F5EC] text-[#1A7A4A]',
        },
        {
            icon: <LuClock />,
            text: 'Pending Assignments',
            value: 3,
            style: 'bg-[#E8F0FB] text-[#2563EB]',
        },
        {
            icon: <LuCircleCheck />,
            text: 'Completed Courses',
            value: progressData?.overallStats?.coursesCompleted || 0,
            style: 'bg-[#E8F5EC] text-[#1A7A4A]',
        }
    ]

    return (
        <SideBar title="Dashboard">
            <div className="h-auto p-5 w-full">

                {/* HEADER */}
                <div className="bg-gradient-to-br flex flex-col from-[#1A7A4A] lg:mt-5 p-5 rounded-xl to-[#156239] w-full">
                    <h3 className="font-semibold lg:text-3xl mt-2 text-2xl text-white">
                        Welcome Back, {userName}!
                    </h3>

                    <p className="mt-2 text-sm text-white/80">
                        You're doing great! Keep up the momentum
                    </p>

                    <div className="flex justify-between max-w-md my-4 w-full">
                        {data.map((details, index) => (
                            <div key={index} className="bg-[#4B8966] px-5 py-2 rounded-md">
                                <h3 className="font-semibold text-[13px] text-white/80">
                                    {details.title}
                                </h3>
                                <p className="font-bold text-2xl text-white">
                                    {details.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* STATS */}
                <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2 mt-5 py-5 sm:grid-cols-1">
                    {stats.map((data, index) => (
                        <div key={index} className="bg-white border p-5 rounded-xl">
                            <div className="flex space-x-3">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-md ${data.style}`}>
                                    {data.icon}
                                </div>
                                <p className="text-[#8A9E95] text-sm">{data.text}</p>
                            </div>

                            <h3 className="font-semibold mt-3.5 text-3xl">
                                {data.value}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* CONTINUE LEARNING */}
                <div className="mt-5">
                    <p className="font-semibold text-lg">Continue Learning</p>

                    <div className="flex flex-col gap-5 lg:flex-row mt-5">
                        {course.map((data, index) => (
                            <div key={index} className="border lg:w-1/2 overflow-hidden rounded-xl w-full">

                                <img src={data.image} className="h-40 object-cover w-full" />

                                <div className="bg-white p-4">
                                    <h3 className="font-semibold">{data.title}</h3>
                                    <p className="text-[#8A9E95] text-sm">by {data.author}</p>

                                    <div className="bg-[#E8F5EC] h-1.5 mt-3 rounded">
                                        <div className="bg-[#1A7A4A] h-full rounded" style={{ width: `${data.percent}%` }} />
                                    </div>

                                    <p className="mt-1 text-sm">{data.percent}%</p>

                                    <motion.button {...buttonHoverEffects} className="bg-[#1A7A4A] mt-4 py-2.5 rounded-lg text-white w-full">
                                        <Link to="/student-course">Continue Learning</Link>
                                    </motion.button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </SideBar>
    )
}