import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';
import { useProblems } from '../data/ProblemContext';

function Introduction() {
  const { currentProblem, finish } = useProblems();
  const { userRecord, email } = useAuth();

  const navigate = useNavigate();

  function startHandle() {
    if (currentProblem) {
      console.log('[Intro.js]> currentProblem is: ', currentProblem.name);
      navigate('/solve');
    } else {
      console.error('[Intro.js]> currentProblem not found: ', currentProblem);
      console.log('[Intro.js]> current userRecord is: ', userRecord);
    }
  }
  return (
    <>
      <div className="top-6 right-10 absolute flex flex-col">
        <button onClick={() => finish()} className="mx-auto py-1 w-24 pb-2 rounded-full bg-red-300 hover:bg-red-400">
          Quit
        </button>
        <p>Logged in with {email}</p>
      </div>

      <img className="mt-3 w-6/12 mx-auto" src="upp-logo.svg" alt="logo for site" />
      <div className="flex flex-col items-center ">
        <p className="w-10/12 mt-2 text-center text-lg">
          Thank you for logging in. The image below illustrates how this tool works
        </p>
        <img className="w-6/12" src="parsons-example.png" alt="showing how to use the parsons problem tool" />
        <p className="w-7/12 mb-4 text-center text-lg">
          There are <b>four</b> questions
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
