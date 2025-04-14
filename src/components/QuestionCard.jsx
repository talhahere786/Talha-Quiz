import React from "react";

const QuestionCard = ({ question, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-[#00008B]">
          {question.text}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 bg-white hover:bg-blue-100 rounded-full transition-colors"
            aria-label="Edit question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 bg-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 bg-white hover:bg-red-100 rounded-full transition-colors"
            aria-label="Delete question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`p-2 rounded-md text-[#00008B] ${
              index === question.correctAnswer
                ? "bg-green-100 border border-green-300"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full mr-2 text-sm font-medium text-[#00008B]	">
                {String.fromCharCode(65 + index)}
              </span>
              <span
                className={
                  index === question.correctAnswer
                    ? "font-medium text-[#00008B]"
                    : ""
                }
              >
                {option}
              </span>
              {index === question.correctAnswer && (
                <span className="ml-auto text-green-600 text-sm font-medium">
                  Correct Answer
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
