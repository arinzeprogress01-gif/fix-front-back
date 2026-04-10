import { LuSearch, LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { Link } from "react-router-dom";

export default function Interns(){
    const intern_roster = [
        {
            value : '6',
            title : 'Total Interns',
            style : '[#1A1A1A]'
        },
        {
            value : '70%',
            title : 'Avg Progress',
            style : '[#1A7A4A]'
        },
        {
            value : '2',
            title : 'High Performers',
            style : '[#1A7A4A]'
        },
        {
            value : '1',
            title : 'Need Support',
            style : '[#dc2626]'
        }
    ];
    const interns = [
        {
            name : 'Adeola Ogunleye',
            abbr : 'AO',
            id : 'TM-L-2024-001',
            percent : 65,
            course : 3,
            course_completed : 3
        },
        {
            name : 'Chidinma Okonkwo',
            abbr : 'CO',
            id : 'TM-L-2024-008',
            percent : 45,
            course : 2,
            course_completed : 2
        },
        {
            name : 'Tunde Bakare',
            abbr : 'TB',
            id : 'TM-L-2024-009',
            percent : 72,
            course : 3,
            course_completed : 3
        },
        {
            name : 'Amara Nwankwo',
            abbr : 'AN',
            id : 'TM-L-2024-010',
            percent : 88,
            course : 4,
            course_completed : 4
        },
        {
            name : 'Kehinde Ajayi',
            abbr : 'KA',
            id : 'TM-L-2024-011',
            percent : 55,
            course : 2,
            course_completed : 2
        },
        {
            name : 'Ngozi Obi',
            abbr : 'NO',
            id : 'TM-L-2024-012',
            percent : 93,
            course : 3,
            course_completed : 4
        },

    ]
    return(
        <>
            <SideBar title="Interns">
                <div className="w-full p-5 ">
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-2">Intern Roster</h3>
                    <p className="text-[#4A5C52]">Track and monitor your interns' progress</p>
                    <div className="w-full py-3 mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
                        {intern_roster.map((data, index) => (
                            <div key={index} className="p-5 rounded-lg border-1 bg-white border-[#D8ECDF] flex flex-col">
                                <h3 className={`text-2xl font-semibold mb-1 text-${data.style}`}>{data.value}</h3>
                                <p className="text-sm text-[#8A9E95]">{data.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full py-2">
                        <div className="w-full h-12 border text-[#8A9E95] rounded-lg bg-white flex items-center px-3 space-x-2 border-[#D8ECDF] focus:outline-none focus:ring-2 focus:ring-[#1A7A4A] focus:border-transparent transition-all">
                            <LuSearch  className="w-5 h-5"/>
                            <input type="text" className="w-full h-full border-none outline-none" placeholder="Search interns by name or ID..." />
                        </div>
                    </div>
                    <div className="w-full flex flex-col space-y-3 py-5 mt-5">
                        {interns.map((data, index) => (
                            <Link className="w-full px-5 py-7 border-1 border-[#D8ECDF] hover:border-1 hover:border-[#1A7A4A] bg-white rounded-lg flex space-x-3 transition-all">
                                <div className="w-12 h-12 text-base rounded-full flex items-center justify-center bg-[#E8F5EC] text-[#1A7A4A] font-medium ">
                                    {data.abbr}
                                </div>
                                <div className="w-full flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-[#1A1A1A] mb-1">{data.name}</h3>
                                        {data.percent >= 60 ? (
                                            <LuTrendingUp  className="w-5 h-5 text-[#1A7A4A]"/>
                                        ) : (
                                            <LuTrendingDown  className="w-5 h-5 text-[#dc2626]"/>
                                        )}
                                    </div>
                                    <span className="flex items-center px-3 py-1 w-28 rounded-md text-xs font-mono bg-[#EAF3EE] text-[#4A5C52] border border-[#D8E6DF] ">
                                        {data.id}
                                    </span>
                                    <div className="flex items-center justify-between text-sm mb-1 mt-1.5">
                                        <p className="text-[#8A9E95]">Overall Progress</p>
                                        <p className="text-[#1A7A4A] font-semibold">{data.percent}%</p>
                                    </div>
                                    <div className="w-full">
                                        <div className="w-full h-1.5 bg-[#D8E6DF] relative rounded-full bg">
                                            <div className="absolute h-full bg-[#1A7A4A] rounded-full" style={{ width: `${data.percent}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-[#8A9E95] mt-2">
                                        <p>{data.course} courses enrolled</p>
                                        <span className="w-1 h-1 rounded-full bg-[#8A9E95]"></span>
                                        <p>{data.course_completed} courses completed</p>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </SideBar>
        </>
    )
}