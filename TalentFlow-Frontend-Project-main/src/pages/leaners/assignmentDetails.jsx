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
                <div className="w-full h-auto p-5 lg:p-10">
                    <Link to="/assignment" className="w-full py-3 flex space-x-1 text-[#4A5C52] hover:text-[#1A7A4A] items-center">
                        <LuArrowLeft  className="mt-0.5"/>
                        <p className="font-semibold">Back to Assignments</p>
                    </Link>
                    <div className="w-full px-5 py-7 border-1 mt-5 rounded-xl bg-white border-[#D8D6EF] flex flex-col space-y-2">
                        <p className="text-[#8A9E95] text-sm">{assignment.sub_title}</p>
                        <h3 className="text-[#1A1A1A] text-2xl font-semibold ">{assignment.title}</h3>
                        <p className="text-[#4A5C52] mt-1.5 text-sm">{assignment.text}</p>
                        <div className="flex space-x-3 items-center text-[#8A9E95] text-sm">
                        <p>Due:{assignment.due}</p>
                        <div className="w-1 h-1 border mt-1 rounded-full bg-[#8A9E95]"></div>
                        <p>On time</p>
                        </div>
                    </div>
                    <form action="" className="w-full py-5 flex flex-col mt-5 space-y-4">
                        <div className="w-full p-4 border-1 bg-white rounded-lg border-[#D8D6EF]">
                            <p className="text-[13px] text-[#1A1A1A] font-semibold">Your Submission</p>
                            <textarea name="" id="" placeholder="Describe your work, share links, or provide context for your submission" className="text-sm w-full h-50 border-1 border-[#D8D6EF] mt-3 rounded-lg outline-[#1A7A4A] p-2.5"></textarea>
                        </div>
                        <div className="w-full p-4 border-1 bg-white rounded-lg border-[#D8D6EF]">
                            <p className="text-[13px] text-[#1A1A1A] font-semibold">Attach Files (Optional)</p>
                            <input type="file" className="w-full h-35 border-1 border-[#D8D6EF] mt-3 rounded-lg outline-[#1A7A4A] p-2.5 text-center">
                            </input>
                        </div>
                        <div className="w-full p-4 border-1 bg-white rounded-lg border-[#D8D6EF] space-y-2">
                            <p className="text-[13px] text-[#1A1A1A] font-semibold">Add Links (Optional)</p>
                            <p className="text-xs text-[#8A9E95]">Share links to Goggle Docs, Github repositories, or other online resources</p>
                            <div className="flex w-full h-10 border-1 border-[#D8D6EF] mt-3 rounded-lg outline-[#1A7A4A] px-3 items-center space-x-2 hover:outline-2 hover:outline-[#1A7A4A]">
                                <LuLink />
                                <input type="link" placeholder="https://example.com/your-work" className="w-full h-full border-none outline-none text-sm" />
                            </div>
                            <a href="#" className="text-[#1A7A4A] font-semibold text-sm"> + Add another link</a>
                        </div>
                        <div className="py-2 w-full space-x-5 flex">
                            <button className="border-2 w-1/2 h-12 rounded-lg cursor-pointer border-[#D8E6DF] text-[#4A5C52] font-semibold hover:border-[#B2CFC0] transition-all">
                                Cancel
                            </button>
                            <button className="w-1/2 h-12 rounded-lg cursor-pointer text-white font-semibold bg-[#1A7A4A] transition-all hover:bg-[#156239]">
                                Submit Assignment
                            </button>
                        </div>
                    </form>
                </div>
            </SideBar>
        </>
    )
}