import logoImg from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function SignUpPage() {

  const navigate = useNavigate();

  // STATE
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Learner");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // SUBMIT
  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION (IMPORTANT)
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    // map role → backend
    let mappedRole = "learner";
    if (role === "Mentor") mappedRole = "tutor";
    if (role === "Admin") mappedRole = "admin";

    try {
      const res = await fetch(
        "https://talentflowbackend.onrender.com/api/auth/register",
        {
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
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      console.log("Registration success:", data);

      alert("Account created successfully 🎉");

      // ✅ OPTIONAL: redirect to login
      navigate("/verification");

    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-auto items-center justify-center lg:p-10 md:p-5 p-3 w-full">
        <div className="flex flex-col h-auto items-center lg:w-[40%] md:p-5 md:w-[75%] p-3 w-full">

          <Link to="/">
            <img src={logoImg} className='h-20 object-cover w-60' />
          </Link>

          <h3 className='font-semibold mb-2 text-3xl text-[#1A1A1A]'>
            Join TalentFlow
          </h3>

          <p className='text-[#4A5C52]'>
            Create your account and start learning
          </p>

          <form
            onSubmit={handleRegister}
            className='bg-white border-[#D8D6EF] md:p-5 mt-5 p-2 rounded-xl shadow-md w-full'
          >

            {/* FULL NAME */}
            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-sm'>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='Your Full Name'
                required
              />
            </div>

            {/* EMAIL */}
            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-sm'>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='you@example.com'
                required
              />
            </div>

            {/* ROLE */}
            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-sm'>
                I am joining as a
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
              >
                <option value="Learner">Learner</option>
                <option value="Mentor">Mentor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* PASSWORD */}
            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-sm'>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='Enter password'
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className='flex flex-col p-2 w-full'>
              <label className='font-medium mb-2 text-sm'>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='border border-[#D8E6DF] px-4 py-3 rounded-lg text-sm w-full'
                placeholder='Confirm password'
                required
              />
            </div>

            {/* TERMS */}
            <div className='flex items-center p-2 w-full'>
              <input type="checkbox" required className='h-4 w-4' />
              <span className='ml-2 text-[#4A5C52] text-xs'>
                I agree to the Terms of Service and Privacy Policy
              </span>
            </div>

            {/* BUTTON */}
            <button
              type='submit'
              disabled={loading}
              className='bg-[#1A7A4A] disabled:opacity-50 mt-5 py-3 rounded-lg text-white w-full'
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* LOGIN LINK */}
            <p className='flex justify-center mt-5 text-[#4A5C52] text-sm'>
              Already have an account?
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