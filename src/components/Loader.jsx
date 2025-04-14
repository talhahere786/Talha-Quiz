import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import animationData from "../animations/Loader.json"; // adjust path as needed
import { startGame } from "../Redux/Slices/sessionSlice";
const Loader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check immediately when component mounts
    if (localStorage.getItem("gameStarted") === "true") {
      dispatch(startGame());
      navigate("/counter");
    } 

    // Set up storage event listener
    const handleStorageChange = (e) => {
      if (e.key === "gameStarted") {
        if (e.newValue === "true") {
          dispatch(startGame());
          navigate("/counter");
        } 
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch, navigate]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-light-blue px-4 py-8 md:py-12 lg:py-16 bg-cover bg-center"
      style={{ backgroundImage: "url(/assets/bgQuestions.jpg)" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 shadow-inner pointer-events-none z-0" />

      {/* Content goes here */}
      <div className="relative z-10 text-white text-center flex flex-col items-center">
        <Lottie
          path="/assets/Loader.json"
          animationData={animationData}
          loop
          autoplay
          style={{ width: 300, height: 150 }}
        />
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-pulse ">
          Waiting for host to start ....
        </h2>
        <p className="text-xl md:text-2xl font-bold text-blue-300 mb-2">
          The Game will begin shortly
        </p>
      </div>
    </div>
  );
};

export default Loader;
