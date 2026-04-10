import { LuArrowLeft, LuBook, LuCheck, LuChevronLeft, LuChevronRight, LuCircleHelp, LuClipboard, LuDownload, LuFile, LuInfo, LuPlay } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { courseType } from "./data/course";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Assessment(){
    const { id, lessonId, moduleId } = useParams();
        const courses = courseType.find((item) => item.id ===   Number(id));
        const module = courses.modulesView.find((mod) => mod.id === Number(moduleId))
        const lesson = module?.lessons.find((lesson) => lesson.id === Number(lessonId));
        const [activeTab, setActiveTab] = useState("content");
        const getInitials = (name) => { return name.split(" ").map(word => word[0]).join("").toUpperCase(); }
        const currentIndex = module.lessons.findIndex((l) => l.id === Number(lessonId));
        const nextLesson = module.lessons[currentIndex + 1];
        const previousLesson = module.lessons[currentIndex - 1];
        const navigate = useNavigate();
        const objectives = ['Understand the key concepts covered in this lesson', 'Apply learned principles to practical scenarios', 'Build foundational knowledge for advanced topics'];
    return(
        <>
            <SideBar title="Assessment">
                <div className="w-full h-auto">
                    <div className="w-full p-5 bg-white">
                        <div className="flex space-x-2 items-center mb-3">
                            <Link to={`/student-course/${id}`} className="flex items-center space-x-1.5 text-[#8A9E95] font-semibold hover:text-[#1A7A4A] md:text-md">
                                <LuArrowLeft  size={15} className="mt-0.5"/>
                                <p>{module.title} </p>
                                <p className="8A9E95">/</p>
                            </Link>
                            <p className="text-sm md:text-md text-[#1A1A1A]">{lesson.title}</p>
                        </div>
                        <p className="w-20 text-xs font-medium text-[#1A7A4A] bg-[#E8F5EC] px-2 py-1 rounded mb-3 flex items-center justify-center">
                            {lesson.resource_type}
                        </p>
                        <div className="flex justify-between">
                            <h3 className="text-xl md:text-3xl font-semibold text-[#1A1A1A]">{lesson.title}</h3>
                            {lesson.status === "Completed" && (
                                <div className="flex items-center text-sm font-semibold text-[#1A7A4A] bg-[#E8F5EC] px-3 py-2 rounded-lg space-x-1"> <LuCheck  className="w-5 h-5 mt-1"/> <p>Completed</p></div>
                            )}
                        </div>
                        <p className="text-sm text-[#8A9E95] mt-1">{lesson.duration}</p>
                    </div>
                    <div className="w-full h-auto mt-5 flex items-center p-5">
                        <div className="w-full bg-white rounded-xl border-1 border-[#D8D6EF] py-5 flex-col flex shadow-sm">
                            <div className="w-full flex space-x-2 md:space-x-4 items-center border-b-1 border-[#D8D6EF] overflow-hidden">
                                <button onClick={() => setActiveTab("content")} className={`flex space-x-2 items-center px-4 py-2 h-full font-semibold text-sm cursor-pointer transition-all ${activeTab === "content" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuBook /> <p>Content</p></button>
                                <button onClick={() => setActiveTab("assignment")}  className={`flex space-x-2 items-center px-4 py-2 h-full font-semibold text-sm cursor-pointer transition-all ${activeTab === "assignment" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuClipboard /> <p>Assignment</p></button>
                                <button onClick={() => setActiveTab("about")} className={`flex space-x-2 items-center px-4 py-2 h-full font-semibold text-sm cursor-pointer transition-all ${activeTab === "about" ? 'text-[#1A7A4A] border-b-1 border-[#1A7A4A]' : 'text-[#8A9E95] hover:text-[#1A7A4A]'}`}> <LuInfo /> <p>About</p></button>
                            </div>
                            {activeTab === "content" && (
                                <div className="w-full px-5 mt-5">
                                    {lesson.resource_type === 'Video' && (
                                        <div className="w-full relative">
                                            <video src="" controls className="w-full h-70 lg:h-120 rounded-xl bg-[#1A1A1A]"></video>
                                            <p className="absolute top-30 lg:top-55 left-[30%] md:left-[40%] lg:left-[45%] text-white/60 text-xs md:text-sm ">{lesson.title}</p>
                                            <div className="w-full mt-5 bg-[#F4F6F5] rounded-lg p-4 flex items-center justify-between">
                                                <div className="flex space-x-3">
                                                    <LuPlay  className="w-10 h-10 p-2.5 text-[#1A7A4A] bg-[#E8F5EC] rounded-lg flex items-center justify-center"/>
                                                    <div className="flex flex-col ">
                                                        <h3 className="text-sm font-medium text-[#1A1A1A]">Now Playing</h3>
                                                        <p className="text-xs text-[#8A9E95]">{lesson.duration}</p>
                                                    </div>
                                                </div>
                                                <a href="#" className="px-4 py-2 text-sm text-[#1A7A4A] hover:bg-[#E8F5EC] rounded-lg transition-colors font-semibold cursor-pointer">Download</a>
                                            </div>
                                        </div>
                                    )}
                                    {lesson.resource_type === 'Pdf' && (
                                        <div className="w-full  mt-5 lg:h-80 flex flex-col text-center items-center">
                                            <LuFile  className="w-16 h-16 text-[#8A9E95] mb-4 mt-10"/>
                                            <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Pdf Document</h3>
                                            <p className="text-sm text-[#8A9E95] mb-6">{lesson.title}</p>
                                            <a  href="#" className="flex items-center space-x-2 px-6 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-all font-semibold">
                                                <LuDownload /><p>Download Pdf</p>
                                            </a>
                                        </div>
                                    )}
                                    {lesson.resource_type === "Quiz" && (
                                        <div className="w-full  mt-5 lg:h-80 flex flex-col text-center items-center">
                                            <LuCircleHelp  className="w-16 h-16 text-[#1A7A4A] mb-4 mt-10"/>
                                            <h3 className="text-lg font-medium text-[#1A1A1A] mb-2">Quiz: {lesson.title}</h3>
                                            <p className="text-sm text-[#8A9E95] mb-6">Test your knowledge on this topic</p>
                                            <Link 
                                                to={`/student-course/${id}/module/${module.id}/quiz/${lesson.id}`}
                                                className="flex items-center space-x-2 px-6 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-all font-semibold">Start Quiz</Link>
                                        </div>
                                    )}
                                    {lesson.resource_type === "Note" && (
                                        <div className="w-full h-auto lg:p-3 mt-5">
                                            <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-4">{lesson.lessonContent.title}</h3>
                                            <h3 className="text-xl font-medium text-[#1A1A1A] mb-3">Introduction</h3>
                                            <h3 className="p-2 rounded-lg bg-[#E8F5EC] text-base leading-relaxed text-[#4A5C52]">{lesson.lessonContent.introduction}</h3>
                                            <div className="flex flex-col space-y-3 mt-3">
                                                {lesson.lessonContent.sections.map((section, index) => (
                                                    <div key={index} className=" p-3">
                                                        <h3 className="text-xl font-semibold text-[#1A1A1A]">{section.heading}</h3>
                                                        {section.introduction && <h3>{section.introduction}</h3>}
                                                        {section.content && <p className="text-[#4A5C52] leading-relaxed whitespace-pre-line">{section.content}</p>}
                                                        {section.list && (
                                                            <ul className="list-disc list-inside flex flex-col space-y-1.5 mt-2">
                                                                {section.list.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                        {section.code && (
                                                            <pre className="bg-[#F4F6F5] text-[#1A1A1A] p-4 rounded-xl overflow-x-auto mt-3">
                                                                <p>{section.heading}</p>
                                                                <code>{section.code}</code>
                                                            </pre>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {/* <div className="w-full p-5 border mt-5"> */}
                                                <p className="w-full p-4 bg-[#FEF3E8] border-l-4 border-[#F59E0B] mt-8 text-sm"><span>Remember:</span> If you have any questions about this material, don't hesitate to reach out to your mentor for clarification.</p>
                                            {/* </div> */}
                                            
                                        </div>
                                    )}
                                    <div className="w-full py-7 border-t-1 border-[#D8E6DF]  mt-10 flex items-center justify-between">
                                        <button 
                                            onClick={() => {
                                                if (previousLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${previousLesson.id}`)
                                                }
                                            }}
                                            className="flex items-center space-x-2 px-4 py-3 border-2 border-[#D8E6DF] text-[#4A5C52] rounded-lg hover:border-[#1A7A4A] hover:text-[#1A7A4A] transition-all cursor-pointer"><LuChevronLeft /> <p>Previous</p></button>
                                        <button 
                                            onClick={() => {
                                                if (nextLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${nextLesson.id}`)
                                                }
                                            }}
                                            className="flex items-center space-x-2 px-4 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-colors font-medium cursor-pointer"><p>Next</p> <LuChevronRight />
                                        </button>
                                    </div>

                                </div>
                            )}
                            {activeTab === "assignment" && (
                                <div className="w-full p-5 flex flex-col ">
                                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">{lesson.assignment.title}</h3>
                                    <div className="flex items-center gap-4 text-xs text-[#8A9E95]">
                                        <p>Due: {lesson.assignment.due_date}</p>
                                        <div className="w-1 h-1 bg-[#8A9E95] rounded-full"></div>
                                        <p>Points: {lesson.assignment.points}</p>
                                    </div>
                                    <div className="w-full bg-[#F4F6F5] rounded-lg p-6 mt-5">
                                        <h3 className="font-semibold text-[#1A1A1A] mb-3">Instructions</h3>
                                        <p className="text-sm">{lesson.assignment.instructions}</p>
                                    </div>
                                    <button className="mt-5 px-6 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-all cursor-pointer font-medium">
                                        Start Assignment
                                    </button>
                                    <div className="w-full py-7 border-t-1 border-[#D8E6DF]  mt-10 flex items-center justify-between">
                                        <button 
                                            onClick={() => {
                                                if (previousLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${previousLesson.id}`)
                                                }
                                            }}
                                            className="flex items-center space-x-2 px-4 py-3 border-2 border-[#D8E6DF] text-[#4A5C52] rounded-lg hover:border-[#1A7A4A] hover:text-[#1A7A4A] transition-all cursor-pointer"><LuChevronLeft /> <p>Previous</p></button>
                                        <button 
                                            onClick={() => {
                                                if (nextLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${nextLesson.id}`)
                                                }
                                            }}
                                            className="flex items-center space-x-2 px-4 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-colors font-medium cursor-pointer"><p>Next</p> <LuChevronRight />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeTab === "about" &&(
                                <div className="w-full p-5 mt-3">
                                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">About this {lesson.resource_type}</h3>
                                    <p className="text-[#4A5C52] leading-relaxed mb-4 text-sm lg:text-base">{module.sub_title}</p>
                                    <div className="md:flex md:flex-row flex flex-col w-full space-y-5 md:space-y-0 md:space-x-5">
                                        <div className="w-full md:w-1/2 bg-[#F4F6F5] rounded-lg p-4 flex flex-col">
                                            <h3 className="text-sm text-[#8A9E95] mb-1">Type</h3>
                                            <p className="text-lg font-semibold text-[#1A1A1A] capitalize">{lesson.resource_type}</p>
                                        </div>
                                        {lesson.resource_type === 'Video' &&(
                                            <div className="w-full md:w-1/2 bg-[#F4F6F5] rounded-lg p-4 flex flex-col">
                                                <h3 className="text-sm text-[#8A9E95] mb-1">Duration</h3>
                                                <p className="text-lg font-semibold text-[#1A1A1A] capitalize">{lesson.duration}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full p-5 border mt-5 bg-white border-[#D8D6EF] rounded-lg flex flex-col">
                                        <h3 className="font-semibold text-[#1A1A1A] mb-3 text-lg">Learning Objectives</h3>
                                        <div className="flex flex-col space-y-3">
                                            {objectives.map((data) => (
                                                <div className="flex space-x-2.5 items-center">
                                                    <LuCheck  className="w-4 h-4 text-[#1A7A4A]"/>
                                                    <p className="text-[#4A5C52] text-sm">{data}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-5 bg-[#E8F5EC] rounded-lg p-5 border border-[#1A7A4A]/20">
                                        <h3 className="font-semibold text-[#1A1A1A] mb-2">Instructor</h3>
                                        <div className="space-x-4 flex ">
                                            <div className="w-12 h-12 rounded-full text-white border bg-[#1A7A4A] font-semibold flex items-center justify-center">
                                                {getInitials(courses.author) || "NA"}
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="font-medium text-[#1A1A1A]">{courses.author}</h3>
                                                <p className="text-sm text-[#8A9E95]">Course Mentor</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#4A5C52] mt-3">Questions about this content? Feel free to reach out to your mentor for support.</p>
                                    </div>
                                    <div className="w-full py-7 border-t-1 border-[#D8E6DF]  mt-10 flex items-center justify-between">
                                        <button 
                                            onClick={() => {
                                                if (previousLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${previousLesson.id}`)
                                                }
                                            }}
                                            className="flex items-center space-x-2 px-4 py-3 border-2 border-[#D8E6DF] text-[#4A5C52] rounded-lg hover:border-[#1A7A4A] hover:text-[#1A7A4A] transition-all cursor-pointer"><LuChevronLeft /> <p>Previous</p></button>
                                        <button 
                                            onClick={() => {
                                                if (nextLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${nextLesson.id}`)
                                                }
                                            }}
                                            className="flex items-center space-x-2 px-4 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-colors font-medium cursor-pointer"><p>Next</p> <LuChevronRight />
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            
                        </div>
                    </div>
                </div>
            </SideBar>
        </>
    )
}