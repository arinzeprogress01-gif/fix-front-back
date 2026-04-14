import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./components/sidebar";
import image1 from "../../images/cos1.jpg";
import image2 from "../../images/cos2.jpg";
import { motion } from "framer-motion";
import { LuBookOpen, LuClock, LuCircleCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import { buttonHoverEffects } from "./components/effect";

export default function Learners_Dashboard() {
  const [progressData, setProgressData] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "Learners_Dashboard";

    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          "https://talentflowbackend.onrender.com/api/progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProgressData(res.data.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    if (token) fetchProgress();
  }, [token]);

  if (!progressData && token) {
    return (
      <SideBar title="Dashboard">
        <div className="p-5">Loading dashboard...</div>
      </SideBar>
    );
  }

  const enrolledCourses = progressData?.courses?.length || 0;
  const overallProgress =
    progressData?.overallStats?.completionPercentage || 0;

  const activity = [
    {
      tits: "Completed Lessons",
      title: "Javascript Basics",
      time: "2 hours ago",
      style: "#1A7A4A",
    },
    {
      tits: "Submitted Assignments",
      title: "Calculator Project",
      time: "Yesterday",
      style: "#1A7A4A",
    },
    {
      tits: "Recieved grade",
      title: "92/100 on UI/UX Assignment",
      time: "2 days ago",
      style: "#1A7A4A",
    },
  ];

  const deadlines = [
    {
      title: "Build a Personal Portfolio Website",
      sub_text: "Introduction to Web Development",
      due: "4/5/2026",
      status: "Pending",
      style: "bg-[#FFF8E6] text-[#D9771C]",
    },
    {
      title: "Javascript Calculator Project",
      sub_text: "Introduction to Web Development",
      due: "3/30/2026",
      status: "Submitted",
      style: "bg-[#E8F0FB] text-[#2563EB]",
    },
    {
      title: "Redesign a Mobile App",
      sub_text: "UI/UX Design Principles",
      due: "4/15/2026",
      status: "Graded",
      style: "bg-[#E8F5EC] text-[#1A7A4A]",
    },
  ];

  const course = [
    {
      image: image1,
      title: "Introduction to Web Development",
      author: "Mr. Chukwuemeka Nwosu [WEB DEV Expert]",
      percent: 65,
    },
    {
      image: image2,
      title: "UI/UX Design Principles",
      author: "Ms. Amina Bello [UI/UX Expert]",
      percent: 30,
    },
  ];

  const data = [
    {
      title: "Enrolled Courses",
      value: enrolledCourses,
    },
    {
      title: "Overall Progress",
      value: `${overallProgress}%`,
    },
  ];

  const stats = [
    {
      icon: <LuBookOpen />,
      text: "Active Courses",
      value: 2,
      style: "bg-[#E8F5EC] text-[#1A7A4A]",
    },
    {
      icon: <LuClock />,
      text: "Pending Assignments",
      value: 1,
      style: "bg-[#E8F0FB] text-[#2563EB]",
    },
    {
      icon: <LuCircleCheck />,
      text: "Completed Courses",
      value: 1,
      style: "bg-[#E8F5EC] text-[#1A7A4A]",
    },
  ];

  return (
    <SideBar title="Dashboard">
      <div className="h-auto p-5 w-full">
        {/* HERO */}
        <div className="bg-gradient-to-br flex flex-col from-[#1A7A4A] h-auto lg:mt-5 p-5 rounded-xl to-[#156239] w-full">
          <h3 className="font-semibold lg:text-3xl mt-2 text-2xl text-white">
            Welcome Back
          </h3>

          <div className="flex items-center justify-between my-4 w-75">
            {data.map((details, index) => (
              <div key={index} className="bg-[#4B8966] px-5 py-2 rounded-md">
                <h3 className="font-semibold text-[13px] text-white/80">
                  {details.title}
                </h3>
                <p className="font-bold text-2xl text-white">
                  {details.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="flex gap-5 grid grid-cols lg:grid-cols-3 md:grid-cols-2 mt-5 py-5 sm:grid-cols-1 w-full">
          {stats.map((data, index) => (
            <div
              key={index}
              className="bg-white border border-[#D8ECDF] flex flex-col p-5 rounded-xl"
            >
              <div className="flex space-x-3">
                <div
                  className={`w-10 h-10 p-2 rounded-md flex items-center justify-center ${data.style}`}
                >
                  {data.icon}
                </div>
                <p className="text-[#8A9E95] text-sm">{data.text}</p>
              </div>

              <h3 className="font-semibold mt-3.5 text-3xl">
                {data.value}
              </h3>
            </div>
          ))}
        </div>

        {/* COURSES */}
        <div className="flex flex-col lg:flex lg:flex-row lg:space-x-5 mt-5 py-3 space-y-5">
          {course.map((data, index) => (
            <div
              key={index}
              className="border border-[#D8ECDF] flex flex-col group lg:w-1/2 overflow-hidden rounded-xl w-full"
            >
              <img
                src={data.image}
                className="h-40 object-cover w-full"
              />

              <div className="bg-white p-4">
                <h3 className="font-semibold">{data.title}</h3>
                <p className="text-[#8A9E95] text-sm">by {data.author}</p>

                <div className="bg-[#E8F5EC] h-1.5 mt-3 relative rounded-xl w-full">
                  <div
                    className="absolute bg-[#1A7A4A] h-full rounded-xl"
                    style={{ width: `${data.percent}%` }}
                  />
                </div>

                <p className="mt-1 text-[#8A9E95] text-sm">
                  {data.percent}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DEADLINES */}
        <div className="mt-5">
          {deadlines.map((data, index) => (
            <div key={index} className="border-b p-3">
              <h3 className="font-semibold">{data.title}</h3>
              <p className="text-[#8A9E95] text-sm">{data.sub_text}</p>
            </div>
          ))}
        </div>
      </div>
    </SideBar>
  );
}