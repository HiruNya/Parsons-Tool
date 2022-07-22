import TestCase from './TestCaseComponent';
import { useState } from 'react';

export default function TestCaseCreation({}) {
  const [testCases, setTestCases] = useState([]);

  function newTestCase() {
    const newCase = {
      number: 0,
      inputs: '',
      outputs: '',
    };

    setTestCases([...testCases, newCase]);
  }

  return (
    <div className="ml-3">
      <button onClick={newTestCase}>New Test Case +</button>
      <ul>
        {testCases && testCases.length > 0 ? (
          testCases.map((item, i) => <TestCase key={`test-case-${i}`} test={item} number={i} />)
        ) : (
          <p>"no test cases"</p>
        )}
      </ul>
    </div>
  );
}
