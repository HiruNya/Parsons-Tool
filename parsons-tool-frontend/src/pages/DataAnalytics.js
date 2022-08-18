import React, { useEffect } from 'react';
import DataLogObject from '../components/analytics/DataLogObject';
import { useBackend } from '../data/BackendContext';
import { useState } from 'react';
import AverageTimeGraph from '../components/analytics/AverageTimeGraph';

function DataAnalytics() {
  const { dataLogs } = useBackend();
  const [data, setData] = useState([]);
  const [questionData, setQuestionData] = useState();
  const [questionMapData, setQuestionMapData] = useState(new Map());

  const groupMap = new Map();
  const questionMapRaw = new Map();
  const questionMap = new Map();

  useEffect(() => {
    processData([...dataLogs]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLogs]);

  function processData(dataLogs) {
    if (dataLogs) {
      const proccessedData = dataLogs.map((log, index) => {
        const newData = { ...log };
        // reduce joined documents into object from array
        newData.parsonsProblem = { ...log.parsonsProblem[0] };
        newData.user = { ...log.user[0] };

        // calculate total time elapsed
        const end = new Date(log.timestamp);
        const start = new Date(log.dataEvents[0].timestamp);

        const timeSeconds = (end - start) / 1000;
        const timeMin = timeSeconds / 60;
        newData.timeMin = timeMin.toFixed(3);
        newData.timeSec = timeMin.toFixed(3);

        // add to a hashmap of logs for each experiment group
        const group = newData.user.experimentGroup;
        if (groupMap.has(group)) {
          groupMap.set(group, [...groupMap.get(group), newData]);
        } else {
          groupMap.set(group, [newData]);
        }

        // add to a hashmap of logs for each experiment group
        const problemRaw = newData.parsonsProblem.name;
        if (questionMapRaw.has(problemRaw)) {
          questionMapRaw.set(problemRaw, [...questionMapRaw.get(problemRaw), newData]);
        } else {
          questionMapRaw.set(problemRaw, [newData]);
        }

        // add to a hashmap of logs for each question
        const problemName = newData.parsonsProblem.name;
        if (questionMap.has(problemName)) {
          questionMap.set(problemName, updateAvgTime(questionMap.get(problemName), newData.timeMin));
        } else {
          questionMap.set(problemName, { totalTime: newData.timeMin, total: 1, avgMin: newData.timeMin });
        }

        // remove some unused data from objects
        newData.dataEvents = [];
        newData.blockState = [];
        newData.parsonsProblem.description = '';
        newData.parsonsProblem.problem = {};

        return newData;
      });
      setData(proccessedData);
      setQuestionMapData(questionMapRaw);
      const questionArray = Array.from(questionMap, ([key, value]) => ({ key, value }));
      // sort based on key/problem name
      questionArray.sort((a, b) => (a.key > b.key ? 1 : b.key > a.key ? -1 : 0));
      setQuestionData(questionArray);
    }
  }

  function updateAvgTime(currentData, newTime) {
    const newTotalTime = parseFloat(currentData.totalTime) + parseFloat(newTime);
    const newNumber = currentData.total + 1;
    const newAvgMin = newTotalTime / newNumber;
    return { totalTime: newTotalTime, total: newNumber, avgMin: newAvgMin };
  }
  return (
    <div>
      <p>Data Test</p>
      {questionData ? <AverageTimeGraph problemMap={questionData} /> : <p>No data yet</p>}
      {/*data && data.length > 0 ? (
        data.map((dataPoint, index) => <DataLogObject key={`data-point-${index}`} dataLog={dataPoint} />)
      ) : (
        <p>No Data found</p>
      )*/}
    </div>
  );
}

export default DataAnalytics;
