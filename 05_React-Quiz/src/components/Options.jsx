import { useState } from "react";

function Options({ question, onAnswer, answer }) {
  const options = question.options;

  function showAnswer(index) {
    if (answer === null) return;
    return index === question.correctOption ? "correct" : "wrong";
  }

  return (
    <div className="options">
      {options.map((op, index) => (
        <button
          className={`btn btn-option ${showAnswer(index)} ${
            answer === index ? "answer" : ""
          }`}
          key={index}
          disabled={answer !== null}
          onClick={() => onAnswer(index)}
        >
          {op}
        </button>
      ))}
    </div>
  );
}

export default Options;
