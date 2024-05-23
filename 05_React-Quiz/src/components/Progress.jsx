function Progress({ numQuestions, quizIndex, points, maxPossiblePoints }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={quizIndex} />
      <p>
        Question <strong>{quizIndex + 1}</strong>/{numQuestions}
      </p>
      <p>
        Points <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
