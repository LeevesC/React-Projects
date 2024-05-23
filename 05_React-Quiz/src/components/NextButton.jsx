function NextButton({ children, onNext }) {
  return (
    <button className="btn btn-ui" onClick={onNext}>
      {children}
    </button>
  );
}

export default NextButton;
