import { useEffect, useState } from "react"
import SideBar from "./components/sidebar";
import image1 from '../../images/cos1.jpg'
import image2 from '../../images/cos2.jpg'
import { motion } from "framer-motion";
import { LuBookOpen, LuClock, LuCircleCheck } from "react-icons/lu";

import { Link } from "react-router-dom";
import { buttonHoverEffects } from "./components/effect";
import axios from "axios";
export default function Learners_Dashboard(){
    const [progressData, setProgressData] = useState(null);
    const [search, setSearch] = useState("");
    const [userData, setUserData] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        document.title = "Learners_Dashboard";

        const fetchData = async () => {
            try {
                const [progressRes, userRes] = await Promise.all([
                    axios.get("https://talentflowbackend.onrender.com/api/progress", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("https://talentflowbackend.onrender.com/api/user/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setProgressData(progressRes.data.data);
                setUserData(userRes.data.data);

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

    if (token) fetchData();
  }, [token]);
    
  // Modification to remove loading on sidebar and only show loading on main content
    const isLoading = !progressData || !userData;

    if (isLoading) {
        return (
            <div className="p-5"  userData={null}>
                Loading dashboard...
            </div>
        );
    }

  const enrolledCourses = progressData?.courses?.length || 0;
  const overallProgress = progressData?.overallStats?.completionPercentage || 0;

  const handleEnroll = (courseTitle) => {
        const updated = {
            ...progressData,
            courses: [
                ...(progressData.courses || []),
                { title: courseTitle, progress: 0 }
            ]
        };

        setProgressData(updated);
    };

    // useEffect(() => {
    //     document.title = 'Learners_Dashboard'
    // }, []);
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
    const staticCourses = [
        {
            image: image1,
            title: 'Introduction to Web Development',
            author: 'Chukwuemeka Nwosu',
            percent: 0
        },
        {
            image: image2,
            title: 'UI/UX Design Principles',
            author: 'Amina Bello',
            percent: 0
        }
    ];

    // Merge backend courses to displayed courses
    const course = [
        ...staticCourses,
        ...(progressData?.courses || []).map((c) => ({
            title: c.title,
            author: c.instructor || "Instructor",
            percent: c.progress || 0,
            image: image1 // fallback image
        }))
    ];
     const filteredCourses = course.filter((c) =>
         c.title?.toLowerCase().includes(search.toLowerCase()) //added question mark here
    );
    const data = [
        // {
        //     title : 'Enrolled Courses',
        //     value : 3
        // },
        {
            title : 'Enrolled Courses',
            value : enrolledCourses
        },
        // {
        //     title : 'Overall Progress',
        //     value : '65%'
        // }
        {
            title : 'Overall Progress',
            value : `${overallProgress}`
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
            <div className="h-auto p-5 w-full">
                <div className="bg-gradient-to-br flex flex-col from-[#1A7A4A] h-auto lg:mt-5 p-5 rounded-xl to-[#156239] w-full">
                    <h3 className="font-semibold lg:text-3xl mt-2 text-2xl text-normal text-white">Welcome {userData?.fullName || "Learner"}</h3>
                    <p className="mt-2 text-sm text-white/80">You're doing great! Keep up the momentum and continue your learning journey</p>
                    <div className="flex items-center my-4 space-x-5 w-75">
                        <div className="bg-[#4B8966] px-4 py-2 rounded-md w-1/2">
                            <p className="text-white/80 text-xs">Enrolled</p>
                            <p className="font-bold text-white text-xl">{enrolledCourses}</p>
                        </div>

                        <div className="bg-[#4B8966] px-4 py-2 rounded-md w-1/2">
                            <p className="text-white/80 text-xs">Progress</p>
                            <p className="font-bold text-white text-xl">{overallProgress}%</p>
                        </div>
                    </div>
                    
                    {/* <div className="flex items-center justify-between my-4 w-75">
                        {data.map((details, index) => (
                            <div key={index} className="bg-[#4B8966] px-5 py-2 rounded-md">
                                <h3 className="font-semibold text-[#DCE8E1] text-[13px] text-white/80">
                                    {details.title}
                                </h3>
                                <p className="font-bold leading-semi-bold text-2xl text-white">
                                    {details.value}
                                </p>
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="mt-5">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white border-1 border-[#D8ECDF] p-2 rounded-md w-full"
                        />
                </div>
                <div className="flex gap-5 grid grid-cols lg:grid-cols-3 md:grid-cols-2 mt-5 py-5 sm:grid-cols-1 w-full">
                    {stats.map((data, index) => (
                        <div className="bg-white border-1 border-[#D8ECDF] flex flex-col hover:border-[#1A7A4A] items-left p-5 rounded-xl transition-all">
                            <div className="flex space-x-3">
                                <div className={`w-10 h-10 p-2 rounded-md flex items-center justify-center ${data.style}`}>
                                    {data.icon}
                                </div>
                                <p className="text-[#8A9E95] text-sm">
                                    {data.text}
                                </p>
                                
                            </div>
                            <h3 className="font-semibold mt-3.5 text-3xl">
                                    {data.value}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col mt-2 py-2 w-full">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-lg">Continue Learning</p>
                        <Link className="font-semibold lg:text-sm text-[#1A7A4A] text-[13px]"> View all courses</Link>
                    </div>
                    <div className="flex flex-col lg:flex lg:flex-row lg:space-x-5 lg:space-y-0 mt-5 py-3 space-y-5">
                        {filteredCourses.map((data, index) => (
                            <div key={index} className="border-1 border-[#D8ECDF] flex flex-col group lg:w-1/2 overflow-hidden rounded-xl w-full">
                                <img src={data.image} alt="CourseImage" className="duration-300 group-hover:scale-105 h-40 object-cover rounded-t-xl transition-all w-full" />
                                <div className="bg-white flex flex-col px-4 py-3 rounded-b-xl w-full">
                                    <h3 className="font-semibold group-hover:text-[#1A7A4A] mt-3 text-md">{data.title}</h3>
                                    <p className="mt-2 text-[#8A9E95] text-sm">by {data.author}</p>
                                    <div className="mt-3 w-full">
                                        <div className="bg-[#E8F5EC] h-1.5 relative rounded-xl w-full">
                                            <div className={`absolute  h-full bg-[#1A7A4A] rounded-xl`} style={{ width: `${data.percent}%` }}></div>
                                        </div>
                                    </div>
                                    <p className="mt-1.5 text-[#8A9E95] text-sm">
                                        {/* {data.percent}% */} 
                                        0%
                                    </p>
                                    <motion.button 
                                        onClick={() => handleEnroll(data.title)}
                                        {...buttonHoverEffects} className="bg-[#1A7A4A] border cursor-pointer duration-200 font-semibold hover:bg-[#156239] mb-2 mt-4 py-2.5 rounded-lg text-sm text-white transition-all w-full">
                                        {/* <Link to="/student-course" className="h-full w-full">Continue Learning</Link> */}
                                        Enroll / Continue
                                    </motion.button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mt-2 py-2 w-full">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-lg">Upcoming Deadlines</p>
                        <Link className="font-semibold text-[#1A7A4A] text-sm"> View all assignments</Link>
                    </div>
                    <div className="border-1 border-[#D8ECDF] flex flex-col mt-5 py-5 rounded-xl w-full">
                        {deadlines.map((data, index) =>(
                            <div className="bg-white border-[#D8ECDF] border-b-1 duration-300 flex flex-col hover:bg-[#EAF3EE] hover:rounded-xl p-3 transition-all w-full">
                                <div className="flex items-center justify-between mt-2">
                                    <h3 className="font-semibold text-lg">{data.title}</h3>
                                    <p className={`text-[10px] rounded-full px-2.5 py-0.5 font-semibold ${data.style}`}>{data.status}</p>
                                </div>
                                <p className="text-[#8A9E95] text-[13px]">{data.sub_text}</p>
                                <div className="flex items-center mt-2.5 space-x-2 text-[#8A9E95]">
                                    <LuClock  className="h-3 mt-0.5 w-3"/>
                                    <p className="text-[11px]">{data.due}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mt-2 py-2 w-full">
                        <p className="font-semibold text-lg">Recent Activity</p>
                        <div className="bg-white border-1 border-[#D8ECDF] flex flex-col mt-5 px-3 py-5 rounded-xl w-full">
                            {activity.map((data, index) =>(
                                <div className="flex flex-col p-3">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full bg-${data.style}`}></div>
                                        <h3 className="text-[13px]">{data.tits} : <span className="font-semibold">{data.title}</span></h3>
                                    </div>
                                    <p className="ml-5 text-[#8A9E95] text-[12px]">
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