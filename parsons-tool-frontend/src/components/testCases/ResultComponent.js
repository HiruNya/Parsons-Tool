import React from 'react';

function ResultComponent({ result }) {
  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <p
      className={
        result.result === 'correct'
          ? 'mx-auto bg-green-300 w-full rounded p-2 mt-1'
          : 'mx-auto bg-red-300 w-full rounded p-2 mt-1'
      }
    >
      {capitaliseFirstLetter(result.result)}! Expected `{result.expected}`, Actual: `{result.actual}`
    </p>
  );
}

export default ResultComponent;
