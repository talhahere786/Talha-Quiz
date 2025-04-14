import { useState,useEffect } from 'react'
import Hero from './components/Hero'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HostDashboard from './components/host-dashboard';
import AllSessions from './components/allSessions';
import ManageQuestions from './components/ManageQuestions';
import GameSettings from './components/GameSettings';
import PlayerDashboard from './components/PlayerDashboard';
import PlayerForm from './components/PlayerForm';
import HowToPlay from './components/HowToPlay';
import Loader from './components/Loader';
import CountDown from './components/CountDown';
import Quiz from './components/Quiz';
function App() {

  return (
    <>
      <div  >
        <Routes>
          <Route index element={<Hero />} />
          <Route path="/hd" element={<HostDashboard />} />
          <Route path="/sessions" element={<AllSessions />} />
          <Route path="/questions" element={<ManageQuestions />} />
          <Route path="/settings" element={<GameSettings />} />
          <Route path="/player-dashboard" element={<PlayerDashboard />} />
          <Route path="/player-form" element={<PlayerForm />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/counter" element={<CountDown />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </>
  );
}

export default App
