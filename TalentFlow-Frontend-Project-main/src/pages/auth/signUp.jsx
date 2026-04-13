import logoImg from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function SignUpPage() {

  // ✅ ADD STATE
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Learner");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ HANDLE SUBMIT
  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔥 map frontend role → backend role
    let mappedRole = "learner";
    if (role === "Mentor") mappedRole = "tutor";
    if (role === "Admin") mappedRole = "admin";

    try {
      const res = await fetch("https://talentflowbackend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          role: mappedRole
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      console.log("Registration success:", data);

    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col h-auto items-center justify-center lg:p-10 md:p-5 p-3 w-full">
        <div className="flex flex-col h-auto items-center lg:w-[40%] md:p-5 md:w-[75%] p-3 w-full">
          <Link to="/">
            <img src={logoImg} className='h-20 object-cover w-60' />
          </Link>
          <h3 className='font-semibold mb-2 text-3xl text-[#1A1A1A]'>Join TalentFlow</h3>
          <p className='text-[#4A5C52]'>Create your account and start learning</p>

          {/* ✅ CONNECT FORM */}
          <form onSubmit={handleRegister} className='bg-white border-[#D8D6EF] h-auto md:p-5 mt-5 p-2 rounded-xl shadow-md w-full'>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='bg-white border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='Your Full Name'
                required
              />
            </div>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-white border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='you@example.com'
                required
              />
            </div>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>I am joining as a</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='bg-white border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
              >
                {/* ✅ FIXED VALUES ONLY */}
                <option value="Learner">Learner</option>
                <option value="Mentor">Mentor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-white border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='examplepassword'
                required
              />
            </div>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='bg-white border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='........'
                required
              />
            </div>

            <div className='flex items-center justify-between p-2 w-full'>
              <div className='flex items-center'>
                <input type="checkbox" className='h-4 mt-1 w-4' />
                <span className='md:text-sm ml-2 text-[#4A5C52] text-xs'>
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </div>
            </div>

            <button type='submit' className='bg-[#1A7A4A] cursor-pointer mt-5 py-3 rounded-lg text-white w-full'>
              Create Account
            </button>

            <p className='flex items-center justify-center mt-5 text-[#4A5C52] text-sm'>
              Already have have an account
              <Link to="/sign-in" className='ml-2 text-[#1A7A4A]'>
                Sign In
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}