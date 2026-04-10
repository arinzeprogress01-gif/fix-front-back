import logoImg from '../../images/logo.png'
import { Link } from 'react-router-dom'
export default function LoginPage(){
  return(
    <>
      <div className="w-full h-screen lg:p-10 flex flex-col items-center justify-center">
        <div className="w-[95%] md:w-[75%] lg:w-[40%] h-auto p-5 flex flex-col items-center">
          <Link to="/">
            <img src={logoImg} className='w-60 h-20 object-cover' />
          </Link>
          <h3 className='text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-2'>Welcome to TalentFlow</h3>
          <p className='text-[#4A5C52]'>Sign in to continue your learning journey</p>
          <form action="" className='w-full h-auto shadow-md p-2 md:p-5 mt-5 bg-white rounded-xl border-[#D8D6EF] border'>
            <div className='w-full p-2 flex flex-col'>
              <label htmlFor="email" className='text-sm font-medium text-[#1A1A1A] mb-2'>Email Address</label>
              <input type="email" className='text-sm w-full px-4 py-3 bg-white border border-[#D8E6DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all' placeholder='you@example.com' required />
            </div>
            <div className='w-full p-2 flex flex-col'>
              <label htmlFor="Password" className='text-sm font-medium text-[#1A1A1A] mb-2'>Password</label>
              <input type="password" className='text-sm w-full px-4 py-3 bg-white border border-[#D8E6DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all' placeholder='examplepassword' required />
            </div>
            <div className='w-full p-2 flex justify-between items-center'>
              <div className='flex items-center'>
                <input type="checkbox" className='mt-1 w-4 h-4 text-[#1A7A4A] border-[#D8E6DF] rounded focus:ring-[#1A7A4A]' />
                <span className='ml-2 text-sm text-[#4A5C52]'>Remember Me</span>
              </div>
              <Link className='font-medium text-sm text-[#1A7A4A] hover:underline'>Forgot Password?</Link>
            </div>
            <button type='submit' className=' mt-5 cursor-pointer w-full bg-[#1A7A4A] text-white py-3 rounded-lg hover:bg-[#156239] transition-colors font-medium'>Sign In</button>
            <p className='mt-5 flex justify-center items-center text-sm text-[#4A5C52]'>Don't have an account <Link to="/sign-up" className='text-[#1A7A4A] hover:underline font-medium ml-2'>Sign Up </Link></p>
          </form>
        </div>
      </div>
    </>
  )
}