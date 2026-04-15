import { useState, useEffect } from "react";
import SideBar from "./components/sidebar";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { courseType as staticCourses } from "./data/course";

export default function Courses() {

    const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing', 'Business'];

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [backendCourses, setBackendCourses] = useState([]);

    // 🔥 FETCH BACKEND COURSES
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("https://talentflowbackend.onrender.com/api/courses");
                const data = await res.json();

                const formatted = data.map((course, index) => ({
                    id: course._id || index + 1000, // avoid collision with static
                    title: course.title,
                    text: course.description,
                    category: course.category || "Development",
                    author: course.instructor || "Admin",
                    modules: course.modules?.length || 0,
                    percent: 0,
                    image: course.image || "https://placehold.co/600x400",
                    status: "New",
                    style: "bg-[#E8F5EC] text-[#1A7A4A]"
                }));

                setBackendCourses(formatted);

            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };

        fetchCourses();
    }, []);

    // 🔥 MERGE STATIC + BACKEND (IMPORTANT FIX)
    const allCourses = [...staticCourses, ...backendCourses];

    // 🔥 CATEGORY FILTER
    const filteredCategory =
        selectedCategory === "All"
            ? allCourses
            : allCourses.filter(c => c.category === selectedCategory);

    // 🔥 SEARCH FILTER (BACKEND INCLUDED)
    const filteredCourses = filteredCategory.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SideBar title="Courses">
            <div className="h-auto p-5 w-full">

                <h3 className="font-semibold mt-3 text-2xl">Course Catalog</h3>
                <p className="mt-2 text-[#8A9E95] text-sm">
                    Explore and enroll in courses to expand your skills
                </p>

                {/* SEARCH + FILTER */}
                <div className="flex flex-col lg:flex-row mt-3 space-y-3 lg:space-y-0 w-full justify-between">

                    <div className="bg-white border border-[#D8D6EF] flex h-11 items-center lg:w-[75%] px-3 rounded-lg space-x-2 w-full">
                        <FaSearch className="text-[#8F9E95]" />
                        <input
                            type="text"
                            placeholder="Search Courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="outline-none text-[#8A9E95] text-[13px] w-full"
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-white border border-[#D8D6EF] h-11 lg:w-[23%] px-3 rounded-lg text-[13px]"
                    >
                        {categories.map((data, index) => (
                            <option key={index} value={data}>{data}</option>
                        ))}
                    </select>
                </div>

                {/* CATEGORY BUTTONS */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                    {categories.map((data, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(data)}
                            className={`py-2 rounded-md font-semibold text-sm
                            ${selectedCategory === data
                                ? "bg-[#1A7A4A] text-white"
                                : "bg-white border text-[#4A5C52]"}`}
                        >
                            {data}
                        </button>
                    ))}
                </div>

                {/* COURSE LIST */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                    {filteredCourses.map((data) => (
                        <div
                            key={data.id}
                            className="border flex flex-col group overflow-hidden rounded-xl"
                        >
                            <img
                                src={data.image}
                                className="h-48 object-cover w-full group-hover:scale-105 transition"
                            />

                            <p className={`absolute top-2 right-2 text-[11px] px-2 py-0.5 rounded-full ${data.style}`}>
                                {data.status}
                            </p>

                            <div className="bg-white p-3.5 space-y-2">

                                <p className="text-xs bg-[#E8F5EC] text-[#1A7A4A] w-fit px-2 py-1 rounded">
                                    {data.category}
                                </p>

                                <h3 className="font-semibold group-hover:text-[#1A7A4A]">
                                    {data.title}
                                </h3>

                                <p className="text-sm text-[#8A9E95]">
                                    {data.text}
                                </p>

                                <div className="flex justify-between text-sm text-[#8A9E95]">
                                    <p>by {data.author}</p>
                                    <p>{data.modules} modules</p>
                                </div>

                                <div className="w-full mt-3 h-1.5 bg-[#D8E6DF] rounded">
                                    <div
                                        className="h-full bg-[#1A7A4A] rounded"
                                        style={{ width: `${data.percent}%` }}
                                    />
                                </div>

                                <Link to={`/student-course/${data.id}`}>
                                    <button className="w-full mt-2 py-2.5 rounded-lg font-semibold bg-[#1A7A4A] text-white">
                                        {data.percent === 0 ? "Enroll Now" : "Continue Learning"}
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </SideBar>
    );
}
