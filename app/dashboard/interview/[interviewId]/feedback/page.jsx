"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import React, { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params: paramsPromise }) {
  const params = React.use(paramsPromise); // Unwrap params
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setIsLoading(true); // Start loading
    try {
      if (!params?.interviewId) {
        console.error("Invalid Interview ID");
        setIsLoading(false);
        return;
      }

      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      console.log("DB Query Result:", result); // Debugging the result
      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
    setIsLoading(false); // End loading
  };

  const calculateOverallRating = () => {
    if (!feedbackList || feedbackList.length === 0) {
      console.warn("Feedback list is empty.");
      return "N/A"; // No feedback found
    }

    console.log("All Ratings:", feedbackList.map(item => ({ rating: item.rating, item }))); // Debugging ratings

    const validRatings = feedbackList
      .map(item => {
        let rating = Number(item.rating); // Convert to number
        if (isNaN(rating) || rating < 0) {
          console.warn("Skipping invalid rating:", item);
          return null; // Mark invalid ratings as null
        }
        return rating;
      })
      .filter(rating => rating !== null); // Remove null values

    if (validRatings.length === 0) {
      console.warn("No valid ratings found.");
      return "N/A";
    }

    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
    return (totalRating / validRatings.length).toFixed(1);
  };

  return (
    <div className="p-10">
      {isLoading ? (
        <h2 className="text-lg text-gray-500">Loading feedback...</h2>
      ) : feedbackList.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">Here is your Interview feedback</h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>{calculateOverallRating()}/10</strong>
          </h2>
          <h2 className="text-sm text-black">
            Find below interview questions with correct answers, your answers, and feedback for
            improvement.
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                {item.question}
                <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2 ">
                  <h2 className="text-red-500 bg-orange-50 p-2 border rounded-lg">
                    <strong>Rating: </strong>
                    {item.rating}
                  </h2>

                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </h2>

                  <h2 className="p-2 border rounded-lg bg-green-200 text-sm text-green-900">
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </h2>

                  <h2 className="p-2 border rounded-lg bg-blue-200 text-sm text-primary">
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button disabled={isLoading} onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
