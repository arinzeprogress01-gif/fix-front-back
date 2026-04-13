import logoImg from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginPage() {

  const navigate = useNavigate();

  // ✅ STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "https://talentflowbackend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      console.log("Login success:", data);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ REDIRECT BASED ON ROLE
      if (data.role === "learner") {
        navigate("/dashboard");
      } else if (data.role === "tutor") {
        navigate("/tutor-dashboard");
      } else if (data.role === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center lg:p-10 w-full">
      <div className="flex flex-col items-center lg:w-[40%] md:w-[75%] p-5 w-[95%]">

        <Link to="/">
          <img src={logoImg} className='h-20 object-cover w-60' />
        </Link>

        <h3 className='font-semibold mb-2 md:text-3xl text-2xl'>
          Welcome to TalentFlow
        </h3>

        <p className='text-[#4A5C52]'>
          Sign in to continue your learning journey
        </p>

        {/* ✅ CONNECT FORM */}
        <form onSubmit={handleLogin} className='bg-white border mt-5 p-5 rounded-xl shadow-md w-full'>

          {/* EMAIL */}
          <div className='mb-3 w-full'>
            <label className='font-medium mb-2 text-sm'>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border px-4 py-3 rounded-lg w-full'
              placeholder='you@example.com'
              required
            />
          </div>

          {/* PASSWORD */}
          <div className='mb-3 w-full'>
            <label className='font-medium mb-2 text-sm'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border px-4 py-3 rounded-lg w-full'
              placeholder='Enter password'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='bg-[#1A7A4A] mt-5 py-3 rounded-lg text-white w-full'
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className='mt-5 text-center text-sm'>
            Don't have an account
            <Link to="/sign-up" className='ml-2 text-[#1A7A4A]'>
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}