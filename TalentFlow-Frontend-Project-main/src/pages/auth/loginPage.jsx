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

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ ROLE-BASED NAVIGATION (VERY IMPORTANT)
      const role = data.user.role;

      if (role === "learner") {
        navigate("/learner-dashboard");
      } else if (role === "tutor") {
        navigate("/tutor-dashboard");
      } else if (role === "admin") {
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
      <div className="flex flex-col h-screen items-center justify-center lg:p-10 w-full">
        <div className="flex flex-col items-center lg:w-[40%] md:w-[75%] p-5 w-[95%]">

          <Link to="/">
            <img src={logoImg} className='h-20 object-cover w-60' />
          </Link>

          <h3 className='font-semibold mb-2 md:text-3xl text-2xl text-[#1A1A1A]'>
            Welcome to TalentFlow
          </h3>

          <p className='text-[#4A5C52]'>
            Sign in to continue your learning journey
          </p>

          <form onSubmit={handleLogin} className='bg-white border md:p-5 mt-5 p-2 rounded-xl shadow-md w-full'>

            <div className='flex flex-col p-2'>
              <label className='font-medium mb-2 text-sm'>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border px-4 py-3 rounded-lg text-sm'
                placeholder='you@example.com'
                required
              />
            </div>

            <div className='flex flex-col p-2'>
              <label className='font-medium mb-2 text-sm'>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border px-4 py-3 rounded-lg text-sm'
                placeholder='********'
                required
              />
            </div>

            <div className='flex items-center justify-between p-2'>
              <div className='flex items-center'>
                <input type="checkbox" className='h-4 w-4' />
                <span className='ml-2 text-sm'>Remember Me</span>
              </div>

              <Link className='text-[#1A7A4A] text-sm'>
                Forgot Password?
              </Link>
            </div>

            <button
              type='submit'
              className='bg-[#1A7A4A] cursor-pointer mt-5 py-3 rounded-lg text-white w-full'
            >
              Sign In
            </button>

            <p className='flex justify-center mt-5 text-sm'>
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