import Options from "./Options";

function Questions({ question, onAnswer, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} onAnswer={onAnswer} answer={answer} />
    </div>
  );
}

export default Questions;
