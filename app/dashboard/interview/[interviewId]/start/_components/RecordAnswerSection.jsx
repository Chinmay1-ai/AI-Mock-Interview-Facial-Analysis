"use client"; // Ensures it's a client component

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import useSpeechToText from "react-hook-speech-to-text"; // Hook must be imported normally!

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [user_ans, setUserAns] = useState("");  
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    // ✅ Hook must be at the top level of the component
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        if (results && Array.isArray(results)) {
            results.forEach((result) => {
                setUserAns((prevAns) => prevAns + (result?.transcript || " "));
            });
        }
    }, [results]);

    useEffect(() => {
        if (!isRecording && user_ans && user_ans.length > 10) {
            UpdateUserAnswer();
        }
    }, [user_ans]);

    const StartStopRecording = () => {
        if (!startSpeechToText || !stopSpeechToText) {
            toast.error("Speech-to-text functions not available.");
            return;
        }

        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

    const UpdateUserAnswer = async () => {
        console.log(user_ans);
        setLoading(true);

        const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
        User Answer: ${user_ans}, 
        Please provide a rating and a brief feedback (3-5 lines) in JSON format with fields 'rating' and 'feedback'`;

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = result.response.text().replace('```json', '').replace('```', '');
        console.log(mockJsonResp);

        try {
            const JsonFeedbackResp = JSON.parse(mockJsonResp);

            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: user_ans,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-yyyy"),
            });

            if (resp) {
                toast("User Answer recorded Successfully");
                setUserAns("");
                setResults([]);
            }
        } catch (error) {
            console.error("Error parsing feedback JSON:", error);
            toast("Error processing feedback. Try again.");
        }

        setResults([]);
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-2">
                <Image src={"/webcam.png"} width={200} height={200} alt="Webcam preview" className="absolute" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 270,
                        width: "100%",
                        zIndex: 10,
                    }}
                />
            </div>

            <Button disabled={loading} variant="outline" className="my-10" onClick={StartStopRecording}>
                {isRecording ? (
                    <h2 className="text-red-600 flex gap-2">
                        <Mic /> Stop Recording
                    </h2>
                ) : (
                    <h2 className="text-primary flex gap-2 items-center">
                        <Mic /> Record Answer
                    </h2>
                )}
            </Button>
        </div>
    );
}

export default RecordAnswerSection;
