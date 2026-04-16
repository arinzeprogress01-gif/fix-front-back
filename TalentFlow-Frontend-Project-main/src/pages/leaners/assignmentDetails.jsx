import { useParams } from "react-router-dom"
import SideBar from "./components/sidebar";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuLink } from "react-icons/lu";
export default function AssignmentOverview(){
    const assignments = [
        {
            id : 1,
            title : 'Build a Personal Portfolio Website',
            sub_title : 'Introduction to Web Development',
            text : 'Create a responsive portfolio website using HTML,CSS and Javascript',
            status : 'Pending',
            due : '4/5/2026',
            style : 'bg-[#FFF8E6] text-[#D9771C]',
            link_text : 'Submit Assignment'
        },
        {
            id : 2,
            title : 'Javascript Calculator Project',
            sub_title : 'Introduction to Web Development',
            text : 'Build a functional calculator using vanilla Javascript',
            status : 'Submitted',
            due : '3/30/2026',
            style : 'bg-[#E8F0FB] text-[#2563EB]',
            link_text : 'View Submission'
        },
        {
            id : 3,
            title : 'Redesign a Mobile App',
            sub_title : 'UI/UX Design Principles',
            text : 'Choose an existing mobile app and create a redesigned version with improved UX',
            status : 'Graded',
            due : '4/15/2026',
            result : '92/100',
            style : 'bg-[#E8F5EC] text-[#1A7A4A]',
            link_text : 'View Feedback'
        },
        {
            id : 4,
            title : 'Social Media Campaign Strategy',
            sub_title : 'Digital Marketing Fundamentals ',
            text : 'Develop a complete social media marketing strategy for a fictional band.',
            status : 'Overdue',
            due : '3/25/2026',
            style : 'bg-[#FDECDA] text-[#DD3E31]',
            link_text : 'Submit Assignment'
        },
    ]
    const { id } = useParams();
    const assignment = assignments.find((item) => item.id === Number(id));
    if (!assignment) return <p>Assignment not found</p>;
    
    return(
        <>
            <SideBar title="Assignments">
                <div className="h-auto lg:p-10 p-5 w-full">
                    <Link to="/assignment" className="flex hover:text-[#1A7A4A] items-center py-3 space-x-1 text-[#4A5C52] w-full">
                        <LuArrowLeft  className="mt-0.5"/>
                        <p className="font-semibold">Back to Assignments</p>
                    </Link>
                    <div className="bg-white border-1 border-[#D8D6EF] flex flex-col mt-5 px-5 py-7 rounded-xl space-y-2 w-full">
                        <p className="text-[#8A9E95] text-sm">{assignment.sub_title}</p>
                        <h3 className="font-semibold text-2xl text-[#1A1A1A]">{assignment.title}</h3>
                        <p className="mt-1.5 text-[#4A5C52] text-sm">{assignment.text}</p>
                        <div className="flex items-center space-x-3 text-[#8A9E95] text-sm">
                        <p>Due:{assignment.due}</p>
                        <div className="bg-[#8A9E95] border h-1 mt-1 rounded-full w-1"></div>
                        <p>On time</p>
                        </div>
                    </div>
                    <form action="" className="flex flex-col mt-5 py-5 space-y-4 w-full">
                        <div className="bg-white border-1 border-[#D8D6EF] p-4 rounded-lg w-full">
                            <p className="font-semibold text-[#1A1A1A] text-[13px]">Your Submission</p>
                            <textarea name="" id="" placeholder="Describe your work, share links, or provide context for your submission" className="border-1 border-[#D8D6EF] h-50 mt-3 outline-[#1A7A4A] p-2.5 rounded-lg text-sm w-full"></textarea>
                        </div>
                        <div className="bg-white border-1 border-[#D8D6EF] p-4 rounded-lg w-full">
                            <p className="font-semibold text-[#1A1A1A] text-[13px]">Attach Files (Optional)</p>
                            <input type="file" className="border-1 border-[#D8D6EF] h-35 mt-3 outline-[#1A7A4A] p-2.5 rounded-lg text-center w-full">
                            </input>
                        </div>
                        <div className="bg-white border-1 border-[#D8D6EF] p-4 rounded-lg space-y-2 w-full">
                            <p className="font-semibold text-[#1A1A1A] text-[13px]">Add Links (Optional)</p>
                            <p className="text-[#8A9E95] text-xs">Share links to Goggle Docs, Github repositories, or other online resources</p>
                            <div className="border-1 border-[#D8D6EF] flex h-10 hover:outline-2 hover:outline-[#1A7A4A] items-center mt-3 outline-[#1A7A4A] px-3 rounded-lg space-x-2 w-full">
                                <LuLink />
                                <input type="link" placeholder="https://example.com/your-work" className="border-none h-full outline-none text-sm w-full" />
                            </div>
                            <a href="#" className="font-semibold text-[#1A7A4A] text-sm"> + Add another link</a>
                        </div>
                        <div className="flex py-2 space-x-5 w-full">
                            <button className="border-2 border-[#D8E6DF] cursor-pointer font-semibold h-12 hover:border-[#B2CFC0] rounded-lg text-[#4A5C52] transition-all w-1/2">
                                Cancel
                            </button>
                            <button className="bg-[#1A7A4A] cursor-pointer font-semibold h-12 hover:bg-[#156239] rounded-lg text-white transition-all w-1/2">
                                Submit Assignment
                            </button>
                        </div>
                    </form>
                </div>
            </SideBar>
        </>
    )
}