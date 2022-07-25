import TestCase from './TestCaseComponent';
import { useState } from 'react';

export default function TestCaseCreation() {
  const [testCases, setTestCases] = useState([]);

  function newTestCase() {
    const newCase = {
      inputs: '',
      outputs: '',
    };

    setTestCases([...testCases, newCase]);
  }

  function handleDelete(index) {
    console.log('Delete: ', index, testCases);
    const newArray = [...testCases];
    newArray.splice(index, 1);
    setTestCases(newArray);
  }

  return (
    <div className="ml-3">
      <button onClick={newTestCase} className="px-3 py-1 ml-3 rounded-full bg-yellow-200 hover:bg-yellow-300">
        New Test Case +
      </button>
      <ul>
        {testCases && testCases.length > 0 ? (
          testCases.map((item, i) => (
            <TestCase
              key={`test-case-${i}`}
              test={item}
              deleteCase={() => handleDelete(i)}
              updateState={(newState) => {
                const newList = [...testCases];
                newList[i] = newState;
                setTestCases(newList);
              }}
            />
          ))
        ) : (
          <p>"no test cases"</p>
        )}
      </ul>
    </div>
  );
}
