import React from "react";
import { Trophy, Users, BarChartHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
const SessionCard = () => {
  const { sessionId } = useSelector((state) => state.session);
  // Get player data from localStorage
  const getPlayerData = () => {
    try {
      // Get scores from 'quiz-scores' key
      const scores = JSON.parse(localStorage.getItem("quiz-scores") || "{}");

      // Get player profiles from 'quiz-players' key
      const players = JSON.parse(localStorage.getItem("quiz-players") || "{}");

      // Format the session data
      const sessionData = {
        id: `SES-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        players: [],
        winnerId: null,
      };

      // Helper function to add player data
      const addPlayerData = (playerKey) => {
        if (
          players[playerKey] &&
          (scores[playerKey] || players[playerKey].name)
        ) {
          sessionData.players.push({
            name: players[playerKey].name || playerKey,
            company: players[playerKey].company || "",
            score: scores[playerKey]?.score || 0,
            attempts: scores[playerKey]?.attempts || 0,
            isCurrent: playerKey === `player${currentPlayer}`,
          });
        }
      };

      // Add both players' data
      addPlayerData("player1");
      addPlayerData("player2");

      // Determine winner (player with highest score)
      if (sessionData.players.length > 0) {
        const scores = sessionData.players.map((p) => p.score);

        if (scores.every((score) => score === scores[0])) {
          sessionData.winnerId = "tie"; // Custom flag to indicate tie
        } else {
          sessionData.winnerId = scores.indexOf(Math.max(...scores));
        }
      }


      return sessionData;
    } catch (error) {
      console.error("Error parsing player data:", error);
      return null;
    }
  };

  // Get current player from localStorage or default to 1
  const currentPlayer = JSON.parse(
    localStorage.getItem("currentPlayer") || "1"
  );
  const sessionData = getPlayerData();

  if (
    !sessionData ||
    sessionData.players.length === 0 ||
    sessionData.players.score === 0
  ) {
    return (
      <div className="bg-white border-none text-[#00008B] shadow-lg rounded-lg overflow-hidden p-4 text-lg">
        <p className="text-center ">No session data available yet.</p>
        <p className="text-center">
          Complete a quiz to see your results here.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="bg-white border-none text-[#00008B] shadow-lg rounded-lg overflow-hidden mt-4">
        <div className="p-4 pb-2">
          <div className="text-lg flex justify-between items-center">
            <span className="font-medium text-xl">{sessionId}</span>
            <span className="text-xl text-[#00008B] font-medium">
              {sessionData.date}
            </span>
          </div>
        </div>

        <div className="p-4 pb-2">
          {sessionData.winnerId !== null && (
            <div className="flex items-center gap-2 mb-4 text-xl">
              <Trophy className="h-5 w-5 text-yellow-400" />
              {sessionData.winnerId === "tie" ? (
                <span className="font-medium">It's a tie!</span>
              ) : (
                <span className="font-medium">
                  Winner: {sessionData.players[sessionData.winnerId].name}
                </span>
              )}
            </div>
          )}

          {sessionData.players.map((player, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg mb-2 ${
                index === sessionData.winnerId
                  ? "bg-yellow-500/50"
                  : player.isCurrent
                  ? "bg-blue-500/10"
                  : "bg-white/5"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="font-medium text-xl">{player.name}</span>
                </div>
                {player.company && (
                  <span className="text-xl text-[#00008B] font-medium">
                    {player.company}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BarChartHorizontal className="h-4 w-4 text-teal-400" />
                  <span className="font-medium text-xl">
                    Score: {player.score}
                  </span>
                </div>
                <span className="text-xl font-medium">
                  Attempts: {player.attempts}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
