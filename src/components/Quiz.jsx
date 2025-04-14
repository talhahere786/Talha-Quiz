import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOption,
  nextQuestion,
  decrementTime,
  restartQuiz,
} from "../Redux/Slices/quizSlice";

const Quiz = () => {
  const dispatch = useDispatch();
  const [showResults, setShowResults] = useState(false);
  const {
    questions,
    currentQuestionIndex,
    selectedOption,
    score,
    timeLeft,
    quizEnded,
    answered,
  } = useSelector((state) => state.quiz);

  const currentQuestion = questions[currentQuestionIndex];
  const { currentPlayer, players } = useSelector((state) => state.player);

  // State for opponent's data
  const [opponentData, setOpponentData] = useState({
    score: 0,
    attempts: 0,
    name: "",
    company: "",
  });

  // Get current player's data
  const currentPlayerData = players[`player${currentPlayer}`];
  const currentPlayerName =
    currentPlayerData?.name || `Player ${currentPlayer}`;
  const currentPlayerCompany = currentPlayerData?.company || "";

  // Load opponent data from localStorage with slight delay
useEffect(() => {
  const handleStorageChange = (event) => {
    if (event.key === "quiz-scores") {
      const savedScores = JSON.parse(event.newValue || "{}");
      const opponentKey = currentPlayer === 1 ? "player2" : "player1";
      const opponentScoreData = savedScores[opponentKey];
      // 4. Load opponent profile from localStorage (quiz-players)
      const rawPlayers = localStorage.getItem("quiz-players");
      const storedPlayers = JSON.parse(rawPlayers || "{}");
      console.log("📦 Raw quiz-players:", rawPlayers);
      console.log("✅ Parsed quiz-players:", storedPlayers);

    
      if (opponentScoreData) {
        const opponentProfile = storedPlayers[opponentKey] || {
          name: `Player ${opponentKey === "player1" ? 1 : 2}`,
          company: "",
        };

        setOpponentData({
          score: opponentScoreData?.score || 0,
          attempts: opponentScoreData?.attempts || 0,
          name: opponentProfile.name,
          company: opponentProfile.company,
        });

        console.log("✅ Opponent score updated from storage event!");
      }
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, [currentPlayer, players]);


  const saveScore = () => {
    const scores = JSON.parse(localStorage.getItem("quiz-scores") || "{}");
    scores[`player${currentPlayer}`] = {
      score,
      attempts: currentQuestionIndex + 1,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("quiz-scores", JSON.stringify(scores));
  };

  // Save score when quiz ends
  useEffect(() => {
    if (quizEnded) {
      saveScore();
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    } else {
      setShowResults(false); // Reset for next round
    }
  }, [quizEnded]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !quizEnded) {
      const timer = setTimeout(() => {
        dispatch(decrementTime());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizEnded, dispatch]);

  // Handle option selection
  const handleOptionSelect = (option) => {
    if (answered) return;
    console.log("option:", option);
    dispatch(selectOption(option));

    // Move to next question after delay
    setTimeout(() => {
      dispatch(nextQuestion());
    }, 1000);
  };

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center  bg-blue-100 p-4 bg-cover bg-center"
      style={{ backgroundImage: "url(/assets/bgEmpty.jpg)" }}
    >
      <img
        src="/assets/step3.png"
        alt="Background"
        className="object-cover h-[147px] w-[138px]"
      />

      <div className="w-full max-w-[50rem]">
        {/* Timer and Score section */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white rounded-full px-4 py-2 shadow-md">
            <span className="font-bold text-[#00008B] text-lg">
              Score: {score}
            </span>
          </div>
          <div
            className={`bg-white rounded-full px-4 py-2 shadow-md ${
              timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-[#00008B]"
            }`}
          >
            <span className="font-bold text-lg">
              Time: {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Main quiz container */}
        {quizEnded && !showResults ? (
          <div className="text-center text-xl text-[#00008B] font-bold py-10 animate-pulse">
            Calculating Results...
          </div>
        ) : quizEnded && showResults ? (
          <div className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-2 border-purple-100 animate-fade-in rounded-lg bg-[#00008B]">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 text-center pb-6 pt-8 px-4">
              <div className=" flex justify-center items-center gap-3">
                <img
                  src="/assets/trophy-icon.svg"
                  alt="Trophy"
                  className="h-[59px] w-[70px]"
                />
                <h3 className="text-2xl font-bold text-green-600">
                  {score > opponentData.score
                    ? "You Win! 🎉"
                    : score < opponentData.score
                    ? "You Lose 😢"
                    : "It's a Tie! 🤝"}
                </h3>
              </div>
            </div>

            <div className="px-6 pt-6 pb-4 space-y-6">
              {/* Current Player Stats */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="mb-2">
                  <h3 className="text-2xl font-semibold text-[#00008B]">
                    {currentPlayerName}
                  </h3>
                  {currentPlayerCompany && (
                    <p className="text-sm text-gray-500">
                      {currentPlayerCompany}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-xl text-gray-500">Score</p>
                    <p className="text-2xl font-bold text-[#00008B]">{score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl text-gray-500">Attempted</p>
                    <p className="text-2xl font-medium text-[#00008B]">
                      {currentQuestionIndex + 1}
                    </p>
                  </div>
                </div>
              </div>

              {/* Opponent Stats */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium text-[#00008B] mb-3">
                  {opponentData.name}
                </h3>
                <div className="pl-2 border-l-2 border-gray-200">
                  <div className="mb-2">
                    {opponentData.company && (
                      <p className="text-xl text-gray-500">
                        {opponentData.company}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-l text-gray-500">Score</p>
                      <p className="text-xl font-semibold text-[#00008B]">
                        {opponentData.score}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mt-1">Attempted</p>
                      <p className="text-xl font-medium text-[#00008B]">
                        {opponentData.attempts}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xl font-medium">
                Question {currentQuestionIndex + 1}
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#00008B] mb-6">
              {currentQuestion.text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={(e) => handleOptionSelect(option, e)}
                  className={`w-full text-left p-4 rounded-lg transition-all text-[#00008B] focus:outline-none ${
                    selectedOption === option
                      ? option ===
                        currentQuestion.options[currentQuestion.correctAnswer]
                        ? "bg-green-100 border-2 border-green-500"
                        : "bg-red-100 border-2 border-red-500"
                      : "bg-pink-50 focus:bg-blue-100 active:bg-blue-100 border-2 border-blue-200"
                  }`}
                  disabled={answered}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                        selectedOption === option
                          ? option ===
                            currentQuestion.options[
                              currentQuestion.correctAnswer
                            ]
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-200"
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
