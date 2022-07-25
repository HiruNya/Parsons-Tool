import { useState } from 'react';

export default function TestCase({ test, deleteCase, updateState }) {
  const [currentInput, setCurrentInput] = useState('');
  const [currentOutput, setCurrentOutput] = useState('');

  function inputsChange(e) {
    setCurrentInput(e.target.value);
    updateState({
      inputs: currentInput,
      outputs: currentOutput,
    });
  }

  function outputsChange(e) {
    setCurrentOutput(e.target.value);
    updateState({
      inputs: currentInput,
      outputs: currentOutput,
    });
  }
  return (
    <li className="ml-3 my-2 px-3 py-1 w-max border-gray-300 rounded-full  border-2">
      <span>Test Case : </span>
      <span>
        Input:{' '}
        <input
          type="text"
          placeholder={test.inputs}
          onChange={inputsChange}
          className="bg-gray-200 rounded-full px-3 mx-3 focus:outline-0"
        />
        Outputs?:{' '}
        <input
          type="text"
          placeholder={test.outputs}
          onChange={outputsChange}
          className="bg-gray-200 rounded-full px-3 mx-3 focus:outline-0"
        />
        <button onClick={deleteCase} className=" px-3 rounded-full bg-red-200 hover:bg-red-300 font-bold">
          -
        </button>
      </span>
    </li>
  );
}
