import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "./components/sidebar";
import { LuArrowRight, LuCircleCheck } from "react-icons/lu";

export default function QuizSuccess(){
    const { id, moduleId, lessonId} = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    return(
        <SideBar title="Quiz">
                <div className="w-full flex items-center justify-center p-5">
                    <div className="w-full md:w-[65%] lg:w-[50%] bg-white rounded-xl border-1 border-[#D8D6EF] py-10 lg:px-15 h-auto mt-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-[#EAF3EE] flex items-center justify-center">
                            <LuCircleCheck  className="w-10 h-10 text-[#1A7A4A]"/>
                        </div>
                            <h3 className="font-semibold text-xl text-[#1A1A1A] mt-8">Quiz Submitted Successfully! </h3>
                            <p className="text-center text-[#8A9E95] text-sm mt-3">Your answers have been recorded. <br /> Calculating your results....</p>
                            <div className="w-auto flex space-x-2 mt-5 p-2">
                                <span className="animate-bounce w-2 h-2 rounded-full bg-[#1A7A4A]"></span>
                                <span className="animate-bounce w-2 h-2 rounded-full bg-[#1A7A4A]"></span>
                                <span className="animate-bounce w-2 h-2 rounded-full bg-[#1A7A4A]"></span>

                            </div>
                            <button 
                                onClick={() => navigate(`/quiz-result/${id}/${moduleId}/quiz/quiz-review/${lessonId}`, { state : state})}
                                className="w-auto border flex px-7 rounded-lg cursor-pointer font-semibold bg-[#1A7A4A] text-white py-2.5 mt-3 items-center">
                                View Results <LuArrowRight className="mt-0.5 ml-1.5" />
                            </button>

                    </div>
                </div>
        </SideBar>
    )
}