import React, { useEffect } from 'react';
import DataLogObject from '../components/analytics/DataLogObject';
import { useBackend } from '../data/BackendContext';
import { useState } from 'react';
import AverageTimeGraph from '../components/analytics/AverageTimeGraph';

function DataAnalytics() {
  const { dataLogs } = useBackend();
  const [data, setData] = useState([]);
  const [selectedLog, setSelectedLog] = useState();
  const [questionData, setQuestionData] = useState();

  const groupMap = new Map();
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
        newData.timeSec = timeSeconds.toFixed(3);

        // add to a hashmap of logs for each experiment group
        const group = newData.user.experimentGroup;
        if (groupMap.has(group)) {
          groupMap.set(group, [...groupMap.get(group), newData]);
        } else {
          groupMap.set(group, [newData]);
        }

        // add to a hashmap of logs for each question
        const problemName = newData.parsonsProblem.name;
        if (questionMap.has(problemName)) {
          questionMap.set(problemName, updateAvgTime(questionMap.get(problemName), newData.timeMin));
        } else {
          questionMap.set(problemName, { totalTime: newData.timeMin, total: 1, avgMin: newData.timeMin });
        }

        // remove some unused data from objects
        //newData.dataEvents = [];
        //newData.blockState = [];
        newData.parsonsProblem.description = '';
        newData.parsonsProblem.problem = {};
        newData.parsonsProblem.difficulty = '';

        return newData;
      });
      setData(
        proccessedData.sort((a, b) =>
          a.parsonsProblem.name > b.parsonsProblem.name ? 1 : b.parsonsProblem.name > a.parsonsProblem.name ? -1 : 0,
        ),
      );
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

  function formatDateTime(datetime) {
    const date = new Date(datetime);
    return `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;
  }

  function renderEventContext(type, context) {
    if (typeof context === 'string' || context instanceof String) {
      return (
        <tr className="bg-red-400">
          <td>= Error: {context}</td>
        </tr>
      );
    }
    if (type.includes('EXECUTION')) {
      return (
        <>
          {context ? (
            context.map((test) => {
              return (
                <tr className={test.result.includes('incorrect') ? 'bg-red-300 ' : 'bg-green-300'}>
                  <td> = Actual: {test.actual}</td> <td className="pl-5">Result: {test.result}</td>{' '}
                  <td>Expected: {test.test.outputs.length > 1 ? test.test.outputs[2] : test.test.outputs[0]}</td>
                </tr>
              );
            })
          ) : (
            <span>No context</span>
          )}
        </>
      );
    }
    return;
  }

  return (
    <div>
      {questionData ? <AverageTimeGraph problemMap={questionData} /> : <p>No data yet</p>}
      <div className="flex flex-row">
        <table className="bg-slate-300">
          <tr className="border-b">
            <th>Problem Name</th>
            <th className="pl-4">Group</th>
            <th className="pl-4">Time (min)</th>
            <th className="pl-4 pr-3">Time (sec)</th>
          </tr>

          {data && data.length > 0 ? (
            data.map((dataPoint, index) => (
              <DataLogObject
                key={`data-point-${index}`}
                dataLog={dataPoint}
                setSelected={(log) => setSelectedLog(log)}
              />
            ))
          ) : (
            <p>No Data found</p>
          )}
        </table>
        <div className="pl-4">
          {selectedLog ? (
            <div className="px-4 py-2 bg-blue-200 rounded-lg">
              <p>
                Problem: <b>{selectedLog.parsonsProblem.name} </b>
              </p>
              <p>
                Time taken (min): <b>{selectedLog.timeMin}</b>, (sec): <b>{selectedLog.timeSec}</b>
              </p>
              <p>
                data events (<b>{selectedLog.dataEvents.length}</b>):{' '}
              </p>
              <div className="px-3 py-2 bg-blue-300 rounded-lg">
                <table className="">
                  <tr className="border-b ">
                    <th>EVENT TYPE</th>
                    <th>MESSAGE</th>
                    <th className="pl-4">TIME</th>
                  </tr>
                  {selectedLog.dataEvents.map((event) => {
                    return (
                      <>
                        <tr>
                          <td>[ {event.eventType} ]</td>
                          <td className="pl-6">[ {event.eventMsg} ]</td>
                          <td>[ {formatDateTime(event.timestamp)} ]</td>
                        </tr>
                        {renderEventContext(event.eventType, event.context)}
                      </>
                    );
                  })}
                </table>
              </div>
            </div>
          ) : (
            <p>No log selected</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataAnalytics;
