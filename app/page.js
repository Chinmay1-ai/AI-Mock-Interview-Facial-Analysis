import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-lg mb-6">Experience the best of modern web applications</p>
      <Button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
        Get Started
      </Button>
    </div>
  );
}
