import { React, useState } from 'react';
import { mapLine } from '../generators/naiveGenerator';

export default function ProblemGeneration({ addProblem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');
  const [, setStrategy] = useState([]);

  const stratState = [false, false, false, false];

  const handleCheckbox = (index) => {
    stratState[index] = !stratState[index];
    setStrategy(...stratState);
  };

  const createProblem = () => {
    // TODO Validate the actual code block to check it is valid for execution based

    //Create a new problem object, block generation occurs here
    const newProblem = {
      id: 'NEED ID',
      name: name,
      description: description,
      difficulty: 'Easy - DECISION',
      tags: tags.split(','),
      variations: ['faded', '2d'],
      language: 'Python',
      author: 'F.Fromont',
      problem: {
        blocks: code.split('\n').map(mapLine),
        solution: [],
      },
    };
    addProblem(newProblem);
  };

  return (
    <div>
      <h1 className="ml-3 mt-3 text-lg font-medium">Create a new Parsons Problem</h1>

      <input
        className="bg-stone-200 rounded-full px-3 py-1 text-black max-w-xs my-3 ml-5"
        type="text"
        name="name"
        id="name"
        placeholder="Enter problem Name"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <h2 className="ml-3 text-lg font-medium">Enter a description</h2>
      <textarea
        className="bg-stone-200 rounded-lg px-3 py-1 text-black my-3 ml-5"
        name="description"
        id="description"
        cols="50"
        rows="3"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      ></textarea>

      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full ml-5">
          <div className="flex flex-row">
            <div className="flex flex-col w-full">
              <div className="flex flex-row ">
                <h2 className="px-3 py-1 my-3 text-lg font-medium">Solution Code</h2>
                <select
                  className="bg-stone-200 rounded-full px-2 py-1 text-black my-3 ml-auto"
                  name="language"
                  id="language"
                  defaultValue="1"
                >
                  <option value="python">Python</option>
                  <option value="c">C</option>
                  <option value="MATLAB">MATLAB</option>
                </select>
              </div>
              <div>
                <textarea
                  className="border-2 border-solid rounded-lg p-3 w-full"
                  name="solution"
                  id=""
                  cols="70"
                  rows="20"
                  placeholder="#Enter solution code here"
                  onChange={(event) => setCode(event.target.value)}
                />
              </div>

              <div>
                <h2 className="text-lg font-medium">Generation Settings</h2>
                <div className="grid grid-cols-2 gap-1 gap-x-1 w-min ml-5">
                  <input
                    className="mt-2 indeterminate:bg-gray-300 checked:bg-blue-500 w-min"
                    type="checkbox"
                    name="Strategy1"
                    id="Strategy1"
                    onChange={() => handleCheckbox(0)}
                  />
                  <label className="ml-3" htmlFor="Strategy1">
                    Strategy1
                  </label>
                  <input
                    className="mt-2 indeterminate:bg-gray-300 checked:bg-blue-500 w-min"
                    type="checkbox"
                    name="Strategy2"
                    id="Strategy2"
                    onChange={() => handleCheckbox(1)}
                  />
                  <label className="ml-3" htmlFor="Strategy2">
                    Strategy2
                  </label>
                  <input
                    className="mt-2 indeterminate:bg-gray-300 checked:bg-blue-500 w-min"
                    type="checkbox"
                    name="Strategy3"
                    id="Strategy3"
                    onChange={() => handleCheckbox(2)}
                  />
                  <label className="ml-3" htmlFor="Strategy3">
                    Strategy3
                  </label>
                  <input
                    className="mt-2 indeterminate:bg-gray-300 checked:bg-blue-500 w-min"
                    type="checkbox"
                    name="Strategy4"
                    id="Strategy4"
                    onChange={() => handleCheckbox(3)}
                  />
                  <label className="ml-3" htmlFor="Strategy4">
                    Strategy4
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full ml-7 mt-4">
              <h2 className="text-lg font-medium">Associated Tags (comma seperated values)</h2>
              <input
                className="bg-stone-200 rounded-full px-3 py-1 text-black max-w-xs mt-5 mb-3"
                type="text"
                placeholder="e.g for loop, arrays ..."
                onChange={(event) => {
                  setTags(event.target.value);
                }}
              />

              <h2 className="text-lg font-medium">Example Parsons Problem</h2>

              <p className="h-3/5 bg-stone-200 w-96 rounded-lg p-3 mb-5">[## would show blocks]</p>

              <div className="ml-16">
                <button
                  className="px-4 py-2 mr-3 bg-green-400 text-white rounded-full hover:bg-green-500"
                  onClick={createProblem}
                >
                  Create
                </button>
                <button className="px-4 py-2 mr-3 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                  Randomise
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
