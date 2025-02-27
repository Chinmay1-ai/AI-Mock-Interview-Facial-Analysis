"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    title: "Free Plan",
    price: "0",
    features: ["Limited Questions", "Basic AI Feedback", "Community Support"],
  },
  {
    title: "Pro Plan",
    price: "19",
    features: ["Unlimited Questions", "Advanced AI Feedback", "Priority Support", "Detailed Reports"],
  },
  {
    title: "Enterprise Plan",
    price: "49",
    features: [
      "All Pro Features",
      "Custom AI Training",
      "Team Collaboration",
      "24/7 Dedicated Support",
    ],
  },
];

function Upgrade() {
  return (
    <div className="container mx-auto p-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">Upgrade Your Plan</h2>
      <p className="text-center font-bold mb-8">
        Choose a plan that fits your needs and take your interviews to the next level.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
            <p className="text-4xl font-bold text-primary my-3">${plan.price}/month</p>
            <ul className="text-left space-y-3 my-5">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full p-3 bg-primary text-white rounded-lg font-bold">
              {plan.price === "0" ? "Start for Free" : "Upgrade Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
