import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../Redux/Slices/sessionSlice";
import Loader from "./Loader";
const HowToPlay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const { currentPlayer } = useSelector((state) => state.player);
  const handleClick= () => {
    // Update localStorage with ready status
    const readyStates = JSON.parse(
      localStorage.getItem("playerReadyStates") || "{}"
    );
    readyStates[currentPlayer] = true;
    localStorage.setItem("playerReadyStates", JSON.stringify(readyStates));

    // Notify other tabs
    window.dispatchEvent(new CustomEvent("playerReady"));

    // Check immediately when component mounts
    if (localStorage.getItem("gameStarted") === "true") {
      dispatch(startGame());
      navigate("/quiz");
    } else {
      navigate("/loader"); // or any other route you want
    }

    // Set up storage event listener
    const handleStorageChange = (e) => {
      if (e.key === "gameStarted") {
        if (e.newValue === "true") {
          dispatch(startGame());
          navigate("/quiz");
        } else {
          navigate("/loader"); // or any other route
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }

  return (
    <>
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center bg-light-blue px-4 py-8 md:py-12 lg:py-16 bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/bgEmpty.jpg)" }}
      >
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 md:p-10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-quiz-purple bg-opacity-10 animate-float"></div>
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-quiz-blue bg-opacity-10 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-10 w-20 h-20 rounded-full bg-quiz-pink bg-opacity-10 animate-float"
            style={{ animationDelay: "3s" }}
          ></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <img
              src="/assets/howToText.png"
              alt="Descriptive text"
              className="h-[117px] w-[290px] mx-auto"
            />

            {/* Instructions with icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              {/* Instruction 1 */}
              <div className="flex flex-col items-center text-center p-4 transition-all hover:transform hover:scale-105">
                <img
                  src="/assets/step1.png"
                  alt="Descriptive text"
                  className="h-[83px] w-[90px] mx-auto"
                />
                <h2 className="text-xl text-[#00008B] font-bold text-quiz-blue mb-2">
                  1. You have 60 seconds
                </h2>
                <p className="text-gray-600">
                  The clock is ticking! Answer quickly to maximize your score.
                </p>
              </div>

              {/* Instruction 2 */}
              <div className="flex flex-col items-center text-center p-4 transition-all hover:transform hover:scale-105">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-purple-100 rounded-full">
                  <img
                    src="/assets/step2.png"
                    alt="Descriptive text"
                    className="h-[83px] w-[90px] mx-auto"
                  />
                </div>
                <h2 className="text-xl text-purple-800 font-bold text-quiz-purple mb-2">
                  2. Answer as many questions
                </h2>
                <p className="text-gray-600">
                  Test your knowledge with our wide range of challenging
                  questions.
                </p>
              </div>

              {/* Instruction 3 */}
              <div className="flex flex-col items-center text-center p-4 transition-all hover:transform hover:scale-105">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-pink-100 rounded-full">
                  <img
                    src="/assets/step3.png"
                    alt="Descriptive text"
                    className="h-[83px] w-[90px] mx-auto"
                  />
                </div>
                <h2 className="text-xl text-pink-600 font-bold text-quiz-pink mb-2">
                  3. Most correct answers wins
                </h2>
                <p className="text-gray-600">
                  Aim for accuracy! The player with the most correct answers is
                  the champion.
                </p>
              </div>
            </div>

            {/* Ready Button */}
            <div className="flex justify-center mt-8 md:mt-12">
              <button
                className="relative overflow-hidden group px-8 py-4 bg-quiz-blue text-white font-bold text-lg md:text-xl rounded-full hover:bg-quiz-purple transition-all duration-300 shadow-lg bg-[#00008B] hover:bg-blue-600"
                onClick={handleClick}
              >
                <span className="relative z-10">I'M READY!</span>
                <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white opacity-10 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToPlay;
