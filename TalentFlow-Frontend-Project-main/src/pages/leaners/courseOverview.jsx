import { useParams, Link } from "react-router-dom";
import SideBar from "./components/sidebar";
import { LuArrowLeft, LuBook, LuBookOpen, LuChartLine, LuChartNoAxesColumn, LuCheck, LuChevronDown, LuChevronUp, LuCircleHelp, LuClock, LuFile, LuInfo, LuVideo } from "react-icons/lu";
import { useState } from "react";
import { progressCards, courseType } from "./data/course";
import { percent } from "framer-motion";
export default function CourseOverview(){
    
    const [activeTab, setActiveTab] = useState("overview");
    const [openModule, setOpenModule] = useState(null);
    const { id } = useParams();
    const courses = courseType.find((item) => item.id ===   Number(id));
    const totalLessons = courses.modulesView.reduce((sum, module) => sum + (module.lessons?.length || 0), 0);
    const completedLessons = courses.modulesView.reduce((sum, module) => sum + (module.lesssons_completed || 0),0);
    const remaining_course = totalLessons - completedLessons

    if(!courses) return <p>Courses not available</p>

    return(
        <>
            <SideBar title="Courses">
                <div className="w-full h-auto">
                    <div className="w-full h-80 relative">
                        <img src={courses.image} alt="Course Image" className="w-full h-full object-cover" />
                        <div className="absolute top-0 p-5 left-0 w-full h-full inset-0 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="flex flex-col p-5 w-auto">
                                <Link to="/student-course" className="flex  items-center space-x-1 text-white hover:text-[#E8F5EC] font-semibold">
                                    <LuArrowLeft  size={15} className="mt-0.5"/>
                                    <p>Back to Courses</p>
                                </Link>
                                <div className="w-auto py-2 mt-10 lg:mt-20 flex flex-col space-y-2.5">
                                    <p className="w-25 font-medium text-white bg-[#1A7A4A] text-xs rounded-full py-1 px-3 flex items-center justify-center">{courses.category}</p>
                                    <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">{courses.title}</h1>
                                    <p className="text-white/90 mb-3">by {courses.author}</p>
                                    <div className="flex space-x-4">
                                        <div className="flex items-center space-x-1 text-white/80 text-sm">
                                            <LuClock  className="w-4 h-4 mt-0.5"/>
                                            <p>{courses.weeks} weeks</p>
                                        </div>
                                        <div className="flex items-center space-x-1 text-white/80 text-sm">
                                            <LuBookOpen  className="w-4 h-4 mt-0.5"/>
                                            <p>{courses.modules} modules</p>
                                        </div>
                                        <div className="flex items-center space-x-1 text-white/80 text-sm font-semibold">
                                            <LuClock  className="w-4 h-4 mt-0.5"/>
                                            <p>{courses.percent}% Complete</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="w-full h-auto mt-5 flex items-center p-2 md:p-5">
                        <div className="w-full bg-white rounded-xl border-1 border-[#D8D6EF] py-5 flex-col flex shadow-sm">
                            <div className="w-full flex space-x-2 md:space-x-4 items-center border-b-1 border-[#D8D6EF]">
                                <button onClick={() => setActiveTab("overview")} className={`flex space-x-2 items-center px-2 md:px-4 py-2 h-full font-semibold text-[13px] md:text-sm cursor-pointer transition-all ${activeTab === "overview" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuInfo /> <p>Overview</p></button>
                                <button onClick={() => setActiveTab("content")}  className={`flex space-x-2 items-center px-2 md:px-4 py-2 h-full font-semibold text-[13px] md:text-sm cursor-pointer transition-all ${activeTab === "content" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuBookOpen /> <p>Course Content</p></button>
                                <button onClick={() => setActiveTab("progress")} className={`flex space-x-2 items-center px-2 md:px-4 py-2 h-full font-semibold text-[13px] md:text-sm cursor-pointer transition-all ${activeTab === "progress" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuChartLine /> <p>My Progress</p></button>
                                
                            </div>
                            {activeTab === "overview" && (
                                    <div className="px-5 py-2">
                                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">About this Course</h3>
                                        <p className="text-[#4A5C52] leading-relaxed mb-6">{courses.text}</p>
                                        <div className="flex flex-col lg:flex lg:flex-row space-x-5 space-y-5 lg:space-y-0">
                                            <div className="w-full lg:w-1/3 bg-[#F4F6F5] rounded-lg p-4 flex flex-col">
                                                <p className="text-sm text-[#8A9E95] mb-1">Duration</p>
                                                <h3 className="text-lg font-semibold text-[#1A1A1A]">{courses.weeks} weeks</h3>
                                            </div>
                                            <div className="w-full lg:w-1/3 bg-[#F4F6F5] rounded-lg p-4 flex flex-col">
                                                <p className="text-sm text-[#8A9E95] mb-1">Modules</p>
                                                <h3 className="text-lg font-semibold text-[#1A1A1A]">{courses.modules}</h3>
                                            </div>
                                            <div className="w-full lg:w-1/3 bg-[#F4F6F5] rounded-lg p-4 flex flex-col">
                                                <p className="text-sm text-[#8A9E95] mb-1">Category</p>
                                                <h3 className="text-lg font-semibold text-[#1A1A1A]">{courses.category}</h3>
                                            </div>
                                        </div>
                                        <div className="border-1 w-full p-5 mt-5 rounded-lg bg-white border-[#D8D6EF] flex flex-col">
                                            {courses.percent === 0 && (
                                                <>
                                                    <h3 className="font-semibold text-[#1A1A1A] mb-3">Ready to start learning?</h3>
                                                    <p className="text-sm text-[#4A5C52]">Enroll in this course to start your learning journey and gain new skills</p>
                                                    <button className="cursor-pointer mt-5 bg-[#1A7A4A] text-white py-3 rounded-lg hover:bg-[#156239] transition-colors font-medium">
                                                        Enroll Now
                                                    </button>
                                                </>
                                            )}
                                            {courses.percent > 0 && courses.percent < 100 && (
                                                <>
                                                    <h3 className="font-semibold text-[#1A1A1A] mb-3">Your Enrollment</h3>
                                                    <div className="flex justify-between">
                                                        <p className="text-sm text-[#4A5C52]">Course Progress</p>
                                                        <p className="text-sm font-medium text-[#1A7A4A]">{courses.percent}%</p>   
                                                    </div>
                                                    <div className="w-full mt-3">
                                                        <div className="relative w-full h-1.5 rounded-full bg-[#D8E6DF]">
                                                            <div className="absolute bg-[#1A7A4A] h-full rounded-full" style={{ width: `${courses.percent}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <button className="cursor-pointer mt-5 bg-[#1A7A4A] text-white py-3 rounded-lg hover:bg-[#156239] transition-colors font-medium">
                                                            Continue Learning
                                                    </button>
                                                </>
                                            )}
                                                    
                                            {courses.percent === 100 && (
                                                <>
                                                    <h3 className="font-semibold text-[#1A1A1A] mb-3">Your Enrollment</h3>
                                                    <div className="flex justify-between">
                                                        <p className="text-sm text-[#4A5C52]">Course Progress</p>
                                                        <p className="text-sm font-medium text-[#1A7A4A]">{courses.percent}%</p>   
                                                    </div>
                                                    <div className="w-full mt-3">
                                                        <div className="relative w-full h-1.5 rounded-full bg-[#D8E6DF]">
                                                            <div className="absolute bg-[#1A7A4A] h-full rounded-full" style={{ width: `${courses.percent}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button className="w-1/2 cursor-pointer mt-5 bg-[#1A7A4A] text-white py-3 rounded-lg hover:bg-[#156239] transition-colors font-medium">
                                                            Review Course
                                                        </button>

                                                        <button className="w-1/2 cursor-pointer mt-5 border-2 border-[#1A7A4A] hover:border-2 hover:border-[#156239] text-[#1A7A4A] hover:text-white  py-3 rounded-lg hover:bg-[#156239] transition-colors font-medium">
                                                            View Certificate
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                            
                                            
                                            
                                        </div>
                                        <h3 className="font-semibold text-[#1A1A1A] mt-5">Instructor</h3>
                                        <div className="w-full rounded-lg mt-5 flex items-center p-4 bg-[#F4F6F5] rounded-lg space-x-3">
                                            <p className="w-12 h-12 bg-[#E8F5EC] rounded-full flex items-center justify-center text-[#1A7A4A] font-medium">
                                                CN
                                            </p>
                                            <div className="flex flex-col">
                                                <h3 className="font-medium text-[#1A1A1A]">{courses.author}</h3>
                                                <p className="text-sm text-[#8A9E95]">Course Mentor</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#4A5C52] mt-3">Experienced mentor with expertise in marketing</p>
                                    </div>
                                )}
                                {activeTab === "content" && (
                                    <div className="px-5 py-2">
                                        <div className="flex w-full items-center justify-between mb-3">
                                            <h3 className="text-xl font-semibold text-[#1A1A1A] py-2">Course Modules</h3>
                                            {/* <p className="text-sm text-[#8A9E95]">{courses.modules.m} of {module.no_of_lessons} completed</p> */}
                                        </div>
                                        <div className="w-full flex flex-col space-y-5">
                                            {courses.modulesView.map((module) => (
                                                <div key={module.id} className="border-1 border-[#D8D6EF] p-3 lg:p-5 w-full flex space-x-3 bg-white rounded-lg hover:bg-[#EAF3EE] transition-all">
                                                    <p className="w-8 h-8 bg-[#E8F5EC] rounded-lg flex items-center justify-center hidden lg:flex shrink-0">{module.id}</p>
                                                    <div className="flex flex-col w-full">
                                                        <button onClick={() => setOpenModule(module.id)} className="cursor-pointer flex justify-between items-center">
                                                            <h3 className="font-medium text-[#1A1A1A] mb-1 text-lg">{module.title}</h3>
                                                            {openModule === module.id ? (
                                                                <LuChevronUp  className="w-5 h-5 text-[#4A5C52]"/>
                                                            ) : (
                                                                <LuChevronDown  className="w-5 h-5 text-[#4A5C52]"/>
                                                            )}
                                                        </button>
                                                        <p className="text-sm text-[#8A9E95] mb-2">{module.sub_title}</p>
                                                        <div className="flex items-center gap-4 text-xs text-[#8A9E95]">
                                                            <p>{module.no_of_lessons} items</p>
                                                            <div className="w-1 h-1 bg-[#8A9E95] rounded-full"></div>
                                                            <p>{module.lesssons_completed} / {module.no_of_lessons} completed</p>
                                                            <div className="w-1 h-1 bg-[#8A9E95] rounded-full"></div>
                                                            <p>{module.duration} weeks</p>
                                                        </div>
                                                        <div className="w-full space-y-3 mt-5 bg-[#F4F6F5] rounded-md py-4 px-2">
                                                            {openModule === module.id && module.no_of_lessons > 0 && module.lessons.map((data) => (
                                                                <Link 
                                                                // /student-course/:id/student-assessment/:id
                                                                    to={`/student-course/${courses.id}/module/${module.id}/student-assessment/${data.id}`}
                                                                    className="cursor-pointer w-full p-3 flex space-x-2.5 rounded-lg bg-white hover:border-1 hover:border-[#1A7A4A] transition-all duration-300 group">
                                                                    <div className="w-8 h-8 flex items-center justify-center bg-[#E8F5EC] text-[#1A7A4A] rounded">
                                                                        <data.icon />
                                                                    </div>
                                                                    <div className="w-[85%] flex flex-col text-left">
                                                                        <h3 className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#1A7A4A] transition-colors">{data.title}</h3>
                                                                        <div className="flex space-x-2 mt-0.5 text-xs text-[#8A9E95] items-center">
                                                                            <p>{data.resource_type}</p>
                                                                            <div className="w-1 h-1 bg-[#8A9E95] rounded-full mt-0.5"></div>
                                                                            <p>{data.duration}</p>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-xs text-[#1A7A4A] font-medium">{data.status}</p>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div> 
                                                                                               
                                            ))}
                                        </div>
                                        {courses.percent === 0 && (
                                            <div className="w-full flex flex-col mt-7 space-y-3.5 bg-[#E8F5EC] rounded-xl p-6 text-center items-center border border-[#1A7A4A]/20">
                                                <h3 className="font-semibold text-[#1A1A1A] mb-2">Enroll to access course content!</h3>
                                                <p className="text-sm text-[#4A5C52] mb-4">Start learning today and unlock all modules and lessons.</p>
                                                <button className="w-35 cursor-pointer py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-colors font-medium">Enroll Now</button>
                                            </div>
                                        )}
                                        
                                        
                                    </div>
                                )}
                                {activeTab === "progress" && (
                                    <div className="px-5 py-2">
                                        {courses.percent > 0 &&  (
                                            <>
                                                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4 mt-2">Your Progress</h3>
                                                <div className="w-full border bg-gradient-to-br from-[#1A7A4A] to-[#156239] text-white rounded-xl p-6">
                                                    <p className="text-sm opacity-90 mb-2">Overall Completion</p>
                                                    <h3 className="text-lg font-semibold mb-4">{courses.percent}%</h3>
                                                    <div className="w-full">
                                                        <div className="w-full h-3 relative rounded-full bg-white/20">
                                                            <div className="absolute bg-white rounded-full h-full" style={{ width: `${courses.percent}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full py-3 mt-5 lg:flex lg:flex-row lg:space-x-5 flex flex-col space-y-5 lg:space-y-0">
                                                    <div className="w-full lg:w-1/3 border p-5 bg-white rounded-lg border-[#D8D6EF] flex flex-col">
                                                        <p className="text-sm text-[#8A9E95] mb-2">Total Lessons</p>
                                                        <h3 className="text-3xl font-semibold text-[#1A1A1A]">{totalLessons}</h3>
                                                        
                                                    </div>
                                                    <div className="w-full lg:w-1/3 border p-5 bg-white rounded-lg border-[#D8D6EF] flex flex-col">
                                                        <p className="text-sm text-[#8A9E95] mb-2">Completed</p>
                                                        <h3 className="text-3xl font-semibold text-[#1A7A4A]">{completedLessons}</h3>
                                                        
                                                    </div>
                                                    <div className="w-full lg:w-1/3 border p-5 bg-white rounded-lg border-[#D8D6EF] flex flex-col">
                                                        <p className="text-sm text-[#8A9E95] mb-2">Remaining</p>
                                                        <h3 className="text-3xl font-semibold text-[#d97706]">{remaining_course}</h3>
                                                    </div>
                                                </div>
                                                <div className="w-full p-5 border-1 mt-5 rounded-lg bg-white border-[#D8D6EF]">
                                                    <h3 className="text-md font-medium text-[#1A1A1A]">Progress by Module</h3>
                                                    <div className="flex flex-col space-y-3 mt-4">
                                                        {courses.modulesView.map((data) => {
                                                            const course_range = data.no_of_lessons === 0 ? 0 :  Math.round((data.lesssons_completed / data.no_of_lessons) * 100);
                                                            return(
                                                                <div className="py-2">
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-sm font-medium text-[#1A1A1A]">Module {data.id}: {data.title}</p>
                                                                        <p className="text-sm text-[#1A7A4A] font-medium">{course_range}%</p>
                                                                    </div>
                                                                    <div className="w-full mt-1.5">
                                                                        <div className="w-full h-2 bg-[#EAF3EE] rounded-full relative">
                                                                            <div className="absolute h-full bg-[#1A7A4A] rounded-full" style={{ width: `${course_range}%`}}></div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-xs text-[#8A9E95] mt-1">{data.lesssons_completed} of {data.no_of_lessons} lessons completed</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    
                                                </div>
                                                <div className="w-full flex flex-col mt-7 space-y-3.5 bg-[#E8F5EC] rounded-xl p-6 text-center items-center border border-[#1A7A4A]/20">
                                                    <h3 className="font-semibold text-[#1A1A1A] mb-2">Keep up the great work!</h3>
                                                    <p className="text-sm text-[#4A5C52] mb-4">You're making excellent progress. Continue learning to complete the course.</p>
                                                    <button className="w-50 cursor-pointer py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-colors font-medium">Continue Learning</button>
                                                </div>
                                                <div>
                                                </div>
                                            </>
                                        )}
                                        {courses.percent === 0 && (
                                            <div className="w-full h-70 flex flex-col items-center justify-center text-center">
                                                <LuChartNoAxesColumn  className="w-15 h-15 text-[#8A9E95]"/>
                                                <h3 className="font-semibold text-[#1A1A1A] mb-2">Enroll to track your progress</h3>
                                                <p className="text-sm text-[#4A5C52] mb-4">Start this course to monitor your learning journey and track completion</p>
                                                <button className=" cursor-pointer px-6 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-colors font-medium">Enroll Now</button>
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