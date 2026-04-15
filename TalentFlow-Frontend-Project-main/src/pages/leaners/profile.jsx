import {
    LuAward,
    LuBookOpen,
    LuCalendar,
    LuFlag,
    LuFlame,
    LuMail,
    LuTrophy
} from "react-icons/lu";

import SideBar from "./components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LearnerProfile() {
    const [profileData, setProfileData] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "https://talentflowbackend.onrender.com/api/user/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setProfileData(res.data.data);

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        if (token) fetchProfile();
    }, [token]);

    if (!profileData) {
        return (
            <SideBar title="Profile" userData={null}>
                <div className="p-5">Loading profile...</div>
            </SideBar>
        );
    }

    // ✅ FIX: correct backend structure
    const user = profileData?.user || profileData || {};
    const stats = profileData?.stats || {};
    const courses = profileData?.courses || [];

    const referenceNumber =
        user?.role === "learner"
            ? user?.learnerRef
            : user?.tutorRef;

    const achievements = [
        { icon: <LuFlag size={22} />, title: "First Course", text: "Enrolled in first course" },
        { icon: <LuBookOpen size={22} />, title: "Bookworm", text: "Completed 3 courses" },
        { icon: <LuTrophy size={22} />, title: "Top Performer", text: "90%+ average grade" },
        { icon: <LuFlame size={22} />, title: "Streak Master", text: "7-day learning streak" }
    ];

    return (
        <SideBar title="Profile" userData={user}>

            <div className="w-full h-auto py-5 px-7">

                {/* PROFILE CARD */}
                <div className="w-full p-6 bg-white border-1 border-[#D8D6EF] flex flex-col md:flex-row md:space-x-4 mt-5 rounded-lg">

                    <p className="w-16 h-16 rounded-full text-[#1A7A4A] font-semibold bg-[#E8F5EC] flex items-center justify-center">
                        {user.fullName?.split(" ").map(n => n[0]).join("") || "U"}
                    </p>

                    <div className="flex flex-col w-full px-3">

                        <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">
                            {user.fullName || "Learner"}
                        </h3>

                        <div className="flex space-x-3">
                            <p className="w-28 px-3 py-1 text-xs bg-[#EAF3EE] text-[#4A5C52] border rounded-md">
                                {referenceNumber || "N/A"}
                            </p>

                            <p className="px-2.5 py-0.5 text-xs font-medium bg-[#E8F0FB] text-[#2563eb] rounded-full">
                                Learner
                            </p>
                        </div>

                        <div className="flex space-x-2 mt-3 items-center text-[#8A9E95] text-[14px]">
                            <LuMail />
                            <a href={`mailto:${user.email}`}>{user.email || "No email"}</a>
                        </div>

                        <div className="flex space-x-2 mt-1.5 items-center text-[#8A9E95] text-[14px]">
                            <LuCalendar />
                            <p>
                                Joined{" "}
                                {user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : "N/A"}
                            </p>
                        </div>

                    </div>
                </div>

                {/* STATS */}
                <div className="w-full py-1.5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                    <div className="p-5 bg-white rounded-xl border-[#D8D6EF]">
                        <h3 className="text-2xl font-semibold">{stats.enrolledCourses || 0}</h3>
                        <p className="text-sm text-[#8A9E95]">Enrolled Courses</p>
                    </div>

                    <div className="p-5 bg-white rounded-xl border-[#D8D6EF]">
                        <h3 className="text-2xl font-semibold">{stats.completedCourses || 0}</h3>
                        <p className="text-sm text-[#8A9E95]">Completed</p>
                    </div>

                    <div className="p-5 bg-white rounded-xl border-[#D8D6EF]">
                        <h3 className="text-2xl font-semibold">{stats.averageProgress || 0}%</h3>
                        <p className="text-sm text-[#8A9E95]">Avg Progress</p>
                    </div>

                    <div className="p-5 bg-white rounded-xl border-[#D8D6EF]">
                        <h3 className="text-2xl font-semibold">{stats.certificates || 0}</h3>
                        <p className="text-sm text-[#8A9E95]">Certificates</p>
                    </div>

                </div>

                {/* COURSES */}
                <div className="w-full mt-6">

                    <h3 className="text-xl font-semibold mb-4">Learning History</h3>

                    <div className="flex flex-col space-y-4">

                        {courses.map((data, index) => (
                            <div key={index} className="p-5 bg-white border rounded-lg flex space-x-3">

                                <div className="w-12 h-12 bg-[#E8F5EC] rounded-lg flex items-center justify-center text-[#1A7A4A]">
                                    <LuBookOpen />
                                </div>

                                <div className="flex flex-col w-full">

                                    <h3 className="font-semibold">{data.title}</h3>

                                    <p className="text-sm text-[#8A9E95]">
                                        by {data.author || data.instructor}
                                    </p>

                                    <div className="w-full h-1.5 bg-[#D8E6DF] rounded-full mt-2">
                                        <div
                                            className="h-full bg-[#1A7A4A] rounded-full"
                                            style={{ width: `${data.progress || 0}%` }}
                                        />
                                    </div>

                                    <p className="text-sm text-[#8A9E95] mt-1">
                                        {data.progress || 0}% complete
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>

                {/* ACHIEVEMENTS */}
                <div className="w-full my-6">

                    <h3 className="text-xl font-semibold mb-4">Achievements</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

                        {achievements.map((data, index) => (
                            <div key={index} className="border p-5 rounded-xl bg-white flex flex-col items-center">

                                <div className="text-[#1A7A4A]">
                                    {data.icon}
                                </div>

                                <h3 className="font-medium text-sm">{data.title}</h3>
                                <p className="text-xs text-[#8A9E95]">{data.text}</p>

                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </SideBar>
    );
}
