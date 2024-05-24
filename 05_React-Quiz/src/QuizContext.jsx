import { createContext, useContext, useEffect } from "react";

// initiate reducer value
const initialValue = {
  questions: [],
  // dataReceived, loading, error
  status: "loading",
  quizIndex: 0,
  answer: null,
  points: 0,
};
// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": // success for fetching data
      return { ...state, status: "dataReceived", questions: action.payload };
    case "dataFailed": // failed for fetching data
      return { ...state, status: "error" };
    case "quizStart":
      return {
        ...state,
        status: "quizStart",
        answer: null,
        quizIndex: 0,
        points: 0,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.quizIndex].correctOption
            ? state.points + state.questions[state.quizIndex].points
            : state.points,
      };
    case "nextQuiz":
      if (state.quizIndex === state.questions.length - 1)
        return { ...state, status: "finish" };
      return { ...state, quizIndex: state.quizIndex + 1, answer: null };
    default:
      throw new Error("Action unknown");
  }
}

// initiate context
const QuizContext = createContext();

function QuizProvider({ children }) {
  const [{ questions, status, quizIndex, answer, points }, dispatch] =
    useReducer(reducer, initialValue);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <QuizContext.Provider value={{
    status,
    answer,
    quizIndex,
    points,
    numQuestions,
    maxPossiblePoints,
    question: questions[quizIndex],
    onStart: () => dispatch({ type: "quizStart"}),
    onAnswer: (answerID) => dispatch({ type: "newAnswer", payload: answerID }),
    onNext: () => dispatch({ type: "nextQuiz" }),
    onRestart: () => dispatch({ type: "quizStart" }),
  }}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}

export { QuizProvider, useQuiz };
