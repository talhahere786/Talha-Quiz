import React ,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerInfo, setCurrentPlayer } from "../Redux/Slices/playerSlice"; // adjust path as needed
import Lottie from "lottie-react";
import animationData from "../animations/Ramadan1.json"; // adjust path as needed
import { useNavigate } from "react-router-dom";
const PlayerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Update the useSelector to match new state structure
  const { currentPlayer } = useSelector((state) => state.player);
  const playerData = useSelector(
    (state) => state.player.players[`player${currentPlayer}`] || {}
  );
  const { name = "", company = "" } = playerData;

  const handleNameChange = (e) => {
    const updatedInfo = {
      playerNumber: currentPlayer,
      name: e.target.value,
      company,
    };
    dispatch(setPlayerInfo(updatedInfo));

    // Save to localStorage
    const players = JSON.parse(localStorage.getItem("quiz-players") || "{}");
    players[`player${currentPlayer}`] = updatedInfo;
    localStorage.setItem("quiz-players", JSON.stringify(players));

    // Post the updated player name to BroadcastChannel
    const channel = new BroadcastChannel("player_channel");
    channel.postMessage({
      type: "PLAYER_INFO",
      payload: {
        playerNumber: currentPlayer,
        name: e.target.value,
        company,
      },
    });
  };

  const handleCompanyChange = (e) => {
    const updatedInfo = {
      playerNumber: currentPlayer,
      name,
      company: e.target.value,
    };
    dispatch(setPlayerInfo(updatedInfo));

    // Save to localStorage
    const players = JSON.parse(localStorage.getItem("quiz-players") || "{}");
    players[`player${currentPlayer}`] = updatedInfo;
    localStorage.setItem("quiz-players", JSON.stringify(players));
  };
  // Load player data from localStorage on mount
  useEffect(() => {
    const savedPlayers = localStorage.getItem("quiz-players");
    if (savedPlayers) {
      const players = JSON.parse(savedPlayers);
      if (players[`player${currentPlayer}`]) {
        dispatch(setPlayerInfo(players[`player${currentPlayer}`]));
      }
    }
  }, [currentPlayer, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/how-to-play");
  };

  return (
    <>
      <div
        className="min-h-screen  bg-[#D3E4FD] flex flex-col items-center justify-center p-4 md:p-8 bg-cover bg-center overflow-x-auto"
        style={{ backgroundImage: "url(/assets/bgEmpty.jpg)" }}
      >
        <div className=" w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10 text-center">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="inline-block">
              <Lottie
                path="/assets/Quiz.json"
                animationData={animationData}
                loop
                autoplay
                style={{ width: 300, height: 150 }}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
              Today's theme is "Ramadan Contest"
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Test your knowledge of the holy month and local traditions in this
              engaging Ramadan-themed trivia contest.
            </p>

            {/* Decorative element */}
            <div className="flex justify-center my-4">
              <div className="h-1 w-24 bg-blue-500 rounded"></div>
            </div>
          </div>

          <div className="bg-blue-100 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#00008B] text-white text-xl font-bold h-12 w-32 rounded-full flex items-center justify-center">
                Player {currentPlayer}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-center text-[#00008B] text-xl font-medium mb-4">
                Enter your details
              </h3>

              <div>
                <label
                  htmlFor="playerName"
                  className="block text-xl font-medium text-[#00008B] mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="playerName"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-[#00008B]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xl font-medium text-[#00008B] mb-1"
                >
                  Company name
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Enter your company"
                  value={company}
                  onChange={handleCompanyChange}
                  className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-[#00008B]"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  //   disabled={!isFormValid}
                  className={`w-full py-3 px-6 rounded-md text-white font-medium transition-all duration-200 bg-[#00008B] hover:bg-blue-600 text-xl`}
                >
                  Ready
                </button>
              </div>
            </form>
          </div>

          {/* Islamic pattern decoration at the bottom */}
          <div className="flex justify-center mt-6">
            <div className="h-8 w-full max-w-md bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMzQjgyRjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMyI+PHBhdGggZD0iTTAgMjAgQzIwIDIwIDIwIDAgNDAgMCBDNjAgMCA2MCAyMCA4MCAyMCBDMTAwIDIwIDEwMCAwIDEyMCAwIEMxNDAgMCAxNDAgMjAgMTYwIDIwIEMxODAgMjAgMTgwIDAgMjAwIDAiLz48cGF0aCBkPSJNMCA0MCBDNCA0MCA0IDYwIDggNjAgQzEyIDYwIDEyIDQwIDE2IDQwIEMyMCA0MCAyMCA2MCAyNCA2MCBDMjggNjAgMjggNDAgMzIgNDAiLz48L2c+PC9zdmc+')] bg-repeat-x opacity-50"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerForm;
