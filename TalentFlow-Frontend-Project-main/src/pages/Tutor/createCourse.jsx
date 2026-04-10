import { LuArrowLeft, LuImage, LuPlus } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { Link } from "react-router-dom";

export default function CreateCourse(){
    return(
        <>
        <SideBar title="ST-Course">
            <div className="w-full p-5">
                <Link 
                    to="/tutor-dashboard"
                    className="flex space-x-2 items-center text-[#4A5C52] hover:text-[#1A7A4A] transition-all font-medium">
                    <LuArrowLeft  className="w-4 h-4 mt-1"/>
                    <p>Back to Dashboard</p>
                </Link>
                <h3 className="text-2xl md:text-3xl font-medium text-[#1A1A1A] mb-2 mt-4">Create New Course</h3>
                <p className="text-[#4A5C52]">Build and share knowledge with your interns</p>
                <form action="" className="w-full h-auto flex flex-col mt-6">
                    <div className="w-full h-60 border rounded-xl border-[#D8ECDF] bg-white p-5 overflow-hidden">
                        <p className="text-sm font-medium text-[#1A1A1A] mb-4">Course Thumbnail</p>
                        <div className="w-full h-auto p-5 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed  border-[#D8ECDF] group relative hover:border-2 hover:border-[#1A7A4A] hover:bg-[#EAF3EE] rounded-xl transition-all duration-300">
                            <LuImage  className="w-12 h-12 text-[#8A9E95]"/>
                            <p className="my-2 text-sm text-[#4A5C52] font-semibold">Click to upload or drag and drop</p>
                            <p className="text-xs text-[#8A9E95]">PNG, JPG (Recommended: 1200x600px)</p>
                            <input type="file" className="w-full h-40 bg-transparent border flex cursor-pointer items-center justify-center text-center absolute text-transparent" placeholder="..." />
                        </div>
                    </div>
                    <div className="w-full mt-5 p-5 border-1 border-[#D8ECDF] bg-white rounded-xl">
                        <div className='w-full p-2 flex flex-col'>
                            <label htmlFor="text" className='text-sm font-medium text-[#1A1A1A] mb-2'>Course Title</label>
                            <input type="text" className='text-sm w-full px-4 py-3 bg-white border border-[#D8E6DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all' placeholder='e.g., introduction to Web Development' required />
                        </div>
                        <div className='w-full p-2 flex flex-col mt-2'>
                            <label htmlFor="text" className='text-sm font-medium text-[#1A1A1A] mb-2'>Course Description</label>
                            <textarea name="" id="" className="text-sm w-full px-4 py-3 bg-white border border-[#D8E6DF] h-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all" placeholder="Describe what students will learn in this course..."></textarea>
                        </div>
                        <div className='w-full p-2 md:flex md:flex-row items-center flex flex-col mt-2 py-3 space-x-4'>
                            <div className="w-full md:w-1/2">
                                <label htmlFor="text" className='text-sm font-medium text-[#1A1A1A] mb-2'>Category</label>
                                <select name="" id="" className="text-sm w-full px-4 py-3 bg-white border border-[#D8E6DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all">
                                    <option value="Development">Development</option>
                                    <option value="Development">Design </option>
                                    <option value="Development">Data Science</option>
                                    <option value="Development">Marketing</option>
                                    <option value="Development">Business</option>

                                </select>
                            </div>
                            <div className='w-full md:w-1/2 p-2 flex flex-col'>
                                <label htmlFor="text" className='text-sm font-medium text-[#1A1A1A] mb-2'>Duration</label>
                                <input type="text" className='text-sm w-full px-4 py-3 bg-white border border-[#D8E6DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all' placeholder='e.g., 8 weeks' required />
                            </div>
                            {/* <label htmlFor="email" className='text-sm font-medium text-[#1A1A1A] mb-2'>Course Description</label>
                            <textarea name="" id="" className="text-sm w-full px-4 py-3 bg-white border border-[#D8E6DF] h-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all" placeholder="Describe what students will learn in this course..."></textarea> */}
                        </div>
                        <div className="w-full p-5 border-1 mt-5 rounded-xl border-[#D8E6DF]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-[#1A1A1A]">Course Module</h3>
                                <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-colors text-sm font-semibold">
                                    <LuPlus /> <p>Add module</p>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center w-full p-3 mt-5 space-x-5">
                            <button type="submit" className="w-1/2 flex items-center justify-center cursor-pointer border-2 border-[#D8E6DF] text-[#4A5C52] py-3 rounded-lg hover:border-[#B2CFC0] transition-all font-medium">
                                Cancel
                            </button>
                            <button type="submit" className="w-1/2 flex items-center justify-center cursor-pointer text-white bg-[#1A7A4A] py-3 rounded-lg hover:bg-[#156239] transition-all font-medium">
                                Create Course
                            </button>
                        </div>  
                    </div>
                </form>
            </div>
        </SideBar>
        </>
    )
}