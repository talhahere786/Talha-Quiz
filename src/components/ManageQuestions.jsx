import React from 'react'
	import { useState,useEffect } from 'react';
import QuestionCard from './QuestionCard';
import QuestionModal from './QuestionModal';



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

// Helper to generate a unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
// Key for localStorage
const STORAGE_KEY = 'quiz-questions';

const ManageQuestions = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(undefined);

  // Save to localStorage whenever questions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

useEffect(() => {
  const handleStorageChange = (e) => {
    if (e.key === STORAGE_KEY) {
      setQuestions(JSON.parse(e.newValue));
    }
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);
  const handleAddClick = () => {
    setCurrentQuestion(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = (question) => {
    if (question.id) {
      // Update existing question
      setQuestions((prev) =>
        prev.map((q) => (q.id === question.id ? question : q))
      );
    } else {
      // Add new question
      const newQuestion = {
        ...question,
        id: generateId(),
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }
    setIsModalOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 py-10 bg-cover bg-center overflow-x-auto"
      style={{ backgroundImage: "url(/assets/bgEmpty.jpg)" }}
    >
      <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-md font-bold text-[#00008B] md:text-3xl bg-white p-3 rounded-lg ">
            Manage Questions
          </h1>
          <button
            onClick={handleAddClick}
            className="flex items-center px-4 py-2 bg-[#00008B] text-white rounded-lg hover:bg-blue-600 transition-colors md:text-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Question
          </button>
        </div>

        {questions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m0 16v1m9-9h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707m-9.9 9.9l-.707.707m12.728 0l-.707-.707"
              />
            </svg>
            <p className="text-gray-600 mb-4 text-lg">No questions yet</p>
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-[#00008B] text-white rounded hover:bg-blue-600"
            >
              Add Your First Question
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onEdit={() => handleEditClick(question)}
                onDelete={() => handleDeleteClick(question.id)}
              />
            ))}
          </div>
        )}

        <QuestionModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleModalSave}
          question={currentQuestion}
        />
      </div>
    </div>
  );
};

export default ManageQuestions;

