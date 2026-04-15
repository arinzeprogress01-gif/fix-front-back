import { useState, useEffect } from "react";
import SideBar from "./components/sidebar";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Courses() {

    const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing', 'Business'];

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [courseType, setCourseType] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("https://talentflowbackend.onrender.com/api/courses");
                const data = await res.json();

                const formatted = data.map((course) => ({
                    id: course._id || course.id, // ✅ FIX: use backend ID (VERY IMPORTANT)

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

                setCourseType(formatted);

            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };

        fetchCourses();
    }, []);

    // 🔥 CATEGORY + SEARCH FILTER COMBINED
    const filteredCourses = courseType.filter(course => {

        const matchesCategory =
            selectedCategory === "All" || course.category === selectedCategory;

        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.text.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <SideBar title="Courses">
            <div className="h-auto p-5 w-full">

                <h3 className="font-semibold mt-3 text-2xl">Course Catalog</h3>

                <p className="mt-2 text-[#8A9E95] text-sm">
                    Explore and enroll in courses to expand your skills
                </p>

                {/* SEARCH */}
                <div className="flex flex-col lg:flex-row mt-3 space-y-3">

                    <div className="bg-white border flex h-11 items-center lg:w-[75%] px-3 rounded-lg space-x-2 w-full">
                        <FaSearch className="text-[#8F9E95]" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="Search Courses..."
                            className="outline-none w-full text-sm"
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-white border h-11 lg:w-[23%] px-3 rounded-lg text-sm w-full"
                    >
                        {categories.map((data, index) => (
                            <option key={index} value={data}>{data}</option>
                        ))}
                    </select>
                </div>

                {/* CATEGORY BUTTONS (UNCHANGED) */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                    {categories.map((data, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(data)}
                            className={`py-2 rounded-md text-sm font-semibold
                                ${selectedCategory === data
                                    ? "bg-[#1A7A4A] text-white"
                                    : "bg-white border text-[#4A5C52]"}`
                            }
                        >
                            {data}
                        </button>
                    ))}
                </div>

                {/* COURSE CARDS (NOW FULLY BACKEND + SEARCH SAFE) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                    {filteredCourses.map((data) => (
                        <div
                            key={data.id}
                            className="border flex flex-col rounded-xl overflow-hidden"
                        >
                            <img
                                src={data.image}
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-4 bg-white">

                                <p className="text-xs text-[#1A7A4A] bg-[#E8F5EC] w-fit px-2 py-1 rounded">
                                    {data.category}
                                </p>

                                <h3 className="font-semibold mt-2">
                                    {data.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {data.text}
                                </p>

                                <div className="text-sm mt-2 flex justify-between">
                                    <p>by {data.author}</p>
                                    <p>{data.modules} modules</p>
                                </div>

                                <Link to={`/student-course/${data.id}`}>
                                    <button className="w-full mt-3 bg-[#1A7A4A] text-white py-2 rounded">
                                        Continue
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
