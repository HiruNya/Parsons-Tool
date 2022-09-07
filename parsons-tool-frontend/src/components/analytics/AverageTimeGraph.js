import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function AverageTimeGraph({ problemMap }) {
  const [questionSegments, setQuestionSegments] = useState(new Map());
  useEffect(() => {
    if (problemMap) {
      const questionGroups = new Map();

      problemMap.forEach((data) => {
        const newData = { ...data };
        const problemName = data.key;
        const problemType = problemName.substring(0, problemName.length - 2);
        if (questionGroups.has(problemType)) {
          questionGroups.set(problemType, [...questionGroups.get(problemType), newData]);
        } else {
          questionGroups.set(problemType, [newData]);
        }
      });
      setQuestionSegments(questionGroups);
      console.log(questionGroups);
    }
  }, [problemMap]);

  function renderQuestion(key) {
    return (
      <div>
        <h1>
          <b> {key} average time (min) and number of logs graph </b>
        </h1>
        <BarChart
          width={800}
          height={300}
          data={questionSegments.get(key)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value.avgMin" fill="#8884d8" />
          <Bar dataKey="value.total" fill="#82ca9d" />
        </BarChart>
      </div>
    );
  }

  return (
    <div className="pl-4">
      Fading strategies for each question
      <table>
        <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-200">
          <tr>
            <th>Experiment Group</th>
            <th className="pl-4">Search Out of Order</th>
            <th className="pl-4">Bubble sort</th>
            <th className="pl-4">Insertion sort</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100 border-b">
            <td>1</td>
            <td className="pl-4">Control</td>
            <td className="pl-4">Conditional</td>
            <td className="pl-4">Variable</td>
          </tr>
          <tr className="bg-gray-100 border-b">
            <td>2</td>
            <td className="pl-4">Conditional</td>
            <td className="pl-4">Variable</td>
            <td className="pl-4">Operator</td>
          </tr>
          <tr className="bg-gray-100 border-b">
            <td>3</td>
            <td className="pl-4">Variable</td>
            <td className="pl-4">Operator</td>
            <td className="pl-4">Control</td>
          </tr>
          <tr className="bg-gray-100 border-b">
            <td>4</td>
            <td className="pl-4">Operator</td>
            <td className="pl-4">Control</td>
            <td className="pl-4">Conditional</td>
          </tr>
        </tbody>
      </table>
      <br />
      <hr className="py-8" />
      <br />
      <h1>
        <b> Average time (min) & number of logs for entire experiment </b>
      </h1>
      <BarChart
        width={1200}
        height={300}
        data={problemMap}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value.avgMin" fill="#8884d8" />
        <Bar dataKey="value.total" fill="#82ca9d" />
      </BarChart>
      <br />
      <hr className="py-8" />
      <br />
      {questionSegments ? (
        [...questionSegments.keys()].map((key) => {
          return renderQuestion(key);
        })
      ) : (
        <p>Error</p>
      )}
      <br />
      <hr className="py-8" />
      <br />
    </div>
  );
}
