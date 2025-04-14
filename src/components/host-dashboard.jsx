import React ,{useEffect ,useState} from "react";
import { LayoutGrid, FileQuestion, Settings, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SessionCard from "./SessionCard";
import { useDispatch ,useSelector } from "react-redux";
import { openNewSessionPopup } from "../Redux/Slices/popupSlice";
import ActiveSessionCard from "./ActiveSessionCard";

// Sample initial questions
const initialQuestions = [
  {
    id: '1',
    text: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 1
  },
  {
    id: '2',
    text: 'Which planet is known as the Red Planet?',
    options: ['Jupiter', 'Venus', 'Mars', 'Saturn'],
    correctAnswer: 2
  }
];
// Key for localStorage
const STORAGE_KEY = 'quiz-questions';

const HostDashboard = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const navigate = useNavigate();
  //For opening new session card
  const dispatch = useDispatch();

  // Save to localStorage whenever questions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const handleClick = () => {
    // Set session flag in localStorage and Redux
    localStorage.setItem("activeSession", "true");
    dispatch(openNewSessionPopup());
  };
  // Effect to watch for session changes
  useEffect(() => {
    const checkSessionStatus = () => {
      const isSessionActive = localStorage.getItem("activeSession") === "true";
      if (isSessionActive) {
        dispatch(openNewSessionPopup());
      }
    };

    // Check immediately on mount
    checkSessionStatus();

    // Set up storage event listener for cross-tab communication
    const handleStorageChange = (e) => {
      if (e.key === "activeSession") {
        checkSessionStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);
  const isOpen = useSelector((state) => state.popup.isNewSessionPopupOpen);
//When t show session card
  const [showSessionCard, setShowSessionCard] = useState(false);

  useEffect(() => {
    // Check immediately on mount
    const scores = localStorage.getItem("quiz-scores");
    setShowSessionCard(!!scores && scores !== "{}");

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "quiz-scores") {
        const newScores = e.newValue;
        setShowSessionCard(!!newScores && newScores !== "{}");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 bg-cover bg-center overflow-x-auto"
      style={{ backgroundImage: "url(/assets/bgEmpty.jpg)" }}
    >
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        <header className="mb-6 bg-white p-3 rounded-lg">
          <h1 className="text-3xl text-[#00008B] font-bold mb-2 text-center ">
            Host Dashboard
          </h1>
          <p className="text-[#00008B] text-center">
            Manage your quiz sessions
          </p>
        </header>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate("/sessions")}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-purple-500 hover:bg-purple-500 rounded-md transition-colors"
          >
            <LayoutGrid className="h-6 w-6" />
            <span className="text-lg">All Sessions</span>
          </button>

          <button
            onClick={() => navigate("/questions")}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-teal-500/90 hover:bg-teal-500 rounded-md transition-colors"
          >
            <FileQuestion className="h-6 w-6" />
            <span className="text-lg">Questions</span>
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
          >
            <Settings className="h-6 w-6" />
            <span className="text-lg">Settings</span>
          </button>

          <button
            onClick={handleClick}
            className="h-24 flex flex-col items-center justify-center gap-2 bg-rose-400/90 hover:bg-rose-400 rounded-md transition-colors"
          >
            <PlusCircle className="h-6 w-6" />
            <span className="text-lg">New Session</span>
          </button>
        </div>

        {isOpen && <ActiveSessionCard />}
        <h2 className="text-2xl text-[#00008B] font-semibold mb-3 mt-2 bg-white p-3 rounded-lg">
          Previous Session
        </h2>
        {/* Previous Session Card */}
        {showSessionCard && <SessionCard />}
      </div>
    </div>
  );
};

export default HostDashboard;
