import logoImg from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://talentflowbackend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Login failed");
        setSuccessMsg("")
        return;
      }

      console.log("Login success:", data);

      // SAVE TOKEN
      localStorage.setItem("token", data.token);

      // SAVE USER
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user.role;

      //  NEW FIX: CHECK ROLE VERIFICATION
      if (!data.user.isRoleVerified) {
        navigate("/verify-account");
        return;
      }

      // ROLE-BASED DASHBOARD NAVIGATION
      if (role === "learner") {
        navigate("/learners_dashboard");
      } else if (role === "tutor") {
        navigate("/tutor-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Something went wrong");
      setSuccessMsg("")
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center lg:p-10 w-full">
        <div className="flex flex-col h-auto items-center lg:w-[40%] md:w-[75%] p-5 w-[95%]">
          <Link to="/">
            <img src={logoImg} className='h-20 object-cover w-60' />
          </Link>
          <h3 className='font-semibold mb-2 md:text-3xl text-2xl text-[#1A1A1A]'>Welcome to TalentFlow</h3>
          <p className='text-[#4A5C52]'>Sign in to continue your learning journey</p>

          {errorMsg && (
            <div className='bg-red-100 border border-red-400 mb-4 mt-5 px-4 py-3 rounded-lg text-red-700 w-full'>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className='bg-white border border-[#D8D6EF] h-auto md:p-5 mt-5 p-2 rounded-xl shadow-md w-full'>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-white border border-[#D8E6DF] focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='you@example.com'
                required
              />
            </div>

            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-[#1A1A1A] text-sm'>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-white border border-[#D8E6DF] focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='examplepassword'
                required
              />
            </div>

            <div className='flex items-center justify-between p-2 w-full'>
              <div className='flex items-center'>
                <input type="checkbox" className='h-4 mt-1 w-4' />
                <span className='ml-2 text-[#4A5C52] text-sm'>Remember Me</span>
              </div>
              <Link className='font-medium hover:underline text-[#1A7A4A] text-sm'>Forgot Password?</Link>
            </div>

            <button type='submit' className='bg-[#1A7A4A] hover:bg-[#156239] mt-5 py-3 rounded-lg text-white w-full'>
              Sign In
            </button>

            <p className='flex justify-center mt-5 text-[#4A5C52] text-sm'>
              Don't have an account
              <Link to="/sign-up" className='ml-2 text-[#1A7A4A]'>Sign Up</Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}