export default function HowItWorksPage() {
    const steps = [
        {
            title: "Step 1: Choose Your Role",
            description: "Select a job role and your experience level to get started with the interview.",
            icon: "👔", // Emoji as icon
        },
        {
            title: "Step 2: Start the Mock Interview",
            description: "Answer a series of domain-specific questions designed to assess your skills.",
            icon: "🗣️", // Emoji as icon
        },
        {
            title: "Step 3: Receive Instant Feedback",
            description: "Get real-time feedback on your performance, along with improvement suggestions.",
            icon: "✅", // Emoji as icon
        },
        {
            title: "Step 4: Track Your Progress",
            description: "Monitor your progress over time with detailed reports on areas of improvement.",
            icon: "📈", // Emoji as icon
        },
        {
            title: "Step 5: Analyze Your Performance",
            description: "Review detailed reports and insights to understand areas for improvement.",
            icon: "📊", // Emoji as icon
        },
        {
            title: "Step 6: Prepare for the Real Interview",
            description: "Use the feedback and insights to refine your answers and boost your confidence before the real interview.",
            icon: "🎯", // Emoji as icon
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-purple-700 mb-10 text-center">
                How It Works
            </h1>
            <div className="space-y-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg shadow-lg border-l-4 border-purple-600">
                        <div className="flex-shrink-0 text-4xl">{step.icon}</div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{step.title}</h2>
                            <p className="text-gray-600 text-lg">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
