import { useState, useEffect } from "react";
import SideBar from "./components/sidebar";
import { FaSearch } from "react-icons/fa";

// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { courseType as staticCourses } from "./data/course";

import axios from "axios";

export default function Courses(){
    const categories = ['All', 'Development', 'Design', 'Data Science', 'Marketing', 'Business'];
    const token = localStorage.getItem("token");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [courseType, setCourseType] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userData, setUserData] = useState(null);

    // 🔥 FETCH USER DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesRes, userRes] = await Promise.all([
                    fetch("https://talentflowbackend.onrender.com/api/courses"),
                    axios.get("https://talentflowbackend.onrender.com/api/user/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                const coursesData = await coursesRes.json();

                setUserData(userRes.data.data);

                const formatted = coursesData.map((course, index) => ({
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
                console.error("Error fetching data:", err);
            }
        };

        if (token) fetchData();
    }, [token]);

    const filteredCategory =
        selectedCategory === "All"
            ? courseType
            : courseType.filter(type => type.category === selectedCategory);

    // ✅ ADD SEARCH ON TOP OF YOUR FILTER
    const finalCourses = filteredCategory.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // const filteredCategory = selectedCategory === "All" ? courseType : courseType.filter(type => type.category === selectedCategory);
    if (!userData) {
        return <div className="p-5">Loading courses...</div>;
    }
    return(
        <>
           <SideBar  title="Courses" userData={userData}>
                <div className="h-auto p-5 w-full">
                    <h3 className="font-semibold mt-3 text-2xl">Course Catalog</h3>
                    <p className="mt-2 text-[#8A9E95] text-sm">Explore and enroll in courses to expand your skills</p>
                    <div className="flex flex-col lg:flex lg:flex-row lg:justify-between lg:space-y-0 mt-2 mt-3 space-y-3 w-full">
                        <div className="bg-white border border-[#D8D6EF] flex focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] h-11 items-center lg:w-[75%] px-3 rounded-lg space-x-2 transition-all w-full">
                            <FaSearch  className="text-[#8F9E95]"/>
                            <input type="text" placeholder="Search Courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-none h-full outline-none text-[#8A9E95] text-[13px] w-full"/>
                        </div>
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-white border border border-[#D8D6EF] cursor-pointer h-11 lg:h-auto lg:w-[23%] outline-none px-3 rounded-lg text-[13px] w-full">
                             {categories.map((data, index) => (
                                <option key={index} value={data}>{data}</option>
                            ))}
                            
                        </select>
                    </div>
                    
                    <div className="gap-3 grid grid-cols-2 lg:grid-cols-6 mt-5">
                        {categories.map((data, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(data)}
                                className={`py-2 rounded-md font-semibold text-sm cursor-pointer transition-all
                                ${selectedCategory === data
                                    ? "bg-[#1A7A4A] text-white"
                                    : "bg-white hover:bg-transparent border-1 border-[#D8D6EF] text-[#4A5C52]"}`}
                            >
                                {data}
                            </button>
                        ))}
                    </div>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-5">

                    {finalCourses.map((data) => (
                        <div
                            key={data.id}
                            className="border flex flex-col group overflow-hidden rounded-xl"
                        >
                            <img
                                src={data.image}
                                className="group-hover:scale-105 h-48 object-cover transition w-full"
                            />

                            <p className={`absolute top-2 right-2 text-[11px] px-2 py-0.5 rounded-full ${data.style}`}>
                                {data.status}
                            </p>

                            <div className="bg-white p-3.5 space-y-2">

                                <p className="bg-[#E8F5EC] px-2 py-1 rounded text-[#1A7A4A] text-xs w-fit">
                                    {data.category}
                                </p>

                                <h3 className="font-semibold group-hover:text-[#1A7A4A]">
                                    {data.title}
                                </h3>

                                <p className="text-[#8A9E95] text-sm">
                                    {data.text}
                                </p>

                                <div className="flex justify-between text-[#8A9E95] text-sm">
                                    <p>by {data.author}</p>
                                    <p>{data.modules} modules</p>
                                </div>

                                <div className="bg-[#D8E6DF] h-1.5 mt-3 rounded w-full">
                                    <div
                                        className="bg-[#1A7A4A] h-full rounded"
                                        style={{ width: `${data.percent}%` }}
                                    />
                                </div>

                                <Link to={`/student-course/${data.id}`}>
                                    <button className="bg-[#1A7A4A] cursor-pointer font-semibold mt-2 py-2.5 rounded-lg text-white w-full">
                                        {data.percent === 0 ? "Enroll Now" : "Continue Learning"}
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))}

                </div>
                    {/* <div className="lg:py-5 mt-5 w-full">
                        <div className="gap-3 grid grid-cols-2 lg:grid-cols-6 lg:w-[75%] md:grid-cols-3 sm:grid-cols-2">
                            {courses.map((data, index) => (
                                <button key={index}
                                    onClick={() => {
                                        setSelectedCategory(data);
                                    }}
                                        className={`w-auto py-2 rounded-md font-semibold text-sm cursor-pointer hover:border-1 hover:border-[#1A7A4A] ${selectedCategory === data ? "bg-[#1A7A4A]  text-white" : "bg-white border-1 border-[#D8E6DF] text-[#4A5C52]" }`}
                                    >
                                        {data}
                                </button>
                            ))}
                        </div>
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-5 py-5 sm:grid-cols-1 w-full">
                            {filteredCategory.map((data, index) => (
                                <div className="border-1 border-[#D8D6EF] flex flex-col group hover:border-1 hover:border-[#1A7A4A] mb-2 overflow-hidden relative rounded-xl">
                                    <img src={data.image} alt="Course_Images" className="duration-300 group-hover:scale-105 h-48 object-cover transition-all w-full" />
                                    <p className={`absolute top-2 right-2 text-[11px] px-2.5 rounded-full py-0.5 font-semibold ${data.style}`}>{data.status}</p>
                                    <div className="bg-white flex flex-col p-3.5 rounded-b-xl space-y-1.5">
                                        <p className="bg-[#E8F5EC] flex font-medium items-center justify-center mt-1 px-1 py-1.5 rounded-md text-[#1A7A4A] text-xs w-25">{data.category}</p>
                                        <h3 className="font-semibold group-hover:text-[#1A7A4A] text-md">{data.title}</h3>
                                        <p className="text-[#8A9E95] text-sm">{data.text}</p>
                                        <div className="flex items-center justify-between mt-1 text-[#8A9E95] text-sm">
                                            <p>by {data.author}</p>
                                            <p>{data.modules} modules</p>
                                        </div>
                                        <div className="mt-4 w-full">
                                            <div className="bg-[#D8E6DF] h-1.5 relative rounded-md w-full">
                                                <div className={`absolute rounded-md h-full bg-[#1A7A4A]`} style={{ width: `${data.percent}%` }}>

                                                </div>
                                            </div>

                                        </div>
                                        <button
                                            className={`font-semibold mt-2 py-2.5 text-sm rounded-lg cursor-pointer transition-all duration-300 ${data.percent === 0 ? "text-[#1A7A4A] border-1 border-[#1A7A4A] hover:bg-[#156239] hover:text-[#FFFFFF]" : "bg-[#1A7A4A] text-white hover:bg-[#156239]"}`}>
                                            <Link to={`/student-course/${data.id}`}>
                                                {data.percent === 0 ? "Enroll Now" : "Continue Learning"}
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div> */}
                </div>
            </SideBar> 
        </>
    )
}