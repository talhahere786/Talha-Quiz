import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import SessionCard from "./SessionCard";
import {  useSelector ,useDispatch } from "react-redux";
import {deleteall} from "../Redux/Slices/deleteAllSlice"
const AllSessions = () => {
  const dispatch = useDispatch();
  const handleSessions = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all sessions?"
    );
    if (confirmDelete) {
      dispatch(deleteall());
    }
  };
  const isDeleted = useSelector((state) => state.deleteAll.isDeleted);
  return (
    <div
      className="min-h-screen bg-gray-100 py-10 bg-cover bg-center"
      style={{ backgroundImage: "url(/assets/bgEmpty.jpg)" }}
    >
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        {/* Header with title and delete button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-[#00008B] text-center bg-white p-3 rounded-lg">
            Completed Game Sessions
          </h1>

          <button
            onClick={handleSessions}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors"
          >
            <Trash2 size={25} />
            <span className="hidden sm:inline">Delete All</span>
          </button>
        </div>
        {!isDeleted && (
          <div className="mt-2 mb-4">
            <SessionCard></SessionCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSessions;
