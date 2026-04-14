import { LuTrendingUp, LuTrophy, LuCalendar, LuEye  } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { Link } from "react-router-dom";

export default function Progress(){
    const timeline = [
        {
            title : 'Joined TalentFlow',
            date : 'January 15 2024'
        },
        {
            title : 'First Course Enrolled',
            date : 'January 20, 2024'
        },
        {
            title : 'Completed First Assignment',
            date : 'February 10, 2024'
        },
        {
            title : 'First Course Completed',
            date : 'March 20, 2024'
        }
    ]
    const course_progress = [
        {
            title : 'Introduction to Web Development',
            author : 'Mr Chukwuemeka Nwosu [WEB TEAM]',
            modules : '3 of 4',
            percent : 65
        },
        {
            title : 'UI/UX Design Principles',
            author : 'Mrs Amina Bello [UI/UX TEAM]',
            modules : '1 of 3',
            percent : 30
        },
        {
            title : 'Digital Marketing Fundamentals',
            author : 'Mrs Blessing Okafor [MARKETING TEAM]',
            modules : '2 of 2',
            percent : 100,
        },
    ]
    const progress_stats = [
        {
            icon : <LuTrophy />,
            title : 'Course Completed',
            style : 'bg-[#E8F5EC] text-[#1A7A4A]',
            value : 1,
        },
        {
            icon : <LuEye />,
            title : 'In Progress',
            style : 'bg-[#E8F0FB] text-[#2563EB]',
            value : 2
        },
        {
            icon : <LuCalendar />,
            title : 'Learning Days',
            style : 'bg-[#FDECDA] text-[#DD3E31]',
            value : 72
        }
    ]
    return(
        <>
            <SideBar title="Progress">
                <div className="h-auto p-5 w-full">
                    <h3 className="font-semibold mt-3 text-2xl">Learning Progress</h3>
                    <p className="mt-2 text-[#8A9E95] text-sm">Track your journey and achievements</p>
                    <div className="bg-gradient-to-br from-[#1A7A4A] mt-5 px-5 py-8 rounded-lg to-[#156239]">
                        <div className="flex space-x-2">
                            <LuTrendingUp  className="bg-white/20 h-12 p-3 rounded-lg text-white w-12"/>
                            <div className="flex flex-col">
                                <p className="text-sm text-white/80">Overall Completion</p>
                                <h3 className="font-semibold text-3xl text-white">65%</h3>
                            </div>
                        </div>
                        <div className="mt-3 w-full">
                            <div className="bg-[#D8E6DF] h-1.5 relative rounded-full w-full">
                                <div className="absolute bg-[#1A7A4A] h-full rounded-full w-[65%]"></div>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-white/90">You're making great progress! Keep up the momentum</p>
                    </div>
                    <div className="gap-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-5 py-5 sm:grid-cols-1 w-full">
                        {progress_stats .map((data, index) => (
                            <div className="bg-white border border-1 border-[#D8D6EF] flex flex-col px-5 py-6 rounded-xl">
                                <div className="flex items-center space-x-2.5">
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${data.style}`}>
                                        {data.icon}
                                    </div>
                                    <p className="text-[#8A9E95] text-sm">
                                        {data.title}
                                    </p>
                                </div>
                                <h3 className="font-semibold mt-3 text-2xl">
                                    {data.value}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 py-5 w-full">
                        <p className="font-semibold text-lg">Course Progress</p>
                        <div className="flex flex-col py-5 space-y-3 w-full">
                            {course_progress.map((data, index) => (
                                <div className="bg-white border-1 border-[#D8D6EF] duration-300 flex flex-col hover:border-[#1A7A4A] p-5 rounded-lg transition-all w-full">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-[#1A1A1A]">{data.title}</h3>
                                        <h3 className="font-semibold text-2xl text-[#1A7A4A]">
                                            {data.percent}%
                                        </h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#8A9E95] text-sm">by {data.author}</p>
                                        <p className="text-[#8A9E95] text-[12px]">Completed</p>
                                    </div>
                                    <div className="mt-5 w-full">
                                        <div className="bg-[#D8E6DF] h-1.5 relative rounded-full w-full">
                                            <div className="absolute bg-[#1A7A4A] h-full rounded-full" style={{ width: `${data.percent}%` }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-[#8A9E95] text-sm">{data.modules} modules completed</p>
                                        <Link className="font-semibold hover:underline text-[#1A7A4A] text-[14px]">{data.percent === 100 ? 'View Certificates' : ''}</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="py-5 w-full">
                        <p className="font-semibold text-lg">Milestone Timeline</p>
                        <div className="bg-white flex flex-col mt-5 py-5 rounded-xl space-y-3 w-full">
                            {timline.map((data) => (
                                <div className="flex p-3 space-x-3">
                                    <div className="bg-[#E8F5EC] flex h-9 items-center justify-center rounded-full text-[#1A7A4A] w-9">
                                        <LuTrophy />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold mb-1 text-[#1A1A1A]">{data.title}</h3>
                                        <p className="text-[#8A9E95] text-sm">{data.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SideBar>
        </>
    )
}