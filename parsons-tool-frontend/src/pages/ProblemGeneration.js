import { React, useEffect, useState } from 'react';
import Block from '../components/blocks/Block';
import { useBackend } from '../data/BackendContext';
import { generateParsons } from '../generators/naiveGenerator';
import TextAreaInput from '../components/TextAreaInput';
import TestCaseCreation from '../components/testCases/TestCaseCreation';
import { useNavigate } from 'react-router-dom';

export default function ProblemGeneration() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');
  const [example, setExample] = useState([]);
  const [, setStrategy] = useState([]);
  const [testSet, setTestSet] = useState([]);

  const navigate = useNavigate();
  const goToView = () => {
    navigate('/student');
  };

  const { sendProblemCreation } = useBackend();

  const stratState = [false, false, false, false];

  useEffect(() => {
    if (code !== '') {
      const codeBlocks = generateParsons(code);
      setExample(codeBlocks);
    }
  }, [code]);

  const handleCheckbox = (index) => {
    stratState[index] = !stratState[index];
    setStrategy(...stratState);
  };

  const shuffleBlocks = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const createProblem = () => {
    // TODO Validate the actual code block to check it is valid for execution based
    const codeBlocks = generateParsons(code);
    const solution = codeBlocks.map((block) => {
      return block.id;
    });

    const randomBlocks = shuffleBlocks([...codeBlocks]);
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
        blocks: randomBlocks,
        solution: solution,
      },
      tests: testSet,
    };
    //Callback function to print to console - checking that problem is created
    const postCallback = () => {
      console.log(newProblem);
      goToView();
    };
    //POST problem to the server
    sendProblemCreation(newProblem, postCallback);
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
                <h2 className="py-1 my-3 text-lg font-medium">Solution Code</h2>
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
                <TextAreaInput setCode={setCode} />
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
              <h2 className="text-lg font-medium">Associated Tags (comma separated values)</h2>
              <input
                className="bg-stone-200 rounded-full px-3 py-1 text-black max-w-xs mt-5 mb-3"
                type="text"
                placeholder="e.g for loop, arrays ..."
                onChange={(event) => {
                  setTags(event.target.value);
                }}
              />

              <h2 className="text-lg font-medium">Example Parsons Problem</h2>

              <div className="h-72 bg-stone-200 w-96 rounded-lg p-3 mb-5 overflow-auto">
                {code !== '' && (example ?? example.length > 0)
                  ? example.map((block) => {
                      return (
                        <Block
                          key={`block-${block.id}`}
                          id={block.id}
                          text={block.text}
                          fadedIndices={block.fadedIndices}
                          indentation={block.indentation}
                          currentInputs={''}
                        />
                      );
                    })
                  : ''}
              </div>

              <div className="ml-16">
                <button
                  className="px-4 py-2 mr-3 bg-green-400 text-white rounded-full hover:bg-green-500"
                  onClick={createProblem}
                >
                  Create
                </button>
                <button
                  className="px-4 py-2 mr-3 bg-blue-400 text-white rounded-full hover:bg-blue-500"
                  onClick={() => {
                    const array = [...example];
                    setExample(shuffleBlocks(array));
                  }}
                >
                  Randomise
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3 ml-4 flex flex-col w-full">
        <h2 className="ml-3 text-lg font-medium">Test Cases</h2>
        <TestCaseCreation updateTestSet={setTestSet} />
      </div>
    </div>
  );
}
