import { Link, useNavigate } from "react-router-dom"
import logoImg from '../../images/logo.png'
import { useState } from "react"
import axios from "axios"

export default function Verification() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [courseId, setCourseId] = useState("");

  const token = localStorage.getItem("token");

  const handleVerify = async (e) => {
    e.preventDefault();

    // ✅ BASIC VALIDATION
    if (!fullName || !referenceNumber || !courseId) {
      alert("All fields are required");
      return;
    }

    // ❌ NO TOKEN → BACK TO LOGIN
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/sign-in");
      return;
    }

    try {
      const res = await axios.post(
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

      alert("Verification successful 🎉");

      // ✅ SAVE VERIFIED STATE
      localStorage.setItem("isVerified", "true");

      // ✅ ROLE-BASED NAVIGATION (VERY IMPORTANT)
      const role = res.data.role;

      if (role === "learner") {
        navigate("/learner-dashboard");
      } else if (role === "tutor") {
        navigate("/tutor-dashboard");
      } else {
        navigate("/"); // fallback
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-5 w-full">
      <div className="flex flex-col items-center max-w-md p-5 w-full">

        <Link to="/">
          <img src={logoImg} className='h-20 object-cover w-60' />
        </Link>

        <h3 className='font-semibold mb-2 text-2xl'>Verify Account</h3>

        <form onSubmit={handleVerify} className='bg-white border mt-5 p-5 rounded-xl w-full'>

          {/* FULL NAME */}
          <div className='flex flex-col p-2'>
            <label className='mb-2 text-sm'>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='border px-4 py-3 rounded-lg text-sm'
              placeholder='John Kole'
              required
            />
          </div>

          {/* REF NUMBER */}
          <div className='flex flex-col p-2'>
            <label className='mb-2 text-sm'>Reference Number</label>
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className='border px-4 py-3 rounded-lg text-sm'
              placeholder='LRN-XXXX or TRN-XXXX'
              required
            />
          </div>

          {/* COURSE */}
          <div className='flex flex-col p-2'>
            <label className='mb-2 text-sm'>Course Enrolled</label>
            <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className='border px-4 py-3 rounded-lg text-sm'
                required
            >
                <option value="">Select Course</option>

                <option value="69d3a887524a5f49708a4f5a">Frontend Development</option>
                <option value="69d3a887524a5f49708a4f5b">Backend Development</option>
                <option value="69d3a887524a5f49708a4f5c">UI/UX Design</option>
                <option value="69d3a887524a5f49708a4f5d">Project Management</option>
                <option value="69d3a887524a5f49708a4f5e">AI Integration</option>
                <option value="69d3a887524a5f49708a4f5f">Machine Learning</option>

            </select>
          </div>

          <button
            type='submit'
            className='bg-[#1A7A4A] mt-5 py-3 rounded-lg text-white w-full'
          >
            Verify Now
          </button>

        </form>
      </div>
    </div>
  )
}