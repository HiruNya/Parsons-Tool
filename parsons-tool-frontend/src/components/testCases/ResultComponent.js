import React from 'react';

function ResultComponent({ result }) {
  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <tr
      className={
        result.result === 'correct'
          ? 'mx-auto bg-green-300 w-full rounded p-2 mt-1'
          : 'mx-auto bg-red-300 w-full rounded p-2 mt-1'
      }
    >
      <td className="p-2">{result.test.name}</td>
      <td className="p-2">{capitaliseFirstLetter(result.result)}</td>
      <CodeBlock>{result.test.inputs.slice(1).join('\n')}</CodeBlock>
      <CodeBlock>{formatOutputArray(result.test.outputs).join('\n')}</CodeBlock>
      <CodeBlock>{result.actual}</CodeBlock>
    </tr>
  );
}

const CodeBlock = ({ children }) => (
  <td className="p-2 whitespace-pre">
    <code>{children}</code>
  </td>
);

const formatOutputArray = (outputArray) => {
  const arr = outputArray.slice(1);
  const newArray = outputArray[0] === 'None' ? [] : [outputArray[0]];
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    newArray.push(stripPrint(arr[2 * i]) + ' => ' + arr[2 * i + 1]);
  }
  return newArray;
};

const stripPrint = (str) => {
  let newStr = str;
  if (!newStr) {
    return '';
  }
  newStr = newStr.startsWith('print(') ? newStr.substring('print('.length).trimStart() : newStr;
  newStr = newStr.endsWith(')') ? newStr.substring(0, newStr.length - ')'.length).trimEnd() : newStr;
  return newStr;
};

export default ResultComponent;
