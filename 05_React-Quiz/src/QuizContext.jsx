import { createContext, useContext, useEffect } from "react";

// initiate context
const QuizContext = createContext();

function QuizProvider({ children }) {
  useEffect(
    function () {
      fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
    []
  );

  return <QuizContext.Provider value={{

  }}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}

export { QuizProvider, useQuiz };
