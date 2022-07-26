import { useEffect, useState } from 'react';

export default function TestCase({ number, deleteCase, updateState }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    updateState({
      id: number,
      inputs: input,
      outputs: output,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, input, output]);

  return (
    <li className="ml-3 my-2 px-3 py-1 w-max border-gray-300 rounded-full  border-2">
      <span>Test Case : </span>
      <span>
        Input:{' '}
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-200 rounded-full px-3 mx-3 focus:outline-0"
        />
        Outputs?:{' '}
        <input
          type="text"
          onChange={(e) => setOutput(e.target.value)}
          className="bg-gray-200 rounded-full px-3 mx-3 focus:outline-0"
        />
        <button onClick={deleteCase} className=" px-3 rounded-full bg-red-200 hover:bg-red-300 font-bold">
          -
        </button>
      </span>
    </li>
  );
}
