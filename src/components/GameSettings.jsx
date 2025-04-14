import React, { useState } from "react";

const GameSettings = () => {
  const [gameSessionTime, setGameSessionTime] = useState(60);
  const [countdownTime, setCountdownTime] = useState(5);
  const [saved, setSaved] = useState(false);

  const incrementGameTime = () => {
    setGameSessionTime((prev) => prev + 1);
  };

  const decrementGameTime = () => {
    setGameSessionTime((prev) => prev-1);
  };

  const incrementCountdownTime = () => {
    setCountdownTime((prev) => prev + 1);
  };

  const decrementCountdownTime = () => {
    setCountdownTime((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const saveSettings = () => {
    const settings = {
      gameSessionTime,
      countdownTime,
      timestamp: Date.now(), // Add timestamp for freshness
    };

    // Save to localStorage
    localStorage.setItem("gameSettings", JSON.stringify(settings));

    // Optional: Dispatch event for same-tab listeners
    window.dispatchEvent(new CustomEvent("settingsUpdated"));
    console.log("Settings saved:", { gameSessionTime, countdownTime });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-cover bg-center overflow-x-auto "
      style={{ backgroundImage: "url(/assets/bgEmpty.jpg)" }}
    >
      <h1 className="text-3xl font-bold text-[#00008B] md:text-3xl ">
        Game Settings
      </h1>
      <div className="container bg-white rounded-xl shadow-xl p-6 md:p-8 m-6 max-w-[90vw] lg:max-w-md  mx-auto">
        <div className="space-y-6">
          {/* Game Session Time Control */}
          <div className="bg-[#00008B] bg-opacity-50 rounded-lg p-4 ">
            <label className="block text-white font-medium mb-2 text-lg">
              Game Session Time (seconds)
            </label>
            <div className="flex items-center justify-between">
              <button
                onClick={decrementGameTime}
                className="bg-[#00008B] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l transition-colors"
                aria-label="Decrease game time"
              >
                -
              </button>
              <span className="flex-1 text-center text-2xl font-semibold text-white">
                {gameSessionTime}
              </span>
              <button
                onClick={incrementGameTime}
                className="bg-[#00008B] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r transition-colors "
                aria-label="Increase game time"
              >
                +
              </button>
            </div>
          </div>

          {/* Countdown Time Control */}
          <div className="bg-[#00008B] bg-opacity-50 rounded-lg p-4">
            <label className="block text-white font-medium mb-2 text-lg">
              Countdown Time (seconds)
            </label>
            <div className="flex items-center justify-between">
              <button
                onClick={decrementCountdownTime}
                className="bg-[#00008B] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l transition-colors"
                aria-label="Decrease countdown time"
              >
                -
              </button>
              <span className="flex-1 text-center text-2xl font-semibold text-white">
                {countdownTime}
              </span>
              <button
                onClick={incrementCountdownTime}
                className="bg-[#00008B] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r transition-colors"
                aria-label="Increase countdown time"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={saveSettings}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-all bg-[#00008B] text-lg ${
              saved
                ? "bg-green-600 text-white"
                : "bg-purple-600[#00008B] hover:bg-blue-600 text-white hover:shadow-lg"
            }`}
          >
            {saved ? "Settings Saved!" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
