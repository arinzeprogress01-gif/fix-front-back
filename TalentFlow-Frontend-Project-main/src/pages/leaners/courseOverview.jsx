import { useParams, Link } from "react-router-dom";
import SideBar from "./components/sidebar";
import {
    LuArrowLeft, LuBookOpen, LuChartLine, LuChevronDown,
    LuChevronUp, LuClock, LuInfo
} from "react-icons/lu";
import { useState, useEffect } from "react";
import { courseType } from "./data/course";
import axios from "axios";

export default function CourseOverview() {

    const [activeTab, setActiveTab] = useState("overview");
    const [openModule, setOpenModule] = useState(null);
    const [progressData, setProgressData] = useState(null);

    // 🔥 NEW: backend course
    const [backendCourse, setBackendCourse] = useState(null);

    const { id } = useParams();

    // ✅ DUMMY (STAYS)
    const dummyCourse = courseType.find((item) => item.id === Number(id));

    // 🔥 FETCH BACKEND COURSE (MATCH BY INDEX SAME AS COURSES PAGE)
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch("https://talentflowbackend.onrender.com/api/courses");
                const data = await res.json();

                const found = data[Number(id) - 1];
                setBackendCourse(found);

            } catch (err) {
                console.error("Error fetching course:", err);
            }
        };

        fetchCourse();
    }, [id]);

    // 🔥 FETCH REAL PROGRESS
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get("/api/progress", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                setProgressData(res.data.data);

            } catch (err) {
                console.error("Error fetching progress", err);
            }
        };

        fetchProgress();
    }, []);

    // ❌ SAFETY
    if (!dummyCourse) return <p>Course not available</p>;

    // ✅ MERGE (THIS IS THE MAGIC 🔥)
    const course = {
        ...dummyCourse,
        title: backendCourse?.title || dummyCourse.title,
        image: backendCourse?.image || dummyCourse.image,
        author: backendCourse?.instructor || dummyCourse.author,
        category: backendCourse?.category || dummyCourse.category,
        text: backendCourse?.description || dummyCourse.text,
    };

    // 🔥 MATCH COURSE PROGRESS (SAFE)
    const courseProgress = progressData?.courses?.find(
        c => c.title === course.title
    );

    const percent = courseProgress?.progress || 0;

    return (
        <>
            <SideBar title="Courses">
                <div className="h-auto w-full">

                    {/* HEADER */}
                    <div className="h-80 relative w-full">
                        <img src={course.image} alt="Course" className="h-full object-cover w-full" />

                        <div className="absolute bg-gradient-to-t from-black/70 h-full left-0 p-5 to-transparent top-0 w-full">
                            <Link to="/student-course" className="flex font-semibold items-center text-white">
                                <LuArrowLeft size={15} />
                                <p className="ml-1">Back to Courses</p>
                            </Link>

                            <div className="lg:mt-20 mt-10 text-white">
                                <p className="bg-[#1A7A4A] px-3 py-1 rounded-full text-xs w-fit">
                                    {course.category}
                                </p>

                                <h1 className="font-semibold mt-2 text-3xl">
                                    {course.title}
                                </h1>

                                <p className="text-white/80">by {course.author}</p>

                                <div className="flex gap-4 mt-2 text-sm">
                                    <p>{course.weeks} weeks</p>
                                    <p>{course.modules} modules</p>
                                    <p className="font-semibold">{percent}% Complete</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="p-5">
                        <div className="bg-white border p-5 rounded-xl">

                            {/* TABS */}
                            <div className="border-b flex gap-4 mb-4">
                                <button onClick={() => setActiveTab("overview")}>Overview</button>
                                <button onClick={() => setActiveTab("content")}>Content</button>
                                <button onClick={() => setActiveTab("progress")}>Progress</button>
                            </div>

                            {/* OVERVIEW */}
                            {activeTab === "overview" && (
                                <div>
                                    <h3 className="font-semibold mb-3 text-xl">About this Course</h3>
                                    <p>{course.text}</p>

                                    <div className="mt-5">
                                        {percent === 0 && (
                                            <button className="bg-[#1A7A4A] px-4 py-2 rounded text-white">
                                                Enroll Now
                                            </button>
                                        )}

                                        {percent > 0 && percent < 100 && (
                                            <>
                                                <p>{percent}% Complete</p>
                                                <div className="bg-gray-200 h-2 mt-2 w-full">
                                                    <div
                                                        className="bg-green-600 h-2"
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>

                                                <button className="bg-[#1A7A4A] mt-4 px-4 py-2 rounded text-white">
                                                    Continue Learning
                                                </button>
                                            </>
                                        )}

                                        {percent === 100 && (
                                            <p className="font-semibold text-green-600">
                                                Course Completed 🎉
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* CONTENT (STILL DUMMY 🔥) */}
                            {activeTab === "content" && (
                                <div>
                                    {course.modulesView.map((module) => (
                                        <div key={module.id} className="border mb-3 p-3 rounded">

                                            <button
                                                onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
                                                className="flex justify-between w-full"
                                            >
                                                <h3>{module.title}</h3>
                                                {openModule === module.id ? <LuChevronUp /> : <LuChevronDown />}
                                            </button>

                                            {openModule === module.id && (
                                                <div className="mt-3">
                                                    {module.lessons.map((lesson) => (
                                                        <Link
                                                            key={lesson.id}
                                                            to={`/student-course/${course.id}/module/${module.id}/student-assessment/${lesson.id}`}
                                                            className="block border mt-2 p-2 rounded"
                                                        >
                                                            {lesson.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* PROGRESS TAB */}
                            {activeTab === "progress" && (
                                <div>
                                    <h3 className="font-semibold text-xl">Your Progress</h3>

                                    {progressData ? (
                                        <>
                                            <p className="mt-2">
                                                Completion: {progressData.overallStats.completionPercentage}%
                                            </p>
                                            <p>
                                                Courses Completed: {progressData.overallStats.coursesCompleted}
                                            </p>
                                            <p>
                                                Learning Days: {progressData.overallStats.learningDays}
                                            </p>
                                            <p className="mt-2 text-green-600">
                                                {progressData.overallStats.encouragement}
                                            </p>
                                        </>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </SideBar>
        </>
    );
}