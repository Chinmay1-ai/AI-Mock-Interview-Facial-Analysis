"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [interviewId, setInterviewId] = useState(null);

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setInterviewId(resolvedParams.interviewId);
        }
        fetchParams();
    }, [params]);

    useEffect(() => {
        if (interviewId) {
            console.log("Interview ID:", interviewId);
            GetInterviewDetail();
        }
    }, [interviewId]);

    const GetInterviewDetail = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            if (result.length > 0) {
                setInterviewData(result[0]);
            } else {
                console.error("Interview data not found.");
            }
        } catch (error) {
            console.error("Error fetching interview data:", error);
        }
    };

    return (
        <div className='my-10'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        <h2 className='text-lg'><strong>Job Role / Job Position:</strong> {interviewData ? interviewData.jobPosition : 'Loading...'}</h2>
                        <h2 className='text-lg'><strong>Job Description / Tech Stack:</strong> {interviewData ? interviewData.jobDesc : 'Loading...'}</h2>
                        <h2 className='text-lg'><strong>Year of Experience:</strong> {interviewData ? interviewData.jobExperience : 'Loading...'}</h2>
                    </div>
                    <div className='p-5 border rounded-lg border-red-800 bg-yellow-200'>
                        <h2 className='flex gap-2 items-center text-green-500'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-orange-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div>
                    {webCamEnabled ?
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{ height: 300, width: 300 }}
                        />
                        :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button variant="ghost" className='w-full' onClick={() => setWebCamEnabled(true)}>Enable WebCam and Microphone</Button>
                        </>
                    }
                </div>
            </div>
            <div className='flex justify-end items-end'>
                {interviewId && (
                    <Link href={`/dashboard/interview/${interviewId}/start`}>
                        <Button>Start Interview</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Interview;
