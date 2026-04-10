import { useEffect } from "react"
import SideBar from "../Tutor/components/sidebar";
import { LuUsers, LuAward, LuActivity, LuBookOpen } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Admin_Dashboard(){
    useEffect(() => {
        document.title = 'Admin_Dashboard'
    }, []);
    const stats = [
        {
            icon : <LuUsers  size={15}/>,
            title : 'Total Users',
            value : 52,
            sub_text : '+5 this month',
            background : '[#E8F5EC] ',
            color : '[#1A7A4A]'
        },
        {
            icon : <LuBookOpen />,
            title : 'Total Courses',
            value : 12,
            sub_text : '+2 this month', 
            background : '[#E8F0FB]',
            color : '[#2563EB]'
        },
        {
            icon : <LuActivity />,
            title : 'Avg Completion',
            value : '76%',
            sub_text : '+3 last month',
            background : '[#E8F5EC] ',
            color : '[#1A7A4A]'
        },
        {
            icon : <LuAward />,
            title : 'Certificates',
            value : 28,
            sub_text : '+7 this month',
            background : '[#FFF8E6]',
            color : '[#D9771C]'
        },
    ]
    const info = [
        {
            icon : <LuUsers size={20}/>,
            title : 'Manage Users',
            text : 'Add, edit, or remove users',
            background : '[#E8F5EC] ',
            color : '[#1A7A4A]'
        },
        {
            icon : <FaChartBar   size={20}/>,
            title : 'View Reports',
            text : 'Analytics and insights',
            background : '[#E8F0FB]',
            color : '[#2563EB]'
        },
        {
            icon : <LuAward   size={20}/>,
            title : 'Certificates',
            text : 'Manage issued certificates',
            background : '[#FFF8E6]',
            color : '[#D9771C]'
        },
    ];
    const data = [
        {
            text : 'Total Users',
            value: 52
        },
        {
            text : 'Active Interns',
            value : 42
        },
        {
            text : 'Total Courses',
            value : 12
        }
    ];
    return(
        <SideBar>
            <div className="w-full h-auto p-5 border">
                <div className="w-full h-auto rounded-xl p-5 flex flex-col mt-5 bg-gradient-to-r from-[#1A7748] to-[#15663C]">
                    <h3 className="text-3xl font-semibold text-white text-normal">Welcome, Funmilayo!</h3>
                    <p className="mt-2 text-sm text-white/80">Here's an overview of the TalentFlow Platform</p>
                    <div className="flex w-90 my-4 items-center justify-between">
                        {data.map((details, index) => (
                            <div key={index} className="py-2 px-4 bg-[#4B8966] rounded-md">
                                <h3 className="text-[13px] text-white/80 text-[#DCE8E1] font-semibold">
                                    {details.text}
                                </h3>
                                <p className="text-white font-bold text-xl leading-normal">
                                    {details.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex py-5 mt-5 grid grid-cols sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {info.map((data, index) => (
                        <Link className="p-5 border-1 rounded-lg bg-white flex group space-x-3 border-[#D8ECDF] hover:border-[#1A7A4A] transition-all ">
                            <div className={`w-12 h-12 p-2 rounded-md flex items-center justify-center bg-${data.background} text-${data.color} group-hover:bg-${data.color}`}>
                                {data.icon}
                            </div>
                            <div className="flex flex-col space-y-1">
                                <h3 className="font-semibold">
                                    {data.title}
                                </h3>
                                <p className="text-[#8A9E95] text-sm">
                                    {data.text}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="w-full py-5 mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((data, index) => (
                        <div className="p-5 rounded-xl bg-white flex flex-col border-1 border-[#D8ECDF]">
                            <div className="flex items-center space-x-3">
                                <div className={`w-9 h-9 p-2 rounded-md flex items-center justify-center bg-${data.background} text-${data.color} group-hover:bg-${data.color}`}>
                                    {data.icon}
                                </div>
                                <p className="text-sm text-[#8A9E95]">{data.title}</p>
                            </div>
                            <h3 className="mt-3.5 font-semibold text-2xl">
                                {data.value}
                            </h3>
                            <p className="mt-2 text-[10px] text-[#8A9E95]">
                                {data.sub_text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SideBar>
    )
}