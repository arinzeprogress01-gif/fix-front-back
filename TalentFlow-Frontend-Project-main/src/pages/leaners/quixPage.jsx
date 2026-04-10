import {useNavigate, useParams, } from "react-router-dom"
import { courseType } from "./data/course";
import { useEffect, useState } from "react";
import SideBar from "./components/sidebar";
import { LuClock } from "react-icons/lu";

export default function QuizPage(){
    const navigate = useNavigate();
    const { id, moduleId, lessonId} = useParams();
    const course = courseType.find(c => c.id === Number(id));
    const module = course.modulesView.find(m => m.id === Number(moduleId));
    const lesson = module.lessons.find(l => l.id === Number(lessonId));
    const questions = lesson.quiz.questions;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const totalTime = lesson.quiz.duration * 60;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [answers, setAnswers] = useState({});
    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / questions.length) * 100;
    const selected = answers[currentQuestion];
    const handleSelect = (index) => {
        setAnswers(prev => ({...prev, [currentQuestion]: index}));
    }
    useEffect(() => {
        if(timeLeft <= 0){
            alert("Time's up!");
            // handleSubmit
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);


    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };
    const handleNext = () => {
        if(currentQuestion < questions.length - 1){
            setCurrentQuestion(prev => prev + 1);
        }
    };
    const handleSubmit = () => {
        if(answeredCount !== questions.length){
            alert('Answer all questions before submitting');
            return;
        }
        let newScore = 0;
        questions.forEach((q, index) => {
            if(answers[index] === q.correctAnswer){
                newScore ++;
            }
        });
        navigate(`/quiz-result/${id}/${moduleId}/quiz/${lessonId}`, {
            state : {
                score : newScore,
                total : questions.length,
                answers, 
                questions
            }
        })
    }
    return(
        <SideBar title="Quiz">
            <div className="w-full h-auto py-5 bg-white px-2 md:px-5 lg:px-15">
                <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A]">{lesson.quiz.title}</h3>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-[#8A9E95] mt-1">{course.title}</p>
                    <p className={`text-sm font-semibold flex items-center gap-2 px-3 py-2 ${
                        timeLeft <= 120 ? "text-red-500 bg-[#FEF3E8]" : "text-[#1A7A4A] bg-[#E8F5EC]"
                    }`}>
                        <LuClock  className="mt-0.5 w-5 h-5"/>
                        {formatTime(timeLeft)}s
                    </p>
                </div>
                <div className="w-full flex items-center justify-between mt-3">
                    <p className="text-[#4A5C52] text-[13px] font-semibold">Progress</p>
                    <h3 className="text-[#1A7A4A] font-medium">{answeredCount} of {questions.length} answered</h3>
                </div>
                <div className="w-full mt-1">
                    <div className="w-full h-2 bg-[#E8F5EC] rounded-full relative">
                        <div className="absolute h-full bg-[#1A7A4A] rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="w-full py-5 px-2 md:px-5 lg:px-15 space-y-5 flex flex-col">
                <div className="flex w-full space-x-3 bg-white p-2 md:p-5 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-[#E8F5EC] hidden md:flex items-center justify-center flex-shrink-0">{questions[currentQuestion].id}</div>
                    <div className="flex flex-col w-full">
                        <h3 className="text-lg font-medium text-[#1A1A1A] mb-4">{questions[currentQuestion].question}</h3>
                        <div className="w-full flex flex-col space-y-3 py-2 items-left">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button 
                                    onClick={() => handleSelect(index)}
                                    className={`w-full text-left p-3 lg:p-4 rounded-lg border-2 transition-all border-[#D8E6DF] hover:border-[#1A7A4A] hover:bg-[#F4F6F5] flex items-center gap-3 cursor-pointer ${selected === index ? "border-[#1A7A4A] bg-[#E8F5EC]" : 'border-[#D8E6DF] hover:border-[#1A7A4A] hover:bg-[#F4F6F5]'}`}>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center mt-1 justify-center border-[#D8E6DF] ${selected === index ? 'border-[#1A7A4A] bg-[#1A7A4A]' : 'border-[#D8E6DF]'}`}>
                                            <div className={`w-2 h-2 rounded-full bg-white`}></div>
                                        </div>
                                        <span className={`${selected === index ? "text-[#1A7A4A]" : ""}`}>
                                            {option}
                                        </span>
                                    </button>
                            ))}
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <button
                            className="cursor-pointer hover:bg-[#156239] font-semibold mt-5 px-10 py-3 bg-[#1A7A4A] text-white rounded-lg"
                            onClick={handlePrevious}
                            >
                                Prev
                            </button>
                            {currentQuestion === questions.length -1 ? (
                                <button onClick={handleSubmit} className="cursor-pointer hover:bg-[#156239] transition-all font-semibold mt-5 px-10 py-3 bg-[#1A7A4A] text-white rounded-lg">Submit Quiz</button>
                            ) : (
                                <button
                                className="font-semibold cursor-pointer hover:bg-[#156239] mt-5 px-10 py-3 bg-[#1A7A4A] text-white rounded-lg transition-all"
                                onClick={handleNext}
                                >
                                    Next
                                </button>
                            )}
                            
                        </div>
                        
                    </div>

                </div>
            </div>
        </SideBar>
    )
}