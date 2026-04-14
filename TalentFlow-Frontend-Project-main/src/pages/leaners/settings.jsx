import { useEffect, useState } from "react";
import axios from "axios";
import { LuBell, LuLock, LuSave, LuUser } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // 🔥 FETCH REAL USER PROFILE
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "https://talentflowbackend.onrender.com/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUser(res.data.data);

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        if (token) fetchUser();

    }, [token]);

    // 🔥 LOGOUT FUNCTION
    const handleLogout = async () => {
        try {
            await axios.post(
                "https://talentflowbackend.onrender.com/api/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            localStorage.removeItem("token");
            navigate("/login");

        } catch (err) {
            console.log(err.response?.data || err.message);

            // force logout anyway
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    return (
        <SideBar title="Settings">
            <div className="w-full h-auto p-5 lg:p-10">

                <h3 className="font-semibold text-2xl mt-3">Account Settings</h3>
                <p className="text-sm mt-2 text-[#4A5C52]">
                    Manage your profile and preferences
                </p>

                {/* PROFILE INFORMATION */}
                <div className="p-5 border-1 w-full mt-5 rounded-xl bg-white border-[#D8D6EF]">

                    <div className="space-x-4 flex items-center">
                        <LuUser className="text-[#1A7A4A] w-5 h-5" />
                        <p className="text-[#1A1A1A] font-semibold">
                            Profile Information
                        </p>
                    </div>

                    <form className="w-full mt-2 py-4">

                        {/* NAME */}
                        <div className="flex flex-col mb-4">
                            <label className="text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={user?.fullName || ""}
                                readOnly
                                className="text-[#1A1A1A] text-[14px] w-full h-11 border-1 border-[#D8D6EF] px-3 rounded-md outline-[#1A7A4A]"
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="text-[#1A1A1A] text-[14px] w-full h-11 border-1 border-[#D8D6EF] px-3 rounded-md outline-[#1A7A4A]"
                            />
                        </div>

                    </form>
                </div>

                {/* NOTIFICATIONS */}
                <div className="p-5 border-1 w-full mt-5 rounded-xl bg-white border-[#D8D6EF]">

                    <div className="space-x-4 flex items-center">
                        <LuBell className="text-[#1A7A4A] w-5 h-5" />
                        <p className="text-[#1A1A1A] font-semibold">
                            Notifications
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex flex-col mt-4">
                            <h3 className="text-[#1A1A1A] font-semibold">
                                Push Notifications
                            </h3>
                            <p className="text-sm text-[#8A9E95]">
                                Receive notifications about course updates
                            </p>
                        </div>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex flex-col mt-4">
                            <h3 className="text-[#1A1A1A] font-semibold">
                                Email Updates
                            </h3>
                            <p className="text-sm text-[#8A9E95]">
                                Get weekly summaries via email
                            </p>
                        </div>
                        <input type="checkbox" className="w-5 h-5" />
                    </div>
                </div>

                {/* SECURITY */}
                <div className="p-5 border-1 w-full mt-5 rounded-xl bg-white border-[#D8D6EF]">

                    <div className="space-x-4 flex items-center">
                        <LuLock className="text-[#1A7A4A] w-5 h-5" />
                        <p className="text-[#1A1A1A] font-semibold">
                            Security
                        </p>
                    </div>

                    <button className="border-2 mt-5 px-6 rounded-lg py-2.5 text-[#4A5C52] border-[#D8E6DF]">
                        Change Password
                    </button>

                    {/* 🔥 LOGOUT BUTTON */}
                    <button
                        onClick={handleLogout}
                        className="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Logout
                    </button>

                </div>

                {/* SAVE BUTTON (kept for future backend update) */}
                <div className="w-full p-5 mt-1.5 flex justify-end">
                    <button className="px-6 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] font-medium flex items-center">
                        <LuSave className="mr-2 w-4.5 h-4.5" />
                        Save Changes
                    </button>
                </div>

            </div>
        </SideBar>
    );
}
