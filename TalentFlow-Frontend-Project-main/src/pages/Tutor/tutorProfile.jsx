import { LuAward, LuBookOpen, LuCalendar, LuFlag, LuFlame, LuMail, LuTrophy } from "react-icons/lu";
import SideBar from "./components/sidebar";
export default function TutorProfilePage(){
    const achievements = [
        {
            icon : <LuFlag size={22}/>,
            title : 'First Course',
            text : 'Enrolled in first course'
        },
        {
            icon : <LuBookOpen size={22}/>,
            title : 'Bookworm',
            text : 'Completed 3 courses'
        },
        {
            icon : <LuTrophy size={22}/>,
            title : 'Top Performer',
            text : '90%+ average grade'
        },
        {
            icon : <LuFlame size={22}/>,
            title : 'Streak Master',
            text : '7-day learning streak'
        }
    ]
    const learningHistory = [
        {
            title : 'Introduction to Web Development',
            author : 'Chukwuemeka Nwosu',
            percent : 65
        },
        {
            title : 'UI/UX Design Principles',
            author : 'Amina Bello',
            percent : 30
        },
        {
            title : 'Digital Marketing Fundamentals',
            author : 'Blessing Okafor',
            percent : 100
        },
    ]
    const profileStats = [
        {
            value : 3,
            title : 'Enrolled Courses',
            cos : ''
        },
        {
            value : 1,
            title : 'Completed',
            cos : ''
        },
        {
            value : 65,
            title : 'Avg Progress',
            cos : '%'
        },
        {
            value : 1,
            title : 'Certificates',
            cos : ''
        }
    ]
    return(
        <>
            <SideBar title="ST-Profile">
                <div className="w-full h-auto py-5 px-7">
                    <div className="w-full p-6 bg-white border-1 border-[#D8D6EF] md:flex md:flex-row  flex flex-col md:space-x-4 mt-5 rounded-lg">
                        <p className="w-16 h-16 rounded-full text-[#1A7A4A] font-semibold bg-[#E8F5EC] flex items-center justify-center">AO</p>
                        <div className="flex flex-col w-full md:w-auto px-3">
                            <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Chukuwuemeka Nwosu</h3>
                            <div className="flex space-x-3">
                                <p className="w-28 px-3 py-1 text-xs bg-[#EAF3EE] text-[#4A5C52] border border-[#D8E6DF] rounded-md">TM-L-2024-001</p>
                                <p className="px-2.5 py-0.5 text-xs font-medium bg-[#E8F0FB] text-[#2563eb] flex items-center justify-center rounded-full">Tutor</p>
                            </div>
                            <div className="flex space-x-2 mt-3 items-center text-[#8A9E95] text-[14px]">
                                <LuMail />
                                <a href="mailto:adeola@trueminds.com">Chukwuemeka@trueminds.com</a>
                            </div>
                            <div className="flex space-x-2 mt-1.5 items-center text-[#8A9E95] text-[14px]">
                                <LuCalendar />
                                <p>Joined 1/15/2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full py-1.5 mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {profileStats.map((data, index) => (
                            <div className="p-5 border-1 bg-white rounded-xl border-[#D8D6EF] flex flex-col">
                                <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-1">{data.value}{data.cos}</h3>
                                <p className="text-sm text-[#8A9E95]">{data.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full mt-4">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Learning History</h3>
                        <div className="w-full py-3 flex flex-col space-y-4">
                            {learningHistory.map((data, index) => (
                                <div className="p-5 border-1 w-full bg-white rounded-lg border-[#D8D6EF] flex space-x-3">
                                    <div className="w-12 h-12 bg-[#E8F5EC] rounded-lg flex items-center justify-center text-[#1A7A4A]">
                                        <LuBookOpen  className="w-5 h-5"/>
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-[#1A1A1A] mb-1">{data.title}</h3>
                                            <div className="">{data.percent === 100 ? <LuAward  className="w-10 h-10 p-2 bg-[#E8F5EC] text-[#1A7A4A] rounded-full flex items-center justify-center"/> : '' }</div>
                                        </div>
                                        <p className="text-sm text-[#8A9E95] mb-3">by {data.author}</p>
                                        <div className="w-full">
                                            <div className="w-full h-1.5 rounded-full bg-[#D8E6DF] relative mb-2">
                                                <div className="absolute h-full bg-[#1A7A4A] rounded-full" style={{ width: `${data.percent}%` }}></div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#8A9E95]">{data.percent}% complete</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full my-4">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Achievements</h3>
                        <div className="w-full py-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {achievements.map((data, index) => (
                                <div key={index} className="border-1 border-[#D8D6EF] p-5 rounded-xl bg-white flex flex-col items-center space-y-2">
                                    <div className="w-9 h-9 flex items-center justify-center text-[#1A7A4A]">
                                        {data.icon}
                                    </div>
                                    <h3 className="font-medium text-[#1A1A1A] text-sm mb-1">{data.title}</h3>
                                    <p className="text-xs text-[#8A9E95]">{data.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SideBar>
        </>
    )
}