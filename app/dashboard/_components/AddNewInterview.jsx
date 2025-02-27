// "use client";
// import React, { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { chatSession } from "@/utils/GeminiAIModel";
// import { LoaderCircle } from "lucide-react";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { v4 as uuidv4 } from "uuid";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";
// import { useRouter } from "next/navigation";

// function AddNewInterview() {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [jobPosition, setJobPosition] = useState("");
//     const [jobDesc, setJobDesc] = useState("");
//     const [jobExperience, setJobExperience] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [jsonResponse, setJsonResponse] = useState([]);
//     const router = useRouter();
//     const { user } = useUser();

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Year of Experience: ${jobExperience}. Based on these details, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format.`;

//         try {
//             const result = await chatSession.sendMessage(InputPrompt);
//             const responseText = await result.response.text();
//             const MockJsonResp = responseText.replace(/```json|```/g, "").trim();
//             const parsedJson = JSON.parse(MockJsonResp);
//             setJsonResponse(parsedJson);

//             if (parsedJson) {
//                 const resp = await db.insert(MockInterview).values({
//                     mockId: uuidv4(),
//                     jsonMockResp: JSON.stringify(parsedJson),
//                     jobPosition,
//                     jobDesc,
//                     jobExperience,
//                     createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
//                     createdAt: moment().format("DD-MM-YYYY"),
//                 }).returning({ mockId: MockInterview.mockId });

//                 if (resp) {
//                     setOpenDialog(false);
//                     router.push(`/dashboard/interview/${resp[0]?.mockId}`);
//                 }
//             }
//         } catch (error) {
//             console.error("Error processing JSON:", error);
//         }

//         setLoading(false);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center p-5">
//             <div
//                 className="p-6 border rounded-lg bg-white/20 hover:bg-white/30 hover:scale-105 hover:shadow-lg cursor-pointer transition-all text-white backdrop-blur-md w-full max-w-md text-center"
//                 onClick={() => setOpenDialog(true)}
//             >
//                 <h2 className="text-lg">+ Add New</h2>
//             </div>

//             <Dialog open={openDialog}>
//                 <DialogContent className="max-w-2xl bg-gray-900/80 text-white backdrop-blur-md border border-gray-700 shadow-xl p-6">
//                     <DialogHeader>
//                         <DialogTitle className="text-2xl text-center">Tell us More About the Job</DialogTitle>
//                         <DialogDescription>
//                             <form onSubmit={onSubmit} className="space-y-6">
//                                 <div>
//                                     <label className="block text-gray-300">Job Role / Job Position</label>
//                                     <Input
//                                         placeholder="Ex. Full Stack Developer"
//                                         required
//                                         onChange={(event) => setJobPosition(event.target.value)}
//                                         className="bg-white/80 text-gray-900 border-gray-400 shadow-md w-full"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300">Job Description / Tech Stack</label>
//                                     <Textarea
//                                         placeholder="Ex. React, Angular, Node.js, MySQL, etc."
//                                         required
//                                         onChange={(event) => setJobDesc(event.target.value)}
//                                         className="bg-white/80 text-gray-900 border-gray-400 shadow-md w-full"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300">Years of Experience</label>
//                                     <Input
//                                         placeholder="Ex. 0-2"
//                                         type="number"
//                                         max="50"
//                                         required
//                                         onChange={(event) => setJobExperience(event.target.value)}
//                                         className="bg-white/80 text-gray-900 border-gray-400 shadow-md w-full"
//                                     />
//                                 </div>

//                                 <div className="flex flex-col md:flex-row gap-4 justify-end">
//                                     <Button type="button" variant="ghost" className="text-gray-300 hover:text-white" onClick={() => setOpenDialog(false)}>
//                                         Cancel
//                                     </Button>
//                                     <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white shadow-md flex items-center justify-center">
//                                         {loading ? (
//                                             <>
//                                                 <LoaderCircle className="animate-spin mr-2" /> Generating...
//                                             </>
//                                         ) : (
//                                             "Start Interview"
//                                         )}
//                                     </Button>
//                                 </div>
//                             </form>
//                         </DialogDescription>
//                     </DialogHeader>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }

// export default AddNewInterview;
"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Year of Experience: ${jobExperience}. Based on these details, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format.`;

        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const responseText = await result.response.text();
            const MockJsonResp = responseText.replace(/```json|```/g, "").trim();
            const parsedJson = JSON.parse(MockJsonResp);
            setJsonResponse(parsedJson);

            if (parsedJson) {
                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: JSON.stringify(parsedJson),
                    jobPosition,
                    jobDesc,
                    jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
                    createdAt: moment().format("DD-MM-YYYY"),
                }).returning({ mockId: MockInterview.mockId });

                if (resp) {
                    setOpenDialog(false);
                    router.push(`/dashboard/interview/${resp[0]?.mockId}`);
                }
            }
        } catch (error) {
            console.error("Error processing JSON:", error);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <div
                className="p-6 border rounded-lg bg-white/20 hover:bg-white/30 hover:scale-105 hover:shadow-lg cursor-pointer transition-all text-white backdrop-blur-md w-full max-w-md text-center"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg">+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl bg-gray-900/80 text-white backdrop-blur-md border border-gray-700 shadow-xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Tell us More About the Job</DialogTitle>
                        <DialogDescription>
                            Please provide job details below.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Form moved outside DialogDescription */}
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300">Job Role / Job Position</label>
                            <Input
                                placeholder="Ex. Full Stack Developer"
                                required
                                onChange={(event) => setJobPosition(event.target.value)}
                                className="bg-white/80 text-gray-900 border-gray-400 shadow-md w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300">Job Description / Tech Stack</label>
                            <Textarea
                                placeholder="Ex. React, Angular, Node.js, MySQL, etc."
                                required
                                onChange={(event) => setJobDesc(event.target.value)}
                                className="bg-white/80 text-gray-900 border-gray-400 shadow-md w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300">Years of Experience</label>
                            <Input
                                placeholder="Ex. 0-2"
                                type="number"
                                max="50"
                                required
                                onChange={(event) => setJobExperience(event.target.value)}
                                className="bg-white/80 text-gray-900 border-gray-400 shadow-md w-full"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-end">
                            <Button type="button" variant="ghost" className="text-gray-300 hover:text-white" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white shadow-md flex items-center justify-center">
                                {loading ? (
                                    <>
                                        <LoaderCircle className="animate-spin mr-2" /> Generating...
                                    </>
                                ) : (
                                    "Start Interview"
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
