function FinishScreen({ points, onRestart }) {
  return (
    <>
      <p className="result">
        <span>HaHa</span> You scored <strong>{points}</strong>
      </p>
      <button className="btn btn-ui" onClick={onRestart}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
