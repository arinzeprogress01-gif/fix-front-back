import {
    LuArrowLeft, LuCheck
} from "react-icons/lu";
import SideBar from "./components/sidebar";
import { courseType } from "./data/course";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Assessment() {

    const { id, lessonId, moduleId } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("content");
    const [progressData, setProgressData] = useState(null);

    const token = localStorage.getItem("token");

    // ✅ SAFE ACCESS
    const courses = courseType.find((item) => item.id === Number(id));
    const module = courses?.modulesView?.find((mod) => mod.id === Number(moduleId));
    const lesson = module?.lessons?.find((l) => l.id === Number(lessonId));

    // ✅ PREVENT CRASH
    if (!courses || !module || !lesson) {
        return <p className="p-5">Lesson not found</p>;
    }

    // ✅ SAFE NAVIGATION LOGIC
    const currentIndex = module.lessons.findIndex((l) => l.id === Number(lessonId));
    const nextLesson = module.lessons[currentIndex + 1];
    const previousLesson = module.lessons[currentIndex - 1];

    const getInitials = (name) => {
        return name?.split(" ").map(word => word[0]).join("").toUpperCase();
    };

    // ✅ FETCH PROGRESS
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

        if (token) fetchProgress();
    }, [token]);

    // ✅ UPDATE PROGRESS
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

    // ✅ SAFE PROGRESS CHECK
    const courseProgress = progressData?.courses?.find(
        c => c.title === courses.title
    );

    const isCompleted = courseProgress?.completed;

    return (
        <>
            <SideBar title="Assessment ">
                <div className="h-auto w-full">

                    {/* HEADER */}
                    <div className="bg-white p-5 w-full">
                        <div className="flex items-center mb-3 space-x-2">

                            <Link
                                to={`/student-course/${id}`}
                                className="flex font-semibold hover:text-[#1A7A4A] items-center space-x-1.5 text-[#8A9E95]"
                            >
                                <LuArrowLeft size={15} />
                                <p>{module.title}</p>
                                <p>/</p>
                            </Link>

                            <p>{lesson.title}</p>
                        </div>

                        <p className="bg-[#E8F5EC] mb-3 px-2 py-1 rounded text-[#1A7A4A] text-center text-xs w-20">
                            {lesson.resource_type}
                        </p>

                        <div className="flex justify-between">
                            <h3 className="font-semibold md:text-3xl text-xl">
                                {lesson.title}
                            </h3>

                            {/* ✅ REAL COMPLETION */}
                            {isCompleted && (
                                <div className="bg-[#E8F5EC] flex font-semibold items-center px-3 py-2 rounded-lg space-x-1 text-[#1A7A4A] text-sm">
                                    <LuCheck className="h-5 w-5" />
                                    <p>Completed</p>
                                </div>
                            )}
                        </div>

                        <p className="mt-1 text-[#8A9E95] text-sm">
                            {lesson.duration}
                        </p>
                    </div>

                    {/* BODY */}
                    <div className="mt-5 p-5 w-full">
                        <div className="bg-white border py-5 rounded-xl shadow-sm">

                            {/* TABS */}
                            <div className="border-b flex">
                                <button
                                    onClick={() => setActiveTab("content")}
                                    className={`px-4 py-2 ${activeTab === "content" ? "border-b text-[#1A7A4A]" : ""}`}
                                >
                                    Content
                                </button>

                                <button
                                    onClick={() => setActiveTab("assignment")}
                                    className={`px-4 py-2 ${activeTab === "assignment" ? "border-b text-[#1A7A4A]" : ""}`}
                                >
                                    Assignment
                                </button>

                                <button
                                    onClick={() => setActiveTab("about")}
                                    className={`px-4 py-2 ${activeTab === "about" ? "border-b text-[#1A7A4A]" : ""}`}
                                >
                                    About
                                </button>
                            </div>

                            {/* CONTENT */}
                            {activeTab === "content" && (
                                <div className="p-5">

                                    {lesson.resource_type === "Note" && (
                                        <div>
                                            <h3 className="font-semibold mb-4 text-2xl">
                                                {lesson.lessonContent?.title}
                                            </h3>
                                            <p>{lesson.lessonContent?.introduction}</p>
                                        </div>
                                    )}

                                    {/* NAVIGATION */}
                                    <div className="flex justify-between mt-10">

                                        <button
                                            onClick={() => {
                                                if (previousLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${previousLesson.id}`);
                                                }
                                            }}
                                        >
                                            Previous
                                        </button>

                                        <button
                                            onClick={async () => {
                                                await updateProgress();
                                                if (nextLesson) {
                                                    navigate(`/student-course/${id}/module/${module.id}/student-assessment/${nextLesson.id}`);
                                                }
                                            }}
                                        >
                                            Next
                                        </button>

                                    </div>
                                </div>
                            )}

                            {/* ASSIGNMENT */}
                            {activeTab === "assignment" && (
                                <div className="p-5">
                                    <h3>{lesson.assignment?.title}</h3>
                                    <p>{lesson.assignment?.instructions}</p>
                                </div>
                            )}

                            {/* ABOUT */}
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