import { useEffect } from "react"
import SideBar from "./components/sidebar";
import image1 from '../../images/cos1.jpg'
import image2 from '../../images/cos2.jpg'
import { motion } from "framer-motion";
import { LuBookOpen, LuClock, LuCircleCheck } from "react-icons/lu";

import { Link } from "react-router-dom";
import { buttonHoverEffects } from "./components/effect";
export default function Learners_Dashboard(){
    useEffect(() => {
        document.title = 'Learners_Dashboard'
    }, []);
    const activity = [
        {
            tits: 'Completed Lessons',
            title : 'Javascript Basics',
            time : '2 hours ago',
            style : '[#1A7A4A]'
        },
        {
            tits: 'Submitted Assignments',
            title : 'Calculator Project',
            time : 'Yesterday',
            // style : '[#2563EB]'
            style : '[#1A7A4A]'

        },
        {
            tits: 'Recieved grade',
            title : '92/100 on UI/UX Assignment',
            time : '2 days ago',
            style : '[#1A7A4A]'
        }
    ]
    const deadlines = [
        {
            title : 'Build a Personal Portfolio Website',
            sub_text : 'Introduction to Web Development',
            due : '4/5/2026',
            status : 'Pending',
            style : 'bg-[#FFF8E6] text-[#D9771C]'
        },
        {
            title : 'Javascript Calculator Project',
            sub_text : 'Introduction to Web Development',
            due : '3/30/2026',
            status : 'Submitted',
            style : 'bg-[#E8F0FB] text-[#2563EB]',
        },
        {
            title : 'Redesign a Mobile App',
            sub_text : 'UI/UX Design Principles',
            due : '4/15/2026',
            status : 'Graded',
            style : 'bg-[#E8F5EC] text-[#1A7A4A]',
        }
    ]
    const course = [
        {
            image : image1,
            title : 'Introduction to Web Development',
            author : 'Chukwuemeka Nwosu',
            percent : 65
        },
        {
            image : image2,
            title : 'UI/UX Design Principles',
            author : 'Amina Bello',
            percent : 30
        },
        

    ]
    const data = [
        {
            title : 'Enrolled Courses',
            value : 3
        },
        {
            title : 'Overall Progress',
            value : '65%'
        }
    ];
    const stats = [
        {
            icon : <LuBookOpen />,
            text : 'Active Courses',
            value : 2,
            style : 'bg-[#E8F5EC] text-[#1A7A4A]',
        },
        {
            icon : <LuClock />,
            text : 'Pending Assignments',
            value : 1,
            style : 'bg-[#E8F0FB] text-[#2563EB]',
        },
        {
            icon : <LuCircleCheck />,
            text : 'Completed Courses',
            value : 1,
            style : 'bg-[#E8F5EC] text-[#1A7A4A]',
        }
    ]
    return(
        <SideBar title="Dashboard">
            <div className="w-full h-auto p-5">
                <div className="w-full h-auto rounded-xl p-5 flex flex-col lg:mt-5 bg-gradient-to-br from-[#1A7A4A] to-[#156239]">
                    <h3 className="text-2xl lg:text-3xl font-semibold text-white text-normal mt-2">Welcome Back, Adeola!</h3>
                    <p className="mt-2 text-sm text-white/80">You're doing great! Keep up the momentum and continue your learning journey</p>
                    <div className="flex w-75 my-4 items-center justify-between">
                        {data.map((details, index) => (
                            <div key={index} className="py-2 px-5 bg-[#4B8966] rounded-md">
                                <h3 className="text-[13px] text-white/80 text-[#DCE8E1] font-semibold">
                                    {details.title}
                                </h3>
                                <p className="text-white font-bold text-2xl leading-semi-bold">
                                    {details.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex py-5 mt-5 grid grid-cols sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {stats.map((data, index) => (
                        <div className="flex flex-col items-left p-5 rounded-xl bg-white border-1 border-[#D8ECDF] hover:border-[#1A7A4A] transition-all">
                            <div className="flex space-x-3">
                                <div className={`w-10 h-10 p-2 rounded-md flex items-center justify-center ${data.style}`}>
                                    {data.icon}
                                </div>
                                <p className="text-sm text-[#8A9E95]">
                                    {data.text}
                                </p>
                                
                            </div>
                            <h3 className="mt-3.5 font-semibold text-3xl">
                                    {data.value}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-col py-2 mt-2">
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">Continue Learning</p>
                        <Link className="text-[13px] lg:text-sm font-semibold text-[#1A7A4A]"> View all courses</Link>
                    </div>
                    <div className="mt-5 py-3 lg:flex lg:flex-row flex flex-col lg:space-x-5 space-y-5 lg:space-y-0">
                        {course.map((data, index) => (
                            <div className="w-full lg:w-1/2 rounded-xl border-1 border-[#D8ECDF] flex flex-col group overflow-hidden">
                                <img src={data.image} alt="CourseImage" className="rounded-t-xl w-full h-40 object-cover group-hover:scale-105 transition-all duration-300" />
                                <div className="w-full flex flex-col py-3 px-4 bg-white rounded-b-xl">
                                    <h3 className="text-md font-semibold group-hover:text-[#1A7A4A] mt-3">{data.title}</h3>
                                    <p className="text-sm mt-2 text-[#8A9E95]">by {data.author}</p>
                                    <div className="w-full mt-3">
                                        <div className="relative w-full h-1.5 rounded-xl bg-[#E8F5EC]">
                                            <div className={`absolute  h-full bg-[#1A7A4A] rounded-xl`} style={{ width: `${data.percent}%` }}></div>
                                        </div>
                                    </div>
                                    <p className="mt-1.5 text-[#8A9E95] text-sm">
                                        {data.percent}%
                                    </p>
                                    <motion.button {...buttonHoverEffects} className="cursor-pointer w-full border mt-4 mb-2 py-2.5 rounded-lg text-sm font-semibold bg-[#1A7A4A] hover:bg-[#156239] transition-all duration-200 text-white ">
                                        <Link to="/student-course" className="w-full h-full">Continue Learning</Link>
                                    </motion.button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col py-2 mt-2">
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold">Upcoming Deadlines</p>
                        <Link className="text-sm font-semibold text-[#1A7A4A]"> View all assignments</Link>
                    </div>
                    <div className="w-full flex flex-col border-1 border-[#D8ECDF] mt-5 py-5 rounded-xl">
                        {deadlines.map((data, index) =>(
                            <div className="p-3 border-b-1 border-[#D8ECDF] hover:rounded-xl w-full bg-white flex flex-col hover:bg-[#EAF3EE] transition-all duration-300">
                                <div className="flex justify-between items-center mt-2">
                                    <h3 className="text-lg font-semibold">{data.title}</h3>
                                    <p className={`text-[10px] rounded-full px-2.5 py-0.5 font-semibold ${data.style}`}>{data.status}</p>
                                </div>
                                <p className="text-[13px] text-[#8A9E95]">{data.sub_text}</p>
                                <div className="flex space-x-2 mt-2.5 items-center text-[#8A9E95]">
                                    <LuClock  className="w-3 h-3 mt-0.5"/>
                                    <p className="text-[11px]">{data.due}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col py-2 mt-2">
                        <p className="text-lg font-semibold">Recent Activity</p>
                        <div className="w-full flex flex-col border-1 bg-white border-[#D8ECDF] mt-5 py-5 px-3 rounded-xl">
                            {activity.map((data, index) =>(
                                <div className="p-3 flex flex-col">
                                    <div className="flex space-x-3 items-center">
                                        <div className={`w-2 h-2 rounded-full bg-${data.style}`}></div>
                                        <h3 className="text-[13px]">{data.tits} : <span className="font-semibold">{data.title}</span></h3>
                                    </div>
                                    <p className="text-[12px] text-[#8A9E95] ml-5">
                                        {data.time}
                                    </p>

                                </div>
                            ))}
                        </div>
                </div>
                
            </div>
        </SideBar>
    )
}