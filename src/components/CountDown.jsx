import React, { useState, useEffect } from "react";
import Quiz from "./Quiz"

const CountDown = () => {
  // Initialize state with value from localStorage or default (5)
  const [count, setCount] = useState(() => {
    // Get count from localStorage if it exists
    const savedCount = localStorage.getItem("gameSettings");
   if (savedCount) {
     const { countdownTime } = JSON.parse(savedCount);
     return countdownTime || 60; // Default to 60 if not found
   }
   return 5; 
  });
  const targetCount = 0; // Count up to 5 players (adjust as needed)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev > targetCount ? prev - 1 : prev));
    }, 1000); // Increment every second

    return () => clearInterval(interval);
  }, [targetCount]);
  if (count === 0) {
    return <Quiz></Quiz>;
  }
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-light-blue px-4 py-8 md:py-12 lg:py-16 bg-cover bg-center"
      style={{ backgroundImage: "url(/assets/bgQuestions.jpg)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 shadow-inner pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 text-white text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-3xl font-bold text-white mb-2 animate-pulse">
          Get Ready...
        </h2>

        {/* Animated Counter */}
        <div className="my-4 text-8xl font-bold text-yellow-400">
          <span className="inline-block min-w-[1.5em] transition-all duration-300 ease-out">
            {count}
          </span>
        </div>

        <p className="text-xl md:text-2xl font-bold text-blue-300">
          The game is about to begin....
        </p>
      </div>
    </div>
  );
};

export default CountDown;
