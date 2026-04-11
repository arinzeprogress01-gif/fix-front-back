import { useEffect, useState } from "react";
import SideBar from "./components/sidebar";
import { FaSearch } from "react-icons/fa";
import { LuClipboardList, LuClock } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Assignments() {

    const [assignments, setAssignments] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All Status");

    // 🔥 FETCH FROM BACKEND (getProgress)
    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await axios.get("/api/progress", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const milestones = res.data.data.milestones || [];

                // 🔥 Convert milestones → assignments
                const mappedAssignments = milestones
                    .filter(m => m.title.toLowerCase().includes("assignment"))
                    .map((m, index) => ({
                        id: index + 1,
                        title: m.title,
                        sub_title: m.course || "General Course",
                        text: "Complete this assignment to progress in your course",
                        status: "Pending",
                        due: m.date,
                        style: "bg-[#FFF8E6] text-[#D9771C]",
                        link_text: "Submit Assignment"
                    }));

                setAssignments(mappedAssignments);

            } catch (err) {
                console.error("Error fetching assignments", err);
            }
        };

        fetchAssignments();
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

    return (
        <>
            <SideBar title="Assignments">
                <div className="w-full h-auto p-5">
                    <h3 className="font-semibold text-2xl mt-3">Assignments</h3>
                    <p className="text-sm mt-2 text-[#8A9E95]">
                        Manage and submit your course assignments
                    </p>

                    {/* 🔥 STATS */}
                    <div className="py-4 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                        {assignment_stats.map((data, index) => (
                            <div key={index} className="p-5 border rounded-xl border-[#D8D6EF] bg-white flex flex-col">
                                <h3 className="text-2xl font-medium">{data.value}</h3>
                                <p className="text-sm mt-1 text-[#8A98AB]">{data.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* 🔥 FILTER */}
                    <div className="w-full mt-3 lg:flex lg:flex-row flex flex-col space-y-3 justify-between">
                        <div className="w-full lg:w-[75%] h-11 border border-[#D8D6EF] bg-white rounded-lg flex items-center px-3 space-x-2">
                            <FaSearch className="text-[#8F9E95]" />
                            <input
                                type="text"
                                placeholder="Search assignments..."
                                className="text-[#8A9E95] text-[13px] border-none outline-none w-full h-full"
                            />
                        </div>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="border w-full lg:w-[23%] h-11 border-[#D8D6EF] bg-white rounded-lg px-3 text-[13px] outline-none cursor-pointer"
                        >
                            {assignment_status.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))}
                        </select>
                    </div>

                    {/* 🔥 LIST */}
                    <div className="w-full py-3 mt-5 flex-col space-y-4">
                        {filteredAss.length === 0 ? (
                            <p className="text-[#8A9E95] text-sm">No assignments yet</p>
                        ) : (
                            filteredAss.map((data, index) => (
                                <div key={index} className="w-full p-5 border border-[#D8D6EF] rounded-lg bg-white hover:border-[#1A7A4A] transition-all">
                                    <div className="w-full flex space-x-3">
                                        <div className="w-9 h-9 rounded-md flex items-center justify-center bg-[#E8F5EC] text-[#1A7A4A]">
                                            <LuClipboardList />
                                        </div>

                                        <div className="w-full flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold text-md">{data.title}</h3>
                                                <p className={`text-[11px] px-3 rounded-full py-0.5 font-semibold ${data.style}`}>
                                                    {data.status}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center mt-0.5">
                                                <p className="mt-1.5 text-[14px] text-[#8A9E95]">
                                                    {data.sub_title}
                                                </p>

                                                <Link
                                                    to={`/assignment/${data.id}`}
                                                    className="text-[13px] font-semibold text-[#1A7A4A] hover:underline"
                                                >
                                                    {data.link_text}
                                                </Link>
                                            </div>

                                            <p className="text-[13px] text-[#4A5C52] mt-1">
                                                {data.text}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-1.5 mt-4 py-1.5 items-center text-[#8A9E95] text-[12px]">
                                        <LuClock className="w-3.5 h-3.5" />
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
}            style : 'bg-[#FFF8E6] text-[#D9771C]',
            link_text : 'Submit Assignment'
        },
        {
            id : 2,
            title : 'Javascript Calculator Project',
            sub_title : 'Introduction to Web Development',
            text : 'Build a functional calculator using vanilla Javascript',
            status : 'Submitted',
            due : '3/30/2026',
            style : 'bg-[#E8F0FB] text-[#2563EB]',
            link_text : 'View Submission'
        },
        {
            id : 3,
            title : 'Redesign a Mobile App',
            sub_title : 'UI/UX Design Principles',
            text : 'Choose an existing mobile app and create a redesigned version with improved UX',
            status : 'Graded',
            due : '4/15/2026',
            result : '92/100',
            style : 'bg-[#E8F5EC] text-[#1A7A4A]',
            link_text : 'View Feedback'
        },
        {
            id : 4,
            title : 'Social Media Campaign Strategy',
            sub_title : 'Digital Marketing Fundamentals ',
            text : 'Develop a complete social media marketing strategy for a fictional band.',
            status : 'Overdue',
            due : '3/25/2026',
            style : 'bg-[#FDECDA] text-[#DD3E31]',
            link_text : 'Submit Assignment'
        },
    ]
    const assignment_status = ['All Status', 'Pending', 'Submitted', 'Graded', 'Overdue'];
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const filteredAss = selectedStatus === "All Status" ? assignments : assignments.filter(item => item.status === selectedStatus)
    return(
        <>
            <SideBar title="Assignments">
                <div className="w-full h-auto p-5">
                    <h3 className="font-semibold text-2xl mt-3">Assignments</h3>
                    <p className="text-sm mt-2 text-[#8A9E95]">Manage and submit your course assignments</p>
                    <div className="py-4 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                        {assignment_stats.map((data, index) => (
                            <div className="p-5 border-1 rounded-xl border-[#D8D6EF] bg-white flex flex-col">
                                <h3 className={`text-${data.style} text-2xl font-medium`}>{data.value}</h3>
                                <p className="text-sm mt-1 text-[#8A98AB]">{data.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 w-full mt-3 lg:flex lg:flex-row flex flex-col space-y-3 justify-between">
                        <div className="w-full lg:w-[75%] h-11 border border-[#D8D6EF] bg-white rounded-lg flex items-center px-3 space-x-2 focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all">
                            <FaSearch  className="text-[#8F9E95]"/>
                            <input type="text" placeholder="Search assignments..." className="text-[#8A9E95] text-[13px] border-none outline-none w-full h-full "/>
                        </div>
                        <select 
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="border w-full lg:w-[23%] h-11 lg:h-auto border border-[#D8D6EF] bg-white rounded-lg px-3 text-[13px] outline-none cursor-pointer">
                            {assignment_status.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full py-3 mt-5 flex-col space-y-4">
                        {filteredAss.map((data, index) => (
                                <div key={index} className=" w-full p-5 border-1 border-[#D8D6EF] rounded-lg bg-white hover:border-1 hover:border-[#1A7A4A] transition-all duration-300">
                                    <div className="w-full flex space-x-3">
                                        <div className="w-9 h-9 rounded-md flex items-center justify-center bg-[#E8F5EC] text-[#1A7A4A]">
                                            <LuClipboardList />
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold text-md">{data.title}</h3>
                                                <p className={`text-[11px] px-3 rounded-full py-0.5 font-semibold ${data.style}`}>{data.status}</p>
                                            </div>
                                            <div className="flex justify-between items-center mt-0.5">
                                                <p className="mt-1.5 text-[14px] text-[#8A9E95]">{data.sub_title}</p>
                                                <Link to={`/assignment/${data.id}`} className="text-[13px] font-semibold text-[#1A7A4A] hover:underline">{data.link_text}</Link>
                                            </div>
                                            <p className="text-[13px] text-[#4A5C52] mt-1">{data.text}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1.5 mt-4 py-1.5 items-center text-[#8A9E95] text-[12px]">
                                        <LuClock  className="w-3.5 h-3.5 "/>
                                        <p>Due {data.due}</p>
                                    </div>
                                </div>                            
                        ))}
                    </div>
                </div>
            </SideBar>
        </>
    )
}
