import { useLocation, useNavigate, useParams } from "react-router-dom"
import SideBar from "./components/sidebar";
import { LuArrowRight, LuCircleCheck, LuCircleX, LuRotateCcw, LuTrophy } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function QuizReview(){
    const { id, moduleId, lessonId} = useParams();
   
    const { state } = useLocation();
    const navigate = useNavigate();

    const { questions = [], answers = {}, score = 0,  total = 1 } = state || {};
    const percent = Math.round((score / total) * 100)

    return(
        <>
            <SideBar title="Q-Result">
                {percent >= 70 ? (
                    // <div className="w-full border-1 border-blue-500"></div>
                    <div className="p-5 bg-white flex flex-col items-center ">
                        <div className="w-15 md:w-20 h-15 md:h-20 m-3 bg-[#E8F5EC] rounded-full flex items-center justify-center">
                            <LuTrophy  className="w-10 md:w-12 w-10 md:h-12 text-[#1A7A4A]"/>

                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-2">Congratulations! </h3>
                        <p className="text-[#4A5C52] mb-3">You have successfully passed this quiz.</p>
                        <div className="bg-[#F4F6F5] rounded-xl px-8 py-4 flex flex-col items-center">
                            <h3 className="text-3xl md:4xl lg:text-5xl font-bold text-[#1A7A4A] mb-2">{percent}%</h3>
                            <p className="text-sm text-[#8A9E95]">{score} out of {total} correct</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-5 bg-white flex flex-col items-center ">
                        <div className="w-15 md:w-20 h-15 md:h-20 m-3 bg-[#FEF3E8] rounded-full flex items-center justify-center">
                            <LuRotateCcw  className="w-10 md:w-12 h-10 md:h-12 text-[#F59E0B]"/>

                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-2">Keep Trying </h3>
                        <p className="text-[#4A5C52] mb-3">You need to score at least 70% to pass this quiz.</p>
                        <div className="bg-[#F4F6F5] rounded-xl px-8 py-4 flex flex-col items-center">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A7A4A] mb-2">{percent}%</h3>
                            <p className="text-sm text-[#8A9E95]">{score} out of {total} correct</p>
                        </div>
                    </div>
                )}
                <div className="w-full px-3 md:px-5 lg:px-10 py-5 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6">Question Review</h3>
                    {questions.map((q, index) => {
                        const userAnswer = answers[index];
                        const correct = q.correctAnswer;
                        return(
                            <div key={index} className="p-2 md:p-4 rounded-xl mb-7 bg-white flex space-x-3">
                                <div className="w-auto flex space-x-3">
                                    {correct === userAnswer ? (
                                        <div className="w-10 h-10 bg-[#E8F5EC] rounded-full hidden md:flex items-center justify-center text-[#1A7A4A]">
                                            <LuCircleCheck  className="h-6 w-6"/>
                                        </div>) : 
                                        (<div className="w-10 h-10 text-[#DC2626] bg-[#FEF3E8] rounded-full hidden md:flex items-center justify-center">
                                            <LuCircleX className="" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="flex space-x-3 items-center mt-2">
                                        <p className="text-sm font-medium text-[#8A9E95]">Question {q.id}</p>
                                        {correct === userAnswer ? (
                                            <p className="text-xs font-medium px-2 py-1 rounded bg-[#E8F5EC] text-[#1A7A4A]">
                                                Correct
                                            </p>) : 
                                            (<p className="text-xs font-medium px-2 py-1 rounded bg-[#FEE2E2] text-[#DC2626]">
                                                Incorrect
                                            </p>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-medium text-[#1A1A1A] mb-4">{q.question}</h3>
                                    <div className="w-full flex flex-col space-y-3 py-2 items-left">
                                        {q.options.map((option, index) => {
                                            const isCorrect = index === correct;
                                            const isSelectedWrong = index  === userAnswer && userAnswer !== correct;
                                            let bgColor  = "bg-transparent"
                                            let borderColor =  "border-[#D8E6DF]";
                                            let textColor = "text-[#4A5C52]"
                                            if(isCorrect){
                                                bgColor = "bg-[#E8F5EC]"
                                                borderColor = "border-[#1A7A4A]"
                                                textColor = "text-[#1A7A4A]"
                                            } else if(isSelectedWrong){
                                                bgColor = "bg-[#FEE2E2]"
                                                borderColor = "border-[#DC2626]"
                                                textColor = "text-[#DC2626]"
                                            }
                                            return(
                                                <button 
                                                key={index}
                                                className={`w-full text-left p-4 rounded-lg  border-2 transition-all ${borderColor} ${bgColor} ${textColor}`}>
                                                        {option}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="w-full p-3 md:p-5 mt-5 mb-5 items-center flex justify-center space-x-5">
                    {percent >= 70 ? (
                        <div className="w-auto">
                                <button className="px-6 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer">
                                    Continue Learning <LuArrowRight />
                                </button>
                        </div>
                        ) : 
                        (
                        <div className="w-auto md:flex md:flex-row flex flex-col space-y-5 md:space-y-0 md:space-x-5">
                            <button 
                                onClick={() => navigate(`/student-course/${id}/module/${moduleId}/quiz/${lessonId}`)}
                                className="px-6 py-3 border-2 border-[#1A7A4A] text-[#1A7A4A] rounded-lg hover:bg-[#E8F5EC] font-medium flex items-center justify-center gap-2 cursor-pointer">
                                <LuRotateCcw  className="mt-1"/>
                                Retake Quiz
                            </button>
                            <Link 
                                to={`/student-course/${id}`}
                                className="px-6 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] transition-all font-medium flex items-center justify-center gap-2 cursor-pointer">
                                Continue Learning <LuArrowRight  className="mt-1"/>
                            </Link>
                        </div>
                        )
                    }
                </div>
            </SideBar>
        </>
    )
}