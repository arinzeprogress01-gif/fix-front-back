import { LuBell, LuLock, LuSave, LuUser } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileSettings() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // 🔥 FETCH REAL USER PROFILE
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
            navigate("/sign-in");

        } catch (err) {
            console.log(err.response?.data || err.message);

            // force logout anyway
            localStorage.removeItem("token");
            navigate("/sign-in");
        }
    };

    return (
        <>
            <SideBar title="Settings" userData={user}>
                <div className="h-auto lg:p-10 p-5 w-full">
                    <h3 className="font-semibold mt-3 text-2xl">Account Settings</h3>
                    <p className="mt-2 text-[#4A5C52] text-sm">Manage your profile and preferences</p>
                    <div className="bg-white border-1 border-[#D8D6EF] mt-5 p-5 rounded-xl w-full">
                        <div className="flex items-center space-x-4">
                            <LuUser className="h-5 text-[#1A7A4A] w-5" />
                            <p className="font-semibold text-[#1A1A1A]">Profile Information</p>
                        </div>
                        <form className="mt-2 py-4 w-full">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="" className="font-medium mb-1.5 text-[#1A1A1A] text-sm">Full Name</label>
                                <input type="text" value={user?.fullName || ""} readOnly className="border-1 border-[#D8D6EF] h-11 outline-[#1A7A4A] px-3 rounded-md text-[#1A1A1A] text-[14px] w-full" />
                                {/* <input type="text" placeholder="Adeola Ogunleye" className="border-1 border-[#D8D6EF] h-11 outline-[#1A7A4A] px-3 rounded-md text-[#1A1A1A] text-[14px] w-full" /> */}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="font-medium mb-1.5 text-[#1A1A1A] text-sm">Email Address</label>
                                <input type="email" value={user?.email || ""} readOnly className="border-1 border-[#D8D6EF] h-11 outline-[#1A7A4A] px-3 rounded-md text-[#1A1A1A] text-[14px] w-full" />
                            </div>
                        </form>
                    </div>
                    <div className="bg-white border-1 border-[#D8D6EF] mt-5 p-5 rounded-xl w-full">
                        <div className="flex items-center space-x-4">
                            <LuBell className="h-5 text-[#1A7A4A] w-5" />
                            <p className="font-semibold text-[#1A1A1A]">Notifications</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col mt-4 space-y-0.5">
                                <h3 className="font-semibold text-[#1A1A1A]">Push Notifications</h3>
                                <p className="text-[#8A9E95] text-sm">Recieve notifications about course updates</p>
                            </div>
                            <input type="checkbox" className="border-[#D8E6DF] focus:ring-[#1A7A4A] h-5 rounded text-[#1A7A4A] w-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col mt-4 space-y-0.5">
                                <h3 className="font-semibold text-[#1A1A1A]">Email Updates</h3>
                                <p className="text-[#8A9E95] text-sm">Get weekly summaries via email</p>
                            </div>
                            <input type="checkbox" className="border-[#D8E6DF] focus:ring-[#1A7A4A] h-5 rounded text-[#1A7A4A] w-5" />
                        </div>
                    </div>

                    <div className="bg-white border-1 border-[#D8D6EF] mt-5 p-5 rounded-xl w-full">
                        <div className="flex items-center space-x-4">
                            <LuLock className="h-5 text-[#1A7A4A] w-5" />
                            <p className="font-semibold text-[#1A1A1A]">Security</p>
                        </div>
                        <button className="border-2 border-[#D8E6DF] cursor-pointer hover:border-[#1A7A4A] hover:outline-1 hover:outline-[#1A7A4A] hover:text-[#1A7A4A] mt-5 px-6 py-2.5 rounded-lg text-[#4A5C52]">
                            <Link className="w-full">
                                Change Password
                            </Link>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 cursor-pointer hover:bg-red-700 ml-5 mt-4 px-6 py-2.5 rounded-lg text-white"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="flex justify-end mt-1.5 p-5 w-full">
                        <button className="bg-[#1A7A4A] cursor-pointer flex font-medium hover:bg-[#156239] items-center px-6 py-3 rounded-lg text-white"> <LuSave className="h-4.5 mr-2 mt-0.5 w-4.5" /> Save Changes</button>
                    </div>
                </div>
            </SideBar>
        </>
    )
}