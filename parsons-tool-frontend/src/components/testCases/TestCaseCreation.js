import { useEffect, useState } from 'react';
import ListOfTestCases from './ListOfTestCases';

export default function TestCaseCreation({ updateTestSet }) {
  const [testCases, setTestCases] = useState([{ id: 0, inputs: '', outputs: '' }]);
  const [caseNum, setCaseNum] = useState(1);

  useEffect(() => {
    updateTestSet(
      testCases.map((test) => {
        return { inputs: test.inputs, outputs: test.outputs };
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCases]);

  function newTestCase() {
    const newCase = {
      id: caseNum,
      inputs: '',
      outputs: '',
    };
    const newSet = [...testCases, newCase];
    setTestCases(newSet);
    setCaseNum(caseNum + 1);
  }

  function handleDelete(index) {
    const newArray = [...testCases];
    newArray.splice(index, 1);
    setTestCases(newArray);
  }

  function handleUpdate(index, state) {
    const newList = [...testCases];
    newList[index] = state;
    setTestCases(newList);
  }

  return (
    <div className="ml-3">
      <button onClick={newTestCase} className="px-3 py-1 ml-3 rounded-full bg-yellow-200 hover:bg-yellow-300">
        New Test Case +
      </button>

      <ListOfTestCases testCases={testCases} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </div>
  );
}
