import { useParams, Link } from "react-router-dom";
import SideBar from "./components/sidebar";
import {
    LuArrowLeft, LuBookOpen, LuChartLine, LuChartNoAxesColumn,
    LuChevronDown, LuChevronUp, LuClock
} from "react-icons/lu";
import { useState, useEffect } from "react"; // ✅ FIXED
import { courseType } from "./data/course";
import axios from "axios";

export default function CourseOverview() {

    const { id } = useParams();

    // ✅ REQUIRED STATES (RESTORED)
    const [activeTab, setActiveTab] = useState("overview");
    const [openModule, setOpenModule] = useState(null);
    const [progressData, setProgressData] = useState(null);
    const [backendCourse, setBackendCourse] = useState(null);

    const token = localStorage.getItem("token");

    // ✅ DUMMY COURSE (DO NOT TOUCH STRUCTURE)
    const dummycourses = courseType.find((item) => item.id === Number(id));

    // 🔥 FETCH BACKEND COURSE (ONLY DATA, NO STRUCTURE CHANGE)
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch("https://talentflowbackend.onrender.com/api/courses");
                const data = await res.json();

                const found = data?.[Number(id) - 1]; // keep your index logic
                setBackendCourse(found || null);

            } catch (err) {
                console.error("Error fetching course:", err);
            }
        };

        fetchCourse();
    }, [id]);

    // 🔥 FETCH PROGRESS
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await axios.get(
                    "https://talentflowbackend.onrender.com/api/progress",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setProgressData(res.data.data);

            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };

        if (token) fetchProgress();
    }, [token]);

    // ❌ STOP IF NO DUMMY (IMPORTANT)
    if (!dummycourses) return <p>Courses not available</p>;

    // ✅ SAFE MERGE (THIS IS THE ONLY PLACE WE TOUCH DATA)
    const courses = {
        ...dummycourses,
        title: backendCourse?.title || dummycourses.title,
        image: backendCourse?.image || dummycourses.image,
        author: backendCourse?.instructor || dummycourses.author,
        category: backendCourse?.category || dummycourses.category,
        text: backendCourse?.description || dummycourses.text,
        modulesView: dummycourses.modulesView // 🔥 KEEP STRUCTURE
    };

    // 🔥 PROGRESS MATCH
    const courseProgress =
        progressData?.courses?.find(c => c.title === courses.title);

    const percent = courseProgress?.progress || 0;

    // 🔥 CALCULATIONS (NOW SAFE)
    const totalLessons = courses.modulesView.reduce(
        (sum, module) => sum + (module.lessons?.length || 0), 0
    );

    const completedLessons = courses.modulesView.reduce(
        (sum, module) => sum + (module.lesssons_completed || 0), 0
    );

    const remaining_course = totalLessons - completedLessons;

    return (
        <>
            <SideBar title="Courses">
                <div className="h-auto w-full">

                    {/* HEADER */}
                    <div className="h-80 relative w-full">
                        <img src={courses.image} className="h-full object-cover w-full" />

                        <div className="absolute bg-gradient-to-t from-black/70 h-full left-0 p-5 to-transparent top-0 w-full">

                            <Link to="/student-course" className="flex font-semibold items-center text-white">
                                <LuArrowLeft size={15} />
                                <p className="ml-1">Back to Courses</p>
                            </Link>

                            <div className="lg:mt-20 mt-10 text-white">
                                <p className="bg-[#1A7A4A] px-3 py-1 rounded-full text-xs w-fit">
                                    {courses.category}
                                </p>

                                <h1 className="font-semibold mt-2 text-3xl">
                                    {courses.title}
                                </h1>

                                <p className="text-white/80">by {courses.author}</p>

                                <div className="flex gap-4 mt-2 text-sm">
                                    <p>{courses.weeks} weeks</p>
                                    <p>{courses.modules} modules</p>
                                    <p>{percent}% Complete</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* BODY (UNCHANGED UI) */}
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
                                    <h3 className="font-semibold mb-3 text-xl">
                                        About this Course
                                    </h3>

                                    <p>{courses.text}</p>
                                </div>
                            )}

                            {/* CONTENT */}
                            {activeTab === "content" && (
                                <div>
                                    {courses.modulesView.map((module) => (
                                        <div key={module.id} className="border mb-3 p-3 rounded">

                                            <button
                                                onClick={() =>
                                                    setOpenModule(openModule === module.id ? null : module.id)
                                                }
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

                            {/* PROGRESS */}
                            {activeTab === "progress" && (
                                <div>
                                    <h3 className="font-semibold text-xl">Your Progress</h3>

                                    <p>Total Lessons: {totalLessons}</p>
                                    <p>Completed: {completedLessons}</p>
                                    <p>Remaining: {remaining_course}</p>
                                    <p>Progress: {percent}%</p>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </SideBar>
        </>
    );
}