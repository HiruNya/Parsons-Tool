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
    <>
      <button
        onClick={() => finish()}
        className="absolute top-6 right-6 px-7 py-1 pb-2 rounded-full bg-red-300 hover:bg-red-400"
      >
        Quit
      </button>
      <img className="mt-3 w-6/12 mx-auto" src="upp-logo.svg" alt="logo for site" />

      <div className="flex flex-col items-center">
        {!isDone ? (
          <p className="mb-4">Well done, please continue with the next problem by clicking the button below </p>
        ) : (
          <>
            <p className="text-center w-8/12">
              Thank you so much for taking the time to use our tool, and we hope it was an interesting and different
              problem format to what you have tried before.
              <br />
              <br />
              We would be extremely grateful if you have the time to fill out this short survey about your experience
              with the tool.
              <br />
              <br />
              <a
                className="text-blue-500 hover:text-blue-600 hover:underline"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfh2QhZeWG0AgIUqDq2idDSYvOttxHLz8vhIXOqD3EQ5gzONg/viewform?usp=sf_link"
              >
                Google form link
              </a>
              <br />
            </p>
            <iframe
              title="Google form"
              src="https://docs.google.com/forms/d/e/1FAIpQLSfh2QhZeWG0AgIUqDq2idDSYvOttxHLz8vhIXOqD3EQ5gzONg/viewform?embedded=true"
              className="w-10/12 h-96 text-center"
            >
              Loading…
            </iframe>
          </>
        )}

        <p className="mt-8 mb-4 text-lg font-bold">
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
          <button
            onClick={() => finish()}
            className=" px-7 py-1 pb-2 text-2xl rounded-full bg-red-300 hover:bg-red-400"
          >
            Sign Out
          </button>
        )}
      </div>
    </>
  );
}

export default Summary;
