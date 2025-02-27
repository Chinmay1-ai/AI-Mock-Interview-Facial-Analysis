"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const [interviewId, setInterviewId] = useState(null);
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    // Fetch interview ID from params
    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params; // Await params
            setInterviewId(resolvedParams.interviewId);
        }
        fetchParams();
    }, [params]);

    // Fetch interview details when interviewId is available
    useEffect(() => {
        if (interviewId) {
            GetInterviewDetail();
        }
    }, [interviewId]);

    // Fetch mock interview details from the database
    const GetInterviewDetail = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);  // Set the list of mock questions
                setInterviewData(result[0]);
            } else {
                console.error("No interview data found.");
            }
        } catch (error) {
            console.error("Error fetching interview data:", error);
        }
    };

    // Handlers for Next and Previous Question navigation
    const handleNextQuestion = () => {
        if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
            setActiveQuestionIndex(activeQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (activeQuestionIndex > 0) {
            setActiveQuestionIndex(activeQuestionIndex - 1);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Question Section */}
                <QuestionSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />
                {/* Video/Audio Recording Section */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>

            <div className="flex justify-end gap-6">
                {/* Previous Button */}
                {activeQuestionIndex > 0 && (
                    <Button onClick={handlePreviousQuestion}>Previous Question</Button>
                )}

                {/* Next Button */}
                {activeQuestionIndex < mockInterviewQuestion?.length - 1 && (
                    <Button onClick={handleNextQuestion}>Next Question</Button>
                )}

                {/* End Interview Button */}
                {activeQuestionIndex === mockInterviewQuestion?.length - 1 && interviewData && (
                    <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                        <Button>End Interview</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default StartInterview;
