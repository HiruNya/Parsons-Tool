const ProblemProgressTracker = ({ questionProgress, totalQuestions }) => (
  <div className="justify-center flex flex-row">
    {[...Array(totalQuestions).keys()].map((v, i) => (
      <div
        className={
          'px-4 py-1 ' +
          (i < questionProgress
            ? 'bg-gray-300'
            : i === questionProgress
            ? 'bg-green-300 rounded-r-lg' + (i === 0 ? ' rounded-l-lg' : '')
            : 'underline underline-offset-4') +
          (i === 0 ? ' rounded-l-lg' : '') +
          (i === totalQuestions - 1 ? ' rounded-r-lg' : '')
        }
      >
        {i + 1}
      </div>
    ))}
  </div>
);

export default ProblemProgressTracker;
