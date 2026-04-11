import { LuArrowLeft, LuBook, LuCheck, LuChevronLeft, LuChevronRight, LuCircleHelp, LuClipboard, LuDownload, LuFile, LuInfo, LuPlay } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { courseType } from "./data/course";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Assessment(){
    const { id, lessonId, moduleId } = useParams();
    const navigate = useNavigate();

    const courses = courseType.find((item) => item.id === Number(id));
    const module = courses.modulesView.find((mod) => mod.id === Number(moduleId))
    const lesson = module?.lessons.find((lesson) => lesson.id === Number(lessonId));

    const [activeTab, setActiveTab] = useState("content");
    const [progressData, setProgressData] = useState(null);

    const token = localStorage.getItem("token");

    const getInitials = (name) => {
        return name.split(" ").map(word => word[0]).join("").toUpperCase();
    }

    const currentIndex = module.lessons.findIndex((l) => l.id === Number(lessonId));
    const nextLesson = module.lessons[currentIndex + 1];
    const previousLesson = module.lessons[currentIndex - 1];

    const objectives = [
        'Understand the key concepts covered in this lesson',
        'Apply learned principles to practical scenarios',
        'Build foundational knowledge for advanced topics'
    ];

    // ✅ FETCH PROGRESS (FROM YOUR BACKEND)
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get("/api/progress", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProgressData(res.data.data);
            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        fetchProgress();
    }, []);

    // ✅ UPDATE PROGRESS WHEN USER CLICKS NEXT
    const updateProgress = async () => {
        try {
            await axios.put("/api/progress/update", {
                courseName: courses.title
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    // ✅ CHECK IF COURSE IS COMPLETED (REAL DATA)
    const courseProgress = progressData?.courses?.find(
        c => c.title === courses.title
    );

    const isCompleted = courseProgress?.completed;

    return(
        <>
            <SideBar title="Assessment">
                <div className="w-full h-auto">

                    {/* HEADER */}
                    <div className="w-full p-5 bg-white">
                        <div className="flex space-x-2 items-center mb-3">
                            <Link to={`/student-course/${id}`} className="flex items-center space-x-1.5 text-[#8A9E95] font-semibold hover:text-[#1A7A4A]">
                                <LuArrowLeft size={15}/>
                                <p>{module.title}</p>
                                <p>/</p>
                            </Link>
                            <p>{lesson.title}</p>
                        </div>

                        <p className="w-20 text-xs font-medium text-[#1A7A4A] bg-[#E8F5EC] px-2 py-1 rounded mb-3 text-center">
                            {lesson.resource_type}
                        </p>

                        <div className="flex justify-between">
                            <h3 className="text-xl md:text-3xl font-semibold">
                                {lesson.title}
                            </h3>

                            {/* ✅ REAL COMPLETION */}
                            {isCompleted && (
                                <div className="flex items-center text-sm font-semibold text-[#1A7A4A] bg-[#E8F5EC] px-3 py-2 rounded-lg space-x-1">
                                    <LuCheck className="w-5 h-5"/>
                                    <p>Completed</p>
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-[#8A9E95] mt-1">
                            {lesson.duration}
                        </p>
                    </div>

                    {/* BODY */}
                    <div className="w-full mt-5 p-5">
                        <div className="bg-white rounded-xl border py-5 shadow-sm">

                            {/* TABS */}
                            <div className="flex border-b">
                                <button onClick={() => setActiveTab("content")} className={`px-4 py-2 ${activeTab === "content" && "border-b text-green-700"}`}>Content</button>
                                <button onClick={() => setActiveTab("assignment")} className={`px-4 py-2 ${activeTab === "assignment" && "border-b text-green-700"}`}>Assignment</button>
                                <button onClick={() => setActiveTab("about")} className={`px-4 py-2 ${activeTab === "about" && "border-b text-green-700"}`}>About</button>
                            </div>

                            {/* CONTENT TAB */}
                            {activeTab === "content" && (
                                <div className="p-5">

                                    {/* KEEP YOUR EXISTING UI (UNCHANGED) */}
                                    {lesson.resource_type === "Note" && (
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-4">
                                                {lesson.lessonContent.title}
                                            </h3>
                                            <p>{lesson.lessonContent.introduction}</p>
                                        </div>
                                    )}

                                    {/* NAVIGATION */}
                                    <div className="mt-10 flex justify-between">

                                        <button
                                            onClick={() => {
                                                if (previousLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${previousLesson.id}`)
                                                }
                                            }}
                                        >
                                            Previous
                                        </button>

                                        <button
                                            onClick={async () => {
                                                await updateProgress(); // 🔥 BACKEND CALL
                                                if (nextLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${nextLesson.id}`)
                                                }
                                            }}
                                        >
                                            Next
                                        </button>

                                    </div>
                                </div>
                            )}

                            {/* ASSIGNMENT TAB (UNCHANGED) */}
                            {activeTab === "assignment" && (
                                <div className="p-5">
                                    <h3>{lesson.assignment.title}</h3>
                                    <p>{lesson.assignment.instructions}</p>
                                </div>
                            )}

                            {/* ABOUT TAB (UNCHANGED) */}
                            {activeTab === "about" && (
                                <div className="p-5">
                                    <p>{module.sub_title}</p>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </SideBar>
        </>
    );
}
