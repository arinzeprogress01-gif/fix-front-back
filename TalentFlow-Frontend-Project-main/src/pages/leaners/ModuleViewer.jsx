import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SideBar from "./components/sidebar";

export default function ModuleViewer() {
    const location = useLocation();
    const navigate = useNavigate();

    const lesson = location.state?.lesson;
    const token = localStorage.getItem("token");

    // 🚨 If no lesson, go back
    useEffect(() => {
        if (!lesson) {
            navigate("/student-course");
        }
    }, [lesson, navigate]);

    // 🔥 MARK PROGRESS WHEN PAGE LOADS
    useEffect(() => {
        const updateProgress = async () => {
            try {
                await axios.put(
                    "https://talentflowbackend.onrender.com/api/progress/update",
                    {
                        courseName: "UI/UX Design" // 🔥 IMPORTANT (we'll improve later)
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("Progress updated");

            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };

        if (lesson && token) {
            updateProgress();
        }
    }, [lesson, token]);

    return (
        <SideBar title="Lesson">
            <div className="p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 text-[#1A7A4A] font-medium"
                >
                    ← Back
                </button>

                <h1 className="text-2xl font-bold mb-4">{lesson?.title}</h1>

                {/* 🔥 SHOW CONTENT */}
                {lesson?.lessonContent ? (
                    <div className="space-y-4">
                        <p>{lesson.lessonContent.introduction}</p>

                        {lesson.lessonContent.sections.map((sec, i) => (
                            <div key={i}>
                                <h3 className="font-semibold mt-4">{sec.heading}</h3>

                                {sec.content && <p>{sec.content}</p>}

                                {sec.list && (
                                    <ul className="list-disc ml-5">
                                        {sec.list.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                )}

                                {sec.code && (
                                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                                        {sec.code}
                                    </pre>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No lesson content available</p>
                )}

                {/* 🔥 NEXT BUTTON */}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 bg-[#1A7A4A] text-white px-5 py-2 rounded"
                >
                    Next Module →
                </button>
            </div>
        </SideBar>
    );
}
