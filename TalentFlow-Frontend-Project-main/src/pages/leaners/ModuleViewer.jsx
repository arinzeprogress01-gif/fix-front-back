import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ModuleViewer({ courses }) {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const module = courses.modulesView.find(
        m => m.id === Number(moduleId)
    );

    const handleComplete = async () => {
        try {
            await axios.put(
                "https://talentflowbackend.onrender.com/api/progress/update",
                {
                    courseName: courses.title
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // go to next module
            navigate(`/course/${courseId}/module/${Number(moduleId) + 1}`);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">{module.title}</h1>

            <p className="mt-4">{module.content}</p>

            <button
                onClick={handleComplete}
                className="mt-5 bg-green-600 text-white px-4 py-2"
            >
                Next Module
            </button>
        </div>
    );
      }
