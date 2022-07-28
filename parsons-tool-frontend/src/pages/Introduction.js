import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProblems } from '../data/ProblemContext';

function Introduction() {
  const { currentProblem } = useProblems();
  const navigate = useNavigate();

  function startHandle() {
    console.log('[Intro.js]> currentProblem is: ', currentProblem);
    navigate('/solve', { state: { problem: currentProblem } });
  }
  return (
    <div className="flex flex-col items-center ">
      <p className="w-10/12 mt-20 text-center text-lg">
        Thank you for logging in. The image below is to help famaliarise yourself with our tool and how to use it
      </p>
      <img className="mb-20" src="parsons-example.png" alt="showing how to use the parsons problem tool" />
      <p className="w-7/12 mb-12 text-center text-lg">
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
  );
}

export default Introduction;
