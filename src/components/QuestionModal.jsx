import React, { useState, useEffect } from "react";

const QuestionModal = ({ isOpen, onClose, onSave, question }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    if (question) {
      setQuestionText(question.text);
      setOptions([...question.options]);
      setCorrectAnswer(question.correctAnswer);
    } else {
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
    }
  }, [question, isOpen]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    // Basic validation
    if (!questionText.trim()) {
      alert("Question text is required");
      return;
    }

    if (options.some((option) => !option.trim())) {
      alert("All options must be filled");
      return;
    }

    onSave({
      id: question?.id,
      text: questionText,
      options: options,
      correctAnswer: correctAnswer,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#00008B]">
          {question ? "Edit Question" : "Add New Question"}
        </h2>

        <div className="mb-4">
          <label className="block text-[#00008B] text-sm font-bold mb-2">
            Question Text
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue bg-white text-black"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
          />
        </div>

        {options.map((option, index) => (
          <div key={index} className="mb-4 flex items-center">
            <div className="flex-grow">
              <label className="block text-[#00008B] text-sm font-bold mb-2 ">
                Option {index + 1}
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
            <div className="ml-2 flex items-center mt-6 ">
              <input
                type="radio"
                id={`correct-${index}`}
                name="correctAnswer"
                checked={correctAnswer === index}
                onChange={() => setCorrectAnswer(index)}
                className="mr-2 h-4 w-4 appearance-none rounded-full border border-gray-400 bg-white checked:ring-2 checked:ring-[#00008B] checked:border-transparent focus:outline-none"
              />
              <label
                htmlFor={`correct-${index}`}
                className="text-[#00008B] text-sm "
              >
                Correct
              </label>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#00008B] text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
