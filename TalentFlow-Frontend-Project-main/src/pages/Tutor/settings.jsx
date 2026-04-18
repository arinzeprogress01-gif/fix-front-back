import { LuBell, LuLock, LuSave, LuUser } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";   // ✅ ADDED
import axios from "axios";                     // ✅ ADDED

export default function TutorProfileSettings() {

    const [userData, setUserData] = useState(null);  // ✅ ADDED
    const token = localStorage.getItem("token");     // ✅ ADDED

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

    return (
        <>
            <SideBar title="Settings" userData={userData}> {/* ✅ ADDED */}
                <div className="h-auto lg:p-10 p-5 w-full">
                    <h3 className="font-semibold mt-3 text-2xl">Account Settings</h3>
                    <p className="mt-2 text-[#4A5C52] text-sm">Manage your profile and preferences</p>

                    <div className="bg-white border-1 border-[#D8D6EF] mt-5 p-5 rounded-xl w-full">
                        <div className="flex items-center space-x-4">
                            <LuUser className="h-5 text-[#1A7A4A] w-5" />
                            <p className="font-semibold text-[#1A1A1A]">Profile Information</p>
                        </div>

                        <form className="mt-2 py-4 w-full">

                            {/* ✅ NAME FILLED */}
                            <div className="flex flex-col mb-4">
                                <label className="font-medium mb-1.5 text-[#1A1A1A] text-sm">Full Name</label>
                                <input
                                    type="text"
                                    value={userData?.fullName || ""}
                                    readOnly
                                    className="border h-11 outline-[#1A7A4A] px-3 rounded-md text-[#1A1A1A] text-[14px] w-full"
                                />
                            </div>

                            {/* ✅ EMAIL FILLED */}
                            <div className="flex flex-col">
                                <label className="font-medium mb-1.5 text-[#1A1A1A] text-sm">Email Address</label>
                                <input
                                    type="email"
                                    value={userData?.email || ""}
                                    readOnly
                                    className="border h-11 outline-[#1A7A4A] px-3 rounded-md text-[#1A1A1A] text-[14px] w-full"
                                />
                            </div>

                        </form>
                    </div>

                    <div className="bg-white border-1 border-[#D8D6EF] mt-5 p-5 rounded-xl w-full">
                        <div className="flex items-center space-x-4">
                            <LuBell className="h-5 text-[#1A7A4A] w-5" />
                            <p className="font-semibold text-[#1A1A1A]">Notifications</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col mt-4">
                                <h3 className="font-semibold">Push Notifications</h3>
                                <p className="text-[#8A9E95] text-sm">Recieve notifications about course updates</p>
                            </div>
                            <input type="checkbox" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col mt-4">
                                <h3 className="font-semibold">Email Updates</h3>
                                <p className="text-[#8A9E95] text-sm">Get weekly summaries via email</p>
                            </div>
                            <input type="checkbox" />
                        </div>
                    </div>

                    <div className="bg-white border-1 border-[#D8D6EF] mt-5 p-5 rounded-xl w-full">
                        <div className="flex items-center space-x-4">
                            <LuLock className="h-5 text-[#1A7A4A] w-5" />
                            <p className="font-semibold text-[#1A1A1A]">Security</p>
                        </div>

                        <button className="border-2 border-[#D8E6DF] hover:border-[#1A7A4A] hover:text-[#1A7A4A] mt-5 px-6 py-2.5 rounded-lg text-[#4A5C52]">
                            <Link>
                                Change Password
                            </Link>
                        </button>
                    </div>

                    <div className="flex justify-end mt-1.5 p-5 w-full">
                        <button className="bg-[#1A7A4A] flex font-medium hover:bg-[#156239] items-center px-6 py-3 rounded-lg text-white">
                            <LuSave className="h-4.5 mr-2 mt-0.5 w-4.5" /> Save Changes
                        </button>
                    </div>
                </div>
            </SideBar>
        </>
    )
}