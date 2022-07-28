import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProblems } from '../data/ProblemContext';

function Introduction() {
  const { currentProblem, finish } = useProblems();

  const navigate = useNavigate();

  function startHandle() {
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
      <div className="flex flex-col items-center ">
        <p className="w-10/12 mt-8 text-center text-lg">
          Thank you for logging in. The image below is to help famaliarise yourself with our tool and how to use it
        </p>
        <img className="mb-3" src="parsons-example.png" alt="showing how to use the parsons problem tool" />
        <p className="w-7/12 mb-4 text-center text-lg">
          There are <b>three</b> problems currently, each time you submit your solution you will be sent to a page where
          you can then start the next problem.
          <br />
          <br />
          When you are ready press the button below to get started!
        </p>
        <button
          onClick={() => startHandle()}
          className="mx-auto px-7 py-1 pb-2 text-2xl bg-green-400 hover:bg-green-500 text-white rounded-full"
        >
          Start
        </button>
      </div>
    </>
  );
}

export default Introduction;
