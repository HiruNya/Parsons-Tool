export default function TestCase({ test, number }) {
  return (
    <li className="ml-3 my-2 px-3 w-max border-gray-300 rounded-full  border-2">
      <span>Test Case {number}: </span>
      <span>
        Input: <input type="text" placeholder={test.inputs} />
      </span>
      <span>
        Outputs?: <input type="text" placeholder={test.outputs} />
      </span>
    </li>
  );
}
