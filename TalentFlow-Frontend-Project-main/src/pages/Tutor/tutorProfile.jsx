import { LuAward, LuBookOpen, LuCalendar, LuFlag, LuFlame, LuMail, LuTrophy } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { useEffect, useState } from "react";   // ✅ ADDED
import axios from "axios";                     // ✅ ADDED

export default function TutorProfilePage() {

    const [userData, setUserData] = useState(null);   // ✅ ADDED
    const token = localStorage.getItem("token");      // ✅ ADDED

    // ✅ FETCH USER
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
    ]

    const learningHistory = [
        {
            title: 'Introduction to Web Development',
            author: 'Chukwuemeka Nwosu',
            percent: 65
        },
        {
            title: 'UI/UX Design Principles',
            author: 'Amina Bello',
            percent: 30
        },
        {
            title: 'Digital Marketing Fundamentals',
            author: 'Blessing Okafor',
            percent: 100
        },
    ]

    const profileStats = [
        { value: 3, title: 'Enrolled Courses', cos: '' },
        { value: 1, title: 'Completed', cos: '' },
        { value: 65, title: 'Avg Progress', cos: '%' },
        { value: 1, title: 'Certificates', cos: '' }
    ]

    return (
        <>
            <SideBar title="ST-Profile" userData={userData}> {/* ✅ ADDED */}
                <div className="h-auto px-7 py-5 w-full">

                    <div className="bg-white border-1 border-[#D8D6EF] flex-col md:flex md:flex-row md:space-x-4 mt-5 p-6 rounded-lg w-full">

                        {/* ✅ INITIALS */}
                        <p className="bg-[#E8F5EC] flex font-semibold h-16 items-center justify-center rounded-full text-[#1A7A4A] w-16">
                            {userData?.fullName
                                ?.split(" ")
                                .map(n => n[0])
                                .join("")
                                .toUpperCase() || "NA"}
                        </p>

                        <div className="flex flex-col md:w-auto px-3 w-full">

                            {/* ✅ NAME */}
                            <h3 className="font-semibold mb-2 text-2xl text-[#1A1A1A]">
                                {userData?.fullName || "User Name"}
                            </h3>

                            <div className="flex space-x-3">
                                {/* ✅ TRN */}
                                <p className="bg-[#EAF3EE] border border-[#D8E6DF] px-3 py-1 rounded-md text-[#4A5C52] text-xs w-28">
                                    {userData?.trn || "TRN"}
                                </p>

                                <p className="bg-[#E8F0FB] font-medium px-2.5 py-0.5 rounded-full text-[#2563eb] text-xs">
                                    Tutor
                                </p>
                            </div>

                            {/* ✅ EMAIL */}
                            <div className="flex items-center mt-3 space-x-2 text-[#8A9E95] text-[14px]">
                                <LuMail />
                                <a href={`mailto:${userData?.email}`}>
                                    {userData?.email || "email@example.com"}
                                </a>
                            </div>

                            {/* ✅ DATE (left as is) */}
                            <div className="flex items-center mt-1.5 space-x-2 text-[#8A9E95] text-[14px]">
                                <LuCalendar />
                                <p>Joined 1/15/2024</p>
                            </div>

                        </div>
                    </div>

                    {/* STATS */}
                    <div className="gap-5 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mt-5 py-1.5 sm:grid-cols-1 w-full">
                        {profileStats.map((data, index) => (
                            <div key={index} className="bg-white border-1 border-[#D8D6EF] flex flex-col p-5 rounded-xl">
                                <h3 className="font-semibold mb-1 text-2xl text-[#1A1A1A]">
                                    {data.value}{data.cos}
                                </h3>
                                <p className="text-[#8A9E95] text-sm">{data.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* LEARNING HISTORY */}
                    <div className="mt-4 w-full">
                        <h3 className="font-semibold mb-4 text-[#1A1A1A] text-xl">Learning History</h3>

                        <div className="flex flex-col py-3 space-y-4 w-full">
                            {learningHistory.map((data, index) => (
                                <div key={index} className="bg-white border-1 border-[#D8D6EF] flex p-5 rounded-lg space-x-3 w-full">

                                    <div className="bg-[#E8F5EC] flex h-12 items-center justify-center rounded-lg text-[#1A7A4A] w-12">
                                        <LuBookOpen className="h-5 w-5" />
                                    </div>

                                    <div className="flex flex-col w-full">

                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold mb-1 text-[#1A1A1A]">
                                                {data.title}
                                            </h3>

                                            {data.percent === 100 && (
                                                <LuAward className="bg-[#E8F5EC] h-10 p-2 rounded-full text-[#1A7A4A] w-10" />
                                            )}
                                        </div>

                                        <p className="mb-3 text-[#8A9E95] text-sm">
                                            by {data.author}
                                        </p>

                                        <div className="w-full">
                                            <div className="bg-[#D8E6DF] h-1.5 mb-2 relative rounded-full w-full">
                                                <div
                                                    className="absolute bg-[#1A7A4A] h-full rounded-full"
                                                    style={{ width: `${data.percent}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <p className="text-[#8A9E95] text-sm">
                                            {data.percent}% complete
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
                                    <h3 className="font-medium mb-1 text-[#1A1A1A] text-sm">
                                        {data.title}
                                    </h3>
                                    <p className="text-[#8A9E95] text-xs">
                                        {data.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </SideBar>
        </>
    )
}