import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlayer } from "../Redux/Slices/playerSlice";
import Lottie from "lottie-react";
import animationData from "../animations/Quiz.json";
import { useNavigate } from "react-router-dom";
import { openNewSessionPopup } from "../Redux/Slices/popupSlice";

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPlayer } = useSelector((state) => state.player);
  const [showImage1, setShowImage1] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [takenPlayers, setTakenPlayers] = useState({
    1: false,
    2: false,
  });

  // Load taken players from localStorage on component mount
  useEffect(() => {
    const isSessionActive = localStorage.getItem("activeSession") === "true";
    if (isSessionActive) {
      dispatch(openNewSessionPopup());
    }
    const storedTakenPlayers = localStorage.getItem("takenPlayers");
    if (storedTakenPlayers) {
      setTakenPlayers(JSON.parse(storedTakenPlayers));
    }

    // Listen for changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === "stakenPlayer") {
        setTakenPlayers(JSON.parse(e.newValue));
      }
      if (e.key === "activeSession") {
        const isSessionActive =
          localStorage.getItem("activeSession") === "true";
        if (isSessionActive) {
          dispatch(openNewSessionPopup());
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  const handlePlayerSelect = (player) => {
    // Check if player is already taken
    if (takenPlayers[player]) {
      alert(`Player ${player} is already taken by another user!`);
      return;
    }

    // Update local state
    const newTakenPlayers = {
      ...takenPlayers,
      [player]: true,
    };

    // If current player was previously selected, free that player
    if (currentPlayer) {
      newTakenPlayers[currentPlayer] = false;
    }

    setTakenPlayers(newTakenPlayers);
    localStorage.setItem("takenPlayers", JSON.stringify(newTakenPlayers));

    dispatch(setCurrentPlayer(player));
    if (player === 1) {
      setShowImage1(true);
      setShowImage2(false);
    }
    if (player === 2) {
      setShowImage2(true);
      setShowImage1(false);
    }
  };

  const { isNewSessionPopupOpen } = useSelector((state) => state.popup);

  const handlePlay = () => {
    if (isNewSessionPopupOpen) {
      navigate("/player-form");
    } else {
      alert("Host has not started any session yet!");
    }
  };

  return (
    <div
      className="min-h-screen px-4 md:px-10 flex flex-col items-center bg-cover bg-center overflow-x-auto pb-6"
      style={{ backgroundImage: "url(/assets/bgEmpty.jpg)" }}
    >
      <Lottie
        path="/assets/Quiz.json"
        animationData={animationData}
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-blue-800 mt-[-42px]">
          Player Dashboard
        </h1>
        <p className="text-center text-blue-600 mb-10 max-w-2xl mx-auto text-lg">
          Select your player and hit play to begin your adventure!
        </p>

        <div className="grid grid-cols-2 gap-6 mb-0">
          <div
            className={`bg-white rounded-xl text-center cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-center items-center
              ${
                currentPlayer === 1
                  ? "ring-4 ring-blue-500 transform scale-105"
                  : takenPlayers[1]
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            onClick={() => !takenPlayers[1] && handlePlayerSelect(1)}
          >
            {showImage1 && (
              <img
                src="/assets/connected.png"
                alt="Connected"
                className="h-[30px] w-[40px] mx-auto"
              />
            )}
            <img
              src="/assets/player1.png"
              alt="Player 1"
              className="h-[50px] w-[69px] mx-auto"
            />
            <h2 className="text-3xl md:text-3xl sm:text-3xl font-bold text-blue-700 mb-2">
              Player 1
            </h2>
            {takenPlayers[1] && !showImage1 && (
              <span className="text-red-500 text-sm">(Taken)</span>
            )}
          </div>

          <div
            className={`bg-white rounded-xl p-8 text-center cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg
              ${
                currentPlayer === 2
                  ? "ring-4 ring-green-500 transform scale-105"
                  : takenPlayers[2]
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            onClick={() => !takenPlayers[2] && handlePlayerSelect(2)}
          >
            {showImage2 && (
              <img
                src="/assets/connected.png"
                alt="Connected"
                className="h-[30px] w-[40px] mx-auto"
              />
            )}
            <img
              src="/assets/player2.png"
              alt="Player 2"
              className="h-[50px] w-[69px] mx-auto"
            />
            <h2 className="text-3xl font-bold text-green-600 mb-2">Player 2</h2>
            {takenPlayers[2] && !showImage2 && (
              <span className="text-red-500 text-sm">(Taken)</span>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mt-5">
          <img
            src="/assets/playGif.gif"
            alt="Play"
            onClick={handlePlay}
            className={`h-[119px] w-[111px]`}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
