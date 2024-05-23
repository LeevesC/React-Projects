// import hooks from react
import { useEffect, useReducer } from "react";

// import components
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Header from "./components/Header";
import Error from "./components/Error";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Questions from "./components/Questions";
import FinishScreen from "./components/FinishScreen";

// initialization
const initialValue = {
  questions: [],
  // dataReceived, loading, error
  status: "loading",
  quizIndex: 0,
  answer: null,
  points: 0,
};

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

// homepage ui
function App() {
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
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="main">
        {status === "loading" && <Loader />}
        {status === "dataReceived" && (
          <StartScreen
            numQuestions={numQuestions}
            onStart={() => dispatch({ type: "quizStart" })}
          />
        )}
        {status === "error" && <Error />}
        {status === "quizStart" && (
          <>
            <Progress
              numQuestions={numQuestions}
              quizIndex={quizIndex}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions
              question={questions[quizIndex]}
              quizIndex={quizIndex}
              onAnswer={(answerID) =>
                dispatch({ type: "newAnswer", payload: answerID })
              }
              answer={answer}
            />
            <NextButton onNext={() => dispatch({ type: "nextQuiz" })}>
              {quizIndex < numQuestions - 1 ? "Next" : "Finish"}
            </NextButton>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            onRestart={() => dispatch({ type: "quizStart" })}
          />
        )}
      </div>
    </div>
  );
}

export default App;
