import { useState, useEffect } from "react";
import SideBar from "./components/sidebar";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Courses() {

    const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing', 'Business'];

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [courseType, setCourseType] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // ✅ ADDED ONLY

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("https://talentflowbackend.onrender.com/api/courses");
                const data = await res.json();

                const formatted = data.map((course, index) => ({
                    // ✅ KEEP YOUR ORIGINAL INDEX SYSTEM (DO NOT BREAK OVERVIEW)
                    id: index + 1,

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

    // ✅ ONLY EXTENDED YOUR EXISTING FILTER (NO REWRITE)
    const filteredCategory =
        selectedCategory === "All"
            ? courseType
            : courseType.filter(type => type.category === selectedCategory);

    // ✅ ADD SEARCH ON TOP OF YOUR FILTER
    const finalCourses = filteredCategory.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <SideBar title="Courses">
                <div className="h-auto p-5 w-full">

                    <h3 className="font-semibold mt-3 text-2xl">Course Catalog</h3>
                    <p className="mt-2 text-[#8A9E95] text-sm">
                        Explore and enroll in courses to expand your skills
                    </p>

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:space-y-0 mt-3 space-y-3 w-full">

                        <div className="bg-white border border-[#D8D6EF] flex h-11 items-center lg:w-[75%] px-3 rounded-lg space-x-2 w-full">
                            <FaSearch className="text-[#8F9E95]" />
                            <input
                                type="text"
                                placeholder="Search Courses..."
                                value={searchTerm} // ✅ ADDED
                                onChange={(e) => setSearchTerm(e.target.value)} // ✅ ADDED
                                className="border-none h-full outline-none text-[#8A9E95] text-[13px] w-full"
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-white border border-[#D8D6EF] cursor-pointer h-11 lg:h-auto lg:w-[23%] outline-none px-3 rounded-lg text-[13px] w-full"
                        >
                            {categories.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))}
                        </select>
                    </div>

                    {/* CATEGORY BUTTONS */}
                    <div className="gap-3 grid grid-cols-2 lg:grid-cols-6 lg:w-[75%] md:grid-cols-3 mt-5">
                        {categories.map((data, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(data)}
                                className={`py-2 rounded-md font-semibold text-sm cursor-pointer transition-all
                                    ${selectedCategory === data
                                        ? "bg-[#1A7A4A] text-white"
                                        : "bg-white border border-[#D8E6DF] text-[#4A5C52] hover:border-[#1A7A4A]"}`}
                            >
                                {data}
                            </button>
                        ))}
                    </div>

                    {/* COURSE LIST */}
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-5 py-5 w-full">

                        {finalCourses.map((data) => ( // ✅ ONLY CHANGE HERE
                            <div
                                key={data.id}
                                className="border border-[#D8D6EF] flex flex-col group hover:border-[#1A7A4A] overflow-hidden rounded-xl"
                            >
                                <img
                                    src={data.image}
                                    alt="Course"
                                    className="duration-300 group-hover:scale-105 h-48 object-cover transition w-full"
                                />

                                <p className={`absolute top-2 right-2 text-[11px] px-2.5 rounded-full py-0.5 font-semibold ${data.style}`}>
                                    {data.status}
                                </p>

                                <div className="bg-white flex flex-col p-3.5 rounded-b-xl space-y-1.5">

                                    <p className="bg-[#E8F5EC] font-medium px-2 py-1 rounded-md text-[#1A7A4A] text-xs w-fit">
                                        {data.category}
                                    </p>

                                    <h3 className="font-semibold group-hover:text-[#1A7A4A] text-md">
                                        {data.title}
                                    </h3>

                                    <p className="text-[#8A9E95] text-sm">
                                        {data.text}
                                    </p>

                                    <div className="flex justify-between text-[#8A9E95] text-sm">
                                        <p>by {data.author}</p>
                                        <p>{data.modules} modules</p>
                                    </div>

                                    <div className="mt-4 w-full">
                                        <div className="bg-[#D8E6DF] h-1.5 rounded-md w-full">
                                            <div
                                                className="bg-[#1A7A4A] h-full rounded-md"
                                                style={{ width: `${data.percent}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <Link to={`/student-course/${data.id}`}>
                                        <button
                                            className={`w-full font-semibold mt-2 py-2.5 text-sm rounded-lg transition-all
                                                ${data.percent === 0
                                                    ? "text-[#1A7A4A] border border-[#1A7A4A] hover:bg-[#156239] hover:text-white"
                                                    : "bg-[#1A7A4A] text-white hover:bg-[#156239]"}`}
                                        >
                                            {data.percent === 0 ? "Enroll Now" : "Continue Learning"}
                                        </button>
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </SideBar>
        </>
    );
}