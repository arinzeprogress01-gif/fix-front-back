import { useEffect, useState } from "react";
import { LuTrendingUp, LuTrophy, LuCalendar, LuEye } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Progress() {

    const [progressData, setProgressData] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get(
                    "https://talentflowbackend.onrender.com/api/progress",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setProgressData(res.data.data);

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        if (token) fetchProgress();
    }, [token]);

    if (!progressData) {
        return (
            <SideBar title="Progress">
                <div className="p-5">Loading progress...</div>
            </SideBar>
        );
    }

    // ================= BACKEND DATA =================
    const timeline = progressData?.milestones || [];

    const course_progress = progressData?.courses || [];

    const stats = progressData?.overallStats || {};

    const progress_stats = [
        {
            icon: <LuTrophy />,
            title: "Course Completed",
            style: "bg-[#E8F5EC] text-[#1A7A4A]",
            value: stats.coursesCompleted || 0,
        },
        {
            icon: <LuEye />,
            title: "In Progress",
            style: "bg-[#E8F0FB] text-[#2563EB]",
            value: stats.inProgress || 0,
        },
        {
            icon: <LuCalendar />,
            title: "Learning Days",
            style: "bg-[#FDECDA] text-[#DD3E31]",
            value: stats.learningDays || 0,
        }
    ];

    return (
        <SideBar title="Progress">
            <div className="w-full h-auto p-5">

                <h3 className="font-semibold text-2xl mt-3">
                    Learning Progress
                </h3>

                <p className="text-sm mt-2 text-[#8A9E95]">
                    Track your journey and achievements
                </p>

                {/* OVERALL PROGRESS */}
                <div className="px-5 py-8 mt-5 rounded-lg bg-gradient-to-br from-[#1A7A4A] to-[#156239]">

                    <div className="flex space-x-2">
                        <LuTrendingUp className="w-12 h-12 p-3 text-white rounded-lg bg-white/20" />

                        <div className="flex flex-col">
                            <p className="text-sm text-white/80">
                                Overall Completion
                            </p>

                            <h3 className="text-3xl font-semibold text-white">
                                {stats.completionPercentage || 0}%
                            </h3>
                        </div>
                    </div>

                    <div className="w-full mt-3">
                        <div className="relative w-full h-1.5 rounded-full bg-[#D8E6DF]">
                            <div
                                className="absolute bg-[#1A7A4A] h-full rounded-full"
                                style={{ width: `${stats.completionPercentage || 0}%` }}
                            ></div>
                        </div>
                    </div>

                    <p className="mt-3 text-sm text-white/90">
                        {stats.encouragement}
                    </p>
                </div>

                {/* STATS */}
                <div className="w-full py-5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {progress_stats.map((data, index) => (
                        <div key={index} className="px-5 py-6 border bg-white flex flex-col border-[#D8D6EF] rounded-xl">

                            <div className="flex space-x-2.5 items-center">
                                <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${data.style}`}>
                                    {data.icon}
                                </div>
                                <p className="text-[#8A9E95] text-sm">
                                    {data.title}
                                </p>
                            </div>

                            <h3 className="text-2xl font-semibold mt-3">
                                {data.value}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* COURSE PROGRESS */}
                <div className="w-full py-5 mt-5">
                    <p className="text-lg font-semibold">Course Progress</p>

                    <div className="flex flex-col w-full space-y-3 py-5">

                        {course_progress.map((data, index) => (
                            <div key={index} className="w-full border border-[#D8D6EF] hover:border-[#1A7A4A] p-5 bg-white rounded-lg flex flex-col transition-all duration-300">

                                <div className="flex items-center justify-between">
                                    <h3 className="text-[#1A1A1A] font-semibold">
                                        {data.title}
                                    </h3>

                                    <h3 className="text-2xl font-semibold text-[#1A7A4A]">
                                        {data.progress}%
                                    </h3>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-[#8A9E95]">
                                        by {data.instructor}
                                    </p>

                                    <p className="text-[12px] text-[#8A9E95]">
                                        {data.completed ? "Completed" : "In Progress"}
                                    </p>
                                </div>

                                <div className="mt-5 w-full">
                                    <div className="w-full h-1.5 relative bg-[#D8E6DF] rounded-full">
                                        <div
                                            className="absolute h-full rounded-full bg-[#1A7A4A]"
                                            style={{ width: `${data.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-sm text-[#8A9E95]">
                                        {data.modulesCompleted} / {data.totalModules} modules completed
                                    </p>

                                    <Link className="text-[14px] text-[#1A7A4A] font-semibold hover:underline">
                                        {data.progress === 100 ? "View Certificates" : ""}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TIMELINE */}
                <div className="w-full py-5">
                    <p className="text-lg font-semibold">Milestone Timeline</p>

                    <div className="w-full py-5 mt-5 rounded-xl bg-white flex flex-col space-y-3">

                        {timeline.map((data, index) => (
                            <div key={index} className="p-3 flex space-x-3">

                                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E8F5EC] text-[#1A7A4A]">
                                    <LuTrophy />
                                </div>

                                <div className="flex flex-col">
                                    <h3 className="text-[#1A1A1A] font-semibold mb-1">
                                        {data.title}
                                    </h3>

                                    <p className="text-[#8A9E95] text-sm">
                                        {data.date}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </SideBar>
    );
}        }
    ]
    return(
        <>
            <SideBar title="Progress">
                <div className="h-auto p-5 w-full">
                    <h3 className="font-semibold mt-3 text-2xl">Learning Progress</h3>
                    <p className="mt-2 text-[#8A9E95] text-sm">Track your journey and achievements</p>
                    <div className="bg-gradient-to-br from-[#1A7A4A] mt-5 px-5 py-8 rounded-lg to-[#156239]">
                        <div className="flex space-x-2">
                            <LuTrendingUp  className="bg-white/20 h-12 p-3 rounded-lg text-white w-12"/>
                            <div className="flex flex-col">
                                <p className="text-sm text-white/80">Overall Completion</p>
                                <h3 className="font-semibold text-3xl text-white">65%</h3>
                            </div>
                        </div>
                        <div className="mt-3 w-full">
                            <div className="bg-[#D8E6DF] h-1.5 relative rounded-full w-full">
                                <div className="absolute bg-[#1A7A4A] h-full rounded-full w-[65%]"></div>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-white/90">You're making great progress! Keep up the momentum</p>
                    </div>
                    <div className="gap-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-5 py-5 sm:grid-cols-1 w-full">
                        {progress_stats .map((data, index) => (
                            <div className="bg-white border border-1 border-[#D8D6EF] flex flex-col px-5 py-6 rounded-xl">
                                <div className="flex items-center space-x-2.5">
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${data.style}`}>
                                        {data.icon}
                                    </div>
                                    <p className="text-[#8A9E95] text-sm">
                                        {data.title}
                                    </p>
                                </div>
                                <h3 className="font-semibold mt-3 text-2xl">
                                    {data.value}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 py-5 w-full">
                        <p className="font-semibold text-lg">Course Progress</p>
                        <div className="flex flex-col py-5 space-y-3 w-full">
                            {course_progress.map((data, index) => (
                                <div className="bg-white border-1 border-[#D8D6EF] duration-300 flex flex-col hover:border-[#1A7A4A] p-5 rounded-lg transition-all w-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-[#1A1A1A]">{data.title}</h3>
                                        <h3 className="font-semibold text-2xl text-[#1A7A4A]">
                                            {data.percent}%
                                        </h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#8A9E95] text-sm">by {data.author}</p>
                                        <p className="text-[#8A9E95] text-[12px]">Completed</p>
                                    </div>
                                    <div className="mt-5 w-full">
                                        <div className="bg-[#D8E6DF] h-1.5 relative rounded-full w-full">
                                            <div className="absolute bg-[#1A7A4A] h-full rounded-full" style={{ width: `${data.percent}%` }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-[#8A9E95] text-sm">{data.modules} modules completed</p>
                                        <Link className="font-semibold hover:underline text-[#1A7A4A] text-[14px]">{data.percent === 100 ? 'View Certificates' : ''}</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="py-5 w-full">
                        <p className="font-semibold text-lg">Milestone Timeline</p>
                        <div className="bg-white flex flex-col mt-5 py-5 rounded-xl space-y-3 w-full">
                            {timline.map((data) => (
                                <div className="flex p-3 space-x-3">
                                    <div className="bg-[#E8F5EC] flex h-9 items-center justify-center rounded-full text-[#1A7A4A] w-9">
                                        <LuTrophy />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold mb-1 text-[#1A1A1A]">{data.title}</h3>
                                        <p className="text-[#8A9E95] text-sm">{data.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SideBar>
        </>
    )
}
