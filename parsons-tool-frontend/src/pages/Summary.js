import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProblems } from '../data/ProblemContext';

function Summary() {
  const { currentProblem, problemIndex, problemTotal, isDone, finish } = useProblems();

  const navigate = useNavigate();

  function nextProblemHandle() {
    console.log('[Intro.js]> currentProblem is: ', currentProblem);
    navigate('/solve', { state: { problem: currentProblem } });
  }

  return (
    <div className="flex flex-col items-center">
      <p>Well done, please continue with the next problem by clicking the button below </p>
      <p>
        {problemIndex} / {problemTotal}
      </p>

      {!isDone ? (
        <button
          onClick={() => nextProblemHandle()}
          className=" px-7 py-1 pb-2 text-2xl rounded-full bg-yellow-200 hover:bg-yellow-400"
        >
          Next Problem
        </button>
      ) : (
        <button onClick={() => finish()} className=" px-7 py-1 pb-2 text-2xl rounded-full bg-red-300 hover:bg-red-400">
          Sign Out
        </button>
      )}
    </div>
  );
}

export default Summary;
