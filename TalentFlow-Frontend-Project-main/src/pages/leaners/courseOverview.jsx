import { useParams, Link } from "react-router-dom";
import SideBar from "./components/sidebar";
import { LuArrowLeft, LuBook, LuBookOpen, LuChartLine, LuChartNoAxesColumn, LuCheck, LuChevronDown, LuChevronUp, LuCircleHelp, LuClock, LuFile, LuInfo, LuVideo } from "react-icons/lu";
import { useState, useEffect } from "react";
import { progressCards, courseType } from "./data/course";
import { percent } from "framer-motion";
import axios from "axios";
export default function CourseOverview(){
    
    const [activeTab, setActiveTab] = useState("overview");
    const [openModule, setOpenModule] = useState(null);
    const [progressData, setProgressData] = useState(null)
    const [backendCourse, setBackendCourse] = useState(null);
    const token = localStorage.getItem("token");
    const { id } = useParams();

    if (!backendCourse) return alert("Course not loaded yet");
    
    const handleEnroll = async () => {
        try {
            await axios.post(
                "https://talentflowbackend.onrender.com/api/enroll",
                {
                    courseId: backendCourse._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Enrolled successfully!");

            // 🔥 refresh progress
            const res = await axios.get(
                "https://talentflowbackend.onrender.com/api/progress",
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setProgressData(res.data.data);

        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(err.response?.data?.message || "Error enrolling");
        }
    };
    // // const courses = courseType.find((item) => item.id ===   Number(id));
    const dummycourses = courseType.find((item) => item.id ===   Number(id));
    
    useEffect(() => {
        const fetchCourse = async () => {
            try {

                const res = await fetch("https://talentflowbackend.onrender.com/api/courses");
                const data = await res.json();

                const found = data.find((c, index) => index + 1 === Number(id)); // ✅ KEEP INDEX SYSTEM
                setBackendCourse(found || null);

            } catch (err) {
                console.error("Error fetching course:", err);
            }
        };

        fetchCourse();
    }, [id]);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get(
                    "https://talentflowbackend.onrender.com/api/progress",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setProgressData(res.data.data);

            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };

        if (token) fetchProgress();
    }, [token]);
    if (!dummycourses) return <p>Courses not available</p>;

    // const totalLessons = courses.modulesView.reduce((sum, module) => sum + (module.lessons?.length || 0), 0);
    // const completedLessons = courses.modulesView.reduce((sum, module) => sum + (module.lesssons_completed || 0),0);
    // const remaining_course = totalLessons - completedLessons

    if(!dummycourses) return <p>Courses not available</p>
    const courses = {
        ...dummycourses, title : backendCourse?.title || dummycourses.title,
        image : backendCourse?.image || dummycourses.image,
        author : backendCourse?.instructor || dummycourses.author,
        category : backendCourse?.category || dummycourses.category,
        text : backendCourse?.description || dummycourses.text,
        modulesView : dummycourses.modulesView

    }
    // if(!courses) return <p>Courses not available</p>

    const courseProgress =
        progressData?.courses?.find(c => c.title === courses.title);

    const percent = courseProgress?.progress || 0;
    const totalLessons = courses.modulesView.reduce(
        (sum, module) => sum + (module.lessons?.length || 0), 0
    );

    const completedLessons = courses.modulesView.reduce(
        (sum, module) => sum + (module.lesssons_completed || 0), 0
    );

    const remaining_course = totalLessons - completedLessons;

    return(
        <>
            <SideBar title="Courses">
                <div className="h-auto w-full">
                    <div className="h-80 relative w-full">
                        <img src={courses.image} alt="Course Image" className="h-full object-cover w-full" />
                        <div className="absolute bg-gradient-to-t from-black/70 h-full inset-0 left-0 p-5 to-transparent top-0 w-full">
                            <div className="flex flex-col p-5 w-auto">
                                <Link to="/student-course" className="flex font-semibold hover:text-[#E8F5EC] items-center space-x-1 text-white">
                                    <LuArrowLeft  size={15} className="mt-0.5"/>
                                    <p>Back to Courses</p>
                                </Link>
                                <div className="flex flex-col lg:mt-20 mt-10 py-2 space-y-2.5 w-auto">
                                    <p className="bg-[#1A7A4A] flex font-medium items-center justify-center px-3 py-1 rounded-full text-white text-xs w-25">{courses.category}</p>
                                    <h1 className="font-semibold mb-2 md:text-4xl text-3xl text-white">{courses.title}</h1>
                                    <p className="mb-3 text-white/90">by {courses.author}</p>
                                    <div className="flex space-x-4">
                                        <div className="flex items-center space-x-1 text-sm text-white/80">
                                            <LuClock  className="h-4 mt-0.5 w-4"/>
                                            <p>{courses.weeks} weeks</p>
                                        </div>
                                        <div className="flex items-center space-x-1 text-sm text-white/80">
                                            <LuBookOpen  className="h-4 mt-0.5 w-4"/>
                                            <p>{courses.modules} modules</p>
                                        </div>
                                        <div className="flex font-semibold items-center space-x-1 text-sm text-white/80">
                                            <LuClock  className="h-4 mt-0.5 w-4"/>
                                            <p>{courses.percent}% Complete</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="flex h-auto items-center md:p-5 mt-5 p-2 w-full">
                        <div className="bg-white border-1 border-[#D8D6EF] flex flex-col py-5 rounded-xl shadow-sm w-full">
                            <div className="border-[#D8D6EF] border-b-1 flex items-center md:space-x-4 space-x-2 w-full">
                                <button onClick={() => setActiveTab("overview")} className={`flex space-x-2 items-center px-2 md:px-4 py-2 h-full font-semibold text-[13px] md:text-sm cursor-pointer transition-all ${activeTab === "overview" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuInfo /> <p>Overview</p></button>
                                <button onClick={() => setActiveTab("content")}  className={`flex space-x-2 items-center px-2 md:px-4 py-2 h-full font-semibold text-[13px] md:text-sm cursor-pointer transition-all ${activeTab === "content" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuBookOpen /> <p>Course Content</p></button>
                                <button onClick={() => setActiveTab("progress")} className={`flex space-x-2 items-center px-2 md:px-4 py-2 h-full font-semibold text-[13px] md:text-sm cursor-pointer transition-all ${activeTab === "progress" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuChartLine /> <p>My Progress</p></button>
                                
                            </div>
                            {activeTab === "overview" && (
                                    <div className="px-5 py-2">
                                        <h3 className="font-semibold mb-4 text-[#1A1A1A] text-xl">About this Course</h3>
                                        <p className="leading-relaxed mb-6 text-[#4A5C52]">{courses.text}</p>
                                        <div className="flex flex-col lg:flex lg:flex-row lg:space-y-0 space-x-5 space-y-5">
                                            <div className="bg-[#F4F6F5] flex flex-col lg:w-1/3 p-4 rounded-lg w-full">
                                                <p className="mb-1 text-[#8A9E95] text-sm">Duration</p>
                                                <h3 className="font-semibold text-[#1A1A1A] text-lg">{courses.weeks} weeks</h3>
                                            </div>
                                            <div className="bg-[#F4F6F5] flex flex-col lg:w-1/3 p-4 rounded-lg w-full">
                                                <p className="mb-1 text-[#8A9E95] text-sm">Modules</p>
                                                <h3 className="font-semibold text-[#1A1A1A] text-lg">{courses.modules}</h3>
                                            </div>
                                            <div className="bg-[#F4F6F5] flex flex-col lg:w-1/3 p-4 rounded-lg w-full">
                                                <p className="mb-1 text-[#8A9E95] text-sm">Category</p>
                                                <h3 className="font-semibold text-[#1A1A1A] text-lg">{courses.category}</h3>
                                            </div>
                                        </div>
                                        <div className="bg-white border-1 border-[#D8D6EF] flex flex-col mt-5 p-5 rounded-lg w-full">
                                            {courses.percent === 0 && (
                                                <>
                                                    <h3 className="font-semibold mb-3 text-[#1A1A1A]">Ready to start learning?</h3>
                                                    <p className="text-[#4A5C52] text-sm">Enroll in this course to start your learning journey and gain new skills</p>
                                                <button
                                                    onClick={handleEnroll}
                                                    className="bg-[#1A7A4A] cursor-pointer font-medium hover:bg-[#156239] mt-5 py-3 rounded-lg text-white transition-colors"
                                                >
                                                    Enroll Now
                                                </button>
                                                </>
                                            )}
                                            {courses.percent > 0 && courses.percent < 100 && (
                                                <>
                                                    <h3 className="font-semibold mb-3 text-[#1A1A1A]">Your Enrollment</h3>
                                                    <div className="flex justify-between">
                                                        <p className="text-[#4A5C52] text-sm">Course Progress</p>
                                                        <p className="font-medium text-[#1A7A4A] text-sm">{courses.percent}%</p>   
                                                    </div>
                                                    <div className="mt-3 w-full">
                                                        <div className="bg-[#D8E6DF] h-1.5 relative rounded-full w-full">
                                                            <div className="absolute bg-[#1A7A4A] h-full rounded-full" style={{ width: `${courses.percent}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <button className="bg-[#1A7A4A] cursor-pointer font-medium hover:bg-[#156239] mt-5 py-3 rounded-lg text-white transition-colors">
                                                            Continue Learning
                                                    </button>
                                                </>
                                            )}
                                                    
                                            {courses.percent === 100 && (
                                                <>
                                                    <h3 className="font-semibold mb-3 text-[#1A1A1A]">Your Enrollment</h3>
                                                    <div className="flex justify-between">
                                                        <p className="text-[#4A5C52] text-sm">Course Progress</p>
                                                        <p className="font-medium text-[#1A7A4A] text-sm">{courses.percent}%</p>   
                                                    </div>
                                                    <div className="mt-3 w-full">
                                                        <div className="bg-[#D8E6DF] h-1.5 relative rounded-full w-full">
                                                            <div className="absolute bg-[#1A7A4A] h-full rounded-full" style={{ width: `${courses.percent}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button className="bg-[#1A7A4A] cursor-pointer font-medium hover:bg-[#156239] mt-5 py-3 rounded-lg text-white transition-colors w-1/2">
                                                            Review Course
                                                        </button>

                                                        <button className="border-2 border-[#1A7A4A] cursor-pointer font-medium hover:bg-[#156239] hover:border-2 hover:border-[#156239] hover:text-white mt-5 py-3 rounded-lg text-[#1A7A4A] transition-colors w-1/2">
                                                            View Certificate
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                            
                                            
                                            
                                        </div>
                                        <h3 className="font-semibold mt-5 text-[#1A1A1A]">Instructor</h3>
                                        <div className="bg-[#F4F6F5] flex items-center mt-5 p-4 rounded-lg rounded-lg space-x-3 w-full">
                                            <p className="bg-[#E8F5EC] flex font-medium h-12 items-center justify-center rounded-full text-[#1A7A4A] w-12">
                                                CN
                                            </p>
                                            <div className="flex flex-col">
                                                <h3 className="font-medium text-[#1A1A1A]">{courses.author}</h3>
                                                <p className="text-[#8A9E95] text-sm">Course Mentor</p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-[#4A5C52] text-sm">Experienced mentor with expertise in marketing</p>
                                    </div>
                                )}
                                {activeTab === "content" && (
                                    <div className="px-5 py-2">
                                        <div className="flex items-center justify-between mb-3 w-full">
                                            <h3 className="font-semibold py-2 text-[#1A1A1A] text-xl">Course Modules</h3>
                                            {/* <p className="text-[#8A9E95] text-sm">{courses.modules.m} of {module.no_of_lessons} completed</p> */}
                                        </div>
                                        <div className="flex flex-col space-y-5 w-full">
                                            {courses.modulesView.map((module) => (
                                                <div key={module.id} className="bg-white border-1 border-[#D8D6EF] flex hover:bg-[#EAF3EE] lg:p-5 p-3 rounded-lg space-x-3 transition-all w-full">
                                                    <p className="bg-[#E8F5EC] flex h-8 hidden items-center justify-center lg:flex rounded-lg shrink-0 w-8">{module.id}</p>
                                                    <div className="flex flex-col w-full">
                                                        <button onClick={() => setOpenModule(module.id)} className="cursor-pointer flex items-center justify-between">
                                                            <h3 className="font-medium mb-1 text-[#1A1A1A] text-lg">{module.title}</h3>
                                                            {openModule === module.id ? (
                                                                <LuChevronUp  className="h-5 text-[#4A5C52] w-5"/>
                                                            ) : (
                                                                <LuChevronDown  className="h-5 text-[#4A5C52] w-5"/>
                                                            )}
                                                        </button>
                                                        <p className="mb-2 text-[#8A9E95] text-sm">{module.sub_title}</p>
                                                        <div className="flex gap-4 items-center text-[#8A9E95] text-xs">
                                                            <p>{module.no_of_lessons} items</p>
                                                            <div className="bg-[#8A9E95] h-1 rounded-full w-1"></div>
                                                            <p>{module.lesssons_completed} / {module.no_of_lessons} completed</p>
                                                            <div className="bg-[#8A9E95] h-1 rounded-full w-1"></div>
                                                            <p>{module.duration} weeks</p>
                                                        </div>
                                                        <div className="bg-[#F4F6F5] mt-5 px-2 py-4 rounded-md space-y-3 w-full">
                                                            {openModule === module.id && module.no_of_lessons > 0 && module.lessons.map((data) => (
                                                                <Link 
                                                                // /student-course/:id/student-assessment/:id
                                                                    to={`/student-course/${courses.id}/module/${module.id}/student-assessment/${data.id}`}
                                                                    className="bg-white cursor-pointer duration-300 flex group hover:border-1 hover:border-[#1A7A4A] p-3 rounded-lg space-x-2.5 transition-all w-full">
                                                                    <div className="bg-[#E8F5EC] flex h-8 items-center justify-center rounded text-[#1A7A4A] w-8">
                                                                        <data.icon />
                                                                    </div>
                                                                    <div className="flex flex-col text-left w-[85%]">
                                                                        <h3 className="font-medium group-hover:text-[#1A7A4A] text-[#1A1A1A] text-sm transition-colors">{data.title}</h3>
                                                                        <div className="flex items-center mt-0.5 space-x-2 text-[#8A9E95] text-xs">
                                                                            <p>{data.resource_type}</p>
                                                                            <div className="bg-[#8A9E95] h-1 mt-0.5 rounded-full w-1"></div>
                                                                            <p>{data.duration}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="font-medium text-[#1A7A4A] text-xs">{data.status}</p>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div> 
                                                                                               
                                            ))}
                                        </div>
                                        {courses.percent === 0 && (
                                            <div className="bg-[#E8F5EC] border border-[#1A7A4A]/20 flex flex-col items-center mt-7 p-6 rounded-xl space-y-3.5 text-center w-full">
                                                <h3 className="font-semibold mb-2 text-[#1A1A1A]">Enroll to access course content!</h3>
                                                <p className="mb-4 text-[#4A5C52] text-sm">Start learning today and unlock all modules and lessons.</p>
                                            <button
                                                onClick={handleEnroll}
                                                className="bg-[#1A7A4A] cursor-pointer font-medium hover:bg-[#156239] mt-5 py-3 rounded-lg text-white transition-colors"
                                            >
                                                Enroll Now
                                            </button>
                                            </div>
                                        )}
                                        
                                        
                                    </div>
                                )}
                                {activeTab === "progress" && (
                                    <div className="px-5 py-2">
                                        {courses.percent > 0 &&  (
                                            <>
                                                <h3 className="font-semibold mb-4 mt-2 text-[#1A1A1A] text-xl">Your Progress</h3>
                                                <div className="bg-gradient-to-br border from-[#1A7A4A] p-6 rounded-xl text-white to-[#156239] w-full">
                                                    <p className="mb-2 opacity-90 text-sm">Overall Completion</p>
                                                    <h3 className="font-semibold mb-4 text-lg">{courses.percent}%</h3>
                                                    <div className="w-full">
                                                        <div className="bg-white/20 h-3 relative rounded-full w-full">
                                                            <div className="absolute bg-white h-full rounded-full" style={{ width: `${courses.percent}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:flex lg:flex-row lg:space-x-5 lg:space-y-0 mt-5 py-3 space-y-5 w-full">
                                                    <div className="bg-white border border-[#D8D6EF] flex flex-col lg:w-1/3 p-5 rounded-lg w-full">
                                                        <p className="mb-2 text-[#8A9E95] text-sm">Total Lessons</p>
                                                        <h3 className="font-semibold text-3xl text-[#1A1A1A]">{totalLessons}</h3>
                                                        
                                                    </div>
                                                    <div className="bg-white border border-[#D8D6EF] flex flex-col lg:w-1/3 p-5 rounded-lg w-full">
                                                        <p className="mb-2 text-[#8A9E95] text-sm">Completed</p>
                                                        <h3 className="font-semibold text-3xl text-[#1A7A4A]">{completedLessons}</h3>
                                                        
                                                    </div>
                                                    <div className="bg-white border border-[#D8D6EF] flex flex-col lg:w-1/3 p-5 rounded-lg w-full">
                                                        <p className="mb-2 text-[#8A9E95] text-sm">Remaining</p>
                                                        <h3 className="font-semibold text-3xl text-[#d97706]">{remaining_course}</h3>
                                                    </div>
                                                </div>
                                                <div className="bg-white border-1 border-[#D8D6EF] mt-5 p-5 rounded-lg w-full">
                                                    <h3 className="font-medium text-[#1A1A1A] text-md">Progress by Module</h3>
                                                    <div className="flex flex-col mt-4 space-y-3">
                                                        {courses.modulesView.map((data) => {
                                                            const course_range = data.no_of_lessons === 0 ? 0 :  Math.round((data.lesssons_completed / data.no_of_lessons) * 100);
                                                            return(
                                                                <div className="py-2">
                                                                    <div className="flex items-center justify-between w-full">
                                                                        <p className="font-medium text-[#1A1A1A] text-sm">Module {data.id}: {data.title}</p>
                                                                        <p className="font-medium text-[#1A7A4A] text-sm">{course_range}%</p>
                                                                    </div>
                                                                    <div className="mt-1.5 w-full">
                                                                        <div className="bg-[#EAF3EE] h-2 relative rounded-full w-full">
                                                                            <div className="absolute bg-[#1A7A4A] h-full rounded-full" style={{ width: `${course_range}%`}}></div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="mt-1 text-[#8A9E95] text-xs">{data.lesssons_completed} of {data.no_of_lessons} lessons completed</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    
                                                </div>
                                                <div className="bg-[#E8F5EC] border border-[#1A7A4A]/20 flex flex-col items-center mt-7 p-6 rounded-xl space-y-3.5 text-center w-full">
                                                    <h3 className="font-semibold mb-2 text-[#1A1A1A]">Keep up the great work!</h3>
                                                    <p className="mb-4 text-[#4A5C52] text-sm">You're making excellent progress. Continue learning to complete the course.</p>
                                                    <button className="bg-[#1A7A4A] cursor-pointer font-medium hover:bg-[#156239] py-3 rounded-lg text-white transition-colors w-50">Continue Learning</button>
                                                </div>
                                                <div>
                                                </div>
                                            </>
                                        )}
                                        {courses.percent === 0 && (
                                            <div className="flex flex-col h-70 items-center justify-center text-center w-full">
                                                <LuChartNoAxesColumn  className="h-15 text-[#8A9E95] w-15"/>
                                                <h3 className="font-semibold mb-2 text-[#1A1A1A]">Enroll to track your progress</h3>
                                                <p className="mb-4 text-[#4A5C52] text-sm">Start this course to monitor your learning journey and track completion</p>
                                            <button
                                                onClick={handleEnroll}
                                                className="bg-[#1A7A4A] cursor-pointer font-medium hover:bg-[#156239] mt-5 py-3 rounded-lg text-white transition-colors"
                                            >
                                                Enroll Now
                                            </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </SideBar>
        </>
    )
}