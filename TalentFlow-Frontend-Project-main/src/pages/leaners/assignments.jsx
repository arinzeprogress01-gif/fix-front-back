import { useEffect, useState } from "react";
import SideBar from "./components/sidebar";
import { FaSearch } from "react-icons/fa";
import { LuClipboardList, LuClock } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Assignments() {

    const [assignments, setAssignments] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [userData, setUserData] = useState(null);

    // 🔥 FETCH FROM BACKEND (getProgress)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "https://talentflowbackend.onrender.com/api/user/me",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                setUserData(res.data.data);

            } catch (err) {
                console.error("Error fetching user", err);
            }
        };

        fetchUser();
    }, []);

    const assignment_status = ['All Status', 'Pending', 'Submitted', 'Graded', 'Overdue'];

    const filteredAss =
        selectedStatus === "All Status"
            ? assignments
            : assignments.filter(item => item.status === selectedStatus);

    // 🔥 Dynamic stats
    const assignment_stats = [
        {
            value: assignments.length,
            title: 'Total',
            style: '[#000000]'
        },
        {
            value: assignments.filter(a => a.status === "Pending").length,
            title: 'Pending',
            style: '[#D9771C]'
        },
        {
            value: assignments.filter(a => a.status === "Submitted").length,
            title: 'Submitted',
            style: '[#2563EB]'
        },
        {
            value: assignments.filter(a => a.status === "Graded").length,
            title: 'Graded',
            style: '[#1A7A4A]'
        }
    ];

    if (!userData) {
        return <div className="p-5">Loading assignments...</div>;
    }

    return (
        <>
            <SideBar title="Assignments" userData={userData}>
                <div className="h-auto p-5 w-full">
                    <h3 className="font-semibold mt-3 text-2xl">Assignments</h3>
                    <p className="mt-2 text-[#8A9E95] text-sm">
                        Manage and submit your course assignments
                    </p>

                    {/* 🔥 STATS */}
                    <div className="gap-5 grid grid-cols-2 lg:grid-cols-4 mt-5 py-4 sm:grid-cols-2 w-full">
                        {assignment_stats.map((data, index) => (
                            <div key={index} className="bg-white border border-[#D8D6EF] flex flex-col p-5 rounded-xl">
                                <h3 className="font-medium text-2xl">{data.value}</h3>
                                <p className="mt-1 text-[#8A98AB] text-sm">{data.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* 🔥 FILTER */}
                    <div className="flex flex-col justify-between lg:flex lg:flex-row mt-3 space-y-3 w-full">
                        <div className="bg-white border border-[#D8D6EF] flex h-11 items-center lg:w-[75%] px-3 rounded-lg space-x-2 w-full">
                            <FaSearch className="text-[#8F9E95]" />
                            <input
                                type="text"
                                placeholder="Search assignments..."
                                className="border-none h-full outline-none text-[#8A9E95] text-[13px] w-full"
                            />
                        </div>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="bg-white border border-[#D8D6EF] cursor-pointer h-11 lg:w-[23%] outline-none px-3 rounded-lg text-[13px] w-full"
                        >
                            {assignment_status.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))}
                        </select>
                    </div>

                    {/* 🔥 LIST */}
                    <div className="flex-col mt-5 py-3 space-y-4 w-full">
                        {filteredAss.length === 0 ? (
                            <p className="text-[#8A9E95] text-sm">No assignments yet</p>
                        ) : (
                            filteredAss.map((data, index) => (
                                <div key={index} className="bg-white border border-[#D8D6EF] hover:border-[#1A7A4A] p-5 rounded-lg transition-all w-full">
                                    <div className="flex space-x-3 w-full">
                                        <div className="bg-[#E8F5EC] flex h-9 items-center justify-center rounded-md text-[#1A7A4A] w-9">
                                            <LuClipboardList />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-md">{data.title}</h3>
                                                <p className={`text-[11px] px-3 rounded-full py-0.5 font-semibold ${data.style}`}>
                                                    {data.status}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-0.5">
                                                <p className="mt-1.5 text-[#8A9E95] text-[14px]">
                                                    {data.sub_title}
                                                </p>

                                                <Link
                                                    to={`/assignment/${data.id}`}
                                                    className="font-semibold hover:underline text-[#1A7A4A] text-[13px]"
                                                >
                                                    {data.link_text}
                                                </Link>
                                            </div>

                                            <p className="mt-1 text-[#4A5C52] text-[13px]">
                                                {data.text}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-4 py-1.5 space-x-1.5 text-[#8A9E95] text-[12px]">
                                        <LuClock className="h-3.5 w-3.5" />
                                        <p>Due {data.due}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </SideBar>
        </>
    );
}        