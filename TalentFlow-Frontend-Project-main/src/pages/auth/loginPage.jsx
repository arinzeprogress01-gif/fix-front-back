import logoImg from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginPage() {

  const navigate = useNavigate();

  // ✅ STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ HANDLE LOGIN
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
        alert(data.message || "Login failed");
        return;
      }

      console.log("Login success:", data);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ SAVE USER (optional but useful)
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ ROLE-BASED REDIRECT
      if (data.user.role === "learner") {
        navigate("/learner-dashboard");
      } else if (data.user.role === "tutor") {
        navigate("/tutor-dashboard");
      } else if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="w-full h-screen lg:p-10 flex flex-col items-center justify-center">
        <div className="w-[95%] md:w-[75%] lg:w-[40%] p-5 flex flex-col items-center">

          <Link to="/">
            <img src={logoImg} className='w-60 h-20 object-cover' />
          </Link>

          <h3 className='text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-2'>
            Welcome to TalentFlow
          </h3>

          <p className='text-[#4A5C52]'>
            Sign in to continue your learning journey
          </p>

          {/* ✅ CONNECTED FORM */}
          <form onSubmit={handleLogin} className='w-full shadow-md p-2 md:p-5 mt-5 bg-white rounded-xl border'>

            {/* EMAIL */}
            <div className='p-2 flex flex-col'>
              <label className='text-sm font-medium mb-2'>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='px-4 py-3 border rounded-lg text-sm'
                placeholder='you@example.com'
                required
              />
            </div>

            {/* PASSWORD */}
            <div className='p-2 flex flex-col'>
              <label className='text-sm font-medium mb-2'>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='px-4 py-3 border rounded-lg text-sm'
                placeholder='********'
                required
              />
            </div>

            {/* REMEMBER */}
            <div className='p-2 flex justify-between items-center'>
              <div className='flex items-center'>
                <input type="checkbox" className='w-4 h-4' />
                <span className='ml-2 text-sm'>Remember Me</span>
              </div>

              <Link className='text-sm text-[#1A7A4A]'>
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              type='submit'
              className='mt-5 w-full bg-[#1A7A4A] text-white py-3 rounded-lg cursor-pointer'
            >
              Sign In
            </button>

            {/* LINK */}
            <p className='mt-5 flex justify-center text-sm'>
              Don't have an account
              <Link to="/sign-up" className='ml-2 text-[#1A7A4A]'>
                Sign Up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}
