import { useEffect } from "react"
import SideBar from "./components/sidebar";
import { LuUsers, LuAward, LuActivity, LuBookOpen, LuPlus, LuSquareCheck, LuUser, LuTrendingUp, LuCircleAlert } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import image1 from '../../images/cos1.jpg'
import image2 from '../../images/cos2.jpg'
import { motion } from "framer-motion";
import { buttonHoverEffects } from "../leaners/components/effect";
export default function Tutor_Dashboard(){
    useEffect(() => {
        document.title = 'TalentFlow - Tutor_Dashboard'
    }, []);
    const stats = [
        {
            icon : <LuBookOpen  size={15}/>,
            title : 'My Courses',
            value : 2,
            background : '[#E8F5EC] ',
            color : '[#1A7A4A]'
        },
        {
            icon : <LuUsers />,
            title : 'Active Interns',
            value : 28,
            background : '[#E8F0FB]',
            color : '[#2563EB]'
        },
        {
            icon : <LuSquareCheck />,
            title : 'Pending Submissions',
            value : '1',
            background : '[#FFF8E6]',
            color : '[#D9771C]',
        },
        {
            icon : <LuTrendingUp />,
            title : 'Avg Completion',
            value : '73%',
            background : '[#E8F5EC] ',
            color : '[#1A7A4A]'
        },
    ];
    const course = [
        {
            image : image1,
            title : 'Introduction to Web Development',
            percent : 78,
            modules : 4
        },
        {
            image : image2,
            title : 'Mobile App Development',
            percent : 68,
            modules : 6
        },
    ];
    const data = [
        {
            text : 'Active Courses',
            value: 2
        },
        {
            text : 'Total Interns',
            value : 28
        },
    ];
    return(
        <SideBar title="Dashboard">
            <div className="w-full h-auto p-5">
                <div className="w-full h-auto rounded-xl p-5 flex flex-col mt-5 bg-gradient-to-r from-[#1A7748] to-[#15663C]">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white text-normal">Welcome, Chukwuemeka!</h3>
                    <p className="mt-2 text-sm text-white/90">You're guiding  73% average completion rate </p>
                    <div className="flex w-65 my-4 items-center justify-between">
                        {data.map((details, index) => (
                            <div key={index} className="py-2 px-5 bg-[#4B8966] rounded-md">
                                <h3 className="text-[13px] text-white/80 text-[#DCE8E1] font-semibold">
                                    {details.text}
                                </h3>
                                <p className="text-white font-bold text-3xl leading-normal">
                                    {details.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col space-y-5 md:space-y-0 md:flex md:flex-row py-3 md:py-5 mt-5 md:space-x-5">
                    <Link 
                        to="/create-course"
                        className="w-full md:w-1/2 p-5 border-1 border-[#D8D6EF] rounded-lg bg-white flex space-x-3 group hover:border-1 hover:border-[#1A7A4A] transition-all ">
                        <div className="w-12 h-12 bg-[#E8F5EC] rounded-lg flex items-center justify-center group-hover:bg-[#1A7A4A]">
                            <LuPlus  className="w-6 h-6 text-[#1A7A4A] group-hover:text-white"/>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-[#1A1A1A] mb-1 text-lg">Create New Course</h3>
                            <p className="text-sm text-[#8A9E95]">Build and upload a new course</p>
                        </div>
                    </Link>
                    <Link 
                        to="/submissions"
                        className="w-full md:w-1/2 p-5 border-1 border-[#D8D6EF] rounded-lg bg-white flex space-x-3 group hover:border-1 hover:border-[#1A7A4A] transition-all ">
                        <div className="w-12 h-12 bg-[#E8F0FB] rounded-lg flex items-center justify-center group-hover:bg-[#2563eb]">
                            <LuSquareCheck  className="w-6 h-6 text-[#2563eb] group-hover:text-white"/>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-[#1A1A1A] mb-1 text-lg">Review Submissions</h3>
                            <p className="text-sm text-[#8A9E95]">1 Pending review</p>
                        </div>
                    </Link>
                </div>
                <div className="w-full py-5 mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((data, index) => (
                        <div className="p-5 rounded-xl bg-white flex flex-col border-1 border-[#D8ECDF]">
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 p-2 rounded-md flex items-center justify-center bg-${data.background} text-${data.color} group-hover:bg-${data.color}`}>
                                    {data.icon}
                                </div>
                                <p className="text-sm text-[#8A9E95]">{data.title}</p>
                            </div>
                            <h3 className="mt-4 font-semibold text-3xl">
                                {data.value}
                            </h3>
                            
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-col py-2 mt-2">
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">My Courses</p>
                        <Link className="text-[13px] lg:text-sm font-semibold text-[#1A7A4A]"> View all courses</Link>
                    </div>
                    <div className="mt-5 py-3 lg:flex lg:flex-row flex flex-col lg:space-x-5 space-y-5 lg:space-y-0">
                        {course.map((data, index) => (
                            <div className="w-full lg:w-1/2 rounded-xl border-1 border-[#D8ECDF] flex flex-col group overflow-hidden">
                                <img src={data.image} alt="CourseImage" className="rounded-t-xl w-full h-40 object-cover group-hover:scale-105 transition-all duration-300" />
                                <div className="w-full flex flex-col py-3 px-4 bg-white rounded-b-xl">
                                    <h3 className="text-md font-semibold group-hover:text-[#1A7A4A] my-3">{data.title}</h3>
                                    <div className="flex justify-between items-center text-sm">
                                        <p className="text-[#8A9E95]">{data.modules} modules</p>
                                        <h3 className="text-[#1A7A4A] font-medium">{data.percent}% completion</h3>
                                    </div>
                                    <div className="flex space-x-5 mt-5 mb-2">
                                        <motion.button {...buttonHoverEffects} className="cursor-pointer w-1/2 border py-2.5 rounded-lg text-sm font-semibold bg-[#1A7A4A] hover:bg-[#156239] transition-all duration-200 text-white ">
                                            <Link to="/student-course" className="w-full h-full">View Content </Link>
                                        </motion.button>
                                        <motion.button {...buttonHoverEffects} className="cursor-pointer w-1/2 border py-2.5 rounded-lg text-sm font-semibold  border-2 border-[#1A7A4A] hover:bg-[#E8F5EC] transition-all duration-200 text-[#1A7A4A]">
                                            <Link to="/student-course" className="w-full h-full">Add Content</Link>
                                        </motion.button>
                                    </div>
                                        
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full py-5 flex flex-col space-y-3 mt-3">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-semibold text-[#1A1A1A]">Recent Submissions</p>
                            <Link className="text-[13px] lg:text-sm font-semibold text-[#1A7A4A]"> View all</Link>
                            
                        </div>
                        <Link className="w-full p-5 border-1 border-[#D8ECDF] bg-white rounded-lg hover:bg-[#E8F5EC] transition-all">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-[#1A1A1A] mb-1"> Adeola Ogunleye</h3>
                                <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFF8E6] text-[#d97706] ">
                                    Pending
                                </span>
                            </div>
                            <p className="text-sm text-[#8A9E95]">3/28/2026</p>
                        </Link>
                    </div>
                    <div className="w-full py-5 flex flex-col space-y-3 mt-3">
                        <p className="text-xl font-semibold text-[#1A1A1A]">Interns Needing Attention</p>
                        <div className="w-full rounded-lg bg-white border-1 border-[#D8ECDF] flex flex-col space-5">
                            <div className="w-full p-5 border-b-1 border-[#D8ECDF] flex space-x-4 hover:bg-[#E8F5EC]">
                                <div className="w-10 h-10 bg-[#FDECEA] rounded-full flex items-center justify-center">
                                    <LuCircleAlert  className="w-5 h-5 text-[#dc2626]"/>
                                </div>
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[#1A1A1A]">Chidinma Okonkwo</h3>
                                        <Link className="text-sm text-[#1A7A4A] hover:underline font-semibold">View Profile</Link>
                                    </div>
                                    <p className="text-sm text-[#dc2626]">Low completion rate</p>
                                    
                                </div>
                            </div>
                            <div className="w-full p-5 border-b-1 border-[#D8ECDF] flex space-x-4 hover:bg-[#E8F5EC]">
                                <div className="w-10 h-10 bg-[#FDECEA] rounded-full flex items-center justify-center">
                                    <LuCircleAlert  className="w-5 h-5 text-[#dc2626]"/>
                                </div>
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[#1A1A1A]">Chidinma Okonkwo</h3>
                                        <Link className="text-sm text-[#1A7A4A] hover:underline font-semibold">View Profile</Link>
                                    </div>
                                    <p className="text-sm text-[#dc2626]">Low completion rate</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SideBar>
    )
}