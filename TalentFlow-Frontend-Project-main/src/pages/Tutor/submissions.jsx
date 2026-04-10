import { useEffect, useState } from "react";
import SideBar from "./components/sidebar";

export default function Submissions(){
    const submission_data = [
        {
            name : 'Adeola Ogunleye',
            date : '3/28/2026',
            text : 'I have completed the calculator project with all required functions',
            status : 'Pending',
            style : 'text-[#d97706] bg-[#FFF8E6]'
        },
        {
            name : 'Chidimna Okonkwo',
            date : '3/20/2026',
            status : 'Graded',
            grade : '88/100',
            style : 'text-[#1A7A4A] bg-[#E8F5EC]'
        },
    ]
    const search_options = ['All Submissions', 'Pending', 'Graded'];
    const [selectedStatus, setSelectedStatus] = useState("All Submissions")
    const filteredStatus = selectedStatus === "All Submissions" ? submission_data : submission_data.filter(data => data.status === selectedStatus);
    const ass_stats = [
        {
            value : 2,
            title : 'Total',
            style : '[#1A1A1A]'
        },
        {
            value : 1,
            title : 'Pending',
            style : '[#d97706]'
        },
        {
            value : 1,
            title : 'Graded',
            style : '[#1A7A4A]'
        },
        
    ]
    useEffect(() => {
        document.title = 'TalentFlow - Submissions'
    })
    return(
        <>
            <SideBar title="Submissions">
                <div className="w-full p-5">
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-2">Student Submissions</h3>
                    <p className="text-[#4A5C52]">Review and grade assignment submissions</p>
                    <div className="w-full py-3 grid grid-cols-1 sm:grod-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                        {ass_stats.map((data, index) => (
                            <div key={index} className="p-5 border bg-white rounded-lg border-[#D8ECDF] flex flex-col">
                                <h3 className={`text-2xl font-semibold mb-1 text-${data.style}`}>{data.value}</h3>
                                <p className="text-sm text-[#8A9E95]">{data.title}</p>
                            </div>
                        ))}
                    </div>
                    <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)} 
                    className="mt-5 cursor-pointer w-full md:w-64 py-3 px-7 bg-white border border-[#D8E6DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all appearance-none"
                        
                    name="" id="">
                        {search_options.map((data, index) => (
                            <option key={index} value={data}>{data}</option>
                        ))}
                    </select>
                    <div className="w-full py-3 mt-5 flex flex-col space-y-4">
                        {filteredStatus.map((data) => (
                            <div className="w-full border-1 border-[#D8D6EF] hover:border-1 hover:border-[#1A7A4A] p-7 flex flex-col rounded-lg bg-white">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-[#1A1A1A] mb-1">{data.name}</h3>
                                    <p className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${data.style}`}>
                                        {data.status}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-[#8A9E95] mb-3">Submitted on {data.date}</p>
                                    <p className="text-sm font-semibold text-[#1A7A4A]">{data.grade}</p>
                                </div>
                                <h3 className="text-sm text-[#4A5C52]">{data.text}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </SideBar>
        </>
    )
}