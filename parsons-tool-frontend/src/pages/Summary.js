import React from 'react';
import { useProblems } from '../data/ProblemContext';

function Summary() {
  const { finish } = useProblems();

  return (
    <>
      <button
        onClick={() => finish()}
        className="absolute top-6 right-6 px-7 py-1 pb-2 rounded-full bg-red-300 hover:bg-red-400"
      >
        Quit
      </button>
      <img className="mt-3 w-6/12 mx-auto" src="upp-logo.svg" alt="logo for site" />

      <div className="flex flex-col h-full items-center">
        <p className="text-center w-8/12 text">
          Thank you so much for taking the time to use our tool, and we hope it was an interesting and different problem
          format to what you have tried before. By answering the questions up till this point, you have done what you
          need for your marks for this activity.
          <br />
          <br />
          We would be extremely grateful if you have the time to fill out this short survey about your experience with
          the tool.
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
          className="w-10/12 h-full text-center"
        >
          Loading…
        </iframe>

        <button
          onClick={() => finish()}
          className=" my-5 px-7 py-1 pb-2 text-2xl rounded-full bg-red-300 hover:bg-red-400"
        >
          Sign Out
        </button>
      </div>
    </>
  );
}

export default Summary;
