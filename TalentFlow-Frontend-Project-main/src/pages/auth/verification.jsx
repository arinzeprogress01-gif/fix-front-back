import { Link, useNavigate } from "react-router-dom"
import logoImg from '../../images/logo.png'
import { useState } from "react";
import axios from "axios"

export default function Verification(){
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [courseId, setCourseId] = useState("");
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const token = localStorage.getItem("token");

  const handleVerify = async (e) => { 
    e.preventDefault();

    // VALIDATION
    if (!fullName || !referenceNumber || !courseId) {
      setErrorMsg("All fields are required");
      setSuccessMsg("")
      return;
    }

    if (!token) {
      setErrorMsg("Session expired. Please login again.");
      setSuccessMsg("")
      navigate("/sign-in");
      return;
    }

    try {
      const res = await axios.post(   // 🔥 FIXED: POST (unless your backend is truly PUT)
        "https://talentflowbackend.onrender.com/api/auth/verify-role",
        {
          fullName,
          referenceNumber,
          courseId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      setSuccessMsg("Verification successful 🎉");
      setErrorMsg("");

      // SAVE VERIFIED STATE
      localStorage.setItem("isVerified", "true");

      const role = res.data.role;

      //  NEW FIX: GO STRAIGHT TO DASHBOARD
      setTimeout(() => {
        if (role === "learner") {
          navigate("/learners_dashboard");
        } else if (role === "tutor") {
          navigate("/tutor-dashboard");
        } else {
          navigate("/");
        }
      }, 1500);

    } catch (err) {
      console.log(err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Verification failed");
      setSuccessMsg("")
    }
  };

  return(
    <>
      <div className="flex flex-col h-screen items-center justify-center lg:p-10 w-full">
        <div className="flex flex-col h-auto items-center lg:w-[40%] md:w-[75%] p-5 w-full">
          <Link to="/">
            <img src={logoImg} className='h-20 object-cover w-60' />
          </Link>

          <h3 className='font-semibold mb-2 md:text-3xl text-2xl text-[#1A1A1A]'>
            Verify Account
          </h3>

          {successMsg && (
            <div className="bg-green-100 border border-green-400 mb-4 mt-5 px-4 py-3 rounded-lg text-green-700 w-full">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 mb-4 mt-5 px-4 py-3 rounded-lg text-red-700 w-full">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleVerify} className='bg-white border border-[#D8D6EF] h-auto md:p-5 mt-5 p-2 rounded-xl shadow-md w-full'>
            
            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='John Kole'
                required
              />
            </div>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>Reference Number</label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className='border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='LRN/TRN-2026-XXXXX'
                required
              />
            </div>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-sm'>Course Enrolled</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className='border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                required
              >
                <option value="">Select Course</option>
                <option value="69e359fb322bec78f8267da1">Frontend Development</option>
                <option value="69e359fb322bec78f8267da2">Backend Development</option>
                <option value="69e359fb322bec78f8267da3">UI/UX Design</option>
                <option value="69e359fb322bec78f8267da4">Project Management</option>
                <option value="69e359fb322bec78f8267da5">AI Integration</option>
                <option value="69e359fb322bec78f8267da6">Machine Learning</option>
              </select>
            </div>

            <button
              type='submit'
              className='bg-[#1A7A4A] hover:bg-[#156239] mb-10 mt-5 py-3 rounded-lg text-white w-full'
            >
              Verify Now
            </button>

          </form>
        </div>
      </div>
    </>
  )
}
