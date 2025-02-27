// import { Lightbulb, Volume2 } from "lucide-react";
// import React from "react";

// function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
//     const textToSpeach = (text) => {
//         if ("speechSynthesis" in window) {
//             const speech = new SpeechSynthesisUtterance(text);
//             window.speechSynthesis.speak(speech);
//         } else {
//             alert("Sorry, Your Browser does not Support text to speech");
//         }
//     };

//     return (
//         mockInterviewQuestion && (
//             <div className="p-5 border rounded-lg my-10">
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//                     {mockInterviewQuestion.map((question, index) => (
//                         <h2
//                             key={index} // ✅ Fixed: Added key prop
//                             className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
//                             ${activeQuestionIndex == index ? "bg-blue-700 text-white" : ""}`}
//                         >
//                             Question #{index + 1}
//                         </h2>
//                     ))}
//                 </div>

//                 <h2 className="my-5 text-md md:text-lg">
//                     {mockInterviewQuestion[activeQuestionIndex]?.question}
//                 </h2>
//                 <Volume2
//                     className="cursor-pointer"
//                     onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}
//                 />
//                 <div className="border rounded-lg p-5 bg-yellow-200 mt-20">
//                     <h2 className="flex gap-2 items-center text-red-600">
//                         <Lightbulb />
//                         <strong>Note:</strong>
//                     </h2>
//                     <h2 className="text-md font-bold text-green-500 font-sans my-2">
//                         {process.env.NEXT_PUBLIC_QUESTION_NOTE}
//                     </h2>
//                 </div>
//             </div>
//         )
//     );
// }

// export default QuestionSection;

import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockInterviewQuestion = [], activeQuestionIndex }) {
    console.log("mockInterviewQuestion:", mockInterviewQuestion); // Debugging

    const textToSpeach = (text) => {
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, Your Browser does not Support text to speech");
        }
    };

    return (
        Array.isArray(mockInterviewQuestion) && mockInterviewQuestion.length > 0 ? (
            <div className="p-5 border rounded-lg my-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {mockInterviewQuestion.map((question, index) => (
                        <h2
                            key={index}
                            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
                            ${activeQuestionIndex === index ? "bg-red-700 text-white" : ""}`}
                        >
                            Question #{index + 1}
                        </h2>
                    ))}
                </div>

                <h2 className="my-5 text-md md:text-lg">
                    {mockInterviewQuestion[activeQuestionIndex]?.question}
                </h2>
                <Volume2
                    className="cursor-pointer"
                    onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}
                />
                <div className="border rounded-lg p-5 bg-yellow-200 mt-20">
                    <h2 className="flex gap-2 items-center text-red-700">
                        <Lightbulb />
                        <strong>Note:</strong>
                    </h2>
                    <h2 className="text-md font-bold text-green-500 font-sans my-2">
                        {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                    </h2>
                </div>
            </div>
        ) : (
            <p className="text-red-500 text-center">No questions available.</p>
        )
    );
}

export default QuestionSection;

