import TestCase from './TestCaseComponent';

export default function ListOfTestCases({ testCases, handleDelete, handleUpdate }) {
  return (
    <ul>
      {testCases && testCases.length > 0 ? (
        testCases.map((item, i) => (
          <TestCase
            key={`test-case-${item.id}`}
            number={item.id}
            deleteCase={() => handleDelete(i)}
            updateState={(state) => handleUpdate(i, state)}
          />
        ))
      ) : (
        <p>"no test cases"</p>
      )}
    </ul>
  );
}
