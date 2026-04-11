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

    const { id } = useParams();

    const courses = courseType.find((item) => item.id === Number(id));

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

    // 🔥 MATCH COURSE PROGRESS
    const courseProgress = progressData?.courses?.find(
        c => c.title === courses?.title
    );

    const percent = courseProgress?.progress || 0;

    if (!courses) return <p>Courses not available</p>;

    return (
        <>
            <SideBar title="Courses">
                <div className="w-full h-auto">

                    {/* HEADER */}
                    <div className="w-full h-80 relative">
                        <img src={courses.image} alt="Course" className="w-full h-full object-cover" />

                        <div className="absolute top-0 p-5 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent">
                            <Link to="/student-course" className="flex items-center text-white font-semibold">
                                <LuArrowLeft size={15} />
                                <p className="ml-1">Back to Courses</p>
                            </Link>

                            <div className="mt-10 lg:mt-20 text-white">
                                <p className="bg-[#1A7A4A] text-xs px-3 py-1 rounded-full w-fit">
                                    {courses.category}
                                </p>

                                <h1 className="text-3xl font-semibold mt-2">
                                    {courses.title}
                                </h1>

                                <p className="text-white/80">by {courses.author}</p>

                                <div className="flex gap-4 mt-2 text-sm">
                                    <p>{courses.weeks} weeks</p>
                                    <p>{courses.modules} modules</p>
                                    <p className="font-semibold">{percent}% Complete</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className="p-5">
                        <div className="bg-white rounded-xl border p-5">

                            {/* TABS */}
                            <div className="flex gap-4 border-b mb-4">
                                <button onClick={() => setActiveTab("overview")}>Overview</button>
                                <button onClick={() => setActiveTab("content")}>Content</button>
                                <button onClick={() => setActiveTab("progress")}>Progress</button>
                            </div>

                            {/* OVERVIEW */}
                            {activeTab === "overview" && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">About this Course</h3>
                                    <p>{courses.text}</p>

                                    <div className="mt-5">
                                        {percent === 0 && (
                                            <button className="bg-[#1A7A4A] text-white px-4 py-2 rounded">
                                                Enroll Now
                                            </button>
                                        )}

                                        {percent > 0 && percent < 100 && (
                                            <>
                                                <p>{percent}% Complete</p>
                                                <div className="w-full bg-gray-200 h-2 mt-2">
                                                    <div
                                                        className="bg-green-600 h-2"
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>

                                                <button className="mt-4 bg-[#1A7A4A] text-white px-4 py-2 rounded">
                                                    Continue Learning
                                                </button>
                                            </>
                                        )}

                                        {percent === 100 && (
                                            <p className="text-green-600 font-semibold">
                                                Course Completed 🎉
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* CONTENT (STILL STATIC) */}
                            {activeTab === "content" && (
                                <div>
                                    {courses.modulesView.map((module) => (
                                        <div key={module.id} className="border p-3 mb-3 rounded">

                                            <button
                                                onClick={() => setOpenModule(module.id)}
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
                                                            to={`/student-course/${courses.id}/module/${module.id}/student-assessment/${lesson.id}`}
                                                            className="block p-2 border mt-2 rounded"
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
                                    <h3 className="text-xl font-semibold">Your Progress</h3>

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
