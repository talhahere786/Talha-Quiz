import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerInfo, setCurrentPlayer } from "../Redux/Slices/playerSlice"; // adjust path as needed
import { startGame } from "../Redux/Slices/sessionSlice";
const ActiveSessionCard = () => {
  const dispatch = useDispatch();
  const { sessionId } = useSelector((state) => state.session);
  const { players } = useSelector((state) => state.player);
   const [showStartButton, setShowStartButton] = useState(false);
   const [gameStarted, setGameStarted] = useState(false);
  // Check if both players are ready
  useEffect(() => {
    const checkReadyStates = () => {
      const states = JSON.parse(
        localStorage.getItem("playerReadyStates") || "{}"
      );
       const bothPlayersReady = states["1"] && states["2"];
      setShowStartButton(bothPlayersReady);
    };

    // Initial check
    checkReadyStates();

    // Set up listeners
    const handleReadyEvent = () => checkReadyStates();

    window.addEventListener("storage", handleReadyEvent);
    window.addEventListener("playerReady", handleReadyEvent);

    return () => {
      window.removeEventListener("storage", handleReadyEvent);
      window.removeEventListener("playerReady", handleReadyEvent);
    };
  }, []);
  useEffect(() => {
    const channel = new BroadcastChannel("player_channel");

    // Listen for messages from the other tab
    channel.onmessage = (e) => {
      if (e.data.type === "PLAYER_INFO") {
        const { playerNumber, name, company } = e.data.payload;
        dispatch(setCurrentPlayer(playerNumber));
        dispatch(setPlayerInfo({ playerNumber, name, company }));
      }
    };
    // Cleanup when component unmounts
    return () => {
      channel.close();
    };
  }, [dispatch]);
 const handleStartGame = () => {
   // Disable the button and update text
   setGameStarted(true);
   // Set gameStarted to true in localStorage
   localStorage.setItem("gameStarted", "true");

   // Start game in current tab
   dispatch(startGame());
 };
  return (
    <>
      {showStartButton ? (
        <button
          onClick={!gameStarted ? handleStartGame : undefined}
          disabled={gameStarted}
          className={`w-full h-24 flex flex-col items-center justify-center gap-2 rounded-md transition-colors ${
            gameStarted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-300"
          }`}
        >
          <span className="text-3xl">
            {gameStarted ? "Game has started" : "Start the Game!"}
          </span>
        </button>
      ) : (
        <button
          className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-gray-400 rounded-md cursor-not-allowed"
          disabled
        >
          <span className="text-3xl text-gray-600">
            Waiting for players to join...
          </span>
        </button>
      )}
      <div className="mt-2 mb-4"></div>
      <div className="w-full bg-[#00008B] rounded-xl shadow-md overflow-hidden animate-fadeIn mx-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-white mb-4">
            Waiting for Players
          </h2>
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <p className=" text-center text-xl text-yellow-400">
              <span className="font-semibold">Session ID:</span> {sessionId}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-white text-xl">Player 1:</span>
              <span className="text-white text-xl">
                {players.player1?.name || "Waiting..."}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-white text-xl">Player 2:</span>
              <span className="text-white text-xl">
                {players.player2?.name || "Waiting..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveSessionCard;
