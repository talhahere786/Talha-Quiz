import { UserIcon, UsersIcon } from "lucide-react";
import bgimage from "/assets/bgEmpty.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openNewSessionPopup } from "../Redux/Slices/popupSlice";

export default function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/hd");
  };
  
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgimage}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full  mx-auto px-4 py-8">
        {/* Main Content Section */}
        <div className="w-full flex flex-col items-center">
          {/* Heading */}
          <img
            src="/assets/introText.png"
            alt="Descriptive text"
            className="h-[183px] w-[395px] mx-auto"
          />

          {/* Join as */}
          <p className="mb-4 text-3xl md:text-2xl text-center text-[#00008B] font-bold">
            Join as
          </p>

          {/* Buttons Container */}
          <div className="w-full space-y-3 mb-4">
            {/* Player Button */}
            <button
              onClick={() => navigate("/player-dashboard")}
              className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg flex items-center justify-center space-x-2 shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <UserIcon size={18} className="min-w-[20px]" />
              <span className="text-lg sm:text-base">PLAYER</span>
            </button>

            {/* Host Button */}
            <button
              onClick={handleClick}
              className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-500 text-gray-800 font-bold rounded-lg flex items-center justify-center space-x-2 shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <UsersIcon size={18} className="min-w-[20px]" />
              <span className="text-lg sm:text-base">HOST</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-center text-[#00008B] mt-10 px-2 font-bold">
            Join our community to play fun quiz games while supporting
            charities.
          </p>
        </div>
      </div>
    </div>
  );
}
