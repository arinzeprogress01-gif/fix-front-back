import { LuAward, LuBookOpen, LuCalendar, LuFlag, LuFlame, LuMail, LuTrophy } from "react-icons/lu";
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

    const user = profileData?.user || profileData || {};
    const stats = profileData.stats || {};
    const courses = profileData.courses || [];

    // ✅ FIX: USE THIS PROPERLY
    const referenceNumber =
        user?.role === "learner"
            ? user?.learnerRef
            : user?.tutorRef;

    // ✅ FIX: SAFE DATE HANDLING (THIS SOLVES N/A ISSUE)
    const joinedDate =
        user?.createdAt ||
        user?.created_at ||
        profileData?.createdAt ||
        profileData?.created_at;

    const achievements = [
        {
            icon: <LuFlag size={22} />,
            title: 'First Course',
            text: 'Enrolled in first course'
        },
        {
            icon: <LuBookOpen size={22} />,
            title: 'Bookworm',
            text: 'Completed 3 courses'
        },
        {
            icon: <LuTrophy size={22} />,
            title: 'Top Performer',
            text: '90%+ average grade'
        },
        {
            icon: <LuFlame size={22} />,
            title: 'Streak Master',
            text: '7-day learning streak'
        }
    ];

    return (
        <>
            <SideBar title="Profile" userData={user}>
                <div className="h-auto px-7 py-5 w-full">

                    {/* PROFILE CARD */}
                    <div className="bg-white border-1 border-[#D8D6EF] flex flex-col md:flex md:flex-row md:space-x-4 mt-5 p-6 rounded-lg w-full">

                        <p className="bg-[#E8F5EC] flex font-semibold h-16 items-center justify-center rounded-full text-[#1A7A4A] w-16">
                            {user.fullName?.split(" ").map(n => n[0]).join("") || "U"}
                        </p>

                        <div className="flex flex-col md:w-auto px-3 w-full">

                            <h3 className="font-semibold mb-2 text-2xl text-[#1A1A1A]">
                                {user.fullName || "Learner"}
                            </h3>

                            <div className="flex space-x-3">
                                {/* ✅ FIXED HERE */}
                                <p className="bg-[#EAF3EE] border border-[#D8E6DF] px-3 py-1 rounded-md text-[#4A5C52] text-xs w-35">
                                    {referenceNumber || "N/A"}
                                </p>

                                <p className="bg-[#E8F0FB] flex font-medium items-center justify-center px-2.5 py-0.5 rounded-lg text-[#2563eb] text-xs">
                                    Learner
                                </p>
                            </div>

                            <div className="flex items-center mt-3 space-x-2 text-[#8A9E95] text-[14px]">
                                <LuMail />
                                <a href={`mailto:${user.email}`}>{user.email || "No email"}</a>
                            </div>

                            <div className="flex items-center mt-1.5 space-x-2 text-[#8A9E95] text-[14px]">
                                <LuCalendar />
                                <p>
                                    Joined{" "}
                                    {joinedDate
                                        ? new Date(joinedDate).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* STATS */}
                    <div className="gap-5 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mt-5 py-1.5 w-full">

                        <div className="bg-white border-1 border-[#D8D6EF] flex flex-col p-5 rounded-xl">
                            <h3 className="font-semibold text-2xl">
                                {stats.enrolledCourses || 0}
                            </h3>
                            <p className="text-[#8A9E95] text-sm">Enrolled Courses</p>
                        </div>

                        <div className="bg-white border-1 border-[#D8D6EF] flex flex-col p-5 rounded-xl">
                            <h3 className="font-semibold text-2xl">
                                {stats.completedCourses || 0}
                            </h3>
                            <p className="text-[#8A9E95] text-sm">Completed</p>
                        </div>

                        <div className="bg-white border-1 border-[#D8D6EF] flex flex-col p-5 rounded-xl">
                            <h3 className="font-semibold text-2xl">
                                {stats.averageProgress || 0}%
                            </h3>
                            <p className="text-[#8A9E95] text-sm">Avg Progress</p>
                        </div>

                        <div className="bg-white border-1 border-[#D8D6EF] flex flex-col p-5 rounded-xl">
                            <h3 className="font-semibold text-2xl">
                                {stats.certificates || 0}
                            </h3>
                            <p className="text-[#8A9E95] text-sm">Certificates</p>
                        </div>

                    </div>

                    {/* LEARNING HISTORY */}
                    <div className="mt-4 w-full">
                        <h3 className="font-semibold mb-4 text-xl">
                            Learning History
                        </h3>

                        <div className="flex flex-col py-3 space-y-4 w-full">

                            {courses.map((data, index) => (
                                <div
                                    key={index}
                                    className="bg-white border-1 border-[#D8D6EF] flex p-5 rounded-lg space-x-3"
                                >
                                    <div className="bg-[#E8F5EC] flex h-12 items-center justify-center rounded-lg text-[#1A7A4A] w-12">
                                        <LuBookOpen className="h-5 w-5" />
                                    </div>

                                    <div className="flex flex-col w-full">

                                        <h3 className="font-semibold text-[#1A1A1A]">
                                            {data.title}
                                        </h3>

                                        <p className="mb-3 text-[#8A9E95] text-sm">
                                            by {data.author || data.instructor}
                                        </p>

                                        <div className="bg-[#D8E6DF] h-1.5 relative rounded-full w-full">
                                            <div
                                                className="absolute bg-[#1A7A4A] h-full rounded-full"
                                                style={{ width: `${data.progress || 0}%` }}
                                            />
                                        </div>

                                        <p className="mt-2 text-[#8A9E95] text-sm">
                                            {data.progress || 0}% complete
                                        </p>

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* ACHIEVEMENTS */}
                    <div className="my-4 w-full">
                        <h3 className="font-semibold mb-4 text-[#1A1A1A] text-xl">Achievements</h3>

                        <div className="gap-5 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 py-1 sm:grid-cols-1 w-full">
                            {achievements.map((data, index) => (
                                <div key={index} className="bg-white border-1 border-[#D8D6EF] flex flex-col items-center p-5 rounded-xl space-y-2">
                                    <div className="flex h-9 items-center justify-center text-[#1A7A4A] w-9">
                                        {data.icon}
                                    </div>
                                    <h3 className="font-medium mb-1 text-[#1A1A1A] text-sm">{data.title}</h3>
                                    <p className="text-[#8A9E95] text-xs">{data.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </SideBar>
        </>
    )
}